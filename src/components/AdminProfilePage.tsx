import React from 'react';
import { User, Mail, Phone, Shield, MapPin, Calendar, Edit2, Key } from 'lucide-react';
import { motion } from 'motion/react';

export const AdminProfilePage = () => {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Profile</h2>
        <p className="text-slate-500">Manage your administrative account details.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center"
        >
          <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6 relative group">
            <User size={64} />
            <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors">
              <Edit2 size={16} />
            </button>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">System Administrator</h3>
          <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mt-1">Super Admin</p>
          
          <div className="mt-8 w-full space-y-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-left">
              <div className="p-2 bg-white rounded-lg text-slate-400">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Email</p>
                <p className="text-sm font-bold text-slate-900">admin@sepsisguard.ai</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-left">
              <div className="p-2 bg-white rounded-lg text-slate-400">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Phone</p>
                <p className="text-sm font-bold text-slate-900">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-left">
              <div className="p-2 bg-white rounded-lg text-slate-400">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Location</p>
                <p className="text-sm font-bold text-slate-900">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Details & Activity */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Account Security</h3>
              <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700">Edit Settings</button>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-100 rounded-2xl flex items-start gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <Shield size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">2FA Enabled</p>
                  <p className="text-xs text-slate-500 mt-1">Two-factor authentication is active via Authenticator App.</p>
                </div>
              </div>
              <div className="p-4 border border-slate-100 rounded-2xl flex items-start gap-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                  <Key size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Password</p>
                  <p className="text-xs text-slate-500 mt-1">Last changed 30 days ago. Strong password set.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {[
                { action: 'System Update', detail: 'Deployed v2.4.1 patch', time: '2 hours ago', icon: Shield, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { action: 'User Management', detail: 'Added Dr. Sarah Smith', time: '5 hours ago', icon: User, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { action: 'Security Alert', detail: 'Failed login attempt blocked', time: '1 day ago', icon: Key, color: 'text-rose-600', bg: 'bg-rose-50' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${item.bg} rounded-full flex items-center justify-center ${item.color}`}>
                    <item.icon size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">{item.action}</p>
                    <p className="text-xs text-slate-500">{item.detail}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-400">{item.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
