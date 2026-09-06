import React, { useState } from 'react';
import { 
  History, 
  Calendar, 
  FileText, 
  Stethoscope, 
  Pill, 
  Sparkles, 
  Code, 
  X, 
  CheckCircle2, 
  ChevronRight, 
  Building2,
  Copy,
  Check
} from 'lucide-react';
import { mockTimelineEvents } from '../../data/mockTimeline';
import { HealthTimelineEvent } from '../../types';
import { Badge } from '../common/Badge';

interface TimelineViewProps {
  onSelectRecordId?: (recordId: string) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ onSelectRecordId }) => {
  const [selectedEventType, setSelectedEventType] = useState<string>('all');
  const [selectedFhirEvent, setSelectedFhirEvent] = useState<HealthTimelineEvent | null>(null);
  const [copiedFhir, setCopiedFhir] = useState(false);

  const filteredEvents = mockTimelineEvents.filter(e => {
    if (selectedEventType === 'all') return true;
    return e.eventType === selectedEventType;
  });

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'lab': return <FileText className="w-4 h-4 text-teal-700" />;
      case 'consultation': return <Stethoscope className="w-4 h-4 text-blue-700" />;
      case 'prescription': return <Pill className="w-4 h-4 text-amber-700" />;
      case 'imaging': return <Sparkles className="w-4 h-4 text-purple-700" />;
      case 'vaccination': return <CheckCircle2 className="w-4 h-4 text-emerald-700" />;
      default: return <History className="w-4 h-4 text-slate-700" />;
    }
  };

  const handleCopyFhir = () => {
    if (!selectedFhirEvent) return;
    navigator.clipboard.writeText(JSON.stringify(selectedFhirEvent.fhirResource, null, 2));
    setCopiedFhir(true);
    setTimeout(() => setCopiedFhir(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Health Timeline</h1>
            <span className="text-xs bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-0.5 rounded-full font-mono font-medium">
              HL7® FHIR R4 Ready
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Chronological longitudinal record of clinical encounters, lab tests, prescriptions, and vaccines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-mono bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            Patient ABHA: 91-4820-1928-3841
          </span>
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', label: 'All Encounters' },
          { id: 'lab', label: 'Lab Tests' },
          { id: 'prescription', label: 'Prescriptions' },
          { id: 'imaging', label: 'Imaging / X-Ray' },
          { id: 'vaccination', label: 'Vaccinations' }
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setSelectedEventType(filter.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedEventType === filter.id
                ? 'bg-teal-700 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* TIMELINE LIST */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-teal-200 space-y-8 my-6">
        {filteredEvents.map(event => (
          <div key={event.id} className="relative group">
            {/* Timeline Dot Icon */}
            <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-8 h-8 rounded-full bg-white border-2 border-teal-600 flex items-center justify-center shadow-xs group-hover:scale-110 transition">
              {getEventIcon(event.eventType)}
            </div>

            {/* Event Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-teal-400 hover:shadow-md transition space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span className="text-xs font-bold text-teal-800 uppercase tracking-wider font-mono">
                  {event.date}
                </span>
                <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium self-start sm:self-auto">
                  {event.eventType.toUpperCase()}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base">{event.title}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{event.provider}</span>
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {event.description}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                {event.recordId ? (
                  <span className="font-mono text-[11px] text-teal-700 font-semibold">
                    Record ID: {event.recordId}
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400">Clinical Event</span>
                )}

                <button
                  onClick={() => setSelectedFhirEvent(event)}
                  className="px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-[11px] font-semibold flex items-center gap-1.5 transition border border-teal-200"
                >
                  <Code className="w-3.5 h-3.5 text-teal-700" />
                  <span>Inspect FHIR JSON</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FHIR RESOURCE INSPECTOR MODAL */}
      {selectedFhirEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm font-mono flex items-center gap-2">
                  <Code className="w-4 h-4 text-teal-400" />
                  <span>FHIR R4 JSON Resource Viewer</span>
                </h3>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Resource: {selectedFhirEvent.fhirResource.resourceType} ({selectedFhirEvent.title})
                </p>
              </div>
              <button
                onClick={() => setSelectedFhirEvent(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-950 overflow-y-auto flex-1 font-mono text-xs text-teal-300">
              <pre className="whitespace-pre-wrap leading-relaxed">
                {JSON.stringify(selectedFhirEvent.fhirResource, null, 2)}
              </pre>
            </div>

            <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Standard: HL7 FHIR Release 4 (ABDM Profile Compatible)</span>
              <button
                onClick={handleCopyFhir}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-1.5 transition font-sans"
              >
                {copiedFhir ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFhir ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
