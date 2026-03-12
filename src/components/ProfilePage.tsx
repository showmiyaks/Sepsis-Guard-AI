import React, { useState } from 'react';
import { PatientProfile } from '../types';
import { User, Mail, Phone, Calendar, Heart, Activity, Thermometer, ShieldAlert, Save } from 'lucide-react';
import { cn } from '../utils';

export const ProfilePage = ({ profile }: { profile: PatientProfile }) => {
  const [formData, setFormData] = useState(profile);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Patient Profile</h2>
          <p className="text-slate-500">Manage your personal information and medical background.</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-200"
        >
          {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
          Save Profile
        </button>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Personal Info */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <User size={20} className="text-rose-600" />
              <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  value={formData.fullName} 
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-rose-500/20 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Age</label>
                <input 
                  type="number" 
                  value={formData.age} 
                  onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-rose-500/20 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-rose-500/20 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone Number</label>
                <input 
                  type="tel" 
                  value={formData.phone} 
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-rose-500/20 outline-none" 
                />
              </div>
            </div>
          </section>

          {/* Medical Background */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <Activity size={20} className="text-rose-600" />
              <h3 className="text-lg font-bold text-slate-900">Medical Background</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { id: 'diabetes', label: 'Diabetes' },
                { id: 'hypertension', label: 'Hypertension' },
                { id: 'recentSurgery', label: 'Recent Surgery' },
                { id: 'immunocompromised', label: 'Immunocompromised' },
              ].map((item) => (
                <label key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
                  <span className="text-sm font-bold text-slate-700">{item.label}</span>
                  <input 
                    type="checkbox" 
                    checked={(formData.medicalBackground as any)[item.id]} 
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      medicalBackground: {
                        ...prev.medicalBackground,
                        [item.id]: e.target.checked
                      }
                    }))}
                    className="w-5 h-5 accent-rose-600 rounded"
                  />
                </label>
              ))}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Chronic Conditions</label>
              <textarea 
                rows={3}
                value={formData.medicalBackground.chronicConditions}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  medicalBackground: {
                    ...prev.medicalBackground,
                    chronicConditions: e.target.value
                  }
                }))}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-rose-500/20 outline-none resize-none"
              />
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* Baseline Vitals */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <Heart size={20} className="text-rose-600" />
              <h3 className="text-lg font-bold text-slate-900">Baseline Vitals</h3>
            </div>
            <div className="space-y-4">
              {[
                { id: 'restingHR', label: 'Resting HR', unit: 'BPM', icon: Activity },
                { id: 'restingRR', label: 'Resting RR', unit: 'RPM', icon: Activity },
                { id: 'restingTemp', label: 'Resting Temp', unit: '°C', icon: Thermometer },
                { id: 'restingSpO2', label: 'Resting SpO2', unit: '%', icon: ShieldAlert },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <item.icon size={14} className="text-slate-400" />
                    <span className="text-xs font-bold text-slate-500 uppercase">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <input 
                      type="number" 
                      value={(formData.baselineVitals as any)[item.id]} 
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        baselineVitals: {
                          ...prev.baselineVitals,
                          [item.id]: parseFloat(e.target.value) || 0
                        }
                      }))}
                      className="w-16 text-right font-bold text-slate-900 bg-transparent outline-none"
                    />
                    <span className="text-[10px] text-slate-400">{item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed italic">
              * Baseline vitals are used to calibrate the AI risk model for your specific physiology.
            </p>
          </section>

          {/* Emergency Contact */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <Phone size={20} className="text-rose-600" />
              <h3 className="text-lg font-bold text-slate-900">Emergency Contact</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Name</label>
                <input 
                  type="text" 
                  value={formData.emergencyContact.name} 
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    emergencyContact: {
                      ...prev.emergencyContact,
                      name: e.target.value
                    }
                  }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Relation</label>
                <input 
                  type="text" 
                  value={formData.emergencyContact.relation} 
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    emergencyContact: {
                      ...prev.emergencyContact,
                      relation: e.target.value
                    }
                  }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Phone</label>
                <input 
                  type="tel" 
                  value={formData.emergencyContact.phone} 
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    emergencyContact: {
                      ...prev.emergencyContact,
                      phone: e.target.value
                    }
                  }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none" 
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
