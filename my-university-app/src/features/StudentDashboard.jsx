import React from 'react';
import { Award, BookOpen, Clock } from 'lucide-react';

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold">Welcome back, Student!</h2>
        <p className="text-indigo-100 text-sm mt-1">B.Sc. in CSE • Semester 6</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Current CGPA</span>
            <h3 className="text-xl font-bold text-slate-800">3.85</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Enrolled Courses</span>
            <h3 className="text-xl font-bold text-slate-800">5 Courses</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Attendance Rate</span>
            <h3 className="text-xl font-bold text-slate-800">92%</h3>
          </div>
        </div>
      </div>
    </div>
  );
}