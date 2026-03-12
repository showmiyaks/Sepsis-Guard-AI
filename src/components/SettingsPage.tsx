import React, { useState } from 'react';
import { Bell, Shield, Share2, Watch, RefreshCw, Smartphone, Mail, MessageSquare } from 'lucide-react';
import { cn } from '../utils';

export const SettingsPage = () => {
  const [sensitivity, setSensitivity] = useState('balanced');
  const [notifications, setNotifications] = useState({
    sms: true,
    email: true,
    push: true,
    autoNotify: true
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h2>
        <p className="text-slate-500">Configure your monitoring preferences and notification alerts.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Alert Sensitivity */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <Shield size={20} className="text-rose-600" />
              <h3 className="text-lg font-bold text-slate-900">Alert Sensitivity</h3>
            </div>
            <div className="space-y-3">
              {[
                { id: 'conservative', label: 'Conservative', desc: 'Fewer alerts, higher threshold for detection.' },
                { id: 'balanced', label: 'Balanced', desc: 'Recommended for most patients.' },
                { id: 'aggressive', label: 'Aggressive', desc: 'Early alerts, lower threshold for detection.' },
              ].map((item) => (
                <label key={item.id} className={cn(
                  "flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer",
                  sensitivity === item.id ? "bg-rose-50 border-rose-200" : "bg-white border-slate-100 hover:bg-slate-50"
                )}>
                  <input 
                    type="radio" 
                    name="sensitivity" 
                    checked={sensitivity === item.id}
                    onChange={() => setSensitivity(item.id)}
                    className="mt-1 w-4 h-4 accent-rose-600"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Notification Prefs */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <Bell size={20} className="text-rose-600" />
              <h3 className="text-lg font-bold text-slate-900">Notifications</h3>
            </div>
            <div className="space-y-4">
              {[
                { id: 'sms', label: 'SMS Alerts', icon: MessageSquare },
                { id: 'email', label: 'Email Alerts', icon: Mail },
                { id: 'push', label: 'Push Notifications', icon: Smartphone },
                { id: 'autoNotify', label: 'Doctor Auto-Notify', icon: Shield },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className="text-slate-400" />
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  </div>
                  <button 
                    onClick={() => setNotifications(prev => ({ ...prev, [item.id]: !(prev as any)[item.id] }))}
                    className={cn(
                      "w-12 h-6 rounded-full transition-all relative",
                      (notifications as any)[item.id] ? "bg-rose-600" : "bg-slate-200"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                      (notifications as any)[item.id] ? "right-1" : "left-1"
                    )} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* Device Connection */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <Watch size={20} className="text-rose-600" />
              <h3 className="text-lg font-bold text-slate-900">Device Connection</h3>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Connected Device</p>
                  <p className="text-lg font-bold">Apple Watch Series 9</p>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Watch size={20} />
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <p className="text-xs text-slate-400">Last Sync: 2 mins ago</p>
                <button className="flex items-center gap-2 text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors">
                  <RefreshCw size={14} />
                  Reconnect
                </button>
              </div>
            </div>
          </section>

          {/* Data Sharing */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <Share2 size={20} className="text-rose-600" />
              <h3 className="text-lg font-bold text-slate-900">Data Sharing</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Share with assigned doctor</span>
                <button className="w-10 h-5 bg-rose-600 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" /></button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Anonymized research usage</span>
                <button className="w-10 h-5 bg-slate-200 rounded-full relative"><div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" /></button>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed italic">
              Your data is encrypted and HIPAA compliant. You can revoke access at any time.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
