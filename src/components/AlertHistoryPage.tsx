import React, { useState } from 'react';
import { Alert, RiskLevel } from '../types';
import { getRiskColor } from '../utils';
import { Search, Filter, ChevronLeft, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '../utils';

export const AlertHistoryPage = ({ alerts }: { alerts: Alert[] }) => {
  const [filter, setFilter] = useState<RiskLevel | 'All'>('All');
  
  const filteredAlerts = filter === 'All' ? alerts : alerts.filter(a => a.level === filter);

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Alert History</h2>
          <p className="text-slate-500">Historical record of all triggered physiological alerts.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search alerts..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-rose-500/20 w-64"
            />
          </div>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 outline-none"
          >
            <option value="All">All Severities</option>
            <option value="High">High Risk</option>
            <option value="Moderate">Moderate</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </header>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date & Time</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Risk Score</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Severity</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Triggered By</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Doc Notified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredAlerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">{new Date(alert.timestamp).toLocaleDateString()}</p>
                    <p className="text-[10px] text-slate-500">{new Date(alert.timestamp).toLocaleTimeString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900">{(alert.score * 100).toFixed(0)}%</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full uppercase", getRiskColor(alert.level))}>
                      {alert.level}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {alert.triggeredParameters.map((p, i) => (
                        <span key={i} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {alert.status === 'Resolved' ? (
                        <CheckCircle2 size={14} className="text-emerald-500" />
                      ) : (
                        <AlertCircle size={14} className="text-rose-500 animate-pulse" />
                      )}
                      <span className={cn("text-xs font-bold", alert.status === 'Resolved' ? "text-emerald-600" : "text-rose-600")}>
                        {alert.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("text-xs font-medium", alert.doctorNotified ? "text-slate-900" : "text-slate-400")}>
                      {alert.doctorNotified ? 'Yes' : 'No'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">Showing {filteredAlerts.length} alerts</p>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-slate-400 hover:text-slate-900 disabled:opacity-30" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-slate-400 hover:text-slate-900 disabled:opacity-30" disabled>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
