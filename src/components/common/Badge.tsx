import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'normal' | 'low' | 'high' | 'borderline' | 'verified' | 'unverified' | 'brand' | 'gray';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'brand',
  size = 'sm',
  className = ''
}) => {
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm font-medium';

  const variantClasses = {
    normal: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    low: 'bg-amber-50 text-amber-800 border border-amber-200',
    high: 'bg-rose-50 text-rose-700 border border-rose-200',
    borderline: 'bg-amber-50 text-amber-700 border border-amber-200',
    verified: 'bg-teal-50 text-teal-800 border border-teal-200 font-medium',
    unverified: 'bg-slate-100 text-slate-700 border border-slate-200',
    brand: 'bg-teal-50 text-teal-700 border border-teal-200',
    gray: 'bg-slate-100 text-slate-600 border border-slate-200'
  }[variant];

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};
