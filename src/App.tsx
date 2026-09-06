import React, { useState, useEffect } from 'react';
import { 
  PatientProfile, 
  MedicalReport, 
  MedicineReminder, 
  ActiveConsent, 
  PendingConsentRequest, 
  AuditLogEntry, 
  Provider 
} from './types';
import { storageService } from './services/storageService';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { DemoGuideTour, DEMO_STEPS, DemoTourStep } from './components/layout/DemoGuideTour';
import { ToastContainer, ToastMessage } from './components/common/Toast';

// Pages
import { LandingPage } from './components/landing/LandingPage';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { PatientDashboard } from './components/dashboard/PatientDashboard';
import { ReportsList } from './components/reports/ReportsList';
import { UploadModal } from './components/reports/UploadModal';
import { ReportDetailView } from './components/reports/ReportDetailView';
import { ProviderSearch } from './components/discovery/ProviderSearch';
import { CompanionChat } from './components/companion/CompanionChat';
import { RemindersView } from './components/reminders/RemindersView';
import { TimelineView } from './components/timeline/TimelineView';
import { ConsentAuditView } from './components/consent/ConsentAuditView';
import { ProfileSettingsView } from './components/profile/ProfileSettingsView';
import { EmergencyCardView } from './components/emergency/EmergencyCardView';
import { AboutSafetyView } from './components/about/AboutSafetyView';

export function App() {
  // App state backed by storageService
  const [patient, setPatient] = useState<PatientProfile>(storageService.getPatient());
  const [reports, setReports] = useState<MedicalReport[]>(storageService.getReports());
  const [reminders, setReminders] = useState<MedicineReminder[]>(storageService.getReminders());
  const [consents, setConsents] = useState<ActiveConsent[]>(storageService.getConsents());
  const [pendingConsent, setPendingConsent] = useState<PendingConsentRequest | null>(storageService.getPendingConsent());
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(storageService.getAuditLogs());

  // Navigation & Session
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedReport, setSelectedReport] = useState<MedicalReport | null>(reports[0] || null);
  const [companionPrompt, setCompanionPrompt] = useState<string>('');

  // Modals & Tour
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState(false);
  const [currentDemoStepIndex, setCurrentDemoStepIndex] = useState(0);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, type, title, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // HANDLERS
  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveTab('dashboard');
    addToast('success', 'Logged in as Rahul Sharma', 'ABHA ID: 91-4820-1928-3841 verified.');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('landing');
    addToast('info', 'Signed Out', 'You have been safely signed out.');
  };

  const handleReportConfirmed = (newReport: MedicalReport) => {
    const updated = storageService.addReport(newReport);
    setReports(updated);
    setSelectedReport(newReport);
    setAuditLogs(storageService.getAuditLogs());
    addToast('success', 'Report Saved & Protected', `Record ID: ${newReport.recordId} registered with SHA-256 integrity hash.`);
  };

  const handleSelectReport = (report: MedicalReport) => {
    setSelectedReport(report);
    setActiveTab('report-detail');
  };

  const handleToggleReminderTaken = (id: string) => {
    const updated = storageService.toggleReminderTaken(id);
    setReminders(updated);
    const item = updated.find(r => r.id === id);
    if (item?.takenToday) {
      addToast('success', `Marked Taken: ${item.medicineName}`, `${item.dosage} at ${item.time} confirmed.`);
    }
  };

  const handleToggleReminderActive = (id: string) => {
    const updated = storageService.toggleReminderActive(id);
    setReminders(updated);
    const item = updated.find(r => r.id === id);
    addToast('info', `${item?.medicineName} Reminder ${item?.active ? 'Resumed' : 'Paused'}`);
  };

  const handleAddReminder = (reminder: MedicineReminder) => {
    const updated = storageService.addReminder(reminder);
    setReminders(updated);
    addToast('success', 'Medicine Reminder Added', `${reminder.medicineName} (${reminder.time}) scheduled.`);
  };

  const handleTestNotification = (rem: MedicineReminder) => {
    addToast('info', `🔔 Reminder: ${rem.medicineName} ${rem.dosage}`, `Scheduled for ${rem.time} — ${rem.instructions}`);
  };

  const handleRevokeConsent = (id: string) => {
    const updated = storageService.revokeConsent(id);
    setConsents(updated);
    setAuditLogs(storageService.getAuditLogs());
    addToast('info', 'Consent Revoked', 'Third-party healthcare provider access removed immediately.');
  };

  const handleResolvePendingConsent = (allow: boolean) => {
    const res = storageService.resolvePendingConsent(allow);
    setConsents(res.consents);
    setPendingConsent(res.pending);
    setAuditLogs(storageService.getAuditLogs());
    if (allow) {
      addToast('success', 'Access Granted', 'Doctor has been granted time-bound read access.');
    } else {
      addToast('info', 'Request Denied', 'Access request was safely rejected.');
    }
  };

  const handleBookAppointment = (provider: Provider, slot: string) => {
    addToast('success', 'Appointment Confirmed (Demo)', `Booked with ${provider.name} for ${slot}.`);
    // Add to audit trail
    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      actorName: 'Rahul Sharma (Patient)',
      actorRole: 'Patient',
      action: 'Booked Appointment Request',
      resourceName: `${provider.name} (${slot})`,
      status: 'authorized'
    };
    const updated = storageService.addAuditLog(newLog);
    setAuditLogs(updated);
  };

  const handleShareRecordsWithProvider = (provider: Provider) => {
    addToast('success', 'Records Shared via Consent', `Granted 14-day record access to ${provider.name}.`);
    const newConsent: ActiveConsent = {
      id: `cst-${Date.now()}`,
      requesterName: provider.name,
      requesterRole: provider.title,
      requesterOrg: provider.hospitalAffiliation,
      requestedRecords: ['Complete Blood Count (02 Sep 2026)', 'Discharge Prescription (10 Jun 2026)'],
      purpose: 'Specialist consultation and second opinion',
      grantedDate: 'Today, 05 Sep 2026',
      validUntil: '19 Sep 2026 (14 Days)',
      status: 'active'
    };
    const updatedConsents = [newConsent, ...consents];
    storageService.saveConsents ? null : null;
    setConsents(updatedConsents);
  };

  const handleSavePatient = (updated: PatientProfile) => {
    storageService.savePatient(updated);
    setPatient(updated);
    addToast('success', 'Profile Updated', 'Emergency and personal details saved.');
  };

  const handleExportData = () => {
    const data = {
      patient,
      reports,
      reminders,
      consents,
      auditLogs,
      exportedAt: new Date().toISOString(),
      standard: 'ABDM / FHIR R4 Compatible Profile'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CareSaathi_Export_${patient.abhaId}.json`;
    a.click();
    addToast('success', 'Data Export Complete', 'Downloaded full patient health record package.');
  };

  const handleResetData = () => {
    if (confirm('Reset all demo data to default mock records?')) {
      storageService.resetAll();
      setPatient(storageService.getPatient());
      setReports(storageService.getReports());
      setReminders(storageService.getReminders());
      setConsents(storageService.getConsents());
      setPendingConsent(storageService.getPendingConsent());
      setAuditLogs(storageService.getAuditLogs());
      addToast('info', 'Data Reset', 'Restored default demo records.');
    }
  };

  // EXECUTE HACKATHON DEMO TOUR STEP
  const handleExecuteDemoStep = (step: DemoTourStep) => {
    switch (step.stepNumber) {
      case 1:
        setIsLoggedIn(false);
        setActiveTab('login');
        break;
      case 2:
        setIsLoggedIn(true);
        setActiveTab('dashboard');
        break;
      case 3:
      case 4:
      case 5:
      case 6:
        setIsLoggedIn(true);
        setActiveTab('reports');
        setIsUploadModalOpen(true);
        break;
      case 7:
        setIsLoggedIn(true);
        setIsUploadModalOpen(false);
        if (reports[0]) {
          setSelectedReport(reports[0]);
          setActiveTab('report-detail');
        }
        break;
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
        setIsLoggedIn(true);
        setActiveTab('discovery');
        break;
      case 13:
      case 14:
      case 15:
        setIsLoggedIn(true);
        setActiveTab('companion');
        break;
      case 16:
      case 17:
        setIsLoggedIn(true);
        setActiveTab('companion');
        break;
      case 18:
        setIsLoggedIn(true);
        setActiveTab('reminders');
        break;
      default:
        setActiveTab(step.tab);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        patient={patient}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onOpenDemoTour={() => setIsDemoTourOpen(true)}
        onEmergencyClick={() => setActiveTab('emergency')}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage
            onGetStarted={() => {
              if (isLoggedIn) setActiveTab('dashboard');
              else setActiveTab('login');
            }}
            onExploreFeatures={() => {
              const el = document.getElementById('features');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'login' && (
          <LoginForm
            onLoginSuccess={handleLogin}
            onSwitchToSignup={() => setActiveTab('signup')}
          />
        )}

        {activeTab === 'signup' && (
          <SignupForm
            onSignupSuccess={handleLogin}
            onSwitchToLogin={() => setActiveTab('login')}
          />
        )}

        {activeTab === 'dashboard' && (
          <PatientDashboard
            patient={patient}
            reports={reports}
            reminders={reminders}
            setActiveTab={setActiveTab}
            onOpenUpload={() => setIsUploadModalOpen(true)}
            onOpenAddReminder={() => setActiveTab('reminders')}
            onSelectReport={handleSelectReport}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsList
            reports={reports}
            onOpenUpload={() => setIsUploadModalOpen(true)}
            onSelectReport={handleSelectReport}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'report-detail' && selectedReport && (
          <ReportDetailView
            report={selectedReport}
            onBack={() => setActiveTab('reports')}
            onAskCompanion={(prompt) => {
              setCompanionPrompt(prompt);
              setActiveTab('companion');
            }}
            onShareReport={(rep) => {
              addToast('success', 'Consent Modal', `Selected ${rep.title} for sharing.`);
              setActiveTab('consent');
            }}
          />
        )}

        {activeTab === 'discovery' && (
          <ProviderSearch
            onBookAppointment={handleBookAppointment}
            onShareRecords={handleShareRecordsWithProvider}
          />
        )}

        {activeTab === 'companion' && (
          <CompanionChat
            initialPrompt={companionPrompt}
            onNavigateToFindCare={() => setActiveTab('discovery')}
            onEmergencyClick={() => setActiveTab('emergency')}
          />
        )}

        {activeTab === 'reminders' && (
          <RemindersView
            reminders={reminders}
            onToggleTaken={handleToggleReminderTaken}
            onToggleActive={handleToggleReminderActive}
            onAddReminder={handleAddReminder}
            onTestNotification={handleTestNotification}
          />
        )}

        {activeTab === 'timeline' && (
          <TimelineView
            onSelectRecordId={(recId) => {
              const r = reports.find(item => item.recordId === recId);
              if (r) {
                setSelectedReport(r);
                setActiveTab('report-detail');
              }
            }}
          />
        )}

        {activeTab === 'consent' && (
          <ConsentAuditView
            consents={consents}
            pendingConsent={pendingConsent}
            auditLogs={auditLogs}
            onRevokeConsent={handleRevokeConsent}
            onResolvePendingConsent={handleResolvePendingConsent}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileSettingsView
            patient={patient}
            onSavePatient={handleSavePatient}
            onExportData={handleExportData}
            onResetData={handleResetData}
          />
        )}

        {activeTab === 'emergency' && (
          <EmergencyCardView
            patient={patient}
            reminders={reminders}
            onBack={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'about' && (
          <AboutSafetyView
            onBackToDashboard={() => setActiveTab('dashboard')}
          />
        )}
      </main>

      {/* Upload 4-Step OCR Pipeline Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onReportConfirmed={handleReportConfirmed}
      />

      {/* 18-Step Hackathon Guided Tour Dock */}
      <DemoGuideTour
        isOpen={isDemoTourOpen}
        onClose={() => setIsDemoTourOpen(false)}
        currentStepIndex={currentDemoStepIndex}
        setCurrentStepIndex={setCurrentDemoStepIndex}
        onExecuteStep={handleExecuteDemoStep}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLoggedIn={isLoggedIn}
      />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Toast Alert Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
