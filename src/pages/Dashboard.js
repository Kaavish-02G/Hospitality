import React from 'react';
import { Link } from 'react-router-dom';
import useAppContext from '../hooks/useAppContext';
import StatCard from '../components/common/StatCard';
import './Pages.css';

// Dashboard - demonstrates Hooks (useContext via custom hook) and JSX
const Dashboard = () => {
  const { patients, doctors, appointments, bills, prescriptions } = useAppContext();

  const totalRevenue = bills.reduce((sum, b) => sum + b.paid, 0);
  const pendingBills = bills.filter((b) => b.status !== 'Paid').length;
  const todayAppointments = appointments.filter((a) => a.status === 'Scheduled').length;
  const criticalPatients = patients.filter((p) => p.status === 'Critical').length;

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="page-subtitle">Welcome back! Here's your hospital overview.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard icon="🏥" label="Total Patients" value={patients.length} color="#16a34a" trend="+12% this month" />
        <StatCard icon="👨‍⚕️" label="Active Doctors" value={doctors.filter(d => d.status === 'Available').length} color="#3b82f6" trend={`${doctors.length} total`} />
        <StatCard icon="📅" label="Pending Appointments" value={todayAppointments} color="#f59e0b" trend="Upcoming schedule" />
        <StatCard icon="💳" label="Revenue Collected" value={`Rs ${totalRevenue.toLocaleString()}`} color="#8b5cf6" trend={`${pendingBills} pending bills`} />
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions">
          <Link to="/patients" className="action-card">
            <div className="action-icon" style={{ background: '#dcfce7' }}>🏥</div>
            <div className="action-label">Add Patient</div>
          </Link>
          <Link to="/appointments" className="action-card">
            <div className="action-icon" style={{ background: '#dbeafe' }}>📅</div>
            <div className="action-label">Book Appointment</div>
          </Link>
          <Link to="/billing" className="action-card">
            <div className="action-icon" style={{ background: '#fef3c7' }}>💳</div>
            <div className="action-label">Create Bill</div>
          </Link>
          <Link to="/prescriptions" className="action-card">
            <div className="action-icon" style={{ background: '#ede9fe' }}>💊</div>
            <div className="action-label">New Prescription</div>
          </Link>
        </div>
      </div>

      {/* Recent Activity - Two Column */}
      <div className="dashboard-grid">
        {/* Recent Patients */}
        <div className="card">
          <div className="card-header">
            <h3>Recent Patients</h3>
            <Link to="/patients" className="view-all">View All →</Link>
          </div>
          <div className="mini-list">
            {patients.slice(-4).reverse().map((p) => (
              <div key={p.id} className="mini-list-item">
                <div className="mini-avatar" style={{ background: p.status === 'Critical' ? '#fee2e2' : '#dcfce7', color: p.status === 'Critical' ? '#ef4444' : '#16a34a' }}>
                  {p.name.charAt(0)}
                </div>
                <div className="mini-info">
                  <div className="mini-name">{p.name}</div>
                  <div className="mini-detail">{p.condition}</div>
                </div>
                <span className={`badge badge-${p.status === 'Active' ? 'success' : p.status === 'Critical' ? 'danger' : 'info'}`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="card">
          <div className="card-header">
            <h3>Upcoming Appointments</h3>
            <Link to="/appointments" className="view-all">View All →</Link>
          </div>
          <div className="mini-list">
            {appointments.filter(a => a.status !== 'Completed').slice(0, 4).map((a) => (
              <div key={a.id} className="mini-list-item">
                <div className="mini-avatar" style={{ background: '#dbeafe', color: '#3b82f6' }}>
                  📅
                </div>
                <div className="mini-info">
                  <div className="mini-name">{a.patientName}</div>
                  <div className="mini-detail">{a.doctorName} • {a.date} at {a.time}</div>
                </div>
                <span className={`badge badge-${a.status === 'Confirmed' ? 'success' : 'warning'}`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {criticalPatients > 0 && (
        <div className="alert-banner">
          <span className="alert-icon">⚠️</span>
          <span><strong>{criticalPatients} critical patient(s)</strong> require immediate attention.</span>
          <Link to="/patients" className="btn btn-sm btn-danger">View Patients</Link>
        </div>
      )}

      {/* Active Prescriptions Summary */}
      <div className="card" style={{ marginTop: 20 }}>
        <div className="card-header">
          <h3>Active Prescriptions</h3>
          <Link to="/prescriptions" className="view-all">View All →</Link>
        </div>
        <div className="table-container" style={{ boxShadow: 'none' }}>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Diagnosis</th>
                <th>Medicines</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.filter(p => p.status === 'Active').slice(0, 3).map((rx) => (
                <tr key={rx.id}>
                  <td><strong>{rx.patientName}</strong></td>
                  <td>{rx.doctorName}</td>
                  <td>{rx.diagnosis}</td>
                  <td>{rx.medicines.length} medicine(s)</td>
                  <td><span className="badge badge-success">{rx.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
