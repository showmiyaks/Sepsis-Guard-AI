import React, { useState } from 'react';
import { Settings, Bell, Shield, Lock, Sliders, Save, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export const AdminSettingsPage = () => {
  const [thresholds, setThresholds] = useState({
    low: 30,
    medium: 70
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
          <p className="text-slate-500">Configure global parameters and security</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Risk Thresholds */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600">
                <Sliders size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Risk Thresholds</h3>
                <p className="text-sm text-slate-500">Adjust sensitivity for AI risk classification</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold text-slate-700">Low Risk Cutoff (%)</label>
                  <span className="text-sm font-bold text-emerald-600">0 - {thresholds.low}%</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="50" 
                  value={thresholds.low}
                  onChange={(e) => setThresholds({ ...thresholds, low: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold text-slate-700">Medium Risk Cutoff (%)</label>
                  <span className="text-sm font-bold text-amber-600">{thresholds.low + 1} - {thresholds.medium}%</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="90" 
                  value={thresholds.medium}
                  onChange={(e) => setThresholds({ ...thresholds, medium: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div className="p-4 bg-rose-50 rounded-xl border border-rose-100 flex items-start gap-3">
                <AlertTriangle className="text-rose-500 shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-sm font-bold text-rose-900">High Risk Zone</p>
                  <p className="text-xs text-rose-700 mt-1">
                    Any score above {thresholds.medium}% will trigger immediate critical alerts to assigned doctors.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Notification Settings */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <Bell size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">System Notifications</h3>
                <p className="text-sm text-slate-500">Configure global alert delivery channels</p>
              </div>
            </div>

            <div className="space-y-4">
              {['Email Alerts for High Risk', 'SMS Alerts for Critical Cases', 'In-App Push Notifications', 'Daily Summary Reports'].map((setting, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <span className="text-sm font-bold text-slate-700">{setting}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="space-y-8">
          {/* Security Settings */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Security</h3>
                <p className="text-sm text-slate-500">Access control & permissions</p>
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-bold text-slate-700 flex items-center justify-between transition-colors">
                <span>Change Admin Password</span>
                <Lock size={16} />
              </button>
              <button className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-bold text-slate-700 flex items-center justify-between transition-colors">
                <span>Manage API Keys</span>
                <Settings size={16} />
              </button>
              <button className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-bold text-slate-700 flex items-center justify-between transition-colors">
                <span>View Audit Logs</span>
                <Shield size={16} />
              </button>
            </div>
          </motion.div>

          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">System Version</p>
            <p className="text-lg font-bold text-slate-900">SepsisGuard AI v2.4.1</p>
            <p className="text-xs text-slate-500 mt-1">Build 2023.10.25</p>
          </div>
        </div>
      </div>
    </div>
  );
};
