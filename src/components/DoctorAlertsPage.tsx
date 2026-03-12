import React, { useState } from 'react';
import { Alert, RiskLevel } from '../types';
import { getRiskColor } from '../utils';
import { Search, Filter, AlertCircle, CheckCircle2, Eye, Bell, MessageSquare } from 'lucide-react';
import { cn } from '../utils';

export const DoctorAlertsPage = ({ alerts }: { alerts: Alert[] }) => {
  const [filter, setFilter] = useState<RiskLevel | 'All'>('All');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const filteredAlerts = filter === 'All' ? alerts : alerts.filter(a => a.level === filter);

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Risk Alerts</h2>
          <p className="text-slate-500">Active and historical sepsis risk alerts across your patient population.</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 outline-none"
          >
            <option value="All">All Severities</option>
            <option value="High">High Risk</option>
            <option value="Moderate">Moderate</option>
          </select>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Patient</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Risk Score</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Time Detected</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Duration</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredAlerts.map((alert) => (
                  <tr 
                    key={alert.id} 
                    onClick={() => setSelectedAlert(alert)}
                    className={cn(
                      "hover:bg-slate-50/50 transition-colors cursor-pointer group",
                      selectedAlert?.id === alert.id ? "bg-slate-50" : ""
                    )}
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-900">{alert.patientName}</p>
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full uppercase", getRiskColor(alert.level))}>
                        {alert.level}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-900">{(alert.score * 100).toFixed(0)}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-medium text-slate-600">{new Date(alert.timestamp).toLocaleTimeString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-medium text-slate-600">{alert.durationHighRisk || 'N/A'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 text-slate-400 hover:text-rose-600 transition-colors">
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          {selectedAlert ? (
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-8 sticky top-24">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Alert Details</h3>
                <span className={cn("text-[10px] font-bold px-3 py-1 rounded-full uppercase", getRiskColor(selectedAlert.level))}>
                  {selectedAlert.level}
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Triggered Parameters</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedAlert.triggeredParameters.map((p, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Risk Score</p>
                    <p className="text-xl font-bold text-slate-900">{(selectedAlert.score * 100).toFixed(0)}%</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Duration</p>
                    <p className="text-xl font-bold text-slate-900">{selectedAlert.durationHighRisk || '&lt; 5m'}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                    <CheckCircle2 size={18} />
                    Mark as Reviewed
                  </button>
                  <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                    <MessageSquare size={18} />
                    Request Patient Check-in
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
              <AlertCircle size={48} className="text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium">Select an alert to view detailed breakdown and take action.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
