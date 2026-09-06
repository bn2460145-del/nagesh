import React, { useState } from 'react';
import { HeartHandshake, User, Lock, Mail, Phone, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SignupFormProps {
  onSignupSuccess: () => void;
  onSwitchToLogin: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  onSignupSuccess,
  onSwitchToLogin
}) => {
  const [name, setName] = useState('Rahul Sharma');
  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [phone, setPhone] = useState('+91 98450 12345');
  const [password, setPassword] = useState('password123');
  const [abhaId, setAbhaId] = useState('91-4820-1928-3841');
  const [hasConsent, setHasConsent] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasConsent) {
      alert('Please check the consent box to proceed in compliance with DPDP regulations.');
      return;
    }
    onSignupSuccess();
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 sm:p-8 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-teal-700 text-white mx-auto flex items-center justify-center shadow-md shadow-teal-700/20">
          <HeartHandshake className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create Your Account</h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Join CareSaathi to manage and understand your health records
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-teal-600 focus:outline-hidden transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-teal-600 focus:outline-hidden transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-teal-600 focus:outline-hidden transition"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-teal-600 focus:outline-hidden transition"
            />
          </div>
        </div>

        {/* Optional ABHA ID field */}
        <div className="p-3.5 bg-teal-50/70 border border-teal-200 rounded-xl space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-teal-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
              <span>Ayushman Bharat Health Account (ABHA ID)</span>
            </label>
            <span className="text-[10px] text-teal-700 font-mono bg-teal-100 px-1.5 py-0.5 rounded">
              Optional
            </span>
          </div>
          <input
            type="text"
            value={abhaId}
            onChange={(e) => setAbhaId(e.target.value)}
            placeholder="14-digit ABHA (e.g. 91-4820-1928-3841) or abhaAddress@abdm"
            className="w-full px-3 py-2 bg-white border border-teal-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-teal-600 focus:outline-hidden transition"
          />
          <p className="text-[11px] text-teal-800 leading-tight">
            Connects your health records across verified ABDM health locker repositories.
          </p>
        </div>

        {/* Mandatory DPDP Consent Checkbox */}
        <div className="flex items-start gap-2.5 pt-1">
          <input
            type="checkbox"
            id="dpdp-consent"
            checked={hasConsent}
            onChange={(e) => setHasConsent(e.target.checked)}
            className="mt-1 w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
          />
          <label htmlFor="dpdp-consent" className="text-xs text-slate-600 leading-relaxed cursor-pointer select-none">
            I consent to CareSaathi processing my uploaded health data strictly under patient-controlled permissions as governed by the Digital Personal Data Protection (DPDP) Act 2023. I understand that CareSaathi provides health information and does not provide medical diagnosis.
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-teal-700/20 flex items-center justify-center gap-2 transition"
        >
          <span>Create Account & Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
        Already registered?{' '}
        <button
          onClick={onSwitchToLogin}
          className="text-teal-700 font-semibold hover:underline"
        >
          Sign in here
        </button>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
        <span>Your data remains 100% private and under your consent.</span>
      </div>
    </div>
  );
};
