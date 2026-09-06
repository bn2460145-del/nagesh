import { Router } from 'express';
import { db } from '../db/database';

export const remindersRouter = Router();

// GET /api/reminders
remindersRouter.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM reminders ORDER BY time ASC').all() as any[];
  const reminders = rows.map(r => ({
    id: r.id,
    medicineName: r.medicine_name,
    dosage: r.dosage,
    frequency: r.frequency,
    time: r.time,
    instructions: r.instructions,
    sourcePrescriptionId: r.source_prescription_id,
    sourcePrescriptionTitle: r.source_prescription_title,
    startDate: r.start_date,
    endDate: r.end_date,
    active: Boolean(r.active),
    takenToday: Boolean(r.taken_today)
  }));
  return res.json(reminders);
});

// POST /api/reminders (Deterministic only - requires user verification)
remindersRouter.post('/', (req, res) => {
  const { medicineName, dosage, frequency, time, instructions, sourcePrescriptionTitle } = req.body;
  if (!medicineName || !dosage || !time) {
    return res.status(400).json({ error: 'Medicine name, dosage, and time are required' });
  }

  const id = `rem-${Date.now()}`;
  db.prepare(`
    INSERT INTO reminders (
      id, patient_id, medicine_name, dosage, frequency, time, instructions,
      source_prescription_title, start_date, active, taken_today
    ) VALUES (?, 'pat-9842', ?, ?, ?, ?, ?, ?, date('now'), 1, 0)
  `).run(
    id, medicineName, dosage, frequency || 'Once daily', time,
    instructions || 'Take as directed with water.',
    sourcePrescriptionTitle || 'Patient self-entered'
  );

  return res.status(201).json({
    message: 'Reminder created successfully',
    reminder: {
      id,
      medicineName,
      dosage,
      frequency: frequency || 'Once daily',
      time,
      instructions: instructions || 'Take as directed with water.',
      active: true,
      takenToday: false
    }
  });
});

// PATCH /api/reminders/:id/taken
remindersRouter.patch('/:id/taken', (req, res) => {
  const { id } = req.params;
  const rem = db.prepare('SELECT * FROM reminders WHERE id = ?').get(id) as any;
  if (!rem) return res.status(404).json({ error: 'Reminder not found' });

  const newStatus = rem.taken_today ? 0 : 1;
  db.prepare('UPDATE reminders SET taken_today = ? WHERE id = ?').run(newStatus, id);

  return res.json({ id, takenToday: Boolean(newStatus) });
});

// PATCH /api/reminders/:id/active
remindersRouter.patch('/:id/active', (req, res) => {
  const { id } = req.params;
  const rem = db.prepare('SELECT * FROM reminders WHERE id = ?').get(id) as any;
  if (!rem) return res.status(404).json({ error: 'Reminder not found' });

  const newActive = rem.active ? 0 : 1;
  db.prepare('UPDATE reminders SET active = ? WHERE id = ?').run(newActive, id);

  return res.json({ id, active: Boolean(newActive) });
});
