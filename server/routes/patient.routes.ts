import { Router } from 'express';
import { db } from '../db/database';

export const patientRouter = Router();

// GET /api/patient/profile
patientRouter.get('/profile', (req, res) => {
  const patient = db.prepare('SELECT * FROM patients LIMIT 1').get() as any;
  if (!patient) return res.status(404).json({ error: 'Patient profile not found' });

  return res.json({
    id: patient.id,
    name: patient.name,
    age: patient.age,
    gender: patient.gender,
    phone: patient.phone,
    email: patient.email,
    abhaId: patient.abha_id,
    abhaAddress: patient.abha_address,
    bloodGroup: patient.blood_group,
    allergies: JSON.parse(patient.allergies || '[]'),
    conditions: JSON.parse(patient.conditions || '[]'),
    emergencyContacts: JSON.parse(patient.emergency_contacts || '[]'),
    preferredLanguage: patient.preferred_language,
    location: patient.location,
    address: patient.address,
    userProvidedNotice: patient.user_provided_notice
  });
});

// PUT /api/patient/profile
patientRouter.put('/profile', (req, res) => {
  const {
    name, age, gender, phone, bloodGroup, allergies,
    conditions, emergencyContacts, preferredLanguage, location, address
  } = req.body;

  const patient = db.prepare('SELECT id FROM patients LIMIT 1').get() as { id: string };
  if (!patient) return res.status(404).json({ error: 'Patient not found' });

  db.prepare(`
    UPDATE patients SET
      name = coalesce(?, name),
      age = coalesce(?, age),
      gender = coalesce(?, gender),
      phone = coalesce(?, phone),
      blood_group = coalesce(?, blood_group),
      allergies = coalesce(?, allergies),
      conditions = coalesce(?, conditions),
      emergency_contacts = coalesce(?, emergency_contacts),
      preferred_language = coalesce(?, preferred_language),
      location = coalesce(?, location),
      address = coalesce(?, address)
    WHERE id = ?
  `).run(
    name, age, gender, phone, bloodGroup,
    allergies ? JSON.stringify(allergies) : null,
    conditions ? JSON.stringify(conditions) : null,
    emergencyContacts ? JSON.stringify(emergencyContacts) : null,
    preferredLanguage, location, address, patient.id
  );

  // Add audit log
  db.prepare(`
    INSERT INTO audit_logs (id, patient_id, timestamp, actor_name, actor_role, action, resource_name, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    `log-${Date.now()}`,
    patient.id,
    'Just now',
    'Rahul Sharma (Patient)',
    'Record Owner',
    'Updated Emergency Profile',
    'Emergency & Medical Demographics',
    'authorized'
  );

  return res.json({ message: 'Profile updated successfully' });
});

// GET /api/patient/emergency
patientRouter.get('/emergency', (req, res) => {
  const patient = db.prepare('SELECT * FROM patients LIMIT 1').get() as any;
  if (!patient) return res.status(404).json({ error: 'Profile not found' });

  const reminders = db.prepare('SELECT * FROM reminders WHERE active = 1').all() as any[];

  return res.json({
    name: patient.name,
    abhaId: patient.abha_id,
    bloodGroup: patient.blood_group,
    allergies: JSON.parse(patient.allergies || '[]'),
    conditions: JSON.parse(patient.conditions || '[]'),
    emergencyContacts: JSON.parse(patient.emergency_contacts || '[]'),
    activeMedications: reminders.map(r => ({
      name: r.medicine_name,
      dosage: r.dosage,
      frequency: r.frequency
    })),
    emergencyNumbers: [
      { label: 'National Emergency', number: '112' },
      { label: 'Government Ambulance', number: '108' },
      { label: 'National Medical Helpline', number: '104' },
      { label: 'Tele-MANAS Mental Health', number: '14416' }
    ]
  });
});
