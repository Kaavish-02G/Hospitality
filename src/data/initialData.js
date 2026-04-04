// Initial mock data for the Hospitality HMS

export const initialPatients = [
  { id: 1, name: 'Ahmed Khan', age: 45, gender: 'Male', phone: '0300-1234567', email: 'ahmed@email.com', blood: 'A+', address: '12 Main St, Karachi', condition: 'Diabetes', status: 'Active', admitDate: '2026-03-15' },
  { id: 2, name: 'Sara Ali', age: 32, gender: 'Female', phone: '0321-9876543', email: 'sara@email.com', blood: 'B+', address: '45 Garden Rd, Lahore', condition: 'Hypertension', status: 'Active', admitDate: '2026-03-20' },
  { id: 3, name: 'Usman Tariq', age: 28, gender: 'Male', phone: '0333-5551234', email: 'usman@email.com', blood: 'O+', address: '78 Lake View, Islamabad', condition: 'Fracture', status: 'Discharged', admitDate: '2026-02-10' },
  { id: 4, name: 'Fatima Noor', age: 55, gender: 'Female', phone: '0345-7778899', email: 'fatima@email.com', blood: 'AB-', address: '23 Hill Rd, Peshawar', condition: 'Cardiac Arrest', status: 'Critical', admitDate: '2026-04-01' },
  { id: 5, name: 'Bilal Hussain', age: 38, gender: 'Male', phone: '0312-4445566', email: 'bilal@email.com', blood: 'A-', address: '56 Park Ave, Multan', condition: 'Pneumonia', status: 'Active', admitDate: '2026-03-28' },
];

export const initialDoctors = [
  { id: 1, name: 'Dr. Ayesha Malik', specialization: 'Cardiology', phone: '0300-1112233', email: 'ayesha@hospital.com', experience: 15, status: 'Available', schedule: 'Mon-Fri 9AM-5PM', patients: 24, fee: 3000 },
  { id: 2, name: 'Dr. Hassan Raza', specialization: 'Orthopedics', phone: '0321-4445566', email: 'hassan@hospital.com', experience: 12, status: 'Available', schedule: 'Mon-Sat 10AM-6PM', patients: 18, fee: 2500 },
  { id: 3, name: 'Dr. Zainab Qureshi', specialization: 'Neurology', phone: '0333-7778899', email: 'zainab@hospital.com', experience: 20, status: 'On Leave', schedule: 'Tue-Sat 8AM-4PM', patients: 30, fee: 4000 },
  { id: 4, name: 'Dr. Imran Shah', specialization: 'General Medicine', phone: '0345-2223344', email: 'imran@hospital.com', experience: 8, status: 'Available', schedule: 'Mon-Fri 8AM-3PM', patients: 35, fee: 1500 },
  { id: 5, name: 'Dr. Nadia Farooq', specialization: 'Dermatology', phone: '0312-5556677', email: 'nadia@hospital.com', experience: 10, status: 'Busy', schedule: 'Mon-Thu 11AM-7PM', patients: 22, fee: 2000 },
];

export const initialAppointments = [
  { id: 1, patientName: 'Ahmed Khan', doctorName: 'Dr. Ayesha Malik', date: '2026-04-05', time: '10:00 AM', type: 'Checkup', status: 'Scheduled', notes: 'Regular cardiac checkup' },
  { id: 2, patientName: 'Sara Ali', doctorName: 'Dr. Imran Shah', date: '2026-04-05', time: '11:30 AM', type: 'Follow-up', status: 'Confirmed', notes: 'BP monitoring follow-up' },
  { id: 3, patientName: 'Usman Tariq', doctorName: 'Dr. Hassan Raza', date: '2026-04-06', time: '09:00 AM', type: 'Consultation', status: 'Scheduled', notes: 'Post-surgery review' },
  { id: 4, patientName: 'Fatima Noor', doctorName: 'Dr. Ayesha Malik', date: '2026-04-04', time: '02:00 PM', type: 'Emergency', status: 'Completed', notes: 'Emergency cardiac evaluation' },
  { id: 5, patientName: 'Bilal Hussain', doctorName: 'Dr. Nadia Farooq', date: '2026-04-07', time: '03:30 PM', type: 'Checkup', status: 'Scheduled', notes: 'Skin allergy consultation' },
];

export const initialBills = [
  { id: 1, patientName: 'Ahmed Khan', date: '2026-04-01', items: 'Consultation + ECG + Blood Test', amount: 8500, paid: 8500, status: 'Paid', method: 'Card' },
  { id: 2, patientName: 'Sara Ali', date: '2026-03-28', items: 'Consultation + Medicine', amount: 3200, paid: 2000, status: 'Partial', method: 'Cash' },
  { id: 3, patientName: 'Usman Tariq', date: '2026-03-15', items: 'Surgery + Room (3 days) + Medicine', amount: 125000, paid: 125000, status: 'Paid', method: 'Bank Transfer' },
  { id: 4, patientName: 'Fatima Noor', date: '2026-04-02', items: 'Emergency + ICU (2 days) + Tests', amount: 95000, paid: 0, status: 'Unpaid', method: '-' },
  { id: 5, patientName: 'Bilal Hussain', date: '2026-03-30', items: 'Consultation + X-Ray', amount: 4500, paid: 4500, status: 'Paid', method: 'Cash' },
];

export const initialPrescriptions = [
  { id: 1, patientName: 'Ahmed Khan', doctorName: 'Dr. Ayesha Malik', date: '2026-04-01', diagnosis: 'Type-2 Diabetes', medicines: [{ name: 'Metformin 500mg', dosage: 'Twice daily', duration: '30 days' }, { name: 'Glimepiride 2mg', dosage: 'Once daily', duration: '30 days' }], status: 'Active' },
  { id: 2, patientName: 'Sara Ali', doctorName: 'Dr. Imran Shah', date: '2026-03-28', diagnosis: 'Hypertension', medicines: [{ name: 'Amlodipine 5mg', dosage: 'Once daily', duration: '60 days' }], status: 'Active' },
  { id: 3, patientName: 'Usman Tariq', doctorName: 'Dr. Hassan Raza', date: '2026-03-15', diagnosis: 'Fractured Tibia', medicines: [{ name: 'Ibuprofen 400mg', dosage: 'Thrice daily', duration: '14 days' }, { name: 'Calcium + Vit D', dosage: 'Once daily', duration: '60 days' }], status: 'Completed' },
  { id: 4, patientName: 'Fatima Noor', doctorName: 'Dr. Ayesha Malik', date: '2026-04-02', diagnosis: 'Cardiac Arrhythmia', medicines: [{ name: 'Amiodarone 200mg', dosage: 'Once daily', duration: '30 days' }, { name: 'Aspirin 75mg', dosage: 'Once daily', duration: '90 days' }, { name: 'Atorvastatin 20mg', dosage: 'Once at bedtime', duration: '90 days' }], status: 'Active' },
  { id: 5, patientName: 'Bilal Hussain', doctorName: 'Dr. Nadia Farooq', date: '2026-03-30', diagnosis: 'Contact Dermatitis', medicines: [{ name: 'Cetirizine 10mg', dosage: 'Once daily', duration: '10 days' }, { name: 'Hydrocortisone Cream', dosage: 'Apply twice daily', duration: '14 days' }], status: 'Active' },
];
