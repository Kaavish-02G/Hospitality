import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Doctors from './pages/Doctors';
import Billing from './pages/Billing';
import Prescriptions from './pages/Prescriptions';
import AppProvider from './context/AppContext';

// App Component - demonstrates Routing with React Router
function App() {
  return (
    // Context Provider wraps the entire app - demonstrates React Dataflow (Context)
    <AppProvider>
      {/* Layout component provides consistent structure across pages */}
      <Layout>
        <Routes>
          {/* Home/Dashboard route */}
          <Route path="/" element={<Dashboard />} />
          
          {/* Patient Management routes */}
          <Route path="/patients" element={<Patients />} />
          
          {/* Appointment Booking routes */}
          <Route path="/appointments" element={<Appointments />} />
          
          {/* Doctor & Staff Management routes */}
          <Route path="/doctors" element={<Doctors />} />
          
          {/* Billing & Payments routes */}
          <Route path="/billing" element={<Billing />} />
          
          {/* Prescription & Pharmacy routes */}
          <Route path="/prescriptions" element={<Prescriptions />} />
          
          {/* Catch all route - redirects to dashboard */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Layout>
    </AppProvider>
  );
}

export default App;
