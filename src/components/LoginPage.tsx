import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { ShieldAlert, Mail, Lock, ArrowRight, UserPlus, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils';

export const LoginPage = ({ onToggle }: { onToggle: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100"
      >
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg mb-4 bg-rose-600 shadow-rose-200">
            <ShieldAlert size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            SepsisGuard AI
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Secure Medical Access Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold rounded-xl flex items-center gap-2">
              <ShieldAlert size={14} />
              {error}
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Username or Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your username or email"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button 
              type="button"
              onClick={() => alert('Please contact your system administrator to reset your password.')}
              className="text-[10px] font-bold text-rose-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={cn(
              "w-full py-4 text-white rounded-2xl font-bold text-sm shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 shadow-rose-200",
              loading && "opacity-50"
            )}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center gap-4">
          <button 
            onClick={onToggle}
            className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2"
          >
            <UserPlus size={14} />
            Don't have an account? Sign up
          </button>
        </div>

        <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 text-center">Demo Credentials</p>
          <div className="space-y-1 text-xs text-slate-600">
            <div className="flex justify-between">
              <span className="font-semibold">Admin:</span>
              <span className="font-mono">admin / admin123</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Doctor:</span>
              <span className="font-mono">doctor / doctor123</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Patient:</span>
              <span className="font-mono">patient / patient123</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
