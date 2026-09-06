import { Router } from 'express';
import { db } from '../db/database';

export const auditRouter = Router();

// GET /api/audit/logs
auditRouter.get('/logs', (req, res) => {
  const rows = db.prepare('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 50').all() as any[];
  const logs = rows.map(l => ({
    id: l.id,
    timestamp: l.timestamp,
    actorName: l.actor_name,
    actorRole: l.actor_role,
    action: l.action,
    resourceName: l.resource_name,
    status: l.status
  }));
  return res.json(logs);
});
