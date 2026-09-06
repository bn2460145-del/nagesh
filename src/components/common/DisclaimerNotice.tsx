import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

interface DisclaimerNoticeProps {
  type?: 'general' | 'ai' | 'emergency';
  className?: string;
  condensed?: boolean;
}

export const DisclaimerNotice: React.FC<DisclaimerNoticeProps> = ({
  type = 'general',
  className = '',
  condensed = false
}) => {
  if (type === 'emergency') {
    return (
      <div className={`flex items-start gap-3 bg-red-50 border border-red-200 text-red-900 rounded-xl p-3.5 text-xs sm:text-sm ${className}`}>
        <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold block text-red-800">Critical Medical Safety Notice</span>
          CareSaathi provides information and digital organization only. For acute, sudden, or severe symptoms (such as chest pain or breathing distress), immediately dial <strong className="font-bold underline">112 / 108</strong> or visit your nearest emergency room.
        </div>
      </div>
    );
  }

  if (type === 'ai') {
    return (
      <div className={`flex items-center gap-2 bg-teal-50/80 border border-teal-200/80 text-teal-900 rounded-lg px-3 py-2 text-xs ${className}`}>
        <Info className="w-4 h-4 text-teal-700 flex-shrink-0" />
        <span>
          <strong className="font-semibold text-teal-800">AI-generated informational explanation:</strong> Provided for health literacy and preparation for doctor consultation. Does not replace formal clinical assessment.
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-2.5 bg-slate-100/90 border border-slate-200 text-slate-700 rounded-xl ${condensed ? 'p-2.5 text-xs' : 'p-3.5 text-xs sm:text-sm'} ${className}`}>
      <Info className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
      <div className="leading-relaxed">
        <strong className="font-semibold text-slate-800">Medical Disclaimer:</strong> CareSaathi provides general health information and organization support. It does not diagnose diseases, prescribe medicines, change dosages, or replace a qualified healthcare professional.
      </div>
    </div>
  );
};
