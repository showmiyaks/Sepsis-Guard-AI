import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatRiskLevel = (score: number) => {
  if (score < 0.3) return 'Low';
  if (score < 0.7) return 'Moderate';
  return 'High';
};

export const getRiskColor = (level: string) => {
  switch (level) {
    case 'Low': return 'text-emerald-500 bg-emerald-50 border-emerald-100';
    case 'Moderate': return 'text-amber-500 bg-amber-50 border-amber-100';
    case 'High': return 'text-rose-500 bg-rose-50 border-rose-100';
    default: return 'text-slate-500 bg-slate-50 border-slate-100';
  }
};
