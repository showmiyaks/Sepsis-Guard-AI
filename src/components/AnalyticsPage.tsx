import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  ReferenceLine
} from 'recharts';
import { Patient, RiskLevel } from '../types';
import { formatRiskLevel, getRiskColor } from '../utils';
import { Info, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../utils';

const ChartCard = ({ title, data, dataKey, unit, color, domain, threshold }: { 
  title: string, 
  data: any[], 
  dataKey: string, 
  unit: string, 
  color: string, 
  domain?: [number, number],
  threshold?: number
}) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{title}</h4>
      <span className="text-xs font-medium text-slate-400">{unit}</span>
    </div>
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="timestamp" hide />
          <YAxis hide domain={domain || ['auto', 'auto']} />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            labelFormatter={(label) => new Date(label).toLocaleTimeString()}
          />
          {threshold && (
            <ReferenceLine y={threshold} stroke="#f43f5e" strokeDasharray="3 3" />
          )}
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={2.5} 
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const AnalyticsPage = ({ patient }: { patient: Patient }) => {
  const [timeRange, setTimeRange] = useState('6h');
  
  const getTrendIcon = (trend: string) => {
    if (trend === 'rising') return <TrendingUp size={16} className="text-rose-500" />;
    if (trend === 'falling') return <TrendingDown size={16} className="text-emerald-500" />;
    return <Minus size={16} className="text-slate-400" />;
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Detailed Analytics</h2>
          <p className="text-slate-500">In-depth physiological trends and AI risk progression.</p>
        </div>
        <div className="flex items-center gap-2">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-rose-500/20"
          >
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>
        </div>
      </header>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">AI Risk Score Progression</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="text-xs font-medium text-slate-500">High Risk (&gt;0.7)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-xs font-medium text-slate-500">Moderate Risk (0.3-0.7)</span>
                </div>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={patient.vitalsHistory}>
                  <defs>
                    <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="timestamp" hide />
                  <YAxis domain={[0, 1]} hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    labelFormatter={(label) => new Date(label).toLocaleTimeString()}
                  />
                  <ReferenceLine y={0.7} stroke="#f43f5e" strokeDasharray="3 3" label={{ position: 'right', value: 'High', fill: '#f43f5e', fontSize: 10 }} />
                  <ReferenceLine y={0.3} stroke="#f59e0b" strokeDasharray="3 3" label={{ position: 'right', value: 'Mod', fill: '#f59e0b', fontSize: 10 }} />
                  <Area 
                    type="monotone" 
                    dataKey="heartRate" // Using HR as proxy for risk score in dummy data
                    stroke="#f43f5e" 
                    fillOpacity={1} 
                    fill="url(#riskGradient)" 
                    strokeWidth={3} 
                    baseValue={0}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <ChartCard title="Heart Rate" data={patient.vitalsHistory} dataKey="heartRate" unit="BPM" color="#f43f5e" threshold={100} />
            <ChartCard title="SpO2" data={patient.vitalsHistory} dataKey="spo2" unit="%" color="#6366f1" threshold={94} />
            <ChartCard title="Resp Rate" data={patient.vitalsHistory} dataKey="respiratoryRate" unit="RPM" color="#10b981" threshold={20} />
            <ChartCard title="Skin Temp" data={patient.vitalsHistory} dataKey="skinTemp" unit="°C" color="#f59e0b" threshold={38} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Risk Summary</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Current Score</span>
                <span className="text-2xl font-bold text-slate-900">{(patient.currentRisk.score * 100).toFixed(0)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Category</span>
                <span className={cn("text-xs font-bold px-3 py-1 rounded-full uppercase", getRiskColor(patient.currentRisk.level))}>
                  {patient.currentRisk.level}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Trend</span>
                <div className="flex items-center gap-1">
                  {getTrendIcon(patient.currentRisk.trend)}
                  <span className="text-sm font-bold text-slate-900 capitalize">{patient.currentRisk.trend}</span>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Last Updated</p>
                <p className="text-xs font-medium text-slate-600">{new Date(patient.lastUpdate).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-rose-600 p-6 rounded-[2rem] text-white shadow-lg shadow-rose-200">
            <div className="flex items-center gap-2 mb-4">
              <Info size={18} />
              <h4 className="text-sm font-bold uppercase tracking-wider">AI Explanation</h4>
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              "Slight elevation in heart rate combined with a downward trend in HRV over the last 4 hours contributed to a minor increase in risk score. Respiratory stability remains excellent."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
