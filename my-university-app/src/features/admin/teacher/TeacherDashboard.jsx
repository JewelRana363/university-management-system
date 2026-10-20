import React, { useState } from 'react';
import { Check, X, Calendar } from 'lucide-react';

export default function TeacherDashboard() {
  const [attendance, setAttendance] = useState({
    STD01: true,
    STD02: false,
    STD03: true,
  });

  const toggleAttendance = (id) => {
    setAttendance((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Faculty Dashboard</h2>
        <p className="text-xs text-slate-500 mb-6">Course: CSE311 - Data Structures & Algorithms</p>

        <h3 className="font-semibold text-slate-700 text-sm mb-3">Daily Attendance Log</h3>
        <div className="space-y-3">
          {[
            { id: 'STD01', name: 'Sabbir Ahmed' },
            { id: 'STD02', name: 'Nusrat Jahan' },
            { id: 'STD03', name: 'Tanvir Hossain' },
          ].map((student) => (
            <div key={student.id} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
              <span className="font-medium text-slate-800 text-sm">{student.name} ({student.id})</span>
              <button
                onClick={() => toggleAttendance(student.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  attendance[student.id] ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}
              >
                {attendance[student.id] ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                {attendance[student.id] ? 'Present' : 'Absent'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}