import React from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  X, 
  Play, 
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';

export interface DemoTourStep {
  stepNumber: number;
  title: string;
  category: 'Auth' | 'Dashboard' | 'OCR & Reports' | 'Doctor Match' | 'AI Companion' | 'Emergency' | 'Reminders';
  description: string;
  tab: string;
  actionText: string;
}

export const DEMO_STEPS: DemoTourStep[] = [
  {
    stepNumber: 1,
    title: 'Login & ABHA Authentication',
    category: 'Auth',
    description: 'Patient logs in with password or OTP simulation, with optional ABHA link and DPDP consent.',
    tab: 'login',
    actionText: 'Open Login Screen'
  },
  {
    stepNumber: 2,
    title: 'Patient Dashboard Overview',
    category: 'Dashboard',
    description: 'View "Good morning, Rahul", 8 health records, 3 medicines today, next appointment, and "Your next steps".',
    tab: 'dashboard',
    actionText: 'View Patient Dashboard'
  },
  {
    stepNumber: 3,
    title: 'Click "Upload Report"',
    category: 'OCR & Reports',
    description: 'Open the dedicated Medical Reports hub and trigger the 4-stage upload pipeline.',
    tab: 'reports',
    actionText: 'Go to My Reports'
  },
  {
    stepNumber: 4,
    title: 'Select Sample Blood Report',
    category: 'OCR & Reports',
    description: 'Choose sample Dr. Lal PathLabs Blood Test (CBC + Glycemic Panel) or upload a custom PDF/JPG.',
    tab: 'reports',
    actionText: 'Select Blood Report Preset'
  },
  {
    stepNumber: 5,
    title: 'Multi-Stage OCR Processing',
    category: 'OCR & Reports',
    description: 'Observe simulated OCR stages: "Reading document...", "OCR extracting fields...", "Structuring lab parameters...".',
    tab: 'reports',
    actionText: 'View OCR Progress Animation'
  },
  {
    stepNumber: 6,
    title: 'User Confirms Extracted Information',
    category: 'OCR & Reports',
    description: 'Review extracted Hemoglobin (11.2 g/dL), Fasting Glucose (138 mg/dL), and HbA1c (7.2%). Confirm before finalizing.',
    tab: 'reports',
    actionText: 'Inspect Extraction Table'
  },
  {
    stepNumber: 7,
    title: 'Plain-Language AI Explanation',
    category: 'OCR & Reports',
    description: 'Read simple summary, test meanings, neutral reference intervals, doctor questions, and SHA-256 hash.',
    tab: 'reports',
    actionText: 'View Report Explanation'
  },
  {
    stepNumber: 8,
    title: 'Click "Find a Doctor"',
    category: 'Doctor Match',
    description: 'Navigate to Doctor & Hospital Discovery with natural language search.',
    tab: 'discovery',
    actionText: 'Open Discovery Engine'
  },
  {
    stepNumber: 9,
    title: 'Natural Language Search',
    category: 'Doctor Match',
    description: 'Input query: "I need an affordable diabetes specialist nearby" — engine resolves Endocrinology + Affordable tier.',
    tab: 'discovery',
    actionText: 'Apply Search Query'
  },
  {
    stepNumber: 10,
    title: 'Ranked Providers Display',
    category: 'Doctor Match',
    description: 'See Dr. Ananya Rao ranked #1 with 92% match score, verified credentials, and 4.8 km distance.',
    tab: 'discovery',
    actionText: 'Inspect Ranked Providers'
  },
  {
    stepNumber: 11,
    title: 'Click "Why this match?"',
    category: 'Doctor Match',
    description: 'Open transparent score breakdown to understand why this provider was matched.',
    tab: 'discovery',
    actionText: 'Open "Why this match?"'
  },
  {
    stepNumber: 12,
    title: 'Transparent 100-Point Rubric',
    category: 'Doctor Match',
    description: 'Examine deterministic breakdown: Specialty (30/30), Credentials (20/20), Distance (15/15), Affordability (12/15), Language (10/10).',
    tab: 'discovery',
    actionText: 'View 100-pt Rubric'
  },
  {
    stepNumber: 13,
    title: 'Open AI Health Companion',
    category: 'AI Companion',
    description: 'Conversational assistant with source citations, suggested prompts, and persistent emergency button.',
    tab: 'companion',
    actionText: 'Open AI Companion'
  },
  {
    stepNumber: 14,
    title: 'Ask: "What does HbA1c mean?"',
    category: 'AI Companion',
    description: 'Submit informational query to explain 3-month average blood glucose.',
    tab: 'companion',
    actionText: 'Send HbA1c Question'
  },
  {
    stepNumber: 15,
    title: 'Safe Informational Answer',
    category: 'AI Companion',
    description: 'Verify neutral explanation with ICMR citations, reference ranges, and zero unauthorized diagnosis.',
    tab: 'companion',
    actionText: 'Review Safe Answer'
  },
  {
    stepNumber: 16,
    title: 'Emergency Test Phrase',
    category: 'Emergency',
    description: 'Input critical phrase: "I have severe chest pain and difficulty breathing".',
    tab: 'companion',
    actionText: 'Trigger Emergency Input'
  },
  {
    stepNumber: 17,
    title: 'Pre-LLM Emergency Card Bypass',
    category: 'Emergency',
    description: 'Observe AI chatbot immediately bypassed; prominent emergency card rendered with 112/108 call actions.',
    tab: 'companion',
    actionText: 'Inspect Emergency Card'
  },
  {
    stepNumber: 18,
    title: 'Medicine Reminders & Safety Rules',
    category: 'Reminders',
    description: 'Check deterministic medicine schedule (Metformin, Amlodipine). Dosages are confirmed from prescription, never AI-generated.',
    tab: 'reminders',
    actionText: 'View Reminders Hub'
  }
];

interface DemoGuideTourProps {
  isOpen: boolean;
  onClose: () => void;
  currentStepIndex: number;
  setCurrentStepIndex: (index: number) => void;
  onExecuteStep: (step: DemoTourStep) => void;
}

export const DemoGuideTour: React.FC<DemoGuideTourProps> = ({
  isOpen,
  onClose,
  currentStepIndex,
  setCurrentStepIndex,
  onExecuteStep
}) => {
  if (!isOpen) return null;

  const currentStep = DEMO_STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      onExecuteStep(DEMO_STEPS[nextIdx]);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      onExecuteStep(DEMO_STEPS[prevIdx]);
    }
  };

  return (
    <div className="fixed bottom-20 xl:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-[480px] z-50 bg-white rounded-2xl shadow-2xl border border-teal-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-teal-800 to-teal-700 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-600/50 flex items-center justify-center">
            <Zap className="w-4 h-4 text-teal-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm tracking-tight">Hackathon Demo Assistant</h3>
              <span className="text-[10px] bg-teal-900/60 text-teal-200 px-2 py-0.5 rounded-full font-mono">
                Step {currentStep.stepNumber} of 18
              </span>
            </div>
            <p className="text-[11px] text-teal-100">Guided 3-minute evaluation walkthrough</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-teal-200 hover:text-white p-1 rounded-lg hover:bg-teal-700 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress line */}
      <div className="w-full bg-slate-100 h-1.5">
        <div 
          className="bg-teal-600 h-1.5 transition-all duration-300"
          style={{ width: `${((currentStepIndex + 1) / DEMO_STEPS.length) * 100}%` }}
        ></div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
            {currentStep.category}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Step {currentStep.stepNumber} / 18
          </span>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
            <span>{currentStep.title}</span>
          </h4>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
            {currentStep.description}
          </p>
        </div>

        {/* Action Trigger Button */}
        <button
          onClick={() => onExecuteStep(currentStep)}
          className="w-full py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{currentStep.actionText}</span>
        </button>

        {/* Navigation row */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent font-medium transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Quick jump select */}
          <select
            value={currentStepIndex}
            onChange={(e) => {
              const idx = parseInt(e.target.value);
              setCurrentStepIndex(idx);
              onExecuteStep(DEMO_STEPS[idx]);
            }}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-medium focus:ring-1 focus:ring-teal-600 outline-hidden"
          >
            {DEMO_STEPS.map((step, i) => (
              <option key={step.stepNumber} value={i}>
                Step {step.stepNumber}: {step.title}
              </option>
            ))}
          </select>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === DEMO_STEPS.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 hover:bg-teal-100 disabled:opacity-40 font-medium transition"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
