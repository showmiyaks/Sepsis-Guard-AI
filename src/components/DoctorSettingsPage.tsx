import React, { useState } from 'react';
import { Shield, Bell, Users, Save, Sliders, Mail, MessageSquare, Clock } from 'lucide-react';
import { cn } from '../utils';

export const DoctorSettingsPage = () => {
  const [thresholds, setThresholds] = useState({
    high: 0.7,
    moderate: 0.3,
    duration: 15
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Doctor Settings</h2>
          <p className="text-slate-500">Customize alert thresholds and notification preferences.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-200">
          <Save size={18} />
          Save Settings
        </button>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Alert Thresholds */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <Sliders size={20} className="text-rose-600" />
              <h3 className="text-lg font-bold text-slate-900">Alert Thresholds</h3>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">High Risk Threshold</label>
                  <span className="text-sm font-bold text-rose-600">{thresholds.high * 100}%</span>
                </div>
                <input 
                  type="range" min="0.5" max="0.9" step="0.05" value={thresholds.high}
                  onChange={(e) => setThresholds(prev => ({ ...prev, high: parseFloat(e.target.value) }))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Moderate Risk Threshold</label>
                  <span className="text-sm font-bold text-amber-600">{thresholds.moderate * 100}%</span>
                </div>
                <input 
                  type="range" min="0.1" max="0.5" step="0.05" value={thresholds.moderate}
                  onChange={(e) => setThresholds(prev => ({ ...prev, moderate: parseFloat(e.target.value) }))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-slate-400" />
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sustained Duration</label>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{thresholds.duration} min</span>
                </div>
                <input 
                  type="range" min="5" max="60" step="5" value={thresholds.duration}
                  onChange={(e) => setThresholds(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900"
                />
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <Bell size={20} className="text-rose-600" />
              <h3 className="text-lg font-bold text-slate-900">Notifications</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Email Alerts (Critical)', icon: Mail },
                { label: 'SMS Alerts (Critical)', icon: MessageSquare },
                { label: 'Daily Summary Report', icon: Clock },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className="text-slate-400" />
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  </div>
                  <button className="w-10 h-5 bg-rose-600 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" /></button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* Patient Assignment */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <Users size={20} className="text-rose-600" />
              <h3 className="text-lg font-bold text-slate-900">Patient Management</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">Assigned Patients</p>
                  <p className="text-xs text-slate-500">12 active patients</p>
                </div>
                <button className="text-xs font-bold text-rose-600 hover:underline">Manage List</button>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">Monitoring Priority</p>
                  <p className="text-xs text-slate-500">Sort by risk score</p>
                </div>
                <button className="text-xs font-bold text-rose-600 hover:underline">Change</button>
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <Shield size={20} className="text-rose-600" />
              <h3 className="text-lg font-bold text-slate-900">Security & Compliance</h3>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-3">
              <Shield size={20} className="text-emerald-600" />
              <div>
                <p className="text-xs font-bold text-emerald-900 uppercase">HIPAA Compliant</p>
                <p className="text-[10px] text-emerald-700">All data is encrypted end-to-end.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
