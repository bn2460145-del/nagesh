import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  UserCheck, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  FileText, 
  Building2,
  Trash2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { ActiveConsent, PendingConsentRequest, AuditLogEntry } from '../../types';
import { Badge } from '../common/Badge';

interface ConsentAuditViewProps {
  consents: ActiveConsent[];
  pendingConsent: PendingConsentRequest | null;
  auditLogs: AuditLogEntry[];
  onRevokeConsent: (id: string) => void;
  onResolvePendingConsent: (allow: boolean) => void;
}

export const ConsentAuditView: React.FC<ConsentAuditViewProps> = ({
  consents,
  pendingConsent,
  auditLogs,
  onRevokeConsent,
  onResolvePendingConsent
}) => {
  const [activeTab, setActiveTab] = useState<'consents' | 'audit'>('consents');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Consent & Privacy Control</h1>
            <span className="text-xs bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-0.5 rounded-full font-mono font-medium">
              DPDP Act 2023 Compliant
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Control exactly who has access to your health documents, for what purpose, and for what duration.
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('consents')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'consents' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Active Access ({consents.length})
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'audit' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Access Audit Trail ({auditLogs.length})
          </button>
        </div>
      </div>

      {/* PENDING CONSENT REQUEST BANNER / MODAL */}
      {pendingConsent && (
        <div className="p-5 sm:p-6 rounded-3xl bg-teal-50/70 border-2 border-teal-300 shadow-md space-y-4 animate-in fade-in duration-200">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-700 text-white flex items-center justify-center font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-200 text-teal-900 px-2 py-0.5 rounded-full">
                  Pending Health Record Consent Request
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {pendingConsent.requesterName} ({pendingConsent.requesterRole})
                </h3>
                <p className="text-xs text-slate-600">{pendingConsent.requesterOrg} • Requested: {pendingConsent.timestamp}</p>
              </div>
            </div>

            <span className="text-xs font-mono font-semibold text-teal-800 bg-white px-2.5 py-1 rounded-lg border border-teal-200">
              Duration: {pendingConsent.requestedDuration}
            </span>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-teal-200 space-y-2 text-xs">
            <div>
              <strong className="text-slate-700">Specified Clinical Purpose:</strong>{' '}
              <span className="text-slate-900 font-medium">{pendingConsent.purpose}</span>
            </div>
            <div>
              <strong className="text-slate-700 block mb-1">Records Requested for Review:</strong>
              <div className="flex flex-wrap gap-1.5">
                {pendingConsent.requestedRecords.map((rec, i) => (
                  <span key={i} className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 font-medium">
                    {rec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              onClick={() => onResolvePendingConsent(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition"
            >
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Deny Access</span>
            </button>
            <button
              onClick={() => onResolvePendingConsent(true)}
              className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Allow Time-Bound Access</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: ACTIVE CONSENTS ("Who can access your records?") */}
      {activeTab === 'consents' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Who can access your records?</h2>
            <span className="text-xs text-slate-500">
              Revocable at any time by record owner
            </span>
          </div>

          {consents.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-2">
              <ShieldCheck className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-700">No active third-party consents</h3>
              <p className="text-xs text-slate-500">Your records are completely private to your account.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {consents.map(consent => (
                <div
                  key={consent.id}
                  className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{consent.requesterName}</h3>
                        <p className="text-xs text-slate-500">{consent.requesterRole}</p>
                        <p className="text-[11px] text-slate-400">{consent.requesterOrg}</p>
                      </div>
                      <Badge variant="verified" size="sm">Active Consent</Badge>
                    </div>

                    <div className="space-y-1.5 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
                      <div>
                        <span className="text-slate-500 font-medium">Purpose:</span>{' '}
                        <span className="text-slate-800 font-semibold">{consent.purpose}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-medium block">Authorized Records:</span>
                        <ul className="list-disc list-inside text-slate-700 font-medium space-y-0.5 mt-0.5">
                          {consent.requestedRecords.map((r, idx) => (
                            <li key={idx} className="truncate">{r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>Valid until: <strong>{consent.validUntil}</strong></span>
                    </div>

                    <button
                      onClick={() => onRevokeConsent(consent.id)}
                      className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-semibold text-xs flex items-center gap-1 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Revoke Access</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ACCESS AUDIT TRAIL */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Real-Time Access Audit Trail</h2>
              <p className="text-xs text-slate-500">Immutable chronological record of every health record query or consent event</p>
            </div>
            <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-mono">
              Audit Logs Active
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {auditLogs.map(log => (
              <div key={log.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{log.actorName}</span>
                      <span className="text-[11px] text-slate-400">({log.actorRole})</span>
                    </div>
                    <p className="text-slate-600 mt-0.5">
                      <strong className="text-teal-900">{log.action}:</strong> {log.resourceName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center font-mono text-[11px]">
                  <span className="text-slate-400">{log.timestamp}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    log.status === 'authorized'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
