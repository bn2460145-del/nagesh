import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';

const dbPath = path.resolve(process.cwd(), 'care_saathi.db');
export const db = new Database(dbPath);

// Enable WAL mode for high concurrency
db.pragma('journal_mode = WAL');

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      phone TEXT,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'patient',
      abha_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS patients (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      name TEXT NOT NULL,
      age INTEGER,
      gender TEXT,
      phone TEXT,
      email TEXT,
      abha_id TEXT,
      abha_address TEXT,
      blood_group TEXT,
      allergies TEXT,
      conditions TEXT,
      emergency_contacts TEXT,
      preferred_language TEXT,
      location TEXT,
      address TEXT,
      user_provided_notice TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS reports (
      id TEXT PRIMARY KEY,
      patient_id TEXT,
      record_id TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      provider TEXT NOT NULL,
      type TEXT NOT NULL,
      verification_status TEXT NOT NULL,
      verified_by TEXT,
      sha256_hash TEXT NOT NULL,
      file_type TEXT DEFAULT 'PDF',
      file_size TEXT,
      extracted_fields TEXT,
      explanation TEXT,
      confirmed_by_user INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (patient_id) REFERENCES patients(id)
    );

    CREATE TABLE IF NOT EXISTS providers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      specialty TEXT NOT NULL,
      type TEXT DEFAULT 'doctor',
      experience_years INTEGER,
      qualification TEXT,
      registration_number TEXT,
      hospital_affiliation TEXT,
      location TEXT,
      city TEXT,
      distance_km REAL,
      consultation_fee INTEGER,
      cost_tier TEXT,
      languages TEXT,
      gender TEXT,
      rating REAL,
      review_count INTEGER,
      verified_credentials INTEGER DEFAULT 1,
      facility_capabilities TEXT,
      available_slots TEXT,
      about TEXT,
      match_score INTEGER
    );

    CREATE TABLE IF NOT EXISTS reminders (
      id TEXT PRIMARY KEY,
      patient_id TEXT,
      medicine_name TEXT NOT NULL,
      dosage TEXT NOT NULL,
      frequency TEXT NOT NULL,
      time TEXT NOT NULL,
      instructions TEXT,
      source_prescription_id TEXT,
      source_prescription_title TEXT,
      start_date TEXT,
      end_date TEXT,
      active INTEGER DEFAULT 1,
      taken_today INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (patient_id) REFERENCES patients(id)
    );

    CREATE TABLE IF NOT EXISTS consents (
      id TEXT PRIMARY KEY,
      patient_id TEXT,
      requester_name TEXT NOT NULL,
      requester_role TEXT NOT NULL,
      requester_org TEXT NOT NULL,
      requested_records TEXT,
      purpose TEXT,
      granted_date TEXT,
      valid_until TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (patient_id) REFERENCES patients(id)
    );

    CREATE TABLE IF NOT EXISTS pending_consents (
      id TEXT PRIMARY KEY,
      patient_id TEXT,
      requester_name TEXT NOT NULL,
      requester_role TEXT NOT NULL,
      requester_org TEXT NOT NULL,
      requested_records TEXT,
      purpose TEXT,
      requested_duration TEXT,
      timestamp TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (patient_id) REFERENCES patients(id)
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      patient_id TEXT,
      timestamp TEXT NOT NULL,
      actor_name TEXT NOT NULL,
      actor_role TEXT NOT NULL,
      action TEXT NOT NULL,
      resource_name TEXT NOT NULL,
      status TEXT DEFAULT 'authorized',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS appointments (
      id TEXT PRIMARY KEY,
      patient_id TEXT,
      provider_id TEXT,
      provider_name TEXT,
      slot TEXT,
      status TEXT DEFAULT 'confirmed',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  seedDefaultData();
}

function seedDefaultData() {
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
  if (userCount.count > 0) return;

  console.log('Seeding initial clinical database records for CareSaathi...');

  // 1. Create Default User (Rahul Sharma)
  const defaultPasswordHash = bcrypt.hashSync('password123', 10);
  const userId = 'usr-rahul-01';
  const patientId = 'pat-9842';

  db.prepare(`
    INSERT INTO users (id, email, name, phone, password_hash, role, abha_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    userId,
    'rahul.sharma@example.com',
    'Rahul Sharma',
    '+91 98450 12345',
    defaultPasswordHash,
    'patient',
    '91-4820-1928-3841'
  );

  // 2. Create Patient Profile
  db.prepare(`
    INSERT INTO patients (
      id, user_id, name, age, gender, phone, email, abha_id, abha_address,
      blood_group, allergies, conditions, emergency_contacts,
      preferred_language, location, address, user_provided_notice
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    patientId,
    userId,
    'Rahul Sharma',
    38,
    'Male',
    '+91 98450 12345',
    'rahul.sharma@example.com',
    '91-4820-1928-3841',
    'rahul.sharma@abdm',
    'B+',
    JSON.stringify(['Penicillin', 'Sulfa-based antibiotics']),
    JSON.stringify(['Type 2 Diabetes Mellitus', 'Mild Essential Hypertension']),
    JSON.stringify([
      { name: 'Priya Sharma', relation: 'Spouse', phone: '+91 98765 43210' },
      { name: 'Dr. R. K. Verma', relation: 'Family Physician', phone: '+91 98230 11223' }
    ]),
    'English / Hindi',
    'Indiranagar, Bengaluru',
    'Flat 402, Green Glen Residency, Indiranagar, Bengaluru, KA - 560038',
    'This emergency profile contains self-declared information. It does not replace clinical verification in an acute setting.'
  );

  // 3. Seed Reports
  const reportsSeed = [
    {
      id: 'rpt-1',
      record_id: 'CS-RPT-2026-0891',
      title: 'Complete Blood Count & Glycemic Profile',
      date: '02 Sep 2026',
      provider: 'Dr. Lal PathLabs, Indiranagar',
      type: 'lab',
      verification_status: 'verified',
      verified_by: 'Dr. Sunil Mehta, MD (Pathology) - Reg #KMC-48291',
      sha256_hash: '4a6f289b5c3e012fa890e788bc5f67a213e45901cb298374d619cf887201a4e1',
      file_type: 'PDF',
      file_size: '1.4 MB',
      extracted_fields: JSON.stringify([
        { id: 'f1', test: 'Hemoglobin', result: '11.2', unit: 'g/dL', referenceRange: '12.0 – 16.0', status: 'low', meaning: 'Slightly below standard adult male reference range.' },
        { id: 'f2', test: 'Fasting Blood Glucose', result: '138', unit: 'mg/dL', referenceRange: '70 – 99', status: 'high', meaning: 'Above normal fasting range.' },
        { id: 'f3', test: 'HbA1c (Glycated Hemoglobin)', result: '7.2', unit: '%', referenceRange: '< 5.7', status: 'high', meaning: 'Reflects average blood sugar over 2-3 months.' }
      ]),
      explanation: JSON.stringify({
        simpleSummary: 'This report contains measurements of blood cells and glycemic markers. Fasting glucose and HbA1c are elevated above standard non-diabetic reference ranges.',
        doctorQuestions: [
          'Should I repeat this fasting glucose test or consider a post-prandial evaluation?',
          'Does my current dietary routine affect these readings?'
        ],
        whenToSeekCare: 'Consult your doctor for personalized targets.'
      })
    },
    {
      id: 'rpt-2',
      record_id: 'CS-RPT-2026-0422',
      title: 'Lipid Profile & Atherogenic Risk Panel',
      date: '18 Aug 2026',
      provider: 'Apex Diagnostic Centre, HAL 2nd Stage',
      type: 'lab',
      verification_status: 'verified',
      verified_by: 'Dr. Shalini Kulkarni, MD - Reg #KMC-52190',
      sha256_hash: '8b9c1d0ef457a1b2c3d4e5f67890123456789abcdef0123456789abcdef01234',
      file_type: 'PDF',
      file_size: '950 KB',
      extracted_fields: JSON.stringify([
        { id: 'f21', test: 'Total Cholesterol', result: '215', unit: 'mg/dL', referenceRange: '< 200', status: 'borderline', meaning: 'Borderline elevated.' },
        { id: 'f22', test: 'LDL Cholesterol', result: '132', unit: 'mg/dL', referenceRange: '< 100', status: 'high', meaning: 'Above optimal target.' }
      ]),
      explanation: JSON.stringify({
        simpleSummary: 'This lipid panel assesses circulating blood fats. LDL shows mild elevation above optimal baseline.',
        doctorQuestions: ['Do you recommend dietary adjustments or physical activity targets?']
      })
    }
  ];

  const insertReport = db.prepare(`
    INSERT INTO reports (
      id, patient_id, record_id, title, date, provider, type,
      verification_status, verified_by, sha256_hash, file_type, file_size,
      extracted_fields, explanation, confirmed_by_user
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
  `);

  for (const r of reportsSeed) {
    insertReport.run(
      r.id, patientId, r.record_id, r.title, r.date, r.provider, r.type,
      r.verification_status, r.verified_by, r.sha256_hash, r.file_type, r.file_size,
      r.extracted_fields, r.explanation
    );
  }

  // 4. Seed Reminders
  const remindersSeed = [
    {
      id: 'rem-1',
      medicine_name: 'Metformin',
      dosage: '500 mg',
      frequency: 'Twice daily (Morning & Night)',
      time: '08:00 AM',
      instructions: 'Take immediately with or after breakfast.',
      source_prescription_id: 'CS-RPT-2026-0092',
      source_prescription_title: 'Apollo Hospitals Discharge Prescription (10 Jun 2026)',
      start_date: '2026-06-11',
      active: 1,
      taken_today: 1
    },
    {
      id: 'rem-2',
      medicine_name: 'Amlodipine',
      dosage: '5 mg',
      frequency: 'Once daily (Night)',
      time: '08:00 PM',
      instructions: 'Take after dinner with a glass of water.',
      source_prescription_id: 'CS-RPT-2026-0092',
      source_prescription_title: 'Apollo Hospitals Discharge Prescription (10 Jun 2026)',
      start_date: '2026-06-11',
      active: 1,
      taken_today: 0
    }
  ];

  const insertReminder = db.prepare(`
    INSERT INTO reminders (
      id, patient_id, medicine_name, dosage, frequency, time, instructions,
      source_prescription_id, source_prescription_title, start_date, active, taken_today
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const rem of remindersSeed) {
    insertReminder.run(
      rem.id, patientId, rem.medicine_name, rem.dosage, rem.frequency, rem.time,
      rem.instructions, rem.source_prescription_id, rem.source_prescription_title,
      rem.start_date, rem.active, rem.taken_today
    );
  }

  // 5. Seed Consents
  db.prepare(`
    INSERT INTO consents (
      id, patient_id, requester_name, requester_role, requester_org,
      requested_records, purpose, granted_date, valid_until, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    'cst-1',
    patientId,
    'Dr. Ananya Rao',
    'Consultant Endocrinologist',
    'Apollo Clinic & Diabetes Centre',
    JSON.stringify(['Complete Blood Count & Glycemic Profile (02 Sep 2026)', 'Discharge Prescription (10 Jun 2026)']),
    'Second opinion & glycemic control review',
    '28 Aug 2026',
    '10 Sep 2026',
    'active'
  );

  // 6. Seed Pending Consent
  db.prepare(`
    INSERT INTO pending_consents (
      id, patient_id, requester_name, requester_role, requester_org,
      requested_records, purpose, requested_duration, timestamp, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    'req-pending-01',
    patientId,
    'Dr. Vikramaditya Sen',
    'Consultant Interventional Cardiologist',
    'Fortis Heart & Vascular Institute',
    JSON.stringify(['Lipid Profile & Atherogenic Risk Panel (18 Aug 2026)', 'Chest X-Ray Report (15 Jul 2026)']),
    'Cardiovascular Risk Stratification & Lipid Assessment',
    '30 days',
    'Today, 2:15 PM',
    'pending'
  );

  // 7. Seed Audit Logs
  const auditLogsSeed = [
    { id: 'log-1', timestamp: 'Today, 4:35 PM', actor_name: 'Dr. Ananya Rao', actor_role: 'Endocrinologist (Apollo)', action: 'Viewed Medical Report', resource_name: 'Complete Blood Count & Glycemic Profile (CS-RPT-2026-0891)', status: 'authorized' },
    { id: 'log-2', timestamp: '02 Sep 2026, 11:20 AM', actor_name: 'Dr. Lal PathLabs', actor_role: 'Certified Lab Provider', action: 'Uploaded & Digitally Signed Lab Report', resource_name: 'CS-RPT-2026-0891 (Integrity SHA-256 Registered)', status: 'authorized' },
    { id: 'log-3', timestamp: '28 Aug 2026, 09:15 AM', actor_name: 'Rahul Sharma (Patient)', actor_role: 'Record Owner', action: 'Granted Granular Consent', resource_name: 'Consent granted to Dr. Ananya Rao for 14 days', status: 'authorized' }
  ];

  const insertAudit = db.prepare(`
    INSERT INTO audit_logs (id, patient_id, timestamp, actor_name, actor_role, action, resource_name, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const a of auditLogsSeed) {
    insertAudit.run(a.id, patientId, a.timestamp, a.actor_name, a.actor_role, a.action, a.resource_name, a.status);
  }

  // 8. Seed Providers
  const providersSeed = [
    {
      id: 'doc-1',
      name: 'Dr. Ananya Rao',
      title: 'Consultant Endocrinologist & Diabetologist',
      specialty: 'Endocrinology',
      type: 'doctor',
      experience_years: 14,
      qualification: 'MBBS, MD (Medicine), DM (Endocrinology) - AIIMS New Delhi',
      registration_number: 'KMC-61029',
      hospital_affiliation: 'Apollo Clinic & Diabetes Centre, Indiranagar',
      location: 'Indiranagar, Bengaluru',
      city: 'Bengaluru',
      distance_km: 4.8,
      consultation_fee: 700,
      cost_tier: 'Affordable',
      languages: JSON.stringify(['English', 'Hindi', 'Telugu']),
      gender: 'Female',
      rating: 4.9,
      review_count: 312,
      facility_capabilities: JSON.stringify(['Continuous Glucose Monitoring (CGM)', 'In-house HbA1c Lab', 'Dietary Counseling']),
      available_slots: JSON.stringify(['Today 4:30 PM', 'Tomorrow 10:00 AM', 'Tomorrow 3:00 PM']),
      about: 'Specializes in comprehensive adult diabetes management, insulin optimization, thyroid disorders, and metabolic health.',
      match_score: 92
    },
    {
      id: 'doc-2',
      name: 'Dr. Rajesh K. Varma',
      title: 'Senior Physician & Internal Medicine Specialist',
      specialty: 'General Medicine',
      type: 'doctor',
      experience_years: 22,
      qualification: 'MBBS, MD (General Medicine) - Bangalore Medical College',
      registration_number: 'KMC-34190',
      hospital_affiliation: 'Manipal Clinic, HAL 2nd Stage',
      location: 'HAL 2nd Stage, Bengaluru',
      city: 'Bengaluru',
      distance_km: 2.3,
      consultation_fee: 600,
      cost_tier: 'Affordable',
      languages: JSON.stringify(['English', 'Hindi', 'Kannada']),
      gender: 'Male',
      rating: 4.8,
      review_count: 489,
      facility_capabilities: JSON.stringify(['Primary Care Diagnostic Suite', 'ECG', 'Minor Procedure Room']),
      available_slots: JSON.stringify(['Today 5:15 PM', 'Tomorrow 11:30 AM']),
      about: 'Experienced internal medicine physician managing hypertension, metabolic syndrome, and routine preventative healthcare.',
      match_score: 88
    },
    {
      id: 'doc-3',
      name: 'Dr. Vikramaditya Sen',
      title: 'Consultant Interventional Cardiologist',
      specialty: 'Cardiology',
      type: 'doctor',
      experience_years: 18,
      qualification: 'MBBS, MD (Gen Med), DM (Cardiology), FACC',
      registration_number: 'KMC-47812',
      hospital_affiliation: 'Fortis Heart & Vascular Institute, Cunningham Road',
      location: 'Cunningham Road, Bengaluru',
      city: 'Bengaluru',
      distance_km: 7.2,
      consultation_fee: 1200,
      cost_tier: 'Moderate',
      languages: JSON.stringify(['English', 'Hindi', 'Bengali']),
      gender: 'Male',
      rating: 4.9,
      review_count: 276,
      facility_capabilities: JSON.stringify(['2D/3D Echocardiography', 'Stress Testing (TMT)', 'Holter Monitoring']),
      available_slots: JSON.stringify(['Tomorrow 2:00 PM', 'Thursday 10:30 AM']),
      about: 'Senior interventional cardiologist with extensive experience in dyslipidemia and cardiovascular risk stratification.',
      match_score: 78
    },
    {
      id: 'hosp-1',
      name: 'Indiranagar Urban Primary Health Centre (UPHC)',
      title: 'Government Community Health Facility',
      specialty: 'General Medicine',
      type: 'hospital',
      experience_years: 25,
      qualification: 'Govt. of Karnataka Health System (ABDM Linked)',
      registration_number: 'KA-GOV-BLR-041',
      hospital_affiliation: 'National Health Mission / BBMP',
      location: '100ft Road, Indiranagar, Bengaluru',
      city: 'Bengaluru',
      distance_km: 1.2,
      consultation_fee: 0,
      cost_tier: 'Affordable',
      languages: JSON.stringify(['Kannada', 'English', 'Hindi', 'Tamil']),
      gender: 'Female',
      rating: 4.3,
      review_count: 512,
      facility_capabilities: JSON.stringify(['Free Essential Medicines (PMBJP)', 'Basic Diagnostics Lab', 'Immunization Center']),
      available_slots: JSON.stringify(['Walk-in 9:00 AM - 4:00 PM']),
      about: 'Public healthcare facility offering zero-cost consultations and subsidized generic medications.',
      match_score: 86
    }
  ];

  const insertProvider = db.prepare(`
    INSERT INTO providers (
      id, name, title, specialty, type, experience_years, qualification,
      registration_number, hospital_affiliation, location, city, distance_km,
      consultation_fee, cost_tier, languages, gender, rating, review_count,
      facility_capabilities, available_slots, about, match_score
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const p of providersSeed) {
    insertProvider.run(
      p.id, p.name, p.title, p.specialty, p.type, p.experience_years, p.qualification,
      p.registration_number, p.hospital_affiliation, p.location, p.city, p.distance_km,
      p.consultation_fee, p.cost_tier, p.languages, p.gender, p.rating, p.review_count,
      p.facility_capabilities, p.available_slots, p.about, p.match_score
    );
  }

  console.log('Database seeded successfully with clinical records!');
}
