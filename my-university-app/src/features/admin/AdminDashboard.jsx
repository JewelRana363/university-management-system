import React from 'react';
import { Users, BookOpen, DollarSign, ShieldAlert } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Admin Control Panel</h2>
          <p className="text-sm text-slate-500">System overview and management metrics</p>
        </div>
        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 font-semibold rounded-full text-xs">
          System Admin
        </span>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center text-slate-500 text-sm font-medium">
            <span>Total Students</span>
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">3,450</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center text-slate-500 text-sm font-medium">
            <span>Faculty Members</span>
            <BookOpen className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">120</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center text-slate-500 text-sm font-medium">
            <span>Total Revenue</span>
            <DollarSign className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">৳4,550,000</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center text-slate-500 text-sm font-medium">
            <span>Pending Approvals</span>
            <ShieldAlert className="w-5 h-5 text-rose-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">14</h3>
        </div>
      </div>
    </div>
  );
}