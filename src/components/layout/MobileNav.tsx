import React from 'react';
import { HeartHandshake, FileText, Search, Bot, Bell, User } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLoggedIn: boolean;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  setActiveTab,
  isLoggedIn
}) => {
  if (!isLoggedIn) return null;

  const items = [
    { id: 'dashboard', label: 'Home', icon: HeartHandshake },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'discovery', label: 'Find Care', icon: Search },
    { id: 'companion', label: 'AI Saathi', icon: Bot },
    { id: 'reminders', label: 'Remind', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {items.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors ${
                isActive ? 'text-teal-800 font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className={`p-1 rounded-md transition ${isActive ? 'bg-teal-50' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'text-teal-700' : 'text-slate-500'}`} />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
