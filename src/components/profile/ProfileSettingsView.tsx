import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Heart, 
  AlertTriangle, 
  Bell, 
  Download, 
  Trash2, 
  Save, 
  CheckCircle2,
  Lock,
  QrCode
} from 'lucide-react';
import { PatientProfile } from '../../types';
import { QRCodeStub } from '../common/QRCodeStub';
import { DisclaimerNotice } from '../common/DisclaimerNotice';

interface ProfileSettingsViewProps {
  patient: PatientProfile;
  onSavePatient: (updated: PatientProfile) => void;
  onExportData: () => void;
  onResetData: () => void;
}

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({
  patient,
  onSavePatient,
  onExportData,
  onResetData
}) => {
  const [profile, setProfile] = useState<PatientProfile>(patient);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [whatsappSync, setWhatsappSync] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSavePatient(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Profile & Health Settings</h1>
            <span className="text-xs bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-0.5 rounded-full font-mono font-medium">
              ABHA Verified
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your personal demographics, emergency card attributes, and privacy preferences.
          </p>
        </div>

        <button
          onClick={onExportData}
          className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs"
        >
          <Download className="w-4 h-4" />
          <span>Export All Health Data (JSON)</span>
        </button>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic Demographics */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-teal-700" />
              <span>Personal Demographics</span>
            </h2>
            <span className="text-xs text-teal-800 font-mono font-semibold bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
              ABHA: {profile.abhaId}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Age & Gender</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                  className="w-20 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white"
                />
                <input
                  type="text"
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                  className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Primary Mobile</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Preferred Languages</label>
              <input
                type="text"
                value={profile.preferredLanguage}
                onChange={(e) => setProfile({ ...profile, preferredLanguage: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Location / City</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* EMERGENCY MEDICAL PROFILE (SELF-DECLARED) */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-600" />
                <span>Emergency Medical Card Information</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Critical data accessible to first responders via Emergency Screen / QR code
              </p>
            </div>
            <span className="text-[11px] bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full font-semibold">
              Self-Declared Profile
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Blood Group</label>
              <input
                type="text"
                value={profile.bloodGroup}
                onChange={(e) => setProfile({ ...profile, bloodGroup: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Known Allergies (Comma separated)</label>
              <input
                type="text"
                value={profile.allergies.join(', ')}
                onChange={(e) => setProfile({ ...profile, allergies: e.target.value.split(',').map(s => s.trim()) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-rose-800 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Diagnosed Chronic Conditions</label>
            <input
              type="text"
              value={profile.conditions.join(', ')}
              onChange={(e) => setProfile({ ...profile, conditions: e.target.value.split(',').map(s => s.trim()) })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-800"
            />
          </div>

          {/* User Provided Notice */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 text-xs">
            <strong>Mandatory Label:</strong> This information is user-provided. It is not medically certified until verified by a registered medical practitioner.
          </div>
        </div>

        {/* SETTINGS & NOTIFICATIONS */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-teal-700" />
            <span>Reminders & Privacy Settings</span>
          </h2>

          <div className="space-y-3 text-xs sm:text-sm">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="font-semibold text-slate-800 block">Medicine Reminder Alerts</span>
                <span className="text-slate-500 text-xs">Push alerts and audio chimes for medication timings</span>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="font-semibold text-slate-800 block">Consent & Access Notifications</span>
                <span className="text-slate-500 text-xs">Instant notification whenever a doctor requests or views your records</span>
              </div>
              <input
                type="checkbox"
                checked={whatsappSync}
                onChange={(e) => setWhatsappSync(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded"
              />
            </label>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={onResetData}
              className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1.5 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Demo Data to Defaults</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{savedSuccess ? 'Changes Saved!' : 'Save Profile & Preferences'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
