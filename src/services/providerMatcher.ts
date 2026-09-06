import { Provider, ScoreBreakdown } from '../types';

export interface SearchFilters {
  query: string;
  specialty: string;
  maxDistanceKm: number;
  costTier: string;
  language: string;
  gender: string;
  verifiedOnly: boolean;
  facility: string;
}

export function parseNaturalLanguageQuery(query: string): Partial<SearchFilters> {
  const q = query.toLowerCase();
  const parsed: Partial<SearchFilters> = {};

  if (q.includes('diabet') || q.includes('sugar') || q.includes('endocrine') || q.includes('thyroid') || q.includes('hba1c')) {
    parsed.specialty = 'Endocrinology';
  } else if (q.includes('heart') || q.includes('cardio') || q.includes('chest') || q.includes('bp') || q.includes('blood pressure')) {
    parsed.specialty = 'Cardiology';
  } else if (q.includes('skin') || q.includes('derma') || q.includes('rash') || q.includes('acne')) {
    parsed.specialty = 'Dermatology';
  } else if (q.includes('bone') || q.includes('joint') || q.includes('ortho') || q.includes('knee') || q.includes('spine')) {
    parsed.specialty = 'Orthopedics';
  } else if (q.includes('general') || q.includes('physician') || q.includes('fever') || q.includes('cough') || q.includes('family doctor')) {
    parsed.specialty = 'General Medicine';
  }

  if (q.includes('affordable') || q.includes('budget') || q.includes('cheap') || q.includes('low cost') || q.includes('free') || q.includes('subsidized')) {
    parsed.costTier = 'Affordable';
  }

  if (q.includes('near') || q.includes('nearby') || q.includes('close') || q.includes('closest')) {
    parsed.maxDistanceKm = 5;
  }

  if (q.includes('hindi')) parsed.language = 'Hindi';
  if (q.includes('english')) parsed.language = 'English';
  if (q.includes('kannada')) parsed.language = 'Kannada';
  if (q.includes('telugu')) parsed.language = 'Telugu';
  if (q.includes('tamil')) parsed.language = 'Tamil';

  if (q.includes('female') || q.includes('woman doctor') || q.includes('lady doctor')) {
    parsed.gender = 'Female';
  } else if (q.includes('male')) {
    parsed.gender = 'Male';
  }

  return parsed;
}

export function calculateDeterministicScore(
  provider: Provider,
  filters: SearchFilters,
  userLanguages: string[] = ['English', 'Hindi']
): ScoreBreakdown {
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
  const credentialsScore = provider.verifiedCredentials ? 20 : 5;

  // 3. Distance Match (15 pts)
  let distanceScore = 5;
  if (provider.distanceKm <= 2.5) {
    distanceScore = 15;
  } else if (provider.distanceKm <= 5.0) {
    distanceScore = 13;
  } else if (provider.distanceKm <= 8.0) {
    distanceScore = 10;
  } else if (provider.distanceKm <= 12.0) {
    distanceScore = 7;
  }

  // 4. Affordability / Cost Tier (15 pts)
  let affordabilityScore = 8;
  if (provider.consultationFee === 0) {
    affordabilityScore = 15;
  } else if (provider.consultationFee <= 700) {
    affordabilityScore = 14;
  } else if (provider.consultationFee <= 1000) {
    affordabilityScore = 10;
  } else {
    affordabilityScore = 6;
  }

  // 5. Language Match (10 pts)
  const langMatch = provider.languages.some(lang => userLanguages.includes(lang) || (filters.language && filters.language !== 'All' && lang.toLowerCase() === filters.language.toLowerCase()));
  const languageScore = langMatch ? 10 : 4;

  // 6. Facility Capabilities (10 pts)
  const facilityScore = Math.min(10, Math.max(2, provider.facilityCapabilities.length * 2.5));

  const totalScore = Math.round(
    specialtyScore + credentialsScore + distanceScore + affordabilityScore + languageScore + facilityScore
  );

  const rationaleParts: string[] = [];
  if (specialtyScore >= 28) rationaleParts.push(`specialty strictly matches "${provider.specialty}"`);
  if (credentialsScore === 20) rationaleParts.push('state medical registration & credentials verified');
  if (distanceScore >= 12) rationaleParts.push(`convenient location (${provider.distanceKm} km away)`);
  if (affordabilityScore >= 12) rationaleParts.push(`fee tier is budget-friendly (₹${provider.consultationFee})`);
  if (langMatch) rationaleParts.push(`consults in your preferred language (${provider.languages.slice(0, 2).join(', ')})`);

  const rationale = `We recommend this provider because ${rationaleParts.join(', ')}. Scored on transparent 100-point rubric with zero paid sponsored placement.`;

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

export function rankProviders(providers: Provider[], filters: SearchFilters, userLanguages?: string[]): Provider[] {
  return providers
    .map(p => {
      const breakdown = calculateDeterministicScore(p, filters, userLanguages);
      return {
        ...p,
        matchScore: breakdown.totalScore,
        matchBreakdown: breakdown
      };
    })
    .filter(p => {
      if (filters.specialty && filters.specialty !== 'All' && p.specialty !== filters.specialty && p.specialty !== 'General Medicine') {
        // Keep primary specialty matches or general medicine
        if (p.specialty !== filters.specialty) return false;
      }
      if (filters.maxDistanceKm && p.distanceKm > filters.maxDistanceKm) {
        return false;
      }
      if (filters.costTier && filters.costTier !== 'All' && p.costTier !== filters.costTier) {
        return false;
      }
      if (filters.language && filters.language !== 'All' && !p.languages.includes(filters.language)) {
        return false;
      }
      if (filters.gender && filters.gender !== 'All' && p.gender !== filters.gender) {
        return false;
      }
      if (filters.verifiedOnly && !p.verifiedCredentials) {
        return false;
      }
      if (filters.facility && filters.facility !== 'All') {
        const hasFac = p.facilityCapabilities.some(f => f.toLowerCase().includes(filters.facility.toLowerCase()));
        if (!hasFac) return false;
      }
      return true;
    })
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
}
