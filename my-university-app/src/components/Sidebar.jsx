import React from 'react';
import { 
  GraduationCap, Menu, X, LogOut, Users, BookOpen, 
  CheckSquare, DollarSign, Calendar, Bell, BarChart2 
} from 'lucide-react';

export default function Sidebar({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab, currentUser, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: BarChart2, roles: ['Admin', 'Faculty', 'Student', 'Staff'] },
    { id: 'students', label: 'শিক্ষার্থী তালিকা', icon: Users, roles: ['Admin', 'Faculty'] },
    { id: 'courses', label: 'কোর্স ও কারিকুলাম', icon: BookOpen, roles: ['Admin', 'Faculty', 'Student'] },
    { id: 'attendance', label: 'উপস্থিতি ও গ্রেডিং', icon: CheckSquare, roles: ['Faculty'] },
    { id: 'fees', label: 'ফি ও টিউশন', icon: DollarSign, roles: ['Admin', 'Student'] },
    { id: 'routine', label: 'ক্লাস রুটিন', icon: Calendar, roles: ['Faculty', 'Student'] },
    { id: 'notices', label: 'নোটিশ বোর্ড', icon: Bell, roles: ['Admin', 'Faculty', 'Student', 'Staff'] },
  ];

  return (
    <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-slate-200 transition-all duration-300 flex flex-col justify-between z-20`}>
      <div>
        <div className="p-5 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            {sidebarOpen && <span className="font-bold text-lg text-slate-900">UniCore UMS</span>}
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-slate-600 p-1">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {menuItems.filter(item => item.roles.includes(currentUser.role)).map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  activeTab === item.id ? 'bg-indigo-50 text-indigo-600 font-semibold shadow-sm' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${activeTab === item.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
            {currentUser.name.substring(0, 2).toUpperCase()}
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <h4 className="text-sm font-semibold text-slate-800 truncate">{currentUser.name}</h4>
              <p className="text-xs text-indigo-600 font-medium truncate">{currentUser.role} Mode</p>
            </div>
          )}
        </div>

        <button onClick={onLogout} className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-semibold flex items-center justify-center gap-2">
          <LogOut className="w-4 h-4" />
          {sidebarOpen && <span>লগআউট</span>}
        </button>
      </div>
    </aside>
  );
}