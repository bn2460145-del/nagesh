import React, { useState } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle, 
  AlertTriangle, 
  Bot, 
  Copy, 
  Check, 
  Building2, 
  Calendar,
  Share2,
  Download,
  Info
} from 'lucide-react';
import { MedicalReport } from '../../types';
import { Badge } from '../common/Badge';
import { QRCodeStub } from '../common/QRCodeStub';
import { DisclaimerNotice } from '../common/DisclaimerNotice';

interface ReportDetailViewProps {
  report: MedicalReport;
  onBack: () => void;
  onAskCompanion: (prompt: string) => void;
  onShareReport: (report: MedicalReport) => void;
}

export const ReportDetailView: React.FC<ReportDetailViewProps> = ({
  report,
  onBack,
  onAskCompanion,
  onShareReport
}) => {
  const [copiedHash, setCopiedHash] = useState(false);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(report.sha256Hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const isVerified = report.verificationStatus === 'verified';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button & Action buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Reports</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onShareReport(report)}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share via Consent</span>
          </button>
          <button
            onClick={() => onAskCompanion(`Explain my report: ${report.title}`)}
            className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Ask AI Companion</span>
          </button>
        </div>
      </div>

      {/* HEADER: Title & Verification Status */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-teal-800 uppercase tracking-wider font-semibold">
              {report.recordId}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {report.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-2 mt-1">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>{report.provider}</span>
              <span>•</span>
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{report.date}</span>
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1.5">
            <Badge variant={isVerified ? 'verified' : 'unverified'} size="md">
              {isVerified ? 'Provider Verified' : 'Patient Uploaded / Unverified'}
            </Badge>
            {report.verifiedBy && (
              <span className="text-[11px] text-slate-500 max-w-xs text-left sm:text-right">
                Signed by: {report.verifiedBy}
              </span>
            )}
          </div>
        </div>

        {/* Security / Verification Authenticity Callout */}
        <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
          isVerified 
            ? 'bg-teal-50/70 border-teal-200 text-teal-900' 
            : 'bg-amber-50/70 border-amber-200 text-amber-900'
        }`}>
          {isVerified ? (
            <p>
              <strong>Medically Verified:</strong> This record was generated and cryptographically dispatched directly by an ABDM/NABL-accredited diagnostic facility.
            </p>
          ) : (
            <p>
              <strong>Patient-Uploaded Record Notice:</strong> This document was uploaded directly by the patient. While its digital checksum is recorded to ensure it has not been altered on CareSaathi, cryptographic hashing alone does not verify the clinical accuracy of an unverified upload.
            </p>
          )}
        </div>
      </div>

      {/* SECTION: AI REPORT EXPLANATION */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-600" />
              <span>Your Report, Explained</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Clear, non-technical translation of your medical report parameters
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 text-[11px] bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-1 rounded-full font-medium">
            <Info className="w-3.5 h-3.5 text-teal-600" />
            <span>AI-generated informational explanation</span>
          </div>
        </div>

        {/* 1. SIMPLE SUMMARY */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-teal-800">
            1. Simple Summary
          </h3>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
            {report.explanation.simpleSummary}
          </div>
        </div>

        {/* 2. WHAT EACH TEST MEANS */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-teal-800">
            2. What Each Test Means
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.explanation.testMeanings.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">{item.test}</h4>
                  <Badge variant={item.status as any} size="sm">
                    {item.status.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 block uppercase">What it measures:</span>
                  <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{item.whatItMeasures}</p>
                </div>
                <div className="pt-1 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500 block uppercase">Observed Context:</span>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed mt-0.5">{item.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. RESULT INTERPRETATION TABLE */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-teal-800">
              3. Result Interpretation
            </h3>
            <span className="text-[11px] text-slate-400">Neutral clinical terminology</span>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="p-3.5">Test Parameter</th>
                  <th className="p-3.5">Your Result</th>
                  <th className="p-3.5">Reference Range</th>
                  <th className="p-3.5">Laboratory Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {report.extractedFields.map(field => (
                  <tr key={field.id} className="hover:bg-slate-50/60 transition">
                    <td className="p-3.5 font-semibold text-slate-900">{field.test}</td>
                    <td className="p-3.5">
                      <span className="font-bold text-slate-900 text-sm">{field.result}</span>{' '}
                      <span className="text-slate-500 text-[11px]">{field.unit}</span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-600">{field.referenceRange}</td>
                    <td className="p-3.5">
                      <Badge variant={field.status} size="sm">
                        {field.status === 'normal' ? 'Within Range' : field.status.toUpperCase()}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. QUESTIONS YOU MAY ASK YOUR DOCTOR */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-teal-800 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-teal-700" />
            <span>4. Questions You May Ask Your Doctor</span>
          </h3>
          <p className="text-xs text-slate-500">
            Take these questions to your next appointment to make the most of your consultation:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {report.explanation.doctorQuestions.map((q, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-teal-50/50 border border-teal-200/80 text-xs text-slate-800 flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-teal-200/80 text-teal-800 flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span className="font-medium leading-relaxed">"{q}"</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. WHEN TO SEEK MEDICAL ATTENTION */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span>5. When to Seek Medical Attention</span>
          </div>
          <p className="text-xs leading-relaxed text-amber-900">
            {report.explanation.whenToSeekCare}
          </p>
          <p className="text-[11px] text-amber-800 font-semibold pt-1 border-t border-amber-200/60">
            {report.explanation.safetyNotice}
          </p>
        </div>
      </div>

      {/* SECTION: REPORT SECURITY & CRYPTOGRAPHIC INTEGRITY */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Record Security & Digital Integrity</h3>
              <p className="text-xs text-slate-500">Tamper-evident checksum and ABDM health locker compatibility</p>
            </div>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-full border border-emerald-200">
            Integrity Protected
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* QR Code */}
          <div className="flex justify-center">
            <QRCodeStub 
              value={report.recordId} 
              label={`CareSaathi Record: ${report.recordId}`}
              size={130}
            />
          </div>

          {/* Details & Hashes */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-sans">Unique Record Identifier</span>
              <p className="text-sm font-bold text-teal-900">{report.recordId}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[10px] uppercase font-sans">SHA-256 Checksum</span>
                <button
                  onClick={handleCopyHash}
                  className="flex items-center gap-1 text-[11px] text-teal-700 hover:underline font-sans font-medium"
                >
                  {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedHash ? 'Copied' : 'Copy Hash'}</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-600 break-all leading-tight">
                {report.sha256Hash}
              </p>
            </div>

            <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
              This record is stored in your personal encrypted repository under India's DPDP Act 2023 guidelines. Any unauthorized modifications will invalidate this checksum.
            </p>
          </div>
        </div>
      </div>

      {/* Statutory Disclaimer */}
      <DisclaimerNotice type="ai" />
    </div>
  );
};
