import React, { useState } from 'react';
import { 
  Users, BookOpen, GraduationCap, DollarSign, Calendar, Bell, 
  Search, Plus, CheckCircle, AlertCircle, Eye, Check, X,
  ChevronRight, Menu, LogOut, BarChart2, Mail, Lock, CreditCard, CheckSquare
} from 'lucide-react';

// --- MOCK INITIAL DATA ---
const initialStudents = [
  { id: 'STD2026001', name: 'Sabbir Ahmed', dept: 'CSE', batch: '52', email: 'sabbir@university.edu', status: 'Active', gpa: '3.85', feeStatus: 'Paid', feeAmount: 35000 },
  { id: 'STD2026002', name: 'Nusrat Jahan', dept: 'EEE', batch: '50', email: 'nusrat@university.edu', status: 'Active', gpa: '3.92', feeStatus: 'Pending', feeAmount: 28000 },
  { id: 'STD2026003', name: 'Tanvir Hossain', dept: 'BBA', batch: '48', email: 'tanvir@university.edu', status: 'Inactive', gpa: '3.40', feeStatus: 'Overdue', feeAmount: 42000 },
  { id: 'STD2026004', name: 'Ayesha Siddiqua', dept: 'CSE', batch: '53', email: 'ayesha@university.edu', status: 'Active', gpa: '3.78', feeStatus: 'Paid', feeAmount: 35000 },
  { id: 'STD2026005', name: 'Rahim Chowdhury', dept: 'Textile', batch: '45', email: 'rahim@university.edu', status: 'Active', gpa: '3.55', feeStatus: 'Pending', feeAmount: 30000 },
];

const initialCourses = [
  { code: 'CSE311', title: 'Data Structures & Algorithms', dept: 'CSE', credits: 3, instructor: 'Dr. Rafiqul Islam', enrolled: 45 },
  { code: 'EEE201', title: 'Electrical Circuit Analysis', dept: 'EEE', credits: 4, instructor: 'Prof. Shamim Akhtar', enrolled: 38 },
  { code: 'BUS102', title: 'Principles of Management', dept: 'BBA', credits: 3, instructor: 'Dr. Nazmul Huda', enrolled: 60 },
  { code: 'CSE405', title: 'Machine Learning & AI', dept: 'CSE', credits: 3, instructor: 'Eng. Fahim Morshed', enrolled: 30 },
];

const initialNotices = [
  { id: 1, title: 'Spring 2026 Semester Final Exam Routine Published', date: '2026-10-18', category: 'Exam', priority: 'High' },
  { id: 2, title: 'Registration Deadline Extended for Fall Semester', date: '2026-10-15', category: 'Academic', priority: 'Medium' },
  { id: 3, title: 'Annual Cultural Program & Tech Fest Announcement', date: '2026-10-10', category: 'Event', priority: 'Low' },
];

const timetableSchedule = [
  { day: 'রবিবার', time: '০৯:০০ AM - ১০:৩০ AM', code: 'CSE311', room: 'Lab 402', teacher: 'Dr. Rafiqul Islam' },
  { day: 'রবিবার', time: '১১:০০ AM - ১২:৩০ PM', code: 'EEE201', room: 'Room 301', teacher: 'Prof. Shamim Akhtar' },
  { day: 'সোমবার', time: '০৯:০০ AM - ১০:৩০ AM', code: 'BUS102', room: 'Room 105', teacher: 'Dr. Nazmul Huda' },
  { day: 'মঙ্গলবার', time: '০২:০০ PM - ০৩:৩০ PM', code: 'CSE405', room: 'Lab 501', teacher: 'Eng. Fahim Morshed' },
];

// Valid Credentials for Login
const validCredentials = {
  Admin: { email: 'admin@university.edu', pass: 'admin123', name: 'System Administrator' },
  Faculty: { email: 'teacher@university.edu', pass: 'teacher123', name: 'Dr. Rafiqul Islam' },
  Student: { email: 'student@university.edu', pass: 'student123', name: 'Sabbir Ahmed' },
  Staff: { email: 'staff@university.edu', pass: 'staff123', name: 'Operations Staff' },
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('student@university.edu');
  const [loginPassword, setLoginPassword] = useState('student123');
  const [loginRole, setLoginRole] = useState('Student');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [students, setStudents] = useState(initialStudents);
  const [courses, setCourses] = useState(initialCourses);
  const [notices, setNotices] = useState(initialNotices);

  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [selectedStudentProfile, setSelectedStudentProfile] = useState(null);
  const [selectedPaymentStudent, setSelectedPaymentStudent] = useState(null);

  const [attendance, setAttendance] = useState({
    'STD2026001': true,
    'STD2026002': true,
    'STD2026003': false,
    'STD2026004': true,
    'STD2026005': false,
  });
  const [grades, setGrades] = useState({
    'STD2026001': 'A+',
    'STD2026002': 'A+',
    'STD2026003': 'B',
    'STD2026004': 'A',
    'STD2026005': 'A-',
  });

  const [newStudent, setNewStudent] = useState({ name: '', dept: 'CSE', batch: '', email: '', status: 'Active' });
  const [newCourse, setNewCourse] = useState({ code: '', title: '', dept: 'CSE', credits: 3, instructor: '' });
  const [newNotice, setNewNotice] = useState({ title: '', category: 'Academic', priority: 'Medium' });

  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const targetRole = validCredentials[loginRole];

    if (loginEmail === targetRole.email && loginPassword === targetRole.pass) {
      setCurrentUser({
        name: targetRole.name,
        role: loginRole,
        email: loginEmail,
      });
      setIsAuthenticated(true);
      setActiveTab('dashboard');
      showToast(`স্বাগতম, ${targetRole.name}!`);
    } else {
      setLoginError('ইমেইল অথবা পাসওয়ার্ড সঠিক নয়!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setLoginEmail('');
    setLoginPassword('');
    showToast('সফলভাবে লগআউট করা হয়েছে');
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const id = `STD2026${(students.length + 1).toString().padStart(3, '0')}`;
    const studentToAdd = { ...newStudent, id, gpa: '0.00', feeStatus: 'Pending', feeAmount: 32000 };
    setStudents([studentToAdd, ...students]);
    setShowAddStudentModal(false);
    setNewStudent({ name: '', dept: 'CSE', batch: '', email: '', status: 'Active' });
    showToast('নতুন শিক্ষার্থী সফলভাবে যোগ করা হয়েছে!');
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    setCourses([...courses, { ...newCourse, enrolled: 0 }]);
    setShowAddCourseModal(false);
    setNewCourse({ code: '', title: '', dept: 'CSE', credits: 3, instructor: '' });
    showToast('নতুন কোর্স কারিকুলামে যুক্ত করা হয়েছে!');
  };

  const handleAddNotice = (e) => {
    e.preventDefault();
    const noticeToAdd = {
      id: notices.length + 1,
      ...newNotice,
      date: new Date().toISOString().split('T')[0]
    };
    setNotices([noticeToAdd, ...notices]);
    setShowNoticeModal(false);
    setNewNotice({ title: '', category: 'Academic', priority: 'Medium' });
    showToast('নতুন নোটিশ ঘোষণা করা হয়েছে!');
  };

  const handlePaymentSubmit = () => {
    if (!selectedPaymentStudent) return;
    setStudents(students.map(s => s.id === selectedPaymentStudent.id ? { ...s, feeStatus: 'Paid' } : s));
    setSelectedPaymentStudent(null);
    showToast('টিউশন ফি পেমেন্ট সফলভাবে সম্পন্ন হয়েছে!');
  };

  const toggleAttendance = (id) => {
    setAttendance(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleGradeChange = (id, grade) => {
    setGrades(prev => ({ ...prev, [id]: grade }));
    showToast('গ্রেড আপডেট করা হয়েছে!');
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'All' || s.dept === deptFilter;
    return matchesSearch && matchesDept;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans text-slate-800">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md w-full border border-slate-700/50">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white text-center relative">
            <div className="w-16 h-16 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
              <GraduationCap className="w-10 h-10 text-white"/>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">UniCore Portal</h1>
            <p className="text-indigo-100 text-xs mt-1">University Management & Learning System</p>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-5">
            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0"/>
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
                    onClick={() => { 
                      setLoginRole(r); 
                      setLoginEmail(validCredentials[r].email);
                      setLoginPassword(validCredentials[r].pass);
                      setLoginError(''); 
                    }}
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
              <label className="text-xs font-semibold text-slate-600 block mb-1">ইমেইল (Email)</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
                <input 
                  type="email" required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">পাসওয়ার্ড (Password)</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
                <input 
                  type="password" required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-[11px] text-indigo-700">
              💡 Demo Passwords: <strong>student123</strong>, <strong>admin123</strong>, <strong>teacher123</strong>, <strong>staff123</strong>
            </div>

            <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm transition-all shadow-md">
              পোর্টাল লগইন করুন
            </button>
          </form>
        </div>
      </div>
    );
  }

  const userRole = currentUser.role;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-400"/>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-1 relative">
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-slate-200 transition-all duration-300 flex flex-col justify-between z-20`}>
          <div>
            <div className="p-5 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-md">
                  <GraduationCap className="w-6 h-6"/>
                </div>
                {sidebarOpen && <span className="font-bold text-lg text-slate-900 tracking-tight">UniCore UMS</span>}
              </div>
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                {sidebarOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
              </button>
            </div>

            <nav className="p-3 space-y-1">
              {[
                { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: BarChart2, roles: ['Admin', 'Faculty', 'Student', 'Staff'] },
                { id: 'students', label: 'শিক্ষার্থী তালিকা', icon: Users, roles: ['Admin', 'Faculty'] },
                { id: 'courses', label: 'কোর্স ও কারিকুলাম', icon: BookOpen, roles: ['Admin', 'Faculty', 'Student'] },
                { id: 'attendance', label: 'উপস্থিতি ও গ্রেডিং', icon: CheckSquare, roles: ['Faculty'] },
                { id: 'fees', label: 'ফি ও টিউশন', icon: DollarSign, roles: ['Admin', 'Student'] },
                { id: 'routine', label: 'ক্লাস রুটিন', icon: Calendar, roles: ['Faculty', 'Student'] },
                { id: 'notices', label: 'নোটিশ বোর্ড', icon: Bell, roles: ['Admin', 'Faculty', 'Student', 'Staff'] },
              ].filter(item => item.roles.includes(userRole)).map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                      activeTab === item.id 
                        ? 'bg-indigo-50 text-indigo-600 font-semibold shadow-sm' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
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
            <button 
              onClick={handleLogout}
              className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4"/>
              {sidebarOpen && <span>লগআউট করুন</span>}
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-8 bg-slate-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {activeTab === 'dashboard' ? 'ড্যাশবোর্ড ওভারভিউ' : 
                 activeTab === 'students' ? 'শিক্ষার্থী ব্যবস্থাপনা' : 
                 activeTab === 'courses' ? 'কোর্স ও কারিকুলাম' : 
                 activeTab === 'attendance' ? 'উপস্থিতি ও ফাইনাল গ্রেডিং' :
                 activeTab === 'fees' ? 'ফি এবং অ্যাকাউন্টস' : 
                 activeTab === 'routine' ? 'সাপ্তাহিক রুটিন' : 'নোটিশ বোর্ড'}
              </h1>
              <p className="text-sm text-slate-500 mt-1">ভার্সিটি প্যানেলে স্বাগতম ({currentUser.name} - {userRole} মোড)</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                <input 
                  type="text" placeholder="খুঁজুন..." 
                  className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none shadow-sm"
                />
              </div>
              <button className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 relative">
                <Bell className="w-4 h-4"/>
                <span className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2"></span>
              </button>
            </div>
          </div>

          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* STUDENT ROLE DASHBOARD - VISIBLE ONLY TO STUDENTS */}
              {userRole === 'Student' ? (
                <div className="space-y-6">
                  {(() => {
                    const student = students.find(s => s.email === currentUser.email) || students[0];
                    const resultHistory = [
                      { semester: 'Sem 1', sgpa: 3.75, cgpa: 3.75 },
                      { semester: 'Sem 2', sgpa: 3.80, cgpa: 3.78 },
                      { semester: 'Sem 3', sgpa: 3.90, cgpa: 3.82 },
                      { semester: 'Sem 4', sgpa: 3.85, cgpa: student.gpa || 3.85 },
                    ];

                    return (
                      <>
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-2xl shadow-md">
                          <h2 className="text-2xl font-bold">স্বাগতম, {student.name}!</h2>
                          <p className="text-indigo-100 text-sm mt-1">
                            ডিপার্টমেন্ট: {student.dept} • ব্যাচ: {student.batch}th • আইডি: {student.id}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                            <span className="text-xs text-slate-400 font-medium">আমার সিজিপিএ (CGPA)</span>
                            <h3 className="text-2xl font-bold text-indigo-600 mt-2">{student.gpa}</h3>
                          </div>
                          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                            <span className="text-xs text-slate-400 font-medium">টিউশন ফি স্ট্যাটাস</span>
                            <h3 className="text-lg font-bold text-slate-800 mt-2">
                              <span className={`px-2.5 py-1 rounded-full text-xs ${student.feeStatus === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                {student.feeStatus} (৳ {student.feeAmount?.toLocaleString()})
                              </span>
                            </h3>
                          </div>
                          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                            <span className="text-xs text-slate-400 font-medium">একাউন্ট স্ট্যাটাস</span>
                            <h3 className="text-lg font-bold text-emerald-600 mt-2">{student.status}</h3>
                          </div>
                        </div>

                        {/* STUDENT ONLY SGPA & CGPA GRAPH */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                          <div className="flex justify-between items-center mb-6">
                            <div>
                              <h3 className="font-bold text-slate-900 text-lg">আমার একাডেমিক পারফরম্যান্স গ্রাফ</h3>
                              <p className="text-xs text-slate-400">সেমিস্টার ওয়াইজ SGPA এবং CGPA এর অগ্রগতি</p>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-semibold">
                              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-indigo-600 rounded-sm"></span> SGPA</span>
                              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-purple-400 rounded-sm"></span> CGPA</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end pt-6 pb-2 border-b border-slate-100">
                            {resultHistory.map((res, i) => (
                              <div key={i} className="flex flex-col items-center gap-2">
                                <div className="flex items-end justify-center gap-2 h-36 w-full bg-slate-50 rounded-xl p-2 relative">
                                  <div 
                                    className="w-1/3 bg-indigo-600 rounded-t-lg transition-all duration-500 relative group flex justify-center"
                                    style={{ height: `${(res.sgpa / 4.0) * 100}%` }}
                                  >
                                    <span className="absolute -top-7 bg-slate-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                      SGPA: {res.sgpa}
                                    </span>
                                  </div>
                                  <div 
                                    className="w-1/3 bg-purple-400 rounded-t-lg transition-all duration-500 relative group flex justify-center"
                                    style={{ height: `${(res.cgpa / 4.0) * 100}%` }}
                                  >
                                    <span className="absolute -top-7 bg-slate-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                      CGPA: {res.cgpa}
                                    </span>
                                  </div>
                                </div>
                                <span className="text-xs font-semibold text-slate-600">{res.semester}</span>
                                <div className="text-[11px] text-center text-slate-500">
                                  <span>SGPA: <b>{res.sgpa}</b></span> | <span>CGPA: <b>{res.cgpa}</b></span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                /* ADMIN / OTHER ROLES OVERVIEW CARDS */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {[
                    { title: 'মোট শিক্ষার্থী', count: '৩,৪৫০', icon: Users, change: '+৪.৫%' },
                    { title: 'চলতি কোর্স', count: '৪৮', icon: BookOpen, change: '+২' },
                    { title: 'মোট শিক্ষক', count: '১২০', icon: GraduationCap, change: '০' },
                    { title: 'সংগৃহীত টিউশন ফি', count: '৳ ৪৫,৫০,০০০', icon: DollarSign, change: '+১২%' },
                  ].map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                            <Icon className="w-5 h-5"/>
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mt-2">{stat.count}</h3>
                        <span className="inline-block mt-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {stat.change} এই মাসে
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* NOTICES SECTION */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-lg mb-4">সর্বশেষ নোটিশ</h3>
                  <div className="space-y-3">
                    {notices.map((n) => (
                      <div key={n.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                        <div>
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${n.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                            {n.category}
                          </span>
                          <h4 className="font-semibold text-slate-800 text-sm mt-2">{n.title}</h4>
                          <p className="text-xs text-slate-400 mt-1">{n.date}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400"/>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-lg mb-4">কুইক একশন</h3>
                  <div className="space-y-3">
                    {userRole === 'Admin' && (
                      <button onClick={() => setShowAddStudentModal(true)} className="w-full flex items-center justify-between p-3.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl font-medium transition-colors">
                        <span className="flex items-center gap-2"><Plus className="w-4 h-4"/> নতুন স্টুডেন্ট যোগ করুন</span>
                        <ChevronRight className="w-4 h-4"/>
                      </button>
                    )}
                    <button onClick={() => setShowNoticeModal(true)} className="w-full flex items-center justify-between p-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors">
                      <span className="flex items-center gap-2"><Bell className="w-4 h-4"/> নতুন নোটিশ পোস্ট</span>
                      <ChevronRight className="w-4 h-4"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-72">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                    <input 
                      type="text" placeholder="নাম বা আইডি দিয়ে খুঁজুন..." 
                      value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <select 
                    value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}
                    className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none"
                  >
                    <option value="All">সব ডিপার্টমেন্ট</option>
                    <option value="CSE">CSE</option>
                    <option value="EEE">EEE</option>
                    <option value="BBA">BBA</option>
                  </select>
                </div>
                {userRole === 'Admin' && (
                  <button onClick={() => setShowAddStudentModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2">
                    <Plus className="w-4 h-4"/> নতুন শিক্ষার্থী যোগ করুন
                  </button>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-semibold">
                      <th className="p-4">আইডি ও নাম</th>
                      <th className="p-4">ডিপার্টমেন্ট</th>
                      <th className="p-4">ব্যাচ</th>
                      <th className="p-4">সিজিপিএ (GPA)</th>
                      <th className="p-4">স্ট্যাটাস</th>
                      <th className="p-4 text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50">
                        <td className="p-4">
                          <div className="font-semibold text-slate-900">{student.name}</div>
                          <div className="text-xs text-slate-400">{student.id}</div>
                        </td>
                        <td className="p-4 font-medium text-slate-600">{student.dept}</td>
                        <td className="p-4 text-slate-600">{student.batch}th</td>
                        <td className="p-4 font-semibold text-indigo-600">{student.gpa}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                            {student.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => setSelectedStudentProfile(student)} className="p-1.5 hover:bg-slate-100 rounded-lg text-indigo-600 font-medium text-xs flex items-center gap-1 ml-auto">
                            <Eye className="w-4 h-4"/> প্রোফাইল
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-900 text-lg">উপলব্ধ কোর্সসমূহ</h3>
                {userRole === 'Admin' && (
                  <button onClick={() => setShowAddCourseModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2">
                    <Plus className="w-4 h-4"/> নতুন কোর্স যোগ
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {courses.map((course, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-md">{course.code}</span>
                      <h4 className="font-bold text-slate-900 text-base mt-2 mb-1">{course.title}</h4>
                      <p className="text-xs text-slate-500">শিক্ষক: {course.instructor}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                      <span>এনরোলড: <strong>{course.enrolled} জন</strong></span>
                      <span className="text-indigo-600 font-semibold cursor-pointer">ডিটেইলস →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'attendance' && userRole === 'Faculty' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 text-lg mb-2">কোর্স: CSE311 - Data Structures & Algorithms</h3>
              <p className="text-xs text-slate-500 mb-6">শিক্ষার্থীদের উপস্থিতি এবং গ্রেড নির্ধারণ করুন</p>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-semibold">
                    <th className="p-4">শিক্ষার্থীর নাম</th>
                    <th className="p-4">আইডি</th>
                    <th className="p-4">উপস্থিতি</th>
                    <th className="p-4">গ্রেড</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className="p-4 font-semibold text-slate-800">{student.name}</td>
                      <td className="p-4 text-xs text-slate-500">{student.id}</td>
                      <td className="p-4">
                        <button onClick={() => toggleAttendance(student.id)} className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 ${attendance[student.id] ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                          {attendance[student.id] ? <Check className="w-4 h-4"/> : <X className="w-4 h-4"/>}
                          {attendance[student.id] ? 'Present' : 'Absent'}
                        </button>
                      </td>
                      <td className="p-4">
                        <select value={grades[student.id] || 'A+'} onChange={(e) => handleGradeChange(student.id, e.target.value)} className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold">
                          <option>A+</option><option>A</option><option>A-</option><option>B</option><option>F</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'fees' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-lg mb-2">ফি ও টিউশন ইনভয়েস</h3>
              {students.map((s) => (
                <div key={s.id} className="p-4 border border-slate-100 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">{s.name}</h4>
                    <p className="text-xs text-slate-400">{s.dept} • ৳ {s.feeAmount.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.feeStatus === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {s.feeStatus}
                    </span>
                    {s.feeStatus !== 'Paid' && (
                      <button onClick={() => setSelectedPaymentStudent(s)} className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1">
                        <CreditCard className="w-3.5 h-3.5"/> পেমেন্ট করুন
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'routine' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 text-lg mb-4">সাপ্তাহিক ক্লাসের সময়সূচী</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {timetableSchedule.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                    <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">{item.day}</span>
                    <h4 className="font-bold text-slate-900 text-base mt-2">{item.code}</h4>
                    <p className="text-xs text-slate-500 mt-1">রুম: {item.room} | শিক্ষক: {item.teacher}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notices' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900 text-lg">জরুরী নোটিশ বোর্ড</h3>
                <button onClick={() => setShowNoticeModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
                  <Plus className="w-4 h-4"/> নতুন নোটিশ
                </button>
              </div>
              {notices.map((n) => (
                <div key={n.id} className="p-4 border border-slate-100 rounded-xl">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">{n.category}</span>
                  <h4 className="font-bold text-slate-800 mt-2 text-sm">{n.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{n.date}</p>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>

      {showAddStudentModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="font-bold text-slate-900 text-lg mb-4">নতুন শিক্ষার্থী যোগ করুন</h3>
            <form onSubmit={handleAddStudent} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">পূর্ণ নাম</label>
                <input type="text" required value={newStudent.name} onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">ডিপার্টমেন্ট</label>
                  <select value={newStudent.dept} onChange={(e) => setNewStudent({...newStudent, dept: e.target.value})} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm">
                    <option>CSE</option><option>EEE</option><option>BBA</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">ব্যাচ</label>
                  <input type="text" required value={newStudent.batch} onChange={(e) => setNewStudent({...newStudent, batch: e.target.value})} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddStudentModal(false)} className="px-4 py-2 rounded-xl text-sm text-slate-600 hover:bg-slate-100">বাতিল</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-sm bg-indigo-600 text-white">সংরক্ষণ করুন</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedPaymentStudent && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl">
            <h3 className="font-bold text-slate-900 text-lg mb-4">পেমেন্ট গেটওয়ে (Demo)</h3>
            <p className="text-xs text-slate-500 mb-4">শিক্ষার্থী: <strong>{selectedPaymentStudent.name}</strong><br/>বকেয়া ফি: <strong className="text-indigo-600">৳ {selectedPaymentStudent.feeAmount.toLocaleString()}</strong></p>
            <button onClick={handlePaymentSubmit} className="w-full py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2">
              <Check className="w-4 h-4"/> bKash / Nagad দিয়ে পে করুন
            </button>
          </div>
        </div>
      )}

      {showNoticeModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="font-bold text-slate-900 text-lg mb-4">নতুন নোটিশ পোস্ট করুন</h3>
            <form onSubmit={handleAddNotice} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">শিরোনাম</label>
                <input type="text" required value={newNotice.title} onChange={(e) => setNewNotice({...newNotice, title: e.target.value})} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowNoticeModal(false)} className="px-4 py-2 rounded-xl text-sm text-slate-600 hover:bg-slate-100">বাতিল</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-sm bg-indigo-600 text-white">পোস্ট করুন</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}