import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from 'recharts';
import { GLOBAL_STATS } from '../mockData';
import { Users, Activity, AlertCircle, Clock, TrendingUp } from 'lucide-react';
import { cn } from '../utils';

const StatCard = ({ label, value, icon: Icon, color, subtext }: { label: string, value: string | number, icon: any, color: string, subtext?: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className={cn("p-3 rounded-xl", color)}>
        <Icon size={24} className="text-white" />
      </div>
      {subtext && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{subtext}</span>}
    </div>
    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-3xl font-bold text-slate-900">{value}</p>
  </div>
);

export const DoctorGlobalAnalytics = () => {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Global Analytics</h2>
        <p className="text-slate-500">Population-level monitoring overview and risk distribution.</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Patients" value={GLOBAL_STATS.totalPatients} icon={Users} color="bg-indigo-600" />
        <StatCard label="Active Monitoring" value={GLOBAL_STATS.activeMonitoring} icon={Activity} color="bg-emerald-600" subtext="Live" />
        <StatCard label="High Risk Today" value={GLOBAL_STATS.highRiskToday} icon={AlertCircle} color="bg-rose-600" subtext="Priority" />
        <StatCard label="Alerts (24h)" value={GLOBAL_STATS.alerts24h} icon={Clock} color="bg-amber-600" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-8">Risk Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={GLOBAL_STATS.riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {GLOBAL_STATS.riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {GLOBAL_STATS.riskDistribution.map((item) => (
              <div key={item.name} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{item.name}</span>
                </div>
                <p className="text-lg font-bold text-slate-900">{item.value}%</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900">Alert Trends (Last 7 Days)</h3>
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold">
              <TrendingUp size={14} />
              +12% from last week
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={GLOBAL_STATS.alertTrends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94a3b8' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="alerts" fill="#f43f5e" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-8">Average Vitals Overview (Population)</h3>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500 uppercase">Heart Rate</span>
              <span className="text-sm font-bold text-slate-900">78 BPM</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-rose-500 rounded-full" style={{ width: '78%' }} />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500 uppercase">Resp Rate</span>
              <span className="text-sm font-bold text-slate-900">18 RPM</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '60%' }} />
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500 uppercase">SpO2</span>
              <span className="text-sm font-bold text-slate-900">97%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: '97%' }} />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500 uppercase">Skin Temp</span>
              <span className="text-sm font-bold text-slate-900">36.8°C</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '45%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
