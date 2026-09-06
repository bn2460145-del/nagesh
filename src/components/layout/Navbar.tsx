import React from 'react';
import { 
  HeartHandshake, 
  FileText, 
  Search, 
  Bot, 
  Bell, 
  History, 
  ShieldCheck, 
  User, 
  AlertOctagon, 
  Sparkles,
  Info,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { PatientProfile } from '../../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  patient: PatientProfile;
  isLoggedIn: boolean;
  onLogout: () => void;
  onOpenDemoTour: () => void;
  onEmergencyClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  patient,
  isLoggedIn,
  onLogout,
  onOpenDemoTour,
  onEmergencyClick
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HeartHandshake },
    { id: 'reports', label: 'My Reports', icon: FileText },
    { id: 'discovery', label: 'Find Care', icon: Search },
    { id: 'companion', label: 'AI Companion', icon: Bot },
    { id: 'reminders', label: 'Reminders', icon: Bell },
    { id: 'timeline', label: 'Health Timeline', icon: History },
    { id: 'consent', label: 'Consent', icon: ShieldCheck },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top micro-announcement banner */}
      <div className="bg-slate-900 text-slate-300 text-[11px] sm:text-xs py-1 px-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2 truncate">
          <span className="inline-block w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          <span className="font-medium text-white">CareSaathi:</span>
          <span className="text-slate-300 truncate hidden md:inline">Patient-facing intelligence layer on India’s digital health ecosystem.</span>
          <span className="inline-flex items-center gap-1 font-mono text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>API & SQLite: Online (Port 5000)</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenDemoTour}
            className="hidden sm:inline-flex items-center gap-1.5 text-teal-300 hover:text-teal-200 font-semibold transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Demo Tour (18 Steps)</span>
          </button>
          <button 
            onClick={() => setActiveTab('about')}
            className="text-slate-400 hover:text-white transition flex items-center gap-1"
          >
            <Info className="w-3 h-3" />
            <span>Safety & Architecture</span>
          </button>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab(isLoggedIn ? 'dashboard' : 'landing')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-teal-600 flex items-center justify-center text-white shadow-sm shadow-teal-700/20 group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-slate-900">CARE SAATHI</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 border border-teal-200">
                  MVP
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-tight -mt-0.5 hidden sm:block">
                Your health, understood
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          {isLoggedIn ? (
            <nav className="hidden xl:flex items-center gap-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      isActive 
                        ? 'bg-teal-50 text-teal-800 border border-teal-200/70 shadow-2xs' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-teal-700' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          ) : (
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <button onClick={() => setActiveTab('landing')} className="hover:text-teal-700 transition">Home</button>
              <button onClick={() => setActiveTab('about')} className="hover:text-teal-700 transition">How it Works</button>
              <button onClick={() => setActiveTab('discovery')} className="hover:text-teal-700 transition">Find Care</button>
            </div>
          )}

          {/* Right Action buttons */}
          <div className="flex items-center gap-2.5">
            {/* Emergency Button */}
            <button
              onClick={onEmergencyClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition shadow-xs"
              title="Emergency Help & Quick Dial"
            >
              <AlertOctagon className="w-4 h-4 text-rose-600 animate-pulse" />
              <span className="hidden sm:inline">Emergency Help</span>
              <span className="sm:hidden font-mono">112</span>
            </button>

            {/* Hackathon Demo Launcher Button */}
            <button
              onClick={onOpenDemoTour}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-300 text-xs font-semibold transition shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span className="hidden md:inline">Demo Tour</span>
            </button>

            {/* User Profile Pill or Auth */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-xl hover:bg-slate-100 border border-slate-200 transition text-left"
                >
                  <div className="w-7 h-7 rounded-lg bg-teal-800 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {patient.name.charAt(0)}
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-xs font-semibold text-slate-800 leading-tight">{patient.name}</p>
                    <p className="text-[10px] text-teal-700 font-mono">ABHA Connected</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3.5 py-2 border-b border-slate-100">
                      <p className="font-semibold text-slate-800">{patient.name}</p>
                      <p className="text-slate-500 font-mono text-[11px]">{patient.abhaId}</p>
                    </div>
                    <button
                      onClick={() => { setActiveTab('profile'); setDropdownOpen(false); }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>My Profile & Settings</span>
                    </button>
                    <button
                      onClick={() => { setActiveTab('consent'); setDropdownOpen(false); }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-slate-400" />
                      <span>Consent & Privacy Trail</span>
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => { onLogout(); setDropdownOpen(false); }}
                      className="w-full text-left px-3.5 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('login')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition"
                >
                  Log In
                </button>
                <button
                  onClick={() => setActiveTab('signup')}
                  className="px-3.5 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition shadow-xs"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
