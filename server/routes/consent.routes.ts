import { Router } from 'express';
import { db } from '../db/database';

export const consentRouter = Router();

// GET /api/consent/active
consentRouter.get('/active', (req, res) => {
  const rows = db.prepare('SELECT * FROM consents WHERE status = ?').all('active') as any[];
  const consents = rows.map(c => ({
    id: c.id,
    requesterName: c.requester_name,
    requesterRole: c.requester_role,
    requesterOrg: c.requester_org,
    requestedRecords: JSON.parse(c.requested_records || '[]'),
    purpose: c.purpose,
    grantedDate: c.granted_date,
    validUntil: c.valid_until,
    status: c.status
  }));
  return res.json(consents);
});

// GET /api/consent/pending
consentRouter.get('/pending', (req, res) => {
  const row = db.prepare('SELECT * FROM pending_consents WHERE status = ? LIMIT 1').get('pending') as any;
  if (!row) return res.json(null);

  return res.json({
    id: row.id,
    requesterName: row.requester_name,
    requesterRole: row.requester_role,
    requesterOrg: row.requester_org,
    requestedRecords: JSON.parse(row.requested_records || '[]'),
    purpose: row.purpose,
    requestedDuration: row.requested_duration,
    timestamp: row.timestamp,
    status: row.status
  });
});

// POST /api/consent/resolve (Allow or Deny)
consentRouter.post('/resolve', (req, res) => {
  const { allow } = req.body;
  const pending = db.prepare('SELECT * FROM pending_consents WHERE status = ? LIMIT 1').get('pending') as any;
  if (!pending) return res.status(404).json({ error: 'No pending consent request found' });

  if (allow) {
    const newConsentId = `cst-${Date.now()}`;
    db.prepare(`
      INSERT INTO consents (
        id, patient_id, requester_name, requester_role, requester_org,
        requested_records, purpose, granted_date, valid_until, status
      ) VALUES (?, 'pat-9842', ?, ?, ?, ?, ?, 'Today, 06 Sep 2026', '06 Oct 2026 (30 Days)', 'active')
    `).run(
      newConsentId,
      pending.requester_name,
      pending.requester_role,
      pending.requester_org,
      pending.requested_records,
      pending.purpose
    );

    db.prepare('DELETE FROM pending_consents WHERE id = ?').run(pending.id);

    // Audit log
    db.prepare(`
      INSERT INTO audit_logs (id, patient_id, timestamp, actor_name, actor_role, action, resource_name, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      `log-${Date.now()}`,
      'pat-9842',
      'Just now',
      'Rahul Sharma (Patient)',
      'Record Owner',
      'Granted Access Consent',
      `Consent granted to ${pending.requester_name}`,
      'authorized'
    );

    return res.json({ message: 'Consent granted successfully', status: 'granted' });
  } else {
    db.prepare('DELETE FROM pending_consents WHERE id = ?').run(pending.id);

    // Audit log
    db.prepare(`
      INSERT INTO audit_logs (id, patient_id, timestamp, actor_name, actor_role, action, resource_name, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      `log-${Date.now()}`,
      'pat-9842',
      'Just now',
      'Rahul Sharma (Patient)',
      'Record Owner',
      'Denied Access Consent',
      `Request by ${pending.requester_name} rejected`,
      'denied'
    );

    return res.json({ message: 'Consent request denied', status: 'denied' });
  }
});

// POST /api/consent/revoke
consentRouter.post('/revoke', (req, res) => {
  const { consentId } = req.body;
  if (!consentId) return res.status(400).json({ error: 'Consent ID is required' });

  db.prepare('DELETE FROM consents WHERE id = ?').run(consentId);

  // Audit log
  db.prepare(`
    INSERT INTO audit_logs (id, patient_id, timestamp, actor_name, actor_role, action, resource_name, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    `log-${Date.now()}`,
    'pat-9842',
    'Just now',
    'Rahul Sharma (Patient)',
    'Record Owner',
    'Revoked Access Consent',
    `Revoked consent ID ${consentId}`,
    'revoked'
  );

  return res.json({ message: 'Consent revoked successfully' });
});
