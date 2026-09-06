import { PatientProfile, MedicalReport, MedicineReminder, ActiveConsent, PendingConsentRequest, AuditLogEntry } from '../types';
import { mockPatient } from '../data/mockPatient';
import { mockReports } from '../data/mockReports';
import { mockReminders, mockConsents, mockPendingConsent, mockAuditLogs } from '../data/mockTimeline';

const STORAGE_KEYS = {
  PATIENT: 'care_saathi_patient',
  REPORTS: 'care_saathi_reports',
  REMINDERS: 'care_saathi_reminders',
  CONSENTS: 'care_saathi_consents',
  PENDING_CONSENT: 'care_saathi_pending_consent',
  AUDIT_LOGS: 'care_saathi_audit_logs',
  AUTH: 'care_saathi_auth_user'
};

export const storageService = {
  getPatient(): PatientProfile {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PATIENT);
      return stored ? JSON.parse(stored) : mockPatient;
    } catch {
      return mockPatient;
    }
  },

  savePatient(patient: PatientProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PATIENT, JSON.stringify(patient));
    } catch {}
  },

  getReports(): MedicalReport[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.REPORTS);
      return stored ? JSON.parse(stored) : mockReports;
    } catch {
      return mockReports;
    }
  },

  saveReports(reports: MedicalReport[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    } catch {}
  },

  addReport(newReport: MedicalReport): MedicalReport[] {
    const existing = this.getReports();
    const updated = [newReport, ...existing];
    this.saveReports(updated);
    
    this.addAuditLog({
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      actorName: 'Patient (Self)',
      actorRole: 'Record Owner',
      action: 'Uploaded & Confirmed Report',
      resourceName: `${newReport.title} (${newReport.recordId})`,
      status: 'authorized'
    });

    return updated;
  },

  getReminders(): MedicineReminder[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.REMINDERS);
      return stored ? JSON.parse(stored) : mockReminders;
    } catch {
      return mockReminders;
    }
  },

  saveReminders(reminders: MedicineReminder[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
    } catch {}
  },

  addReminder(reminder: MedicineReminder): MedicineReminder[] {
    const list = [reminder, ...this.getReminders()];
    this.saveReminders(list);
    return list;
  },

  toggleReminderTaken(id: string): MedicineReminder[] {
    const list = this.getReminders().map(r => r.id === id ? { ...r, takenToday: !r.takenToday } : r);
    this.saveReminders(list);
    return list;
  },

  toggleReminderActive(id: string): MedicineReminder[] {
    const list = this.getReminders().map(r => r.id === id ? { ...r, active: !r.active } : r);
    this.saveReminders(list);
    return list;
  },

  getConsents(): ActiveConsent[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONSENTS);
      return stored ? JSON.parse(stored) : mockConsents;
    } catch {
      return mockConsents;
    }
  },

  saveConsents(consents: ActiveConsent[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CONSENTS, JSON.stringify(consents));
    } catch {}
  },

  revokeConsent(id: string): ActiveConsent[] {
    const list = this.getConsents().filter(c => c.id !== id);
    this.saveConsents(list);
    
    this.addAuditLog({
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      actorName: 'Rahul Sharma (Patient)',
      actorRole: 'Record Owner',
      action: 'Revoked Access Consent',
      resourceName: `Revoked consent id ${id}`,
      status: 'revoked'
    });

    return list;
  },

  getPendingConsent(): PendingConsentRequest | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PENDING_CONSENT);
      return stored !== null ? JSON.parse(stored) : mockPendingConsent;
    } catch {
      return mockPendingConsent;
    }
  },

  resolvePendingConsent(allow: boolean): { consents: ActiveConsent[]; pending: PendingConsentRequest | null } {
    const pending = this.getPendingConsent();
    let consents = this.getConsents();

    if (allow && pending) {
      const newConsent: ActiveConsent = {
        id: `cst-${Date.now()}`,
        requesterName: pending.requesterName,
        requesterRole: pending.requesterRole,
        requesterOrg: pending.requesterOrg,
        requestedRecords: pending.requestedRecords,
        purpose: pending.purpose,
        grantedDate: 'Today, 05 Sep 2026',
        validUntil: '05 Oct 2026 (30 Days)',
        status: 'active'
      };
      consents = [newConsent, ...consents];
      this.saveConsents(consents);

      this.addAuditLog({
        id: `log-${Date.now()}`,
        timestamp: 'Just now',
        actorName: 'Rahul Sharma (Patient)',
        actorRole: 'Record Owner',
        action: 'Granted Access Consent',
        resourceName: `Consent granted to ${pending.requesterName}`,
        status: 'authorized'
      });
    } else if (pending) {
      this.addAuditLog({
        id: `log-${Date.now()}`,
        timestamp: 'Just now',
        actorName: 'Rahul Sharma (Patient)',
        actorRole: 'Record Owner',
        action: 'Denied Access Consent',
        resourceName: `Request by ${pending.requesterName} rejected`,
        status: 'denied'
      });
    }

    try {
      localStorage.removeItem(STORAGE_KEYS.PENDING_CONSENT);
    } catch {}

    return { consents, pending: null };
  },

  getAuditLogs(): AuditLogEntry[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      return stored ? JSON.parse(stored) : mockAuditLogs;
    } catch {
      return mockAuditLogs;
    }
  },

  addAuditLog(entry: AuditLogEntry): AuditLogEntry[] {
    const list = [entry, ...this.getAuditLogs()];
    try {
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(list));
    } catch {}
    return list;
  },

  resetAll(): void {
    try {
      localStorage.clear();
    } catch {}
  }
};
