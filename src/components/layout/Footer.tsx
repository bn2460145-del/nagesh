import React from 'react';
import { HeartHandshake, Shield, PhoneCall, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs mt-16 pb-20 xl:pb-12">
      {/* Top Banner with India Digital Health Ecosystem context */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-800 text-white flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">
                Aligned with India's Ayushman Bharat Digital Mission (ABDM) & DPDP Act 2023
              </p>
              <p className="text-slate-400 text-xs">
                Patient-controlled health records, explicit time-bound consent, and end-to-end audit logging.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono bg-slate-800/80 px-3.5 py-1.5 rounded-lg border border-slate-700 text-slate-300">
            <span className="text-rose-400 font-bold flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5" /> Emergency: 112 / 108
            </span>
            <span className="text-slate-500">|</span>
            <span>Tele-Health: 104</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand & Positioning */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center text-white">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <span className="font-bold text-base text-white tracking-tight">CARE SAATHI</span>
          </div>
          <p className="text-slate-300 text-xs italic font-medium">
            "Your health, understood — every record, every step, one trusted companion."
          </p>
          <p className="text-slate-400 text-xs leading-relaxed max-w-lg">
            We are not rebuilding India’s healthcare infrastructure — we are the patient-facing intelligence layer on top of it. CareSaathi makes digital health records, doctor discovery, and medication schedules clear and accessible for every Indian citizen.
          </p>
          <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700 text-[11px] text-slate-300">
            <strong className="text-teal-400 block mb-0.5">Non-Governmental Disclosure:</strong>
            CareSaathi is an independent patient experience and intelligence application. It is not owned, operated, or endorsed as an official government agency platform.
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div className="space-y-2">
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Platform Modules</h4>
          <ul className="space-y-1.5 text-slate-400">
            <li><button onClick={() => setActiveTab('dashboard')} className="hover:text-teal-400 transition">Patient Dashboard</button></li>
            <li><button onClick={() => setActiveTab('reports')} className="hover:text-teal-400 transition">Medical Reports & OCR</button></li>
            <li><button onClick={() => setActiveTab('discovery')} className="hover:text-teal-400 transition">Doctor & Hospital Discovery</button></li>
            <li><button onClick={() => setActiveTab('companion')} className="hover:text-teal-400 transition">AI Health Companion</button></li>
            <li><button onClick={() => setActiveTab('reminders')} className="hover:text-teal-400 transition">Medicine Reminders</button></li>
            <li><button onClick={() => setActiveTab('timeline')} className="hover:text-teal-400 transition">Health Timeline & FHIR</button></li>
            <li><button onClick={() => setActiveTab('consent')} className="hover:text-teal-400 transition">Consent & Audit Trail</button></li>
          </ul>
        </div>

        {/* Col 3: Safety & Governance */}
        <div className="space-y-2">
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Safety & Privacy</h4>
          <ul className="space-y-1.5 text-slate-400">
            <li><button onClick={() => setActiveTab('about')} className="hover:text-teal-400 transition">Safety Architecture Rules</button></li>
            <li><button onClick={() => setActiveTab('about')} className="hover:text-teal-400 transition">AI vs. Deterministic Logic</button></li>
            <li><button onClick={() => setActiveTab('about')} className="hover:text-teal-400 transition">Future Scope Roadmap</button></li>
            <li><button onClick={() => setActiveTab('emergency')} className="text-rose-400 hover:text-rose-300 transition">Emergency Protocol</button></li>
            <li>
              <a href="https://abdm.gov.in" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-teal-400 transition">
                <span>ABDM Official Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Mandatory Statutory Medical Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-800 text-center text-slate-500 text-[11px] leading-relaxed">
        <p className="max-w-3xl mx-auto">
          <strong>Statutory Disclaimer:</strong> CareSaathi provides general health information, patient health literacy, and organization support. It does not diagnose diseases, prescribe medicines, alter dosages, or replace qualified medical professionals. In case of an emergency, immediately call 112 / 108 or visit your nearest hospital.
        </p>
        <p className="mt-2 text-slate-600">
          © {new Date().getFullYear()} CareSaathi Health Intelligence. Built for patient safety and digital health empowerment in India.
        </p>
      </div>
    </footer>
  );
};
