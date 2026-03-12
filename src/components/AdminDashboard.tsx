import React from 'react';
import { ShieldAlert, Users, Activity, Settings, LogOut, Stethoscope, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

const RISK_DISTRIBUTION = [
  { name: 'Low Risk', value: 65 },
  { name: 'Medium Risk', value: 25 },
  { name: 'High Risk', value: 10 },
];

const ALERT_TRENDS = [
  { name: 'Mon', alerts: 12 },
  { name: 'Tue', alerts: 19 },
  { name: 'Wed', alerts: 15 },
  { name: 'Thu', alerts: 22 },
  { name: 'Fri', alerts: 18 },
  { name: 'Sat', alerts: 10 },
  { name: 'Sun', alerts: 8 },
];

const RECENT_ALERTS = [
  { id: 1, patient: 'John Doe', doctor: 'Dr. Smith', risk: 85, status: 'Pending', time: '10 mins ago' },
  { id: 2, patient: 'Jane Roe', doctor: 'Dr. Jones', risk: 92, status: 'Acknowledged', time: '25 mins ago' },
  { id: 3, patient: 'Bob Brown', doctor: 'Dr. Smith', risk: 78, status: 'Resolved', time: '1 hour ago' },
  { id: 4, patient: 'Alice Green', doctor: 'Dr. White', risk: 88, status: 'Pending', time: '2 hours ago' },
];

export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500">System Overview & Global Monitoring</p>
        </div>
      </div>

      {/* System Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { label: 'Total Doctors', value: '24', icon: Stethoscope, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Total Patients', value: '1,240', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Sessions', value: '856', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Alerts Today', value: '42', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'High Risk Cases', value: '12', icon: ShieldAlert, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'System Accuracy', value: '98.2%', icon: CheckCircle, color: 'text-teal-600', bg: 'bg-teal-50' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100"
          >
            <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center ${stat.color} mb-3`}>
              <stat.icon size={20} />
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Global Risk Distribution */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
        >
          <h3 className="text-lg font-bold text-slate-900 mb-6">Global Risk Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={RISK_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {RISK_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Daily Alert Trends */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 lg:col-span-2"
        >
          <h3 className="text-lg font-bold text-slate-900 mb-6">Daily Alert Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ALERT_TRENDS}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="alerts" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, fill: '#f43f5e', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Critical Alerts Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">Recent Critical Alerts</h3>
          <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700">View All Alerts</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Doctor</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Risk Level</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ALERTS.map((alert) => (
                <tr key={alert.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-900">{alert.patient}</td>
                  <td className="py-3 px-4 text-slate-600">{alert.doctor}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      alert.risk >= 90 ? 'bg-rose-100 text-rose-800' : 
                      alert.risk >= 70 ? 'bg-orange-100 text-orange-800' : 
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {alert.risk}% Risk
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      alert.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      alert.status === 'Acknowledged' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {alert.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-sm flex items-center gap-1">
                    <Clock size={14} />
                    {alert.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
