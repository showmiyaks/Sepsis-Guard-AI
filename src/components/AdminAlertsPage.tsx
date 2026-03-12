import React, { useState } from 'react';
import { Search, Filter, AlertCircle, CheckCircle, Clock, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

const MOCK_ALERTS = [
  { id: 1, patient: 'John Doe', doctor: 'Dr. Sarah Smith', risk: 85, status: 'Pending', time: '10 mins ago', type: 'High Risk' },
  { id: 2, patient: 'Jane Roe', doctor: 'Dr. James Wilson', risk: 92, status: 'Acknowledged', time: '25 mins ago', type: 'Critical' },
  { id: 3, patient: 'Bob Brown', doctor: 'Dr. Sarah Smith', risk: 78, status: 'Resolved', time: '1 hour ago', type: 'Medium Risk' },
  { id: 4, patient: 'Alice Green', doctor: 'Dr. Emily Brown', risk: 88, status: 'Pending', time: '2 hours ago', type: 'High Risk' },
  { id: 5, patient: 'Charlie Black', doctor: 'Dr. Michael Chen', risk: 45, status: 'Resolved', time: '3 hours ago', type: 'Low Risk' },
  { id: 6, patient: 'Diana Prince', doctor: 'Dr. James Wilson', risk: 95, status: 'Pending', time: '4 hours ago', type: 'Critical' },
];

export const AdminAlertsPage = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlerts = MOCK_ALERTS.filter(alert => {
    const matchesSearch = alert.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          alert.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || alert.status.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Alert Management</h1>
          <p className="text-slate-500">Audit and manage system-wide alerts</p>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filter Status:</span>
           <select 
            className="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-rose-500 focus:border-rose-500 block p-2.5 outline-none font-bold"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
           >
            <option value="all">All Alerts</option>
            <option value="pending">Pending</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search alerts by patient or doctor..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Alert Type</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Doctor</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Risk Level</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Time</th>
                <th className="text-right py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlerts.map((alert, index) => (
                <motion.tr 
                  key={alert.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <ShieldAlert size={18} className={
                        alert.risk >= 90 ? 'text-rose-600' : 
                        alert.risk >= 70 ? 'text-amber-600' : 
                        'text-emerald-600'
                      } />
                      <span className="font-bold text-slate-900">{alert.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-900">{alert.patient}</td>
                  <td className="py-4 px-6 text-slate-600">{alert.doctor}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      alert.risk >= 90 ? 'bg-rose-100 text-rose-800' : 
                      alert.risk >= 70 ? 'bg-orange-100 text-orange-800' : 
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {alert.risk}% Risk
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      alert.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      alert.status === 'Acknowledged' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {alert.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500 text-sm flex items-center gap-1">
                    <Clock size={14} />
                    {alert.time}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
                      Review
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
