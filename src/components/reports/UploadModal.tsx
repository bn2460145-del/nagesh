import React, { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Edit3, 
  ArrowRight, 
  Cpu, 
  ShieldCheck, 
  Check, 
  Lock,
  RefreshCw,
  Info
} from 'lucide-react';
import { sampleUploadReports } from '../../data/mockReports';
import { ExtractedLabField, MedicalReport } from '../../types';
import { createConfirmedReportFromExtraction } from '../../services/ocrSimulator';
import { Badge } from '../common/Badge';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReportConfirmed: (newReport: MedicalReport) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onReportConfirmed
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const [customFileName, setCustomFileName] = useState('');
  const [ocrStage, setOcrStage] = useState('Reading your document...');
  const [ocrProgress, setOcrProgress] = useState(15);
  const [isEditing, setIsEditing] = useState(false);

  // Extracted fields working copy
  const [fields, setFields] = useState<ExtractedLabField[]>(
    JSON.parse(JSON.stringify(sampleUploadReports[0].extractedFields))
  );
  const [reportTitle, setReportTitle] = useState(sampleUploadReports[0].title);
  const [providerName, setProviderName] = useState(sampleUploadReports[0].provider);
  const [confirmedReport, setConfirmedReport] = useState<MedicalReport | null>(null);

  // Trigger OCR animation when entering step 2
  const startOcrPipeline = (sampleIdx: number) => {
    const sample = sampleUploadReports[sampleIdx];
    setSelectedSampleIndex(sampleIdx);
    setReportTitle(sample.title);
    setProviderName(sample.provider);
    setFields(JSON.parse(JSON.stringify(sample.extractedFields)));
    setStep(2);
    setOcrProgress(15);
    setOcrStage('Reading your document...');

    setTimeout(() => {
      setOcrStage('OCR extracting information and medical terminology...');
      setOcrProgress(55);
    }, 700);

    setTimeout(() => {
      setOcrStage('Preparing structured parameters and reference ranges...');
      setOcrProgress(90);
    }, 1400);

    setTimeout(() => {
      setOcrProgress(100);
      setStep(3);
    }, 2000);
  };

  const handleFieldChange = (id: string, newResult: string) => {
    setFields(prev => prev.map(f => f.id === id ? { ...f, result: newResult } : f));
  };

  const handleConfirmExtraction = () => {
    const report = createConfirmedReportFromExtraction(
      reportTitle,
      providerName,
      'PDF',
      fields,
      sampleUploadReports[selectedSampleIndex].simpleSummary,
      sampleUploadReports[selectedSampleIndex].doctorQuestions
    );
    setConfirmedReport(report);
    setStep(4);
    onReportConfirmed(report);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-base">Upload Medical Report</h3>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                Step {step} of 4
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {step === 1 && 'Select or upload a lab test report or prescription'}
              {step === 2 && 'Machine-assisted OCR parameter extraction in progress'}
              {step === 3 && 'Mandatory user verification of extracted clinical fields'}
              {step === 4 && 'AI plain-language explanation and security hash generated'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* STEP 1: Select / Upload */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Drag and Drop Zone */}
              <div 
                onClick={() => startOcrPipeline(0)}
                className="border-2 border-dashed border-teal-300 hover:border-teal-500 bg-teal-50/40 hover:bg-teal-50/70 rounded-2xl p-8 text-center cursor-pointer transition space-y-3 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mx-auto group-hover:scale-110 transition">
                  <Upload className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Drop medical report here, or browse files</h4>
                  <p className="text-xs text-slate-500 mt-1">Supports PDF, JPG, PNG (up to 25 MB)</p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs text-teal-800 font-semibold bg-white px-3 py-1.5 rounded-lg border border-teal-200 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>Encrypted during transit and local processing</span>
                </div>
              </div>

              {/* Sample Pre-loaded Reports for Instant Hackathon Testing */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Or select a pre-loaded test report for demo:
                  </h4>
                  <span className="text-[11px] text-teal-700 font-medium">1-Click OCR Testing</span>
                </div>

                <div className="space-y-2">
                  {sampleUploadReports.map((sample, idx) => (
                    <button
                      key={sample.id}
                      onClick={() => startOcrPipeline(idx)}
                      className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-teal-400 hover:bg-slate-50 text-left transition flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-teal-100 text-slate-600 group-hover:text-teal-800 flex items-center justify-center transition">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-teal-800 transition">
                            {sample.title}
                          </p>
                          <p className="text-[11px] text-slate-500">{sample.provider} • {sample.fileSize}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-teal-700 font-semibold">
                        <span>Process</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Processing Animation */}
          {step === 2 && (
            <div className="py-12 px-4 text-center space-y-6">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-teal-200 border-t-teal-700 animate-spin"></div>
                <Cpu className="w-8 h-8 text-teal-700 animate-pulse" />
              </div>

              <div className="space-y-2 max-w-sm mx-auto">
                <h4 className="font-bold text-slate-900 text-base">{ocrStage}</h4>
                <p className="text-xs text-slate-500">
                  CareSaathi extracts raw values into structured fields. You will be prompted to verify accuracy before finalization.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="max-w-xs mx-auto">
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-teal-600 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${ocrProgress}%` }}
                  ></div>
                </div>
                <p className="text-[11px] font-mono text-slate-400 mt-1.5">{ocrProgress}% Structured</p>
              </div>
            </div>
          )}

          {/* STEP 3: Mandatory User Confirmation of Extracted Fields */}
          {step === 3 && (
            <div className="space-y-5">
              {/* Important Safety Alert Banner */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold block">Mandatory Confirmation:</strong>
                  The user MUST verify the extracted laboratory parameters before this report is saved or used for AI explanations. You can edit any value that was misread by OCR.
                </div>
              </div>

              {/* Document metadata summary */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500">Document:</span> <strong className="text-slate-800">{reportTitle}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Facility:</span> <span className="text-slate-700 font-medium">{providerName}</span>
                </div>
              </div>

              {/* Extracted Fields Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="p-3">Test Parameter</th>
                      <th className="p-3">Extracted Result</th>
                      <th className="p-3">Reference Range</th>
                      <th className="p-3">Indicator</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {fields.map(f => (
                      <tr key={f.id} className="hover:bg-slate-50/50">
                        <td className="p-3 font-semibold text-slate-800">{f.test}</td>
                        <td className="p-3">
                          {isEditing ? (
                            <input
                              type="text"
                              value={f.result}
                              onChange={(e) => handleFieldChange(f.id, e.target.value)}
                              className="px-2 py-1 bg-white border border-teal-400 rounded-md font-bold text-slate-900 w-24 text-xs"
                            />
                          ) : (
                            <span className="font-bold text-slate-900">{f.result} {f.unit}</span>
                          )}
                        </td>
                        <td className="p-3 text-slate-500 font-mono">{f.referenceRange}</td>
                        <td className="p-3">
                          <Badge variant={f.status} size="sm">
                            {f.status.toUpperCase()}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Edit / Confirm Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-semibold px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 transition"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Done Editing' : 'Edit Values'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleConfirmExtraction}
                  className="flex items-center gap-2 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-teal-700/20 transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Information & Explain</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Success & Security Hash Generated */}
          {step === 4 && confirmedReport && (
            <div className="py-6 space-y-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-bold text-slate-900">Report Confirmed & Protected</h4>
                <p className="text-xs text-slate-500">
                  Unique health record ID and cryptographic integrity checksum have been assigned.
                </p>
              </div>

              {/* Security ID Card */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl max-w-md mx-auto text-left space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">RECORD ID:</span>
                  <strong className="text-teal-800 font-bold">{confirmedReport.recordId}</strong>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">INTEGRITY STATUS:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Integrity Protected
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">AUTH SOURCE:</span>
                  <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Patient Uploaded / Self-Declared
                  </span>
                </div>
                <div className="pt-1">
                  <span className="text-[10px] text-slate-400 block mb-0.5">SHA-256 INTEGRITY HASH:</span>
                  <p className="text-[10px] text-slate-600 break-all leading-tight">
                    {confirmedReport.sha256Hash}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full max-w-md py-3 px-4 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition"
                >
                  View AI Explanation & Analysis
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
