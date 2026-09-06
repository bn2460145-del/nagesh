import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db/database';
import { generateToken, AuthRequest, authenticateJWT } from '../middleware/auth';

export const authRouter = Router();

// POST /api/auth/login
authRouter.post('/login', (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(400).json({ error: 'Identifier (email/mobile) and password are required' });
  }

  const user = db.prepare(`
    SELECT * FROM users WHERE email = ? OR phone = ?
  `).get(identifier, identifier) as any;

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials. Use demo: rahul.sharma@example.com / password123' });
  }

  const isValidPassword = bcrypt.compareSync(password, user.password_hash);
  if (!isValidPassword) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    abhaId: user.abha_id
  });

  // Log audit
  db.prepare(`
    INSERT INTO audit_logs (id, patient_id, timestamp, actor_name, actor_role, action, resource_name, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    `log-${Date.now()}`,
    'pat-9842',
    'Just now',
    user.name,
    user.role,
    'User Logged In',
    'Session Token Granted',
    'authorized'
  );

  return res.json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      abhaId: user.abha_id
    }
  });
});

// POST /api/auth/otp-login
authRouter.post('/otp-login', (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({ error: 'Phone and OTP are required' });
  }

  // Simulated OTP verification (any 6 digit or 482910)
  if (otp.length !== 6) {
    return res.status(400).json({ error: 'OTP must be 6 digits' });
  }

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get('rahul.sharma@example.com') as any;

  const token = generateToken({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    abhaId: user.abha_id
  });

  return res.json({
    message: 'OTP verified successfully',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      abhaId: user.abha_id
    }
  });
});

// POST /api/auth/signup
authRouter.post('/signup', (req, res) => {
  const { name, email, phone, password, abhaId } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) {
    return res.status(400).json({ error: 'Account with this email already exists' });
  }

  const userId = `usr-${Date.now()}`;
  const patientId = `pat-${Date.now()}`;
  const passwordHash = bcrypt.hashSync(password, 10);

  db.prepare(`
    INSERT INTO users (id, email, name, phone, password_hash, role, abha_id)
    VALUES (?, ?, ?, ?, ?, 'patient', ?)
  `).run(userId, email, name, phone || '', passwordHash, abhaId || '');

  db.prepare(`
    INSERT INTO patients (
      id, user_id, name, age, gender, phone, email, abha_id, abha_address,
      blood_group, allergies, conditions, emergency_contacts,
      preferred_language, location, address, user_provided_notice
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    patientId,
    userId,
    name,
    35,
    'Not specified',
    phone || '',
    email,
    abhaId || '',
    abhaId ? `${email.split('@')[0]}@abdm` : '',
    'O+',
    JSON.stringify([]),
    JSON.stringify([]),
    JSON.stringify([]),
    'English / Hindi',
    'Bengaluru',
    'Self-declared',
    'Self-declared emergency profile'
  );

  const token = generateToken({
    id: userId,
    email,
    name,
    role: 'patient',
    abhaId
  });

  return res.status(201).json({
    message: 'Account created successfully',
    token,
    user: {
      id: userId,
      name,
      email,
      role: 'patient',
      abhaId
    }
  });
});

// GET /api/auth/me
authRouter.get('/me', authenticateJWT, (req: AuthRequest, res) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  const patient = db.prepare('SELECT * FROM patients WHERE user_id = ?').get(req.user.id) as any;
  return res.json({
    user: req.user,
    patient: patient ? {
      ...patient,
      allergies: JSON.parse(patient.allergies || '[]'),
      conditions: JSON.parse(patient.conditions || '[]'),
      emergencyContacts: JSON.parse(patient.emergency_contacts || '[]')
    } : null
  });
});
