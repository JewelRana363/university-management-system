import React from 'react';
import { ClipboardList, Bell, ShieldCheck } from 'lucide-react';

export default function StaffDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Administrative Staff Dashboard</h2>
        <p className="text-xs text-slate-500 mb-4">Manage daily university operations and inventory</p>

        <div className="space-y-3">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ClipboardList className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-semibold text-slate-700">Lab Equipment Audit Request</span>
            </div>
            <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">Pending</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-semibold text-slate-700">Campus Pass Registration</span>
            </div>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">Approved</span>
          </div>
        </div>
      </div>
    </div>
  );
}