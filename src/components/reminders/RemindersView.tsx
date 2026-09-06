import React, { useState } from 'react';
import { 
  Bell, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Pause, 
  Play, 
  Edit2, 
  Check, 
  Pill, 
  Calendar,
  Sparkles,
  Info,
  X
} from 'lucide-react';
import { MedicineReminder } from '../../types';
import { DisclaimerNotice } from '../common/DisclaimerNotice';

interface RemindersViewProps {
  reminders: MedicineReminder[];
  onToggleTaken: (id: string) => void;
  onToggleActive: (id: string) => void;
  onAddReminder: (reminder: MedicineReminder) => void;
  onTestNotification: (reminder: MedicineReminder) => void;
}

export const RemindersView: React.FC<RemindersViewProps> = ({
  reminders,
  onToggleTaken,
  onToggleActive,
  onAddReminder,
  onTestNotification
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [medName, setMedName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('08:00 AM');
  const [frequency, setFrequency] = useState('Once daily');
  const [instructions, setInstructions] = useState('');
  const [sourcePrescription, setSourcePrescription] = useState('Patient self-entered');
  const [confirmedPrescriptionNotice, setConfirmedPrescriptionNotice] = useState(false);

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmedPrescriptionNotice) {
      alert('Please check the confirmation box verifying that this reminder is based on verified medical instructions.');
      return;
    }

    const newRem: MedicineReminder = {
      id: `rem-${Date.now()}`,
      medicineName: medName,
      dosage,
      frequency,
      time,
      instructions: instructions || 'Take with water as directed.',
      sourcePrescriptionTitle: sourcePrescription,
      startDate: new Date().toISOString().split('T')[0],
      active: true,
      takenToday: false
    };

    onAddReminder(newRem);
    setIsAddModalOpen(false);
    setMedName('');
    setDosage('');
    setInstructions('');
    setConfirmedPrescriptionNotice(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Add CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Medicine Reminders</h1>
            <span className="text-xs bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-0.5 rounded-full font-mono font-medium">
              Deterministic Schedule
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Stay consistent with your daily medications. Zero AI dosage hallucination.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-teal-700/20 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Reminder</span>
        </button>
      </div>

      {/* MANDATORY DETERMINISTIC SAFETY RULE BANNER */}
      <div className="p-4 bg-teal-50/80 border border-teal-200 rounded-2xl flex items-start gap-3 text-xs sm:text-sm text-teal-900">
        <ShieldCheck className="w-5 h-5 text-teal-700 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-bold block text-teal-950">Safety Architecture Principle:</strong>
          Medicine reminder schedules are populated strictly from <strong>user-entered data</strong> or <strong>confirmed doctor prescriptions</strong>. CareSaathi <strong>never</strong> uses AI to generate, recommend, or alter medicine dosages. Please confirm all instructions with your prescribing physician.
        </div>
      </div>

      {/* REMINDERS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reminders.map(rem => (
          <div
            key={rem.id}
            className={`p-6 bg-white rounded-3xl border transition-all flex flex-col justify-between space-y-4 shadow-xs ${
              !rem.active 
                ? 'opacity-60 bg-slate-50/80 border-slate-200' 
                : rem.takenToday 
                  ? 'border-emerald-200 bg-emerald-50/20 shadow-emerald-50' 
                  : 'border-slate-200/90 hover:border-teal-300'
            }`}
          >
            <div className="space-y-3">
              {/* Card Top: Med Name, Time, Status */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm ${
                    rem.takenToday ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-50 text-teal-700'
                  }`}>
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{rem.medicineName}</h3>
                    <p className="text-xs font-semibold text-slate-600">{rem.dosage}</p>
                  </div>
                </div>

                <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                  !rem.active
                    ? 'bg-slate-100 text-slate-500 border-slate-200'
                    : rem.takenToday
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}>
                  {!rem.active ? 'PAUSED' : rem.takenToday ? 'TAKEN TODAY' : 'PENDING'}
                </span>
              </div>

              {/* Time & Frequency */}
              <div className="flex items-center gap-4 text-xs text-slate-600 pt-1">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>{rem.time}</span>
                </div>
                <span>•</span>
                <span>{rem.frequency}</span>
              </div>

              {/* Instructions */}
              <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 leading-relaxed">
                {rem.instructions}
              </p>

              {/* Prescription Source Origin */}
              {rem.sourcePrescriptionTitle && (
                <div className="text-[11px] text-slate-400 font-mono truncate">
                  Source: {rem.sourcePrescriptionTitle}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1">
                {/* Pause/Resume */}
                <button
                  onClick={() => onToggleActive(rem.id)}
                  title={rem.active ? 'Pause Reminder' : 'Resume Reminder'}
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition"
                >
                  {rem.active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-teal-700" />}
                </button>

                {/* Test Notification Trigger */}
                <button
                  onClick={() => onTestNotification(rem)}
                  title="Simulate Reminder Notification"
                  className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-semibold transition"
                >
                  Test Alert
                </button>
              </div>

              {/* Taken Toggle Button */}
              <button
                onClick={() => onToggleTaken(rem.id)}
                className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                  rem.takenToday
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    : 'bg-teal-700 hover:bg-teal-800 text-white shadow-xs'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{rem.takenToday ? 'Mark as Not Taken' : 'Mark Taken'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD REMINDER MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900">Add Medicine Reminder</h3>
                <p className="text-xs text-slate-500">Deterministic schedule setup</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReminder} className="p-6 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Medicine Name</label>
                <input
                  type="text"
                  required
                  value={medName}
                  onChange={(e) => setMedName(e.target.value)}
                  placeholder="e.g. Metformin, Telmisartan, Atorvastatin"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-teal-600 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Dosage</label>
                  <input
                    type="text"
                    required
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    placeholder="e.g. 500 mg, 1 Tablet"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-teal-600 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Time</label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="08:00 AM"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-teal-600 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Frequency</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white"
                >
                  <option value="Once daily (Morning)">Once daily (Morning)</option>
                  <option value="Once daily (Night)">Once daily (Night)</option>
                  <option value="Twice daily (Morning & Night)">Twice daily (Morning & Night)</option>
                  <option value="Thrice daily (Every 8 hours)">Thrice daily (Every 8 hours)</option>
                  <option value="Once weekly">Once weekly</option>
                  <option value="As needed (SOS)">As needed (SOS)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Specific Instructions</label>
                <input
                  type="text"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Take with breakfast, do not crush tablet"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-teal-600 outline-hidden"
                />
              </div>

              {/* Source verification checkbox */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                <label className="flex items-start gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={confirmedPrescriptionNotice}
                    onChange={(e) => setConfirmedPrescriptionNotice(e.target.checked)}
                    className="mt-0.5 rounded text-teal-600"
                  />
                  <span className="text-xs text-amber-900 leading-relaxed font-medium">
                    I confirm that this medication name and dosage match a prescription or direct instruction from my licensed doctor.
                  </span>
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl transition shadow-xs"
                >
                  Activate Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Statutory Notice */}
      <DisclaimerNotice type="general" condensed />
    </div>
  );
};
