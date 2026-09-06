import React from 'react';
import { QrCode, ShieldCheck } from 'lucide-react';

interface QRCodeStubProps {
  value: string;
  label?: string;
  size?: number;
  showBadge?: boolean;
}

export const QRCodeStub: React.FC<QRCodeStubProps> = ({
  value,
  label = 'Scan to verify integrity',
  size = 140,
  showBadge = true
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-center">
      <div 
        className="relative flex items-center justify-center p-3 bg-slate-50 border border-slate-200 rounded-xl"
        style={{ width: size, height: size }}
      >
        {/* Procedural QR code grid visual */}
        <div className="w-full h-full grid grid-cols-6 grid-rows-6 gap-1 p-1 bg-white rounded-lg border border-slate-200">
          {/* Top-left locator box */}
          <div className="col-span-2 row-span-2 bg-slate-900 rounded-sm p-0.5 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-slate-900"></div>
            </div>
          </div>
          <div className="bg-slate-900 rounded-xs"></div>
          <div className="bg-slate-200 rounded-xs"></div>
          {/* Top-right locator box */}
          <div className="col-span-2 row-span-2 col-start-5 bg-slate-900 rounded-sm p-0.5 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-slate-900"></div>
            </div>
          </div>
          <div className="bg-slate-200"></div>
          <div className="bg-slate-900"></div>
          <div className="bg-slate-900"></div>
          <div className="bg-slate-200"></div>
          <div className="bg-slate-900"></div>
          <div className="bg-slate-200"></div>
          {/* Bottom-left locator box */}
          <div className="col-span-2 row-span-2 row-start-5 bg-slate-900 rounded-sm p-0.5 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-slate-900"></div>
            </div>
          </div>
          <div className="bg-slate-900"></div>
          <div className="bg-slate-200"></div>
          <div className="bg-slate-900"></div>
          <div className="bg-slate-200"></div>
          <div className="bg-slate-200"></div>
          <div className="bg-slate-900"></div>
          <div className="bg-slate-900"></div>
          <div className="bg-slate-900"></div>
        </div>

        {/* Center logo watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-7 h-7 rounded-full bg-white shadow-md border border-teal-200 flex items-center justify-center text-teal-700">
            <QrCode className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="mt-2.5 text-center">
        <p className="text-[11px] font-mono text-slate-500 font-semibold truncate max-w-[150px]">{value}</p>
        <p className="text-[11px] text-slate-500 mt-0.5">{label}</p>
        {showBadge && (
          <div className="inline-flex items-center gap-1 mt-1 text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
            <ShieldCheck className="w-3 h-3" />
            <span>DPDP Consent-Locked</span>
          </div>
        )}
      </div>
    </div>
  );
};
