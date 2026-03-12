import React from 'react';
import { FileText, Download, Calendar, Filter, BarChart3, Users, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

const REPORTS = [
  { id: 1, title: 'Monthly System Summary', type: 'System', date: 'Oct 2023', size: '2.4 MB', icon: BarChart3, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 2, title: 'Doctor Performance Report', type: 'Performance', date: 'Oct 2023', size: '1.8 MB', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 3, title: 'Critical Alerts Log', type: 'Audit', date: 'Last 30 Days', size: '5.2 MB', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
  { id: 4, title: 'AI Accuracy Analysis', type: 'Technical', date: 'Q3 2023', size: '3.1 MB', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
];

export const AdminReportsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports & Exports</h1>
          <p className="text-slate-500">Generate and download system reports</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
          <FileText size={18} />
          Generate New Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 col-span-1 md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Recent Reports</h3>
            <button className="text-sm font-bold text-slate-500 hover:text-slate-700 flex items-center gap-1">
              <Filter size={14} />
              Filter
            </button>
          </div>
          
          <div className="space-y-4">
            {REPORTS.map((report, index) => (
              <motion.div 
                key={report.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${report.bg} rounded-xl flex items-center justify-center ${report.color}`}>
                    <report.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{report.title}</h4>
                    <p className="text-xs text-slate-500">{report.type} • {report.date} • {report.size}</p>
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                  <Download size={20} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Export</h3>
            <p className="text-sm text-slate-500 mb-6">Download raw data for external analysis.</p>
            
            <div className="space-y-3">
              <button className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-bold text-slate-700 flex items-center justify-between transition-colors">
                <span>Export Patient Data (CSV)</span>
                <Download size={16} />
              </button>
              <button className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-bold text-slate-700 flex items-center justify-between transition-colors">
                <span>Export Alert Logs (JSON)</span>
                <Download size={16} />
              </button>
              <button className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-bold text-slate-700 flex items-center justify-between transition-colors">
                <span>Export System Audit (PDF)</span>
                <Download size={16} />
              </button>
            </div>
          </div>

          <div className="bg-indigo-600 p-6 rounded-3xl shadow-lg shadow-indigo-200 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2">Scheduled Reports</h3>
              <p className="text-indigo-100 text-sm mb-4">Monthly summary will be generated in 3 days.</p>
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-sm font-bold transition-colors">
                Manage Schedule
              </button>
            </div>
            <Calendar className="absolute -bottom-4 -right-4 text-white/10 w-32 h-32" />
          </div>
        </div>
      </div>
    </div>
  );
};
