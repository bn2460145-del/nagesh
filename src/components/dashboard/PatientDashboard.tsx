import React from 'react';
import { 
  FileText, 
  Bell, 
  Calendar, 
  Bot, 
  Upload, 
  Search, 
  PlusCircle, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  Stethoscope
} from 'lucide-react';
import { PatientProfile, MedicalReport, MedicineReminder } from '../../types';
import { Badge } from '../common/Badge';
import { DisclaimerNotice } from '../common/DisclaimerNotice';

interface PatientDashboardProps {
  patient: PatientProfile;
  reports: MedicalReport[];
  reminders: MedicineReminder[];
  setActiveTab: (tab: string) => void;
  onOpenUpload: () => void;
  onOpenAddReminder: () => void;
  onSelectReport: (report: MedicalReport) => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({
  patient,
  reports,
  reminders,
  setActiveTab,
  onOpenUpload,
  onOpenAddReminder,
  onSelectReport
}) => {
  const latestReport = reports[0];
  const activeReminders = reminders.filter(r => r.active);
  const pendingRemindersToday = reminders.filter(r => r.active && !r.takenToday);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-teal-800 to-teal-700 text-white p-6 sm:p-8 rounded-3xl shadow-lg shadow-teal-900/10">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-900/50 border border-teal-500/40 text-[11px] font-mono text-teal-200">
            <CheckCircle2 className="w-3 h-3 text-teal-300" />
            <span>ABHA Linked: {patient.abhaId}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Good morning, {patient.name}
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 max-w-xl">
            Here is your daily health intelligence overview. All medical records are synchronized and protected under your consent.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('emergency')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center gap-2 transition"
          >
            <span>Emergency Card</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenUpload}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-teal-50 text-teal-900 text-xs font-bold flex items-center gap-2 shadow-xs transition"
          >
            <Upload className="w-4 h-4 text-teal-700" />
            <span>+ Upload Report</span>
          </button>
        </div>
      </div>

      {/* QUICK ACTIONS ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <button
          onClick={onOpenUpload}
          className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-teal-400 hover:shadow-md transition text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-2 group-hover:scale-110 transition">
            <Upload className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-800">Upload Report</p>
          <p className="text-[11px] text-slate-500 mt-0.5">OCR + AI summary</p>
        </button>

        <button
          onClick={() => setActiveTab('discovery')}
          className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-teal-400 hover:shadow-md transition text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-2 group-hover:scale-110 transition">
            <Search className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-800">Find a Doctor</p>
          <p className="text-[11px] text-slate-500 mt-0.5">100-pt transparent match</p>
        </button>

        <button
          onClick={() => setActiveTab('companion')}
          className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-teal-400 hover:shadow-md transition text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-2 group-hover:scale-110 transition">
            <Bot className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-800">Ask AI Companion</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Safe medical clarity</p>
        </button>

        <button
          onClick={onOpenAddReminder}
          className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-teal-400 hover:shadow-md transition text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-2 group-hover:scale-110 transition">
            <PlusCircle className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-800">Add Reminder</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Deterministic schedule</p>
        </button>
      </div>

      {/* HEALTH OVERVIEW METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: My Health Records */}
        <div 
          onClick={() => setActiveTab('reports')}
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-teal-300 cursor-pointer transition space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">My Health Records</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900">8 Records</div>
            <p className="text-xs text-slate-500 mt-1">Lab tests, prescriptions & imaging</p>
          </div>
          <div className="flex items-center text-xs text-teal-700 font-semibold pt-1 group">
            <span>View All Records</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* Card 2: Today's Reminders */}
        <div 
          onClick={() => setActiveTab('reminders')}
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-teal-300 cursor-pointer transition space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Today's Reminders</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Bell className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900">3 Medicines</div>
            <p className="text-xs text-slate-500 mt-1">
              {pendingRemindersToday.length > 0 
                ? `${pendingRemindersToday.length} pending today (Amlodipine 8 PM)` 
                : 'All scheduled doses marked taken'}
            </p>
          </div>
          <div className="flex items-center text-xs text-teal-700 font-semibold pt-1">
            <span>Check Schedule</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* Card 3: Upcoming Appointment */}
        <div 
          onClick={() => setActiveTab('discovery')}
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-teal-300 cursor-pointer transition space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Upcoming</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 leading-tight">Doctor Appointment</div>
            <p className="text-xs text-teal-700 font-semibold mt-0.5">Today • 4:30 PM</p>
            <p className="text-[11px] text-slate-500 mt-0.5 truncate">Dr. Ananya Rao (Endocrinology)</p>
          </div>
          <div className="flex items-center text-xs text-teal-700 font-semibold pt-1">
            <span>Manage Appointment</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* Card 4: Recent Report */}
        <div 
          onClick={() => {
            if (latestReport) {
              onSelectReport(latestReport);
              setActiveTab('reports');
            }
          }}
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-teal-300 cursor-pointer transition space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Recent Report</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 leading-tight">Blood Test</div>
            <p className="text-xs text-slate-500 mt-0.5">02 Sep 2026 • Dr. Lal PathLabs</p>
            <div className="mt-1">
              <Badge variant="verified" size="sm">Provider Verified</Badge>
            </div>
          </div>
          <div className="flex items-center text-xs text-teal-700 font-semibold pt-1">
            <span>Read AI Explanation</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>
      </div>

      {/* TWO-COLUMN CONTENT: Next Steps & Recent AI Explanations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Your Next Steps + Recent Reports */}
        <div className="lg:col-span-2 space-y-6">
          {/* "Your Next Steps" Checklist */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Your Next Steps</h3>
                <p className="text-xs text-slate-500">Actionable checklist for your active care plan</p>
              </div>
              <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                3 Pending Actions
              </span>
            </div>

            <div className="space-y-3">
              {/* Step 1 */}
              <div 
                onClick={() => {
                  if (latestReport) {
                    onSelectReport(latestReport);
                    setActiveTab('reports');
                  }
                }}
                className="flex items-start gap-3.5 p-3.5 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-slate-50/50 transition cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  1
                </div>
                <div className="flex-1 text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900">Review your latest blood report</h4>
                    <span className="text-[11px] text-teal-700 font-medium">New summary</span>
                  </div>
                  <p className="text-slate-600 mt-0.5">
                    Glycemic panel shows HbA1c at 7.2% and fasting glucose at 138 mg/dL. 4 questions prepared for your doctor.
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 self-center" />
              </div>

              {/* Step 2 */}
              <div 
                onClick={() => setActiveTab('reminders')}
                className="flex items-start gap-3.5 p-3.5 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-slate-50/50 transition cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  2
                </div>
                <div className="flex-1 text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900">Take your 8:00 PM medicine</h4>
                    <span className="text-[11px] text-amber-700 font-medium">Tonight</span>
                  </div>
                  <p className="text-slate-600 mt-0.5">
                    Amlodipine 5mg (Oral Tablet) — take after dinner with water.
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 self-center" />
              </div>

              {/* Step 3 */}
              <div 
                onClick={() => setActiveTab('discovery')}
                className="flex items-start gap-3.5 p-3.5 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-slate-50/50 transition cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  3
                </div>
                <div className="flex-1 text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900">Upcoming doctor appointment</h4>
                    <span className="text-[11px] text-teal-700 font-medium">Today 4:30 PM</span>
                  </div>
                  <p className="text-slate-600 mt-0.5">
                    Consultation with Dr. Ananya Rao (Endocrinology) at Apollo Clinic & Diabetes Centre.
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 self-center" />
              </div>
            </div>
          </div>

          {/* Recent Reports List */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Recent Medical Reports</h3>
                <p className="text-xs text-slate-500">Verified and encrypted lab documents</p>
              </div>
              <button 
                onClick={() => setActiveTab('reports')}
                className="text-xs font-semibold text-teal-700 hover:underline"
              >
                View all ({reports.length})
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {reports.slice(0, 3).map(report => (
                <div 
                  key={report.id}
                  onClick={() => {
                    onSelectReport(report);
                    setActiveTab('reports');
                  }}
                  className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/70 px-2 rounded-xl transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">{report.title}</h4>
                      <p className="text-[11px] text-slate-500">{report.date} • {report.provider}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={report.verificationStatus === 'verified' ? 'verified' : 'unverified'} size="sm">
                      {report.verificationStatus === 'verified' ? 'Provider Verified' : 'Patient Uploaded'}
                    </Badge>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: AI Companion Teaser & Consent Notice */}
        <div className="space-y-6">
          {/* AI Health Companion Widget */}
          <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">CareSaathi AI Companion</h4>
                <p className="text-[11px] text-slate-300">Grounded in verified clinical data</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Have questions about your 7.2% HbA1c result or prescription timings? Ask safely.
            </p>

            <div className="space-y-1.5 text-xs">
              {[
                'What does HbA1c mean?',
                'Explain my latest report',
                'What questions should I ask my doctor?'
              ].map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab('companion')}
                  className="w-full text-left px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-medium transition flex items-center justify-between"
                >
                  <span className="truncate">"{prompt}"</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('companion')}
              className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition"
            >
              Start Chat with Companion
            </button>
          </div>

          {/* Privacy & Consent Status Card */}
          <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Active Consents</span>
              </h4>
              <span className="text-[10px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                2 Active
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dr. Ananya Rao currently has access to your blood report and discharge prescription for second opinion review until 10 Sep 2026.
            </p>
            <button
              onClick={() => setActiveTab('consent')}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition text-center"
            >
              Review or Revoke Access
            </button>
          </div>
        </div>
      </div>

      {/* Statutory Medical Disclaimer */}
      <DisclaimerNotice type="general" condensed />
    </div>
  );
};
