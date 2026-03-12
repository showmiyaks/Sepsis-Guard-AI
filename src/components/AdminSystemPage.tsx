import React from 'react';
import { Activity, Server, Database, Cpu, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const LATENCY_DATA = [
  { time: '10:00', latency: 45 },
  { time: '10:05', latency: 50 },
  { time: '10:10', latency: 48 },
  { time: '10:15', latency: 52 },
  { time: '10:20', latency: 120 },
  { time: '10:25', latency: 55 },
  { time: '10:30', latency: 49 },
  { time: '10:35', latency: 47 },
];

export const AdminSystemPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Control</h1>
          <p className="text-slate-500">AI Model Status & Server Health</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
          <RefreshCw size={18} />
          Refresh Status
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
              <Cpu size={24} />
            </div>
            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full">Active</span>
          </div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">AI Model Version</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">v2.4.1</p>
          <p className="text-xs text-slate-400 mt-2">Last updated: 2 days ago</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <CheckCircle size={24} />
            </div>
            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full">98.2%</span>
          </div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Model Accuracy</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">High Precision</p>
          <p className="text-xs text-slate-400 mt-2">Based on last 10k predictions</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <Server size={24} />
            </div>
            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full">Healthy</span>
          </div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Server Status</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">Online</p>
          <p className="text-xs text-slate-400 mt-2">Uptime: 99.99%</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
              <Database size={24} />
            </div>
            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full">45ms</span>
          </div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Avg Latency</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">Fast</p>
          <p className="text-xs text-slate-400 mt-2">Data processing speed</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">System Latency (ms)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={LATENCY_DATA}>
                <defs>
                  <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="latency" stroke="#6366f1" fillOpacity={1} fill="url(#colorLatency)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
          <h3 className="text-lg font-bold text-slate-900">Quick Actions</h3>
          
          <div className="space-y-4">
            <button className="w-full p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors text-left flex items-center justify-between group">
              <div>
                <p className="font-bold text-slate-900">Retrain Model</p>
                <p className="text-xs text-slate-500">Trigger manual training cycle</p>
              </div>
              <RefreshCw size={18} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </button>

            <button className="w-full p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors text-left flex items-center justify-between group">
              <div>
                <p className="font-bold text-slate-900">System Diagnostics</p>
                <p className="text-xs text-slate-500">Run full health check</p>
              </div>
              <Activity size={18} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </button>

            <button className="w-full p-4 rounded-2xl bg-rose-50 hover:bg-rose-100 transition-colors text-left flex items-center justify-between group">
              <div>
                <p className="font-bold text-rose-900">Emergency Stop</p>
                <p className="text-xs text-rose-700">Disable monitoring system</p>
              </div>
              <AlertTriangle size={18} className="text-rose-400 group-hover:text-rose-600 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
