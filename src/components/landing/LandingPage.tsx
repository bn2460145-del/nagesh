import React from 'react';
import { 
  HeartHandshake, 
  FileText, 
  Search, 
  Bot, 
  Bell, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Lock, 
  AlertTriangle,
  Stethoscope,
  Activity,
  Layers,
  Clock,
  Eye,
  Check
} from 'lucide-react';
import { DisclaimerNotice } from '../common/DisclaimerNotice';

interface LandingPageProps {
  onGetStarted: () => void;
  onExploreFeatures: () => void;
  setActiveTab: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onExploreFeatures,
  setActiveTab
}) => {
  return (
    <div className="space-y-20 py-6 sm:py-10">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>AI Patient Experience Layer • ABDM & DPDP Aligned</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Your Health, <span className="text-teal-700">Understood.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Understand your medical reports, find the right care, and stay organized with a safety-first digital health companion.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onGetStarted}
              className="px-6 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreFeatures}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-sm sm:text-base transition hover:-translate-y-0.5"
            >
              Explore Features
            </button>
          </div>

          {/* Trust Statement */}
          <div className="pt-3">
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              🛡️ Built as a patient-facing intelligence layer on India's digital health ecosystem.
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              (CareSaathi is an independent software application and not an official government agency portal.)
            </p>
          </div>
        </div>

        {/* HERO MOCKUP: Patient Dashboard Preview */}
        <div className="mt-12 max-w-5xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-rose-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              <span className="text-xs font-mono text-slate-400 ml-2">CareSaathi Patient Hub</span>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> ABHA ID: 91-4820-1928-3841
            </span>
          </div>

          {/* Mockup Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Medical Records */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Health Records</span>
                <FileText className="w-4 h-4 text-teal-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">8 Records</p>
              <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-200">
                <p className="font-medium text-slate-800 truncate">Blood Test — 02 Sep 2026</p>
                <p className="text-teal-700 font-mono text-[11px]">CS-RPT-2026-0891 • Integrity Verified</p>
              </div>
            </div>

            {/* Card 2: AI Report Explanation */}
            <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">AI Report Insights</span>
                <Sparkles className="w-4 h-4 text-teal-700" />
              </div>
              <p className="text-xs font-semibold text-slate-800">HbA1c: 7.2% | Glucose: 138 mg/dL</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                "Plain-language explanation ready. 4 suggested questions prepared for your doctor consultation."
              </p>
              <span className="inline-block text-[10px] text-teal-700 font-medium">Neutral Reference Framing</span>
            </div>

            {/* Card 3: Medicine Reminders */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Today's Reminders</span>
                <Bell className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">3 Medicines</p>
              <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span>Metformin 500mg (8:00 AM)</span>
                  <span className="text-emerald-700 text-[10px] font-bold">TAKEN</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Amlodipine 5mg (8:00 PM)</span>
                  <span className="text-slate-500 text-[10px]">UPCOMING</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row of mockup: Doctor & Companion */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">
                  AR
                </div>
                <div>
                  <h5 className="font-semibold text-slate-900 text-sm">Dr. Ananya Rao</h5>
                  <p className="text-xs text-slate-500">Endocrinology • 4.8 km away • ₹700</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
                  92% Match
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5">Transparent Rubric</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-700 flex items-center justify-center text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-semibold text-xs sm:text-sm">CareSaathi AI Companion</h5>
                  <p className="text-[11px] text-slate-300">Pre-LLM deterministic emergency guardian</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('companion')}
                className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold"
              >
                Try Chat
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES SECTION */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Designed for Trust, Simplicity & Patient Autonomy
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Everything you need to navigate your health records without confusing medical jargon or unsafe automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-teal-300 transition group">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">1. Understand Your Reports</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Upload PDF or image lab reports. Our multi-stage OCR extracts structured parameters for your review, followed by plain-language explanations.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-teal-300 transition group">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">2. Find Appropriate Care</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Discover doctors and clinics via natural-language queries. Ranked with a 100-point transparent rubric with zero paid placement.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-teal-300 transition group">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">3. Ask Health Companion</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Clarify medical terms and doctor recommendations. Guarded by pre-LLM emergency detection that instantly redirects acute crises.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-teal-300 transition group">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">4. Never Miss a Reminder</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Keep medications on track with deterministic schedule cards. Dosages originate solely from confirmed prescriptions—never hallucinated by AI.
            </p>
          </div>
        </div>
      </section>

      {/* CORE SAFETY MATRIX: AI vs DETERMINISTIC RULES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-teal-400 font-mono text-xs uppercase tracking-wider font-semibold">
              The Safety Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              AI where it helps. Rules where safety matters.
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              We never entrust life-critical clinical decisions or dosages to generative models. We combine deterministic rule-based algorithms with empathetic language understanding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Generative AI</span>
              </div>
              <h4 className="font-semibold text-white text-sm">Plain-Language Translation</h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Translating lab parameters, medical reports, and clinical notes into simple, readable explanations for patients and families.
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Cpu className="w-4 h-4" />
                <span>OCR Pipeline</span>
              </div>
              <h4 className="font-semibold text-white text-sm">Structured Parameter Extraction</h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Extracting numerical values, units, and reference intervals from scanned PDF/image reports with mandatory user verification.
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Deterministic Rules</span>
              </div>
              <h4 className="font-semibold text-white text-sm">Reminders & Emergency Safety</h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Pre-LLM emergency regex intercepts critical symptoms immediately. Medicine reminders are strictly tied to confirmed user input.
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Lock className="w-4 h-4" />
                <span>RAG & Scoring</span>
              </div>
              <h4 className="font-semibold text-white text-sm">Grounded Knowledge & Scoring</h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Source-grounded clinical references (ICMR / NHP). 100-point transparent doctor matching with zero promotional bias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY & CONSENT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-teal-700 font-semibold text-xs uppercase tracking-wider">
              Data Sovereignty
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Patient-Controlled Privacy & Security
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              In full accordance with India's Digital Personal Data Protection (DPDP) Act 2023.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-slate-900 text-sm">Patient-Controlled Records</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Your medical history remains strictly yours. No third party or hospital can view your records without your permission.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-slate-900 text-sm">Explicit Time-Bound Consent</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Grant granular access to specific doctors for specified durations (e.g. 14 days) and revoke at any moment with one click.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-slate-900 text-sm">Integrity Hashes</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Every confirmed record receives a cryptographic SHA-256 identifier and unique tracking ID (CS-RPT-2026-XXXX).
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <Eye className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-slate-900 text-sm">Real-time Access Audit Trail</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Complete transparency. View exact timestamps whenever any provider or institution accesses your health documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FUTURE SCOPE ROADMAP (COMING SOON) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-t border-slate-200 pt-10 text-center space-y-2">
          <span className="text-slate-400 font-mono text-xs uppercase tracking-wider font-semibold">
            Future Scope • Hackathon Roadmap
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
            Expanding Capabilities Across India
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto">
            These features are planned in our technical roadmap and marked clearly as Future Scope for demonstration transparency.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'Live ABDM Gateway', desc: 'Direct production sync with ABDM Milestone 1, 2, and 3 APIs.' },
            { title: 'HFR / HPR Registry', desc: 'Real-time credentials lookup via National Health Facility & Professional Registry.' },
            { title: 'Regional Voice Interface', desc: 'Voice-based health queries in Hindi, Telugu, Tamil, Bengali, and Marathi.' },
            { title: 'Government Scheme Finder', desc: 'Automated eligibility discovery for PM-JAY and state health programs.' },
            { title: 'Caregiver Proxy Access', desc: 'Family-managed access for elderly parents with secondary consent.' },
            { title: 'Offline-First Storage', desc: 'Local encrypted database for rural areas with periodic sync.' },
            { title: 'Tamper-Detection ML', desc: 'Advanced neural verification of diagnostic report formatting.' },
            { title: 'Longitudinal Biomarkers', desc: 'Multi-year trajectory analysis for chronic metabolic disorders.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-100/70 border border-slate-200/90 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <h5 className="font-semibold text-slate-800 text-xs">{item.title}</h5>
                <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono">Future</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATUTORY DISCLAIMER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DisclaimerNotice type="general" />
      </section>
    </div>
  );
};
