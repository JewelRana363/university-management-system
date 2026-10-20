export const validCredentials = {
  Admin: { email: 'admin@university.edu', pass: 'admin123', name: 'System Administrator' },
  Faculty: { email: 'teacher@university.edu', pass: 'teacher123', name: 'Dr. Rafiqul Islam' },
  Student: { email: 'student@university.edu', pass: 'student123', name: 'Sabbir Ahmed' },
  Staff: { email: 'staff@university.edu', pass: 'staff123', name: 'Operations Staff' },
};

export const initialStudents = [
  { id: 'STD2026001', name: 'Sabbir Ahmed', dept: 'CSE', batch: '52', email: 'sabbir@university.edu', status: 'Active', gpa: '3.85', feeStatus: 'Paid', feeAmount: 35000 },
  { id: 'STD2026002', name: 'Nusrat Jahan', dept: 'EEE', batch: '50', email: 'nusrat@university.edu', status: 'Active', gpa: '3.92', feeStatus: 'Pending', feeAmount: 28000 },
  { id: 'STD2026003', name: 'Tanvir Hossain', dept: 'BBA', batch: '48', email: 'tanvir@university.edu', status: 'Inactive', gpa: '3.40', feeStatus: 'Overdue', feeAmount: 42000 },
];

export const initialNotices = [
  { id: 1, title: 'Spring 2026 Semester Final Exam Routine Published', date: '2026-10-18', category: 'Exam' },
  { id: 2, title: 'Registration Deadline Extended for Fall Semester', date: '2026-10-15', category: 'Academic' },
];