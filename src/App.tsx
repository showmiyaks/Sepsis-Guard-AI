import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  LayoutDashboard, 
  BarChart3, 
  AlertCircle, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Stethoscope,
  ShieldAlert,
  Info,
  UserCircle,
  FileText,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { UserRole, Patient, RiskLevel } from './types';
import { MOCK_PATIENTS, CURRENT_USER_PATIENT } from './mockData';
import { cn, getRiskColor, formatRiskLevel } from './utils';
import { useAuth } from './AuthContext';

// Page Components
import { AnalyticsPage } from './components/AnalyticsPage';
import { AlertHistoryPage } from './components/AlertHistoryPage';
import { ProfilePage } from './components/ProfilePage';
import { SettingsPage } from './components/SettingsPage';
import { DoctorAlertsPage } from './components/DoctorAlertsPage';
import { DoctorGlobalAnalytics } from './components/DoctorGlobalAnalytics';
import { DoctorSettingsPage } from './components/DoctorSettingsPage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { DoctorProfilePage } from './components/DoctorProfilePage';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminDoctorsPage } from './components/AdminDoctorsPage';
import { AdminPatientsPage } from './components/AdminPatientsPage';
import { AdminAlertsPage } from './components/AdminAlertsPage';
import { AdminSystemPage } from './components/AdminSystemPage';
import { AdminReportsPage } from './components/AdminReportsPage';
import { AdminSettingsPage } from './components/AdminSettingsPage';
import { AdminProfilePage } from './components/AdminProfilePage';

// --- Components ---

const Navbar = ({ onMenuClick, onAuthClick, onProfileClick, showAuthButtons = true }: { onMenuClick: () => void, onAuthClick: () => void, onProfileClick?: () => void, showAuthButtons?: boolean }) => {
  const { user, logout } = useAuth();
  
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-rose-200">
          <ShieldAlert size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">SepsisGuard <span className="text-rose-600">AI</span></span>
      </div>

      {!user && showAuthButtons && (
        <div className="hidden md:flex items-center gap-6">
          <button onClick={onAuthClick} className="text-sm font-bold text-slate-600 hover:text-rose-600 transition-colors">Sign In</button>
        </div>
      )}

      <div className="flex items-center gap-4">
        {user ? (
          <button onClick={onProfileClick} className="flex items-center gap-4 hover:bg-slate-50 p-1 pr-2 rounded-xl transition-colors">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">{user.name}</span>
              <span className="text-[10px] text-slate-500 uppercase font-bold">{user.role}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
              <UserCircle size={24} />
            </div>
          </button>
        ) : (
          showAuthButtons && (
            <button 
              onClick={onAuthClick}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all"
            >
              Sign In
            </button>
          )
        )}
        <button onClick={onMenuClick} className="md:hidden p-2 text-slate-600">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const { user, logout } = useAuth();
  
  const patientLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'alerts', label: 'Alert History', icon: AlertCircle },
    { id: 'simulation', label: 'Simulation', icon: Activity },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const doctorLinks = [
    { id: 'patients', label: 'Patients', icon: Stethoscope },
    { id: 'alerts', label: 'Risk Alerts', icon: AlertCircle },
    { id: 'analytics', label: 'Global Analytics', icon: BarChart3 },
    { id: 'profile', label: 'My Profile', icon: UserCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const adminLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'doctors', label: 'Manage Doctors', icon: Stethoscope },
    { id: 'patients', label: 'Manage Patients', icon: Users },
    { id: 'alerts', label: 'Alerts', icon: AlertCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'system', label: 'System Control', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const links = user?.role === 'patient' ? patientLinks : user?.role === 'doctor' ? doctorLinks : adminLinks;

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-[calc(100vh-64px)] fixed top-16 left-0 p-4">
      <div className="space-y-1">
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => setActiveTab(link.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200",
              activeTab === link.id 
                ? (user?.role === 'doctor' ? "bg-indigo-50 text-indigo-600 shadow-sm" : "bg-rose-50 text-rose-600 shadow-sm")
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <link.icon size={18} />
            {link.label}
          </button>
        ))}
      </div>
      <div className="mt-auto pt-4 border-t border-slate-100">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

const RiskGauge = ({ score }: { score: number }) => {
  const level = formatRiskLevel(score);
  const color = level === 'Low' ? '#10b981' : level === 'Moderate' ? '#f59e0b' : '#f43f5e';
  
  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="w-48 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[
                { value: score * 100 },
                { value: (1 - score) * 100 }
              ]}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={180}
              endAngle={0}
              paddingAngle={0}
              dataKey="value"
            >
              <Cell fill={color} />
              <Cell fill="#f1f5f9" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 text-center">
        <span className="text-4xl font-bold text-slate-900">{(score * 100).toFixed(0)}%</span>
        <p className={cn("text-xs font-bold uppercase tracking-widest mt-1", 
          level === 'Low' ? "text-emerald-500" : level === 'Moderate' ? "text-amber-500" : "text-rose-500"
        )}>
          {level} Risk
        </p>
      </div>
    </div>
  );
};

const VitalCard = ({ label, value, unit, icon: Icon, color, trend }: { label: string, value: string | number, unit: string, icon: any, color: string, trend?: 'up' | 'down' | 'stable' }) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={cn("p-2.5 rounded-xl", color)}>
        <Icon size={20} className="text-white" />
      </div>
      {trend && (
        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter", 
          trend === 'up' ? "bg-rose-50 text-rose-600" : trend === 'down' ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-600"
        )}>
          {trend}
        </span>
      )}
    </div>
    <div className="space-y-1">
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        <span className="text-xs font-medium text-slate-400">{unit}</span>
      </div>
    </div>
  </div>
);

// --- Page Content ---

const LandingPage = ({ onGetStarted }: { onGetStarted: () => void }) => (
  <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-widest">
          <ShieldAlert size={14} />
          Early Detection Saves Lives
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
          AI-Powered <br />
          <span className="text-rose-600">Sepsis Risk</span> <br />
          Monitoring.
        </h1>
        <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
          SepsisGuard AI uses advanced machine learning to analyze wearable data in real-time, providing early warning signs of physiological instability before symptoms become critical.
        </p>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={onGetStarted}
            className="px-8 py-4 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-200 active:scale-95"
          >
            Get Started
          </button>
          <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95">
            Learn How It Works
          </button>
        </div>
        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-200">
          <div>
            <p className="text-2xl font-bold text-slate-900">98%</p>
            <p className="text-xs text-slate-500 uppercase font-medium tracking-wider">Accuracy</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">24/7</p>
            <p className="text-xs text-slate-500 uppercase font-medium tracking-wider">Monitoring</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">&lt;15m</p>
            <p className="text-xs text-slate-500 uppercase font-medium tracking-wider">Alert Time</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Live Risk Analysis</h3>
              <p className="text-sm text-slate-500">Patient: John Doe (Home Monitoring)</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <Activity size={24} />
            </div>
          </div>
          
          <div className="flex justify-center mb-8">
            <RiskGauge score={0.15} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Heart Rate</p>
              <p className="text-xl font-bold text-slate-900">72 <span className="text-xs font-normal text-slate-500">BPM</span></p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">SpO2</p>
              <p className="text-xl font-bold text-slate-900">98 <span className="text-xs font-normal text-slate-500">%</span></p>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-indigo-400/10 rounded-full blur-3xl" />
      </motion.div>
    </div>
  </div>
);

const PatientDashboard = () => {
  const patient = CURRENT_USER_PATIENT;
  const latestVitals = patient.vitalsHistory[patient.vitalsHistory.length - 1];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Patient Dashboard</h2>
          <p className="text-slate-500">Real-time physiological monitoring and risk assessment.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Live Monitoring Active
          </div>
          <button className="px-4 py-2 bg-rose-600 text-white rounded-xl text-sm font-bold hover:bg-rose-700 transition-all">
            Emergency Alert
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <VitalCard 
              label="Heart Rate" 
              value={latestVitals.heartRate.toFixed(0)} 
              unit="BPM" 
              icon={Activity} 
              color="bg-rose-500" 
              trend="stable"
            />
            <VitalCard 
              label="SpO2" 
              value={latestVitals.spo2.toFixed(0)} 
              unit="%" 
              icon={ShieldAlert} 
              color="bg-indigo-500" 
              trend="stable"
            />
            <VitalCard 
              label="Skin Temp" 
              value={latestVitals.skinTemp.toFixed(1)} 
              unit="°C" 
              icon={Activity} 
              color="bg-amber-500" 
              trend="up"
            />
            <VitalCard 
              label="Resp Rate" 
              value={latestVitals.respiratoryRate.toFixed(0)} 
              unit="RPM" 
              icon={Activity} 
              color="bg-emerald-500" 
              trend="stable"
            />
            <VitalCard 
              label="HRV" 
              value={latestVitals.hrv.toFixed(0)} 
              unit="ms" 
              icon={Activity} 
              color="bg-violet-500" 
              trend="down"
            />
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Risk Score Trend (Last 6 Hours)</h3>
              <select className="text-xs font-bold text-slate-500 bg-slate-50 border-none rounded-lg px-2 py-1 outline-none">
                <option>Last 6 Hours</option>
                <option>Last 24 Hours</option>
              </select>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={patient.vitalsHistory}>
                  <defs>
                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="timestamp" 
                    hide 
                  />
                  <YAxis hide domain={[0, 1]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    labelFormatter={(label) => new Date(label).toLocaleTimeString()}
                  />
                  <Area type="monotone" dataKey="heartRate" stroke="#f43f5e" fillOpacity={1} fill="url(#colorRisk)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center">
            <h3 className="text-lg font-bold text-slate-900 mb-6 w-full text-left">Current Risk Status</h3>
            <RiskGauge score={patient.currentRisk.score} />
            <div className="mt-8 w-full space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">AI Insight</p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Physiological patterns are stable. Heart rate variability is within normal range for your baseline.
                </p>
              </div>
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all">
                View Detailed Report
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100">
                <AlertCircle className="text-amber-500 shrink-0" size={18} />
                <div>
                  <p className="text-sm font-bold text-amber-900">Moderate Risk Detected</p>
                  <p className="text-[10px] text-amber-700">2 hours ago • Sustained HR increase</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <ShieldAlert className="text-emerald-500 shrink-0" size={18} />
                <div>
                  <p className="text-sm font-bold text-emerald-900">Risk Stabilized</p>
                  <p className="text-[10px] text-emerald-700">4 hours ago • Normalization of SpO2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DoctorPortal = () => {
  const [filter, setFilter] = useState<'all' | 'high'>('all');
  const patients = filter === 'high' ? MOCK_PATIENTS.filter(p => p.currentRisk.level === 'High') : MOCK_PATIENTS;

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Doctor Portal</h2>
          <p className="text-slate-500">Remote monitoring dashboard for high-risk patients.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setFilter('all')}
            className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", filter === 'all' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
          >
            All Patients
          </button>
          <button 
            onClick={() => setFilter('high')}
            className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", filter === 'high' ? "bg-rose-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700")}
          >
            High Risk Only
          </button>
        </div>
      </header>

      <div className="grid gap-4">
        {patients.map((patient) => (
          <motion.div 
            layout
            key={patient.id}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors">{patient.name}</h4>
                  <p className="text-xs text-slate-500">{patient.age}y • {patient.gender} • {patient.condition}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Risk Score</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-900">{(patient.currentRisk.score * 100).toFixed(0)}%</span>
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full uppercase", getRiskColor(patient.currentRisk.level))}>
                      {patient.currentRisk.level}
                    </span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Heart Rate</p>
                  <p className="text-lg font-bold text-slate-900">{patient.vitalsHistory[patient.vitalsHistory.length-1].heartRate.toFixed(0)} <span className="text-xs font-normal text-slate-500">BPM</span></p>
                </div>
                <div className="hidden md:block">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">SpO2</p>
                  <p className="text-lg font-bold text-slate-900">{patient.vitalsHistory[patient.vitalsHistory.length-1].spo2.toFixed(0)} <span className="text-xs font-normal text-slate-500">%</span></p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Last Sync</p>
                  <p className="text-xs font-medium text-slate-600">2 mins ago</p>
                </div>
              </div>
              
              <button className="px-6 py-2 bg-slate-50 text-slate-900 rounded-xl text-sm font-bold hover:bg-slate-100 transition-all">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const SimulationMode = () => {
  const [vitals, setVitals] = useState({
    hr: 75,
    spo2: 98,
    rr: 16,
    temp: 36.6,
    hrv: 55
  });
  const [result, setResult] = useState<{ score: number, level: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runSimulation = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      // Dummy logic for simulation
      const score = Math.min(0.99, Math.max(0.05, (vitals.hr - 60) / 100 + (100 - vitals.spo2) / 20 + (vitals.temp - 36.5) / 5));
      setResult({ score, level: formatRiskLevel(score) });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">AI Simulation Mode</h2>
        <p className="text-slate-500">Manually input physiological parameters to test the AI risk prediction model.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900">Input Parameters</h3>
          
          <div className="space-y-4">
            {[
              { id: 'hr', label: 'Heart Rate', unit: 'BPM', min: 40, max: 180, step: 1 },
              { id: 'spo2', label: 'SpO2', unit: '%', min: 70, max: 100, step: 1 },
              { id: 'rr', label: 'Resp Rate', unit: 'RPM', min: 8, max: 40, step: 1 },
              { id: 'temp', label: 'Skin Temp', unit: '°C', min: 34, max: 42, step: 0.1 },
              { id: 'hrv', label: 'HRV', unit: 'ms', min: 10, max: 150, step: 1 },
            ].map((param) => (
              <div key={param.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{param.label}</label>
                  <span className="text-sm font-bold text-slate-900">{(vitals as any)[param.id]} {param.unit}</span>
                </div>
                <input 
                  type="range" 
                  min={param.min} 
                  max={param.max} 
                  step={param.step}
                  value={(vitals as any)[param.id]}
                  onChange={(e) => setVitals(prev => ({ ...prev, [param.id]: parseFloat(e.target.value) }))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
              </div>
            ))}
          </div>

          <button 
            onClick={runSimulation}
            disabled={isAnalyzing}
            className="w-full py-4 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing Trends...
              </>
            ) : 'Run AI Prediction'}
          </button>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
          {result ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex flex-col items-center"
            >
              <RiskGauge score={result.score} />
              <div className="mt-8 w-full p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 mb-2">AI Analysis Result</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Based on the input parameters, the hybrid LSTM-XGBoost model detects {result.level.toLowerCase()} risk of sepsis progression. 
                  {result.score > 0.7 ? " Immediate clinical consultation is recommended." : " Continue routine monitoring."}
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto">
                <BarChart3 size={40} />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">Ready for Analysis</p>
                <p className="text-sm text-slate-500 max-w-[200px] mx-auto">Adjust parameters and click run to see AI risk prediction.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    if (user?.role === 'doctor') setActiveTab('patients');
    else if (user?.role === 'patient') setActiveTab('dashboard');
    else if (user?.role === 'admin') setActiveTab('dashboard');
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-rose-600/30 border-t-rose-600 rounded-full animate-spin" />
      </div>
    );
  }

  const renderContent = () => {
    if (!user) {
      if (authView === 'signup') {
        return <SignupPage onToggle={() => setAuthView('login')} />;
      }
      return <LoginPage onToggle={() => setAuthView('signup')} />;
    }
    
    if (user.role === 'patient') {
      const patient = CURRENT_USER_PATIENT;
      switch (activeTab) {
        case 'dashboard': return <PatientDashboard />;
        case 'analytics': return <AnalyticsPage patient={patient} />;
        case 'alerts': return <AlertHistoryPage alerts={patient.alerts || []} />;
        case 'simulation': return <SimulationMode />;
        case 'profile': return <ProfilePage profile={patient.profile!} />;
        case 'settings': return <SettingsPage />;
        default: return <PatientDashboard />;
      }
    }

    if (user.role === 'doctor') {
      const allAlerts = MOCK_PATIENTS.flatMap(p => p.alerts || []).map(a => ({
        ...a,
        patientName: MOCK_PATIENTS.find(p => p.alerts?.some(pa => pa.id === a.id))?.name
      }));

      switch (activeTab) {
        case 'patients': return <DoctorPortal />;
        case 'alerts': return <DoctorAlertsPage alerts={allAlerts} />;
        case 'analytics': return <DoctorGlobalAnalytics />;
        case 'profile': return <DoctorProfilePage />;
        case 'settings': return <DoctorSettingsPage />;
        default: return <DoctorPortal />;
      }
    }

    if (user.role === 'admin') {
      switch (activeTab) {
        case 'dashboard': return <AdminDashboard />;
        case 'doctors': return <AdminDoctorsPage />;
        case 'patients': return <AdminPatientsPage />;
        case 'alerts': return <AdminAlertsPage />;
        case 'analytics': return <DoctorGlobalAnalytics />;
        case 'reports': return <AdminReportsPage />;
        case 'system': return <AdminSystemPage />;
        case 'settings': return <AdminSettingsPage />;
        case 'profile': return <AdminProfilePage />;
        default: return <AdminDashboard />;
      }
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {user && (
        <Navbar 
          onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          onAuthClick={() => setAuthView('login')}
          onProfileClick={() => setActiveTab('profile')}
          showAuthButtons={!authView}
        />
      )}
      
      {user && (
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      <main className={cn(
        "transition-all duration-300",
        user ? "pt-24 pb-12 px-6 md:ml-64" : ""
      )}>
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${user?.role}-${activeTab}-${authView}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 bottom-0 w-3/4 bg-white p-6 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-bold">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-600">
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-4">
                {!user ? (
                  <>
                    <button onClick={() => { setAuthView('login'); setIsMobileMenuOpen(false); }} className="w-full text-left py-3 font-bold text-slate-900">Sign In</button>
                    <button onClick={() => { setAuthView('signup'); setIsMobileMenuOpen(false); }} className="w-full text-left py-3 font-bold text-slate-900">Sign Up</button>
                  </>
                ) : (
                  <button onClick={() => { /* Handle mobile sign out */ setIsMobileMenuOpen(false); }} className="w-full text-left py-3 font-bold text-rose-600">Sign Out</button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
