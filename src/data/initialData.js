// Initial mock data for the Hospitality HMS

export const initialPatients = [
  { id: 1, name: 'a', age: 45, gender: 'Male', phone: '1111111111', email: 'a@email.com', blood: 'A+', address: 'Address 1', condition: 'Diabetes', status: 'Active', admitDate: '2026-03-15' },
  { id: 2, name: 'b', age: 32, gender: 'Female', phone: '2222222222', email: 'b@email.com', blood: 'B+', address: 'Address 2', condition: 'Hypertension', status: 'Active', admitDate: '2026-03-20' },
  { id: 3, name: 'c', age: 28, gender: 'Male', phone: '3333333333', email: 'c@email.com', blood: 'O+', address: 'Address 3', condition: 'Fracture', status: 'Discharged', admitDate: '2026-02-10' },
  { id: 4, name: 'd', age: 55, gender: 'Female', phone: '4444444444', email: 'd@email.com', blood: 'AB-', address: 'Address 4', condition: 'Cardiac Arrest', status: 'Critical', admitDate: '2026-04-01' },
  { id: 5, name: 'e', age: 38, gender: 'Male', phone: '5555555555', email: 'e@email.com', blood: 'A-', address: 'Address 5', condition: 'Pneumonia', status: 'Active', admitDate: '2026-03-28' },
];

export const initialDoctors = [
  { id: 1, name: 'a', specialization: 'Cardiology', phone: '6666666666', email: 'a@hospital.com', experience: 15, status: 'Available', schedule: 'Mon-Fri 9AM-5PM', patients: 24, fee: 3000 },
  { id: 2, name: 'b', specialization: 'Orthopedics', phone: '7777777777', email: 'b@hospital.com', experience: 12, status: 'Available', schedule: 'Mon-Sat 10AM-6PM', patients: 18, fee: 2500 },
  { id: 3, name: 'c', specialization: 'Neurology', phone: '8888888888', email: 'c@hospital.com', experience: 20, status: 'On Leave', schedule: 'Tue-Sat 8AM-4PM', patients: 30, fee: 4000 },
  { id: 4, name: 'd', specialization: 'General Medicine', phone: '9999999999', email: 'd@hospital.com', experience: 8, status: 'Available', schedule: 'Mon-Fri 8AM-3PM', patients: 35, fee: 1500 },
  { id: 5, name: 'e', specialization: 'Dermatology', phone: '1010101010', email: 'e@hospital.com', experience: 10, status: 'Busy', schedule: 'Mon-Thu 11AM-7PM', patients: 22, fee: 2000 },
];

export const initialAppointments = [
  { id: 1, patientName: 'a', doctorName: 'a', date: '2026-04-05', time: '10:00 AM', type: 'Checkup', status: 'Scheduled', notes: 'Regular cardiac checkup' },
  { id: 2, patientName: 'b', doctorName: 'd', date: '2026-04-05', time: '11:30 AM', type: 'Follow-up', status: 'Confirmed', notes: 'BP monitoring follow-up' },
  { id: 3, patientName: 'c', doctorName: 'b', date: '2026-04-06', time: '09:00 AM', type: 'Consultation', status: 'Scheduled', notes: 'Post-surgery review' },
  { id: 4, patientName: 'd', doctorName: 'a', date: '2026-04-04', time: '02:00 PM', type: 'Emergency', status: 'Completed', notes: 'Emergency cardiac evaluation' },
  { id: 5, patientName: 'e', doctorName: 'e', date: '2026-04-07', time: '03:30 PM', type: 'Checkup', status: 'Scheduled', notes: 'Skin allergy consultation' },
];

export const initialBills = [
  { id: 1, patientName: 'a', date: '2026-04-01', items: 'Consultation + ECG + Blood Test', amount: 8500, paid: 8500, status: 'Paid', method: 'Card' },
  { id: 2, patientName: 'b', date: '2026-03-28', items: 'Consultation + Medicine', amount: 3200, paid: 2000, status: 'Partial', method: 'Cash' },
  { id: 3, patientName: 'c', date: '2026-03-15', items: 'Surgery + Room (3 days) + Medicine', amount: 125000, paid: 125000, status: 'Paid', method: 'Bank Transfer' },
  { id: 4, patientName: 'd', date: '2026-04-02', items: 'Emergency + ICU (2 days) + Tests', amount: 95000, paid: 0, status: 'Unpaid', method: '-' },
  { id: 5, patientName: 'e', date: '2026-03-30', items: 'Consultation + X-Ray', amount: 4500, paid: 4500, status: 'Paid', method: 'Cash' },
];

export const initialPrescriptions = [
  { id: 1, patientName: 'a', doctorName: 'a', date: '2026-04-01', diagnosis: 'Type-2 Diabetes', medicines: [{ name: 'Metformin 500mg', dosage: 'Twice daily', duration: '30 days' }, { name: 'Glimepiride 2mg', dosage: 'Once daily', duration: '30 days' }], status: 'Active' },
  { id: 2, patientName: 'b', doctorName: 'd', date: '2026-03-28', diagnosis: 'Hypertension', medicines: [{ name: 'Amlodipine 5mg', dosage: 'Once daily', duration: '60 days' }], status: 'Active' },
  { id: 3, patientName: 'c', doctorName: 'b', date: '2026-03-15', diagnosis: 'Fractured Tibia', medicines: [{ name: 'Ibuprofen 400mg', dosage: 'Thrice daily', duration: '14 days' }, { name: 'Calcium + Vit D', dosage: 'Once daily', duration: '60 days' }], status: 'Completed' },
  { id: 4, patientName: 'd', doctorName: 'a', date: '2026-04-02', diagnosis: 'Cardiac Arrhythmia', medicines: [{ name: 'Amiodarone 200mg', dosage: 'Once daily', duration: '30 days' }, { name: 'Aspirin 75mg', dosage: 'Once daily', duration: '90 days' }, { name: 'Atorvastatin 20mg', dosage: 'Once at bedtime', duration: '90 days' }], status: 'Active' },
  { id: 5, patientName: 'e', doctorName: 'e', date: '2026-03-30', diagnosis: 'Contact Dermatitis', medicines: [{ name: 'Cetirizine 10mg', dosage: 'Once daily', duration: '10 days' }, { name: 'Hydrocortisone Cream', dosage: 'Apply twice daily', duration: '14 days' }], status: 'Active' },
];
