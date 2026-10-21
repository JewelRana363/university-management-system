{activeTab === 'dashboard' && (
  <div className="space-y-6">
    {/* যদি ইউজার স্টুডেন্ট হয়, তবে কেবল তার ব্যক্তিগত ইনফো এবং সেমিস্টার ওয়াইজ রেজাল্ট গ্রাফ দেখাবে */}
    {userRole === 'Student' ? (
      <div className="space-y-6">
        {(() => {
          const student = students.find(s => s.email === currentUser.email) || students[0];
          
          // স্টুডেন্টের ডায়নামিক সেমিস্টার রেজাল্ট (SGPA & CGPA Data)
          const resultHistory = [
            { semester: 'Sem 1', sgpa: 3.75, cgpa: 3.75 },
            { semester: 'Sem 2', sgpa: 3.80, cgpa: 3.78 },
            { semester: 'Sem 3', sgpa: 3.90, cgpa: 3.82 },
            { semester: 'Sem 4', sgpa: 3.85, cgpa: student.gpa || 3.85 },
          ];

          return (
            <>
              {/* স্টুডেন্ট ওয়েলকাম ব্যানার */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold">স্বাগতম, {student.name}!</h2>
                <p className="text-indigo-100 text-sm mt-1">
                  ডিপার্টমেন্ট: {student.dept} • ব্যাচ: {student.batch}th • আইডি: {student.id}
                </p>
              </div>

              {/* পার্সোনাল স্ট্যাটস কার্ডস */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <span className="text-xs text-slate-400 font-medium">বর্তমান সিজিপিএ (CGPA)</span>
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

              {/* ডায়নামিক CGPA & SGPA পারফরম্যান্স গ্রাফ (শুধুমাত্র স্টুডেন্টের জন্য) */}
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

                {/* সেমিস্টার প্রোগ্রেস বার (Custom Graph) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end pt-6 pb-2 border-b border-slate-100">
                  {resultHistory.map((res, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className="flex items-end justify-center gap-2 h-36 w-full bg-slate-50 rounded-xl p-2 relative">
                        {/* SGPA Bar */}
                        <div 
                          className="w-1/3 bg-indigo-600 rounded-t-lg transition-all duration-500 relative group flex justify-center"
                          style={{ height: `${(res.sgpa / 4.0) * 100}%` }}
                        >
                          <span className="absolute -top-7 bg-slate-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            SGPA: {res.sgpa}
                          </span>
                        </div>
                        {/* CGPA Bar */}
                        <div 
                          className="w-1/3 bg-purple-400 rounded-t-lg transition-all duration-500 relative group flex justify-center"
                          style={{ height: `${(res.cgpa / 4.0) * 100}%` }}
                        >
                          <span className="absolute -top-7 bg-slate-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
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
      /* অ্যাডমিন বা অন্য রোলগুলোর জন্য গ্লোবাল স্ট্যাটস কার্ডগুলো দেখাবে */
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

    {/* নোটিশ বোর্ড সেকশন */}
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
    </div>
  </div>
)}