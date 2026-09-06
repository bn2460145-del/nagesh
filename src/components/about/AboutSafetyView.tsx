import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  HeartHandshake, 
  FileText, 
  Database,
  ArrowRight
} from 'lucide-react';
import { DisclaimerNotice } from '../common/DisclaimerNotice';

export const AboutSafetyView: React.FC<{ onBackToDashboard: () => void }> = ({ onBackToDashboard }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>Safety Architecture & Regulatory Alignment</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          AI Where It Helps. Rules Where Safety Matters.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          CareSaathi is engineered from first principles as a safety-first intelligence layer. We never gamble with patient wellbeing or clinical decisions through unconstrained AI.
        </p>
      </div>

      {/* COMPARISON MATRIX: AI vs DETERMINISTIC RULES */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-teal-700" />
          <span>CareSaathi System Partitioning</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI Zone */}
          <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-teal-900">
              <Sparkles className="w-4 h-4 text-teal-700" />
              <span>Where Generative AI & Language Models Are Used</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span><strong>Plain-Language Explanation:</strong> Translating complex lab parameters and medical jargon into accessible summaries.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span><strong>Conversational Clarification:</strong> Answering general wellness questions and clarifying doctor instructions.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span><strong>Doctor Question Preparation:</strong> Generating informed, relevant questions for patients to ask their doctor.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span><strong>Source-Grounded RAG:</strong> Grounding all responses in validated clinical standards (ICMR / NHP / WHO).</span>
              </li>
            </ul>
          </div>

          {/* Deterministic Zone */}
          <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-rose-900">
              <ShieldCheck className="w-4 h-4 text-rose-700" />
              <span>Where Deterministic & Hard Rules Are Strictly Enforced</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
                <span><strong>Pre-LLM Emergency Interception:</strong> Deterministic regex parser that catches acute symptoms and bypasses AI chat instantly.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
                <span><strong>Medicine Reminders:</strong> Dosages are strictly populated from user input or confirmed prescriptions—never AI-invented.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
                <span><strong>100-Point Transparent Matching:</strong> Doctor rankings are calculated via transparent mathematical weights without advertising influence.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
                <span><strong>DPDP Consent Management:</strong> Cryptographic hashes, access grant/revocation, and immutable audit logs.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* STRICT BOUNDARIES TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-lg font-bold text-slate-900">
          Strict Clinical & Ethical Boundaries
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {[
            { label: 'Diagnose diseases', reason: 'Diagnosis requires clinical history, physical exam, and licensed physician judgment.' },
            { label: 'Prescribe medications', reason: 'Only registered medical practitioners are authorized to prescribe scheduled drugs.' },
            { label: 'Modify medication dosages', reason: 'Altering dosage without clinical oversight can cause toxicity or therapeutic failure.' },
            { label: 'Recommend stopping drugs', reason: 'Stopping antihypertensives or insulin abruptly carries severe acute risks.' },
            { label: 'Claim any doctor is "the best"', reason: 'Provider matching is based on criteria fit, not subjective or commercial superlatives.' },
            { label: 'Guarantee clinical outcomes', reason: 'Medicine is non-deterministic; CareSaathi never offers false assurances.' },
            { label: 'Present mock data as official', reason: 'All demonstration entities are explicitly labeled to avoid misrepresentation.' },
            { label: 'Authenticate unverified uploads', reason: 'Digital checksums ensure file integrity, not clinical laboratory authenticity.' }
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-2.5">
              <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">CareSaathi NEVER will: {item.label}</strong>
                <p className="text-slate-500 mt-0.5 leading-relaxed">{item.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STATUTORY DISCLAIMER */}
      <DisclaimerNotice type="general" />
    </div>
  );
};
