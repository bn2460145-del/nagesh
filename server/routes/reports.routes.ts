import { Router } from 'express';
import crypto from 'crypto';
import { db } from '../db/database';

export const reportsRouter = Router();

// GET /api/reports
reportsRouter.get('/', (req, res) => {
  const { type, search } = req.query;

  let query = 'SELECT * FROM reports WHERE 1=1';
  const params: any[] = [];

  if (type && type !== 'all') {
    query += ' AND type = ?';
    params.push(type);
  }

  if (search) {
    query += ' AND (title LIKE ? OR provider LIKE ? OR record_id LIKE ?)';
    const s = `%${search}%`;
    params.push(s, s, s);
  }

  query += ' ORDER BY created_at DESC';

  const rows = db.prepare(query).all(...params) as any[];

  const reports = rows.map(r => ({
    id: r.id,
    recordId: r.record_id,
    title: r.title,
    date: r.date,
    provider: r.provider,
    type: r.type,
    verificationStatus: r.verification_status,
    verifiedBy: r.verified_by,
    sha256Hash: r.sha256_hash,
    fileType: r.file_type,
    fileSize: r.file_size,
    extractedFields: JSON.parse(r.extracted_fields || '[]'),
    explanation: JSON.parse(r.explanation || '{}'),
    confirmedByUser: Boolean(r.confirmed_by_user)
  }));

  return res.json(reports);
});

// GET /api/reports/:recordId
reportsRouter.get('/:recordId', (req, res) => {
  const { recordId } = req.params;
  const row = db.prepare('SELECT * FROM reports WHERE record_id = ? OR id = ?').get(recordId, recordId) as any;

  if (!row) {
    return res.status(404).json({ error: 'Report not found' });
  }

  return res.json({
    id: row.id,
    recordId: row.record_id,
    title: row.title,
    date: row.date,
    provider: row.provider,
    type: row.type,
    verificationStatus: row.verification_status,
    verifiedBy: row.verified_by,
    sha256Hash: row.sha256_hash,
    fileType: row.file_type,
    fileSize: row.file_size,
    extractedFields: JSON.parse(row.extracted_fields || '[]'),
    explanation: JSON.parse(row.explanation || '{}'),
    confirmedByUser: Boolean(row.confirmed_by_user)
  });
});

// POST /api/reports/extract (OCR extraction simulation)
reportsRouter.post('/extract', (req, res) => {
  const { sampleType } = req.body;

  // Simulate structured parameter extraction
  if (sampleType === 'thyroid') {
    return res.json({
      title: 'Thyroid Function Profile (TSH, Free T3, Free T4)',
      provider: 'Thyrocare Diagnostics Ltd',
      fileType: 'PDF',
      fileSize: '840 KB',
      extractedFields: [
        { id: 'f-th1', test: 'TSH (Thyroid Stimulating Hormone)', result: '4.85', unit: 'uIU/mL', referenceRange: '0.35 – 4.50', status: 'borderline', meaning: 'Slightly above baseline.' },
        { id: 'f-th2', test: 'Free T3', result: '2.8', unit: 'pg/mL', referenceRange: '2.0 – 4.4', status: 'normal', meaning: 'Normal.' },
        { id: 'f-th3', test: 'Free T4', result: '1.15', unit: 'ng/dL', referenceRange: '0.93 – 1.70', status: 'normal', meaning: 'Normal.' }
      ]
    });
  }

  // Default: Complete Blood Count & Glycemic panel
  return res.json({
    title: 'Dr. Lal PathLabs Blood Test CBC + Fasting Glucose',
    provider: 'Dr. Lal PathLabs, Indiranagar',
    fileType: 'PDF',
    fileSize: '1.2 MB',
    extractedFields: [
      { id: 'f-cbc1', test: 'Hemoglobin', result: '11.2', unit: 'g/dL', referenceRange: '12.0 – 16.0', status: 'low', meaning: 'Below standard reference threshold.' },
      { id: 'f-cbc2', test: 'Fasting Blood Glucose', result: '138', unit: 'mg/dL', referenceRange: '70 – 99', status: 'high', meaning: 'Elevated fasting sugar.' },
      { id: 'f-cbc3', test: 'HbA1c', result: '7.2', unit: '%', referenceRange: '< 5.7', status: 'high', meaning: '3-month glycemic average.' }
    ]
  });
});

// POST /api/reports/confirm (Mandatory user confirmation -> saves to DB)
reportsRouter.post('/confirm', (req, res) => {
  const { title, provider, fileType, extractedFields, simpleSummary, doctorQuestions } = req.body;

  if (!title || !extractedFields) {
    return res.status(400).json({ error: 'Title and extracted parameters are required' });
  }

  const recordNum = Math.floor(1000 + Math.random() * 9000);
  const recordId = `CS-RPT-2026-${recordNum}`;
  const sha256Hash = crypto.createHash('sha256').update(`${title}-${recordId}-${Date.now()}`).digest('hex');

  const explanation = {
    simpleSummary: simpleSummary || `This document presents extracted laboratory results for ${extractedFields.map((f: any) => f.test).join(', ')}. Some measured levels fall outside standard laboratory reference intervals.`,
    testMeanings: extractedFields.map((f: any) => ({
      test: f.test,
      whatItMeasures: `${f.test} concentration in biological sample`,
      meaning: f.meaning || `Reported value is ${f.result} ${f.unit} compared to expected reference interval (${f.referenceRange}).`,
      statusSummary: f.status === 'normal' ? 'Within typical baseline limits' : `Observed ${f.status} compared to standard reference`,
      status: f.status
    })),
    doctorQuestions: doctorQuestions || [
      'Does this result require verification or repeating in a clinical setting?',
      'How should these findings be interpreted within my overall health profile?'
    ],
    whenToSeekCare: 'Schedule a timely review with your doctor. If you experience severe weakness or breathlessness, seek medical care promptly.',
    safetyNotice: 'This is general health information, not a clinical diagnosis. Always discuss your laboratory report with a qualified healthcare professional.'
  };

  const id = `rpt-${Date.now()}`;
  const patientId = 'pat-9842';

  db.prepare(`
    INSERT INTO reports (
      id, patient_id, record_id, title, date, provider, type,
      verification_status, verified_by, sha256_hash, file_type, file_size,
      extracted_fields, explanation, confirmed_by_user
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
  `).run(
    id,
    patientId,
    recordId,
    title,
    'Today, 06 Sep 2026',
    provider || 'Self-Uploaded Patient Document',
    'lab',
    'unverified', // Unverified because uploaded by patient
    null,
    sha256Hash,
    fileType || 'PDF',
    '1.2 MB',
    JSON.stringify(extractedFields),
    JSON.stringify(explanation)
  );

  // Add audit log
  db.prepare(`
    INSERT INTO audit_logs (id, patient_id, timestamp, actor_name, actor_role, action, resource_name, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    `log-${Date.now()}`,
    patientId,
    'Just now',
    'Patient (Self)',
    'Record Owner',
    'Uploaded & Confirmed Report',
    `${title} (${recordId})`,
    'authorized'
  );

  return res.status(201).json({
    message: 'Report saved and protected',
    report: {
      id,
      recordId,
      title,
      date: 'Today, 06 Sep 2026',
      provider: provider || 'Self-Uploaded Patient Document',
      type: 'lab',
      verificationStatus: 'unverified',
      sha256Hash,
      fileType: fileType || 'PDF',
      fileSize: '1.2 MB',
      extractedFields,
      explanation,
      confirmedByUser: true
    }
  });
});
