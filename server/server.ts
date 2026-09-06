import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './db/database';
import { authRouter } from './routes/auth.routes';
import { patientRouter } from './routes/patient.routes';
import { reportsRouter } from './routes/reports.routes';
import { providersRouter } from './routes/providers.routes';
import { companionRouter } from './routes/companion.routes';
import { remindersRouter } from './routes/reminders.routes';
import { consentRouter } from './routes/consent.routes';
import { auditRouter } from './routes/audit.routes';
import { timelineRouter } from './routes/timeline.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database & Seed Default Records
initDatabase();

// Global Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'CareSaathi Backend API',
    database: 'SQLite (ACID Compliant)',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/patient', patientRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/providers', providersRouter);
app.use('/api/companion', companionRouter);
app.use('/api/reminders', remindersRouter);
app.use('/api/consent', consentRouter);
app.use('/api/audit', auditRouter);
app.use('/api/timeline', timelineRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 CareSaathi Backend running on port ${PORT}`);
  console.log(`📊 SQLite Database connected & verified`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
  console.log(`=========================================`);
});
