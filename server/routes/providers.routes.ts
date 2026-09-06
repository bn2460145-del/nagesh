import { Router } from 'express';
import { db } from '../db/database';

export const providersRouter = Router();

// 100-Point Deterministic Match Rubric
function calculateScore(provider: any, filters: any, userLanguages = ['English', 'Hindi']) {
  // 1. Specialty Match (30 pts)
  let specialtyScore = 10;
  if (!filters.specialty || filters.specialty === 'All') {
    specialtyScore = 25;
  } else if (provider.specialty.toLowerCase() === filters.specialty.toLowerCase()) {
    specialtyScore = 30;
  } else if (provider.specialty === 'General Medicine' || filters.specialty === 'General Medicine') {
    specialtyScore = 22;
  }

  // 2. Verified Credentials (20 pts)
  const credentialsScore = provider.verified_credentials ? 20 : 5;

  // 3. Distance Match (15 pts)
  let distanceScore = 5;
  if (provider.distance_km <= 2.5) distanceScore = 15;
  else if (provider.distance_km <= 5.0) distanceScore = 13;
  else if (provider.distance_km <= 8.0) distanceScore = 10;
  else if (provider.distance_km <= 12.0) distanceScore = 7;

  // 4. Affordability / Cost Tier (15 pts)
  let affordabilityScore = 8;
  if (provider.consultation_fee === 0) affordabilityScore = 15;
  else if (provider.consultation_fee <= 700) affordabilityScore = 14;
  else if (provider.consultation_fee <= 1000) affordabilityScore = 10;
  else affordabilityScore = 6;

  // 5. Language Match (10 pts)
  const languages: string[] = JSON.parse(provider.languages || '[]');
  const langMatch = languages.some(l => userLanguages.includes(l));
  const languageScore = langMatch ? 10 : 4;

  // 6. Facility Capabilities (10 pts)
  const facilities: string[] = JSON.parse(provider.facility_capabilities || '[]');
  const facilityScore = Math.min(10, Math.max(2, facilities.length * 2.5));

  const totalScore = Math.round(
    specialtyScore + credentialsScore + distanceScore + affordabilityScore + languageScore + facilityScore
  );

  const rationale = `Matched on transparent 100-pt algorithm: Specialty alignment (${specialtyScore}/30), Verified credentials (${credentialsScore}/20), Distance (${distanceScore}/15), and Affordability (${affordabilityScore}/15). Zero paid sponsorship.`;

  return {
    specialtyScore,
    credentialsScore,
    distanceScore,
    affordabilityScore,
    languageScore,
    facilityScore,
    totalScore,
    rationale
  };
}

// POST /api/providers/search
providersRouter.post('/search', (req, res) => {
  const { query, specialty, costTier, maxDistanceKm, language } = req.body;

  // NLP Query Intent Extractor
  let targetSpecialty = specialty;
  let targetCost = costTier;
  let targetDistance = maxDistanceKm || 25;

  if (query) {
    const q = query.toLowerCase();
    if (q.includes('diabet') || q.includes('sugar') || q.includes('endocrine') || q.includes('thyroid')) {
      targetSpecialty = 'Endocrinology';
    } else if (q.includes('heart') || q.includes('cardio') || q.includes('chest') || q.includes('bp')) {
      targetSpecialty = 'Cardiology';
    } else if (q.includes('general') || q.includes('physician') || q.includes('fever')) {
      targetSpecialty = 'General Medicine';
    }

    if (q.includes('affordable') || q.includes('budget') || q.includes('cheap') || q.includes('free')) {
      targetCost = 'Affordable';
    }

    if (q.includes('near') || q.includes('nearby') || q.includes('close')) {
      targetDistance = 5;
    }
  }

  const rows = db.prepare('SELECT * FROM providers').all() as any[];

  const scored = rows
    .map(p => {
      const breakdown = calculateScore(p, { specialty: targetSpecialty, costTier: targetCost });
      return {
        id: p.id,
        name: p.name,
        title: p.title,
        specialty: p.specialty,
        type: p.type,
        experienceYears: p.experience_years,
        qualification: p.qualification,
        registrationNumber: p.registration_number,
        hospitalAffiliation: p.hospital_affiliation,
        location: p.location,
        city: p.city,
        distanceKm: p.distance_km,
        consultationFee: p.consultation_fee,
        costTier: p.cost_tier,
        languages: JSON.parse(p.languages || '[]'),
        gender: p.gender,
        rating: p.rating,
        reviewCount: p.review_count,
        verifiedCredentials: Boolean(p.verified_credentials),
        facilityCapabilities: JSON.parse(p.facility_capabilities || '[]'),
        availableSlots: JSON.parse(p.available_slots || '[]'),
        about: p.about,
        matchScore: breakdown.totalScore,
        matchBreakdown: breakdown
      };
    })
    .filter(p => {
      if (targetSpecialty && targetSpecialty !== 'All' && p.specialty !== targetSpecialty && p.specialty !== 'General Medicine') {
        return false;
      }
      if (targetCost && targetCost !== 'All' && p.costTier !== targetCost) {
        return false;
      }
      if (p.distanceKm > targetDistance) {
        return false;
      }
      return true;
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  return res.json({
    parsedQuery: {
      inferredSpecialty: targetSpecialty,
      inferredCostTier: targetCost,
      maxDistanceKm: targetDistance
    },
    count: scored.length,
    providers: scored
  });
});

// POST /api/providers/book
providersRouter.post('/book', (req, res) => {
  const { providerId, providerName, slot } = req.body;
  if (!providerId || !slot) {
    return res.status(400).json({ error: 'Provider ID and Slot are required' });
  }

  const apptId = `apt-${Date.now()}`;
  db.prepare(`
    INSERT INTO appointments (id, patient_id, provider_id, provider_name, slot, status)
    VALUES (?, ?, ?, ?, ?, 'confirmed')
  `).run(apptId, 'pat-9842', providerId, providerName, slot);

  // Add audit log
  db.prepare(`
    INSERT INTO audit_logs (id, patient_id, timestamp, actor_name, actor_role, action, resource_name, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    `log-${Date.now()}`,
    'pat-9842',
    'Just now',
    'Rahul Sharma (Patient)',
    'Patient',
    'Booked Appointment Request',
    `${providerName} (${slot})`,
    'authorized'
  );

  return res.status(201).json({
    message: 'Appointment confirmed successfully',
    appointmentId: apptId,
    slot
  });
});
