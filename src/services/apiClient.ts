const API_BASE = 'http://localhost:5000/api';

export const apiClient = {
  async getHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return await res.json();
    } catch {
      return { status: 'offline' };
    }
  },

  async login(identifier: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    });
    return await res.json();
  },

  async otpLogin(phone: string, otp: string) {
    const res = await fetch(`${API_BASE}/auth/otp-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp })
    });
    return await res.json();
  },

  async signup(data: any) {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async getReports(type?: string, search?: string) {
    const params = new URLSearchParams();
    if (type && type !== 'all') params.append('type', type);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE}/reports?${params.toString()}`);
    return await res.json();
  },

  async getReport(recordId: string) {
    const res = await fetch(`${API_BASE}/reports/${recordId}`);
    return await res.json();
  },

  async confirmReport(data: any) {
    const res = await fetch(`${API_BASE}/reports/confirm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async searchProviders(params: any) {
    const res = await fetch(`${API_BASE}/providers/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    return await res.json();
  },

  async bookAppointment(providerId: string, providerName: string, slot: string) {
    const res = await fetch(`${API_BASE}/providers/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ providerId, providerName, slot })
    });
    return await res.json();
  },

  async askCompanion(message: string) {
    const res = await fetch(`${API_BASE}/companion/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    return await res.json();
  },

  async getReminders() {
    const res = await fetch(`${API_BASE}/reminders`);
    return await res.json();
  },

  async addReminder(data: any) {
    const res = await fetch(`${API_BASE}/reminders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async toggleReminderTaken(id: string) {
    const res = await fetch(`${API_BASE}/reminders/${id}/taken`, {
      method: 'PATCH'
    });
    return await res.json();
  },

  async toggleReminderActive(id: string) {
    const res = await fetch(`${API_BASE}/reminders/${id}/active`, {
      method: 'PATCH'
    });
    return await res.json();
  },

  async getActiveConsents() {
    const res = await fetch(`${API_BASE}/consent/active`);
    return await res.json();
  },

  async getPendingConsent() {
    const res = await fetch(`${API_BASE}/consent/pending`);
    return await res.json();
  },

  async resolveConsent(allow: boolean) {
    const res = await fetch(`${API_BASE}/consent/resolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ allow })
    });
    return await res.json();
  },

  async revokeConsent(consentId: string) {
    const res = await fetch(`${API_BASE}/consent/revoke`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ consentId })
    });
    return await res.json();
  },

  async getAuditLogs() {
    const res = await fetch(`${API_BASE}/audit/logs`);
    return await res.json();
  },

  async getPatientProfile() {
    const res = await fetch(`${API_BASE}/patient/profile`);
    return await res.json();
  },

  async updatePatientProfile(data: any) {
    const res = await fetch(`${API_BASE}/patient/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  }
};
