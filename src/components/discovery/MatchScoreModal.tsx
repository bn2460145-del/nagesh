import React from 'react';
import { X, ShieldCheck, CheckCircle2, Sliders, Info, Zap } from 'lucide-react';
import { Provider } from '../../types';

interface MatchScoreModalProps {
  provider: Provider | null;
  isOpen: boolean;
  onClose: () => void;
  onAdjustPreferences: () => void;
}

export const MatchScoreModal: React.FC<MatchScoreModalProps> = ({
  provider,
  isOpen,
  onClose,
  onAdjustPreferences
}) => {
  if (!isOpen || !provider || !provider.matchBreakdown) return null;

  const b = provider.matchBreakdown;

  const scoreItems = [
    { label: 'Specialty & Clinical Alignment', score: b.specialtyScore, max: 30, desc: 'Addresses your active clinical query and health profile' },
    { label: 'Verified Medical Credentials', score: b.credentialsScore, max: 20, desc: 'Registered with State Medical Council / National Health Registry' },
    { label: 'Proximity & Travel Distance', score: b.distanceScore, max: 15, desc: `${provider.distanceKm} km from your registered location` },
    { label: 'Affordability & Cost Fit', score: b.affordabilityScore, max: 15, desc: `Consultation fee ₹${provider.consultationFee} (${provider.costTier})` },
    { label: 'Language Preference', score: b.languageScore, max: 10, desc: `Consults in ${provider.languages.slice(0, 3).join(', ')}` },
    { label: 'Facility Diagnostic Capabilities', score: b.facilityScore, max: 10, desc: `${provider.facilityCapabilities.length} in-house clinical capabilities` },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-teal-800 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base">Why This Match?</h3>
              <p className="text-xs text-teal-100 font-mono">100-Point Deterministic Algorithm</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* Provider snapshot */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h4 className="font-bold text-base text-slate-900">{provider.name}</h4>
              <p className="text-xs text-slate-500">{provider.specialty} • {provider.hospitalAffiliation}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-teal-800">{b.totalScore}</span>
              <span className="text-xs text-slate-400 font-mono">/100</span>
              <p className="text-[10px] text-teal-700 font-semibold">Match Score</p>
            </div>
          </div>

          {/* Detailed Breakdown list */}
          <div className="space-y-3">
            <h5 className="font-bold uppercase tracking-wider text-slate-700 text-xs">
              Score Breakdown:
            </h5>

            <div className="space-y-2.5">
              {scoreItems.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800 text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>{item.label}</span>
                    </span>
                    <span className="font-mono font-bold text-xs text-teal-800">
                      {item.score} / {item.max}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-teal-600 h-1.5 rounded-full"
                      style={{ width: `${(item.score / item.max) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-[11px] text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rationale explanation text */}
          <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-2xl space-y-1.5">
            <h5 className="font-bold text-teal-900 text-xs flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-teal-700" />
              <span>Transparent Rationale</span>
            </h5>
            <p className="text-xs text-teal-900 leading-relaxed">
              {b.rationale}
            </p>
          </div>

          {/* Anti-sponsorship notice */}
          <div className="p-3 rounded-xl bg-slate-100 text-slate-600 text-[11px] leading-relaxed flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Strict Non-Sponsored Guarantee:</strong> CareSaathi ranking is 100% deterministic and rule-based. We do not accept sponsored ads or payments from doctors or hospitals to influence ranking.
            </div>
          </div>

          {/* Adjust Preferences Button */}
          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                onClose();
                onAdjustPreferences();
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Adjust My Search Preferences</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
