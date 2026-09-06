import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@princelensbeats.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Attempt backend API call
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password }).catch(() => null);

      if (res && res.data && res.data.token) {
        localStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('isAdminAuthenticated', 'true');
      } else {
        // Dev fallback validation
        if (email === 'admin@princelensbeats.com' && password === 'admin123') {
          const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dev_admin_token_2026';
          localStorage.setItem('adminToken', dummyToken);
          localStorage.setItem('isAdminAuthenticated', 'true');
        } else {
          setError('Invalid admin credentials. Use admin@princelensbeats.com / admin123');
          setLoading(false);
          return;
        }
      }

      setLoading(false);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-darkBg flex items-center justify-center px-4">
      <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-cardBorder shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-neonPink/10 text-neonPink border border-neonPink/30 flex items-center justify-center shadow-lg shadow-neonPink/20">
            <Shield size={28} />
          </div>
          <h1 className="font-bebas text-4xl text-white tracking-wide">ADMIN LOGIN</h1>
          <p className="text-xs text-slate-400">Enter studio credentials to access control dashboard.</p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center space-x-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1.5 font-semibold uppercase">Admin Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-darkBg border border-cardBorder text-white focus:outline-none focus:border-neonPink transition-colors"
                placeholder="admin@princelensbeats.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1.5 font-semibold uppercase">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-darkBg border border-cardBorder text-white focus:outline-none focus:border-neonCyan transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-neonPink to-pink-600 text-white font-semibold text-sm shadow-xl shadow-neonPink/30 hover:shadow-neonPink/50 transition-all flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Login to Dashboard</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="p-3 rounded-xl bg-darkBg/60 border border-cardBorder text-[11px] text-slate-400 text-center">
          🔑 <span className="font-semibold text-slate-200">Default Credentials:</span> admin@princelensbeats.com / admin123
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
