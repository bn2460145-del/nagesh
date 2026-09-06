import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Upload, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ChevronRight, 
  Lock,
  Calendar,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { MedicalReport } from '../../types';
import { Badge } from '../common/Badge';
import { DisclaimerNotice } from '../common/DisclaimerNotice';

interface ReportsListProps {
  reports: MedicalReport[];
  onOpenUpload: () => void;
  onSelectReport: (report: MedicalReport) => void;
  setActiveTab: (tab: string) => void;
}

export const ReportsList: React.FC<ReportsListProps> = ({
  reports,
  onOpenUpload,
  onSelectReport,
  setActiveTab
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filterOptions = [
    { id: 'all', label: 'All Records' },
    { id: 'lab', label: 'Lab Reports' },
    { id: 'prescription', label: 'Prescriptions' },
    { id: 'imaging', label: 'Imaging / X-Ray' },
    { id: 'other', label: 'Other' }
  ];

  const filteredReports = reports.filter(r => {
    const matchesType = selectedType === 'all' || r.type === selectedType;
    const matchesSearch = 
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.recordId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Upload CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">My Medical Reports</h1>
            <span className="text-xs bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-0.5 rounded-full font-mono font-medium">
              {reports.length} Records
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Secure, encrypted repository of diagnostic reports, clinical summaries, and prescriptions.
          </p>
        </div>

        <button
          onClick={onOpenUpload}
          className="px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-teal-700/20 transition"
        >
          <Upload className="w-4 h-4" />
          <span>+ Upload Medical Report</span>
        </button>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search reports by title, diagnostic center, or Record ID (CS-RPT-...)"
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-teal-600 focus:outline-hidden transition"
          />
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          {filterOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => setSelectedType(opt.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedType === opt.id
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* REPORTS GRID */}
      {filteredReports.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <FileText className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">No medical reports found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms or upload a new blood test, prescription, or scan.
          </p>
          <button
            onClick={onOpenUpload}
            className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-semibold"
          >
            Upload New Document
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReports.map(report => (
            <div
              key={report.id}
              onClick={() => onSelectReport(report)}
              className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-teal-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Card Top Row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-teal-800 transition">
                        {report.title}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{report.provider}</span>
                      </p>
                    </div>
                  </div>

                  {/* Verification Badge */}
                  <Badge 
                    variant={report.verificationStatus === 'verified' ? 'verified' : 'unverified'}
                    size="sm"
                  >
                    {report.verificationStatus === 'verified' ? 'Provider Verified' : 'Patient Uploaded'}
                  </Badge>
                </div>

                {/* Parameters Preview if lab */}
                {report.extractedFields && report.extractedFields.length > 0 && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 space-y-1.5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Key Extracted Parameters:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {report.extractedFields.slice(0, 3).map(f => (
                        <span key={f.id} className="text-xs bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-700 font-medium">
                          {f.test}: <strong className="font-semibold text-slate-900">{f.result} {f.unit}</strong>
                        </span>
                      ))}
                      {report.extractedFields.length > 3 && (
                        <span className="text-[11px] text-slate-400 self-center">
                          +{report.extractedFields.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
                  <span>{report.date}</span>
                  <span>•</span>
                  <span className="text-teal-700 font-semibold">{report.recordId}</span>
                </div>

                <div className="flex items-center gap-1 text-teal-700 font-bold group-hover:translate-x-1 transition">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>Explain Report</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Statutory Disclaimer */}
      <DisclaimerNotice type="general" />
    </div>
  );
};
