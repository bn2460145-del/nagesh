import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  DollarSign, 
  Languages, 
  ShieldCheck, 
  Calendar, 
  Share2, 
  Heart, 
  Award, 
  Building2, 
  Zap,
  Check
} from 'lucide-react';
import { Provider } from '../../types';
import { Badge } from '../common/Badge';

interface ProviderDetailModalProps {
  provider: Provider | null;
  isOpen: boolean;
  onClose: () => void;
  onShareRecords: (provider: Provider) => void;
  onBookSuccess: (provider: Provider, slot: string) => void;
}

export const ProviderDetailModal: React.FC<ProviderDetailModalProps> = ({
  provider,
  isOpen,
  onClose,
  onShareRecords,
  onBookSuccess
}) => {
  if (!isOpen || !provider) return null;

  const [selectedSlot, setSelectedSlot] = useState(provider.availableSlots[0] || 'Today 4:30 PM');
  const [isBooked, setIsBooked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleBooking = () => {
    setIsBooked(true);
    setTimeout(() => {
      onBookSuccess(provider, selectedSlot);
      setIsBooked(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-teal-800 to-teal-700 text-white flex items-start justify-between">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white font-bold text-lg">
              {provider.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg sm:text-xl text-white">{provider.name}</h3>
                <Badge variant="verified" size="sm" className="bg-white/20 text-white border-white/30">
                  Verified
                </Badge>
              </div>
              <p className="text-xs text-teal-100 mt-0.5">{provider.title}</p>
              <p className="text-[11px] text-teal-200 font-mono mt-0.5">Reg #{provider.registrationNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 uppercase block font-medium">Specialty</span>
              <p className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5">{provider.specialty}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 uppercase block font-medium">Distance</span>
              <p className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5">{provider.distanceKm} km away</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 uppercase block font-medium">Consultation</span>
              <p className="font-bold text-teal-800 text-xs sm:text-sm mt-0.5">₹{provider.consultationFee}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 uppercase block font-medium">Experience</span>
              <p className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5">{provider.experienceYears} Years</p>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-1.5">
            <h4 className="font-bold uppercase tracking-wider text-slate-700 text-xs">About Provider</h4>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">{provider.about}</p>
          </div>

          {/* Credentials */}
          <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs text-teal-900">
              <Award className="w-4 h-4 text-teal-700" />
              <span>Medical Credentials & Registry</span>
            </div>
            <p className="text-xs text-slate-700">
              <strong>Qualifications:</strong> {provider.qualification}
            </p>
            <p className="text-xs text-slate-700">
              <strong>Primary Hospital:</strong> {provider.hospitalAffiliation}
            </p>
            <p className="text-[11px] text-teal-800 font-mono">
              Verified in State Medical Council Registry (Reg #{provider.registrationNumber})
            </p>
          </div>

          {/* Languages & Facilities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-slate-700 text-xs flex items-center gap-1.5">
                <Languages className="w-4 h-4 text-slate-400" />
                <span>Languages Spoken</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {provider.languages.map(l => (
                  <span key={l} className="px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-700">
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-slate-700 text-xs flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>Facility Capabilities</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {provider.facilityCapabilities.map(f => (
                  <span key={f} className="px-2.5 py-1 bg-teal-50 text-teal-800 rounded-lg text-xs font-medium border border-teal-200">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Available Slots Selector */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h4 className="font-bold uppercase tracking-wider text-slate-700 text-xs flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Select Appointment Slot (Demo)</span>
              </h4>
              <span className="text-[11px] text-teal-700 font-medium">Instant Confirmation</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {provider.availableSlots.map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition ${
                    selectedSlot === slot
                      ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Booking Confirmation / Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => onShareRecords(provider)}
              className="w-full sm:w-auto px-4 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Records</span>
            </button>

            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`w-full sm:w-auto px-4 py-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                isSaved ? 'bg-rose-50 text-rose-700 border-rose-200' : 'border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-rose-600' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleBooking}
              disabled={isBooked}
              className="w-full flex-1 py-3 px-6 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-teal-700/20 transition disabled:opacity-50"
            >
              {isBooked ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Confirmed for {selectedSlot}!</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Demo Appointment ({selectedSlot})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
