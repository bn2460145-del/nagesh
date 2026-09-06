import React from 'react';
import { 
  AlertOctagon, 
  PhoneCall, 
  Heart, 
  AlertTriangle, 
  MapPin, 
  Pill, 
  ShieldAlert, 
  ExternalLink,
  QrCode,
  ArrowLeft
} from 'lucide-react';
import { PatientProfile, MedicineReminder } from '../../types';
import { QRCodeStub } from '../common/QRCodeStub';

interface EmergencyCardViewProps {
  patient: PatientProfile;
  reminders: MedicineReminder[];
  onBack: () => void;
}

export const EmergencyCardView: React.FC<EmergencyCardViewProps> = ({
  patient,
  reminders,
  onBack
}) => {
  const activeMeds = reminders.filter(r => r.active);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top action row */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <span className="text-xs bg-rose-50 text-rose-700 font-bold px-3 py-1 rounded-full border border-rose-200 flex items-center gap-1.5 animate-pulse">
          <AlertOctagon className="w-4 h-4 text-rose-600" />
          <span>Emergency Mode Active</span>
        </span>
      </div>

      {/* NATIONAL HELPLINE DIRECT CALL ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'National Emergency', number: '112', desc: 'Police, Fire, Medical' },
          { label: 'Govt. Ambulance', number: '108', desc: 'Medical Transport' },
          { label: 'Health Helpline', number: '104', desc: 'Tele-consult & Info' },
          { label: 'Tele-MANAS', number: '14416', desc: 'Mental Health Crisis' }
        ].map(item => (
          <a
            key={item.number}
            href={`tel:${item.number}`}
            className="p-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 transition flex flex-col justify-between group"
          >
            <div>
              <span className="text-[11px] font-semibold text-rose-100 uppercase tracking-wider block">
                {item.label}
              </span>
              <div className="text-3xl font-extrabold font-mono mt-1 group-hover:scale-105 transition-transform">
                {item.number}
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 text-[11px] text-rose-200 pt-2 border-t border-rose-500">
              <span>{item.desc}</span>
              <PhoneCall className="w-3.5 h-3.5 text-white" />
            </div>
          </a>
        ))}
      </div>

      {/* EMERGENCY MEDICAL CARD */}
      <div className="bg-white rounded-3xl border-2 border-rose-300 shadow-xl overflow-hidden">
        {/* Card Red Banner */}
        <div className="bg-gradient-to-r from-rose-700 to-rose-600 text-white p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center font-bold text-white">
              <AlertOctagon className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-rose-200">
                CareSaathi Emergency Medical ID
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-white">{patient.name}</h2>
              <p className="text-xs text-rose-100 font-mono">ABHA: {patient.abhaId} • Age {patient.age} / {patient.gender}</p>
            </div>
          </div>

          <div className="text-left sm:text-right bg-white/10 p-3 rounded-2xl border border-white/20">
            <span className="text-[10px] uppercase font-bold text-rose-200 block">Blood Group</span>
            <span className="text-3xl font-extrabold text-white font-mono">{patient.bloodGroup}</span>
          </div>
        </div>

        {/* Card Body Grid */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Row 1: Allergies & Conditions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Allergies */}
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-rose-900">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Known Critical Allergies</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {patient.allergies.map(alg => (
                  <span key={alg} className="px-3 py-1 bg-white border border-rose-300 rounded-lg text-xs font-bold text-rose-800">
                    ⚠️ {alg}
                  </span>
                ))}
              </div>
            </div>

            {/* Conditions */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-700">
                <Heart className="w-4 h-4 text-teal-700" />
                <span>Underlying Medical Conditions</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {patient.conditions.map(cond => (
                  <span key={cond} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800">
                    {cond}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Emergency Contacts (ICE) & Current Medications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Contacts */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  In Case of Emergency (ICE) Contacts:
                </h3>
                <div className="space-y-2.5">
                  {patient.emergencyContacts.map((contact, i) => (
                    <div key={i} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{contact.name}</h4>
                        <p className="text-xs text-slate-500">{contact.relation}</p>
                      </div>
                      <a
                        href={`tel:${contact.phone}`}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs transition"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Call {contact.phone}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Maintenance Medicines */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                  <Pill className="w-4 h-4 text-teal-700" />
                  <span>Current Active Medications:</span>
                </h3>
                <div className="flex flex-wrap gap-2 text-xs">
                  {activeMeds.map(m => (
                    <span key={m.id} className="p-2 bg-slate-100 rounded-xl border border-slate-200 text-slate-800 font-medium">
                      <strong>{m.medicineName}</strong> {m.dosage} ({m.frequency})
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Emergency Token QR */}
            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <QRCodeStub
                value={`CS-ICE-${patient.abhaId}`}
                label="Emergency Responder Scan"
                size={120}
              />
              <p className="text-[10px] text-slate-500 mt-2">
                Scannable by paramedic or ER staff to access read-only critical medical flags.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* NEAREST 24X7 EMERGENCY TRAUMA CENTERS */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>Nearest 24x7 Emergency Facilities</span>
            </h3>
            <p className="text-xs text-slate-500">Based on your registered location in Indiranagar, Bengaluru</p>
          </div>
          <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Open 24 Hours
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">Manipal Hospital Emergency & Trauma</h4>
              <span className="font-mono text-teal-800 font-bold">3.8 km</span>
            </div>
            <p className="text-slate-600">Old Airport Road, Kodihalli • 24x7 Cath Lab, ICU & Ambulance</p>
            <p className="text-rose-700 font-bold pt-1">Emergency Desk: 080-2502-4444</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">Indiranagar UPHC Ambulance Station</h4>
              <span className="font-mono text-teal-800 font-bold">1.2 km</span>
            </div>
            <p className="text-slate-600">100ft Road, Indiranagar • Government Ambulance Dispatch Hub</p>
            <p className="text-rose-700 font-bold pt-1">Direct Ambulance: 108</p>
          </div>
        </div>
      </div>

      {/* Statutory Disclaimer */}
      <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
        <strong>Important Safety Notice:</strong> This emergency card provides self-declared patient metrics intended for quick reference during acute incidents. It does not replace full clinical triage by attending emergency medical personnel.
      </div>
    </div>
  );
};
