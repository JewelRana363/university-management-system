import React, { useState } from 'react';
import { GraduationCap, Mail, Lock, AlertCircle } from 'lucide-react';
import { validCredentials } from '../data/mockData';

export default function Login({ onLoginSuccess }) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState('Student');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    const targetRole = validCredentials[loginRole];

    if (loginEmail === targetRole.email && loginPassword === targetRole.pass) {
      onLoginSuccess({
        name: targetRole.name,
        role: loginRole,
        email: loginEmail,
      });
    } else {
      setLoginError('ইমেইল অথবা পাসওয়ার্ড সঠিক নয়!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md w-full border border-slate-700/50">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white text-center relative">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">UniCore Portal</h1>
          <p className="text-indigo-100 text-xs mt-1">University Management System</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-5">
          {loginError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-2">আপনার রোল সিলেক্ট করুন</label>
            <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl">
              {['Admin', 'Faculty', 'Student', 'Staff'].map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => { setLoginRole(r); setLoginError(''); }}
                  className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
                    loginRole === r ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {r === 'Admin' ? 'অ্যাডমিন' : r === 'Faculty' ? 'শিক্ষক' : r === 'Student' ? 'ছাত্র' : 'স্টাফ'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">ইমেইল</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="email" required
                placeholder={`${loginRole.toLowerCase()}@university.edu`}
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">পাসওয়ার্ড</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="password" required placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-[11px] text-indigo-700">
            💡 Passwords: <strong>admin123</strong>, <strong>teacher123</strong>, <strong>student123</strong>, <strong>staff123</strong>
          </div>

          <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm transition-all shadow-md">
            পোর্টাল লগইন করুন
          </button>
        </form>
      </div>
    </div>
  );
}