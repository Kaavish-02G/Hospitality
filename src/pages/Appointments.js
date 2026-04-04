import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import useAppContext from '../hooks/useAppContext';
import './Pages.css';

// AppointmentForm - Props Validation & controlled forms
const AppointmentForm = ({ initial, patients, doctors, onSubmit, onCancel }) => {
  const [form, setForm] = useState(
    initial || { patientName: '', doctorName: '', date: '', time: '', type: 'Checkup', status: 'Scheduled', notes: '' }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.patientName || !form.doctorName || !form.date || !form.time) {
      alert('Please fill in required fields');
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Patient *</label>
        <select className="form-control" name="patientName" value={form.patientName} onChange={handleChange}>
          <option value="">Select Patient</option>
          {patients.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Doctor *</label>
        <select className="form-control" name="doctorName" value={form.doctorName} onChange={handleChange}>
          <option value="">Select Doctor</option>
          {doctors.map((d) => <option key={d.id} value={d.name}>{d.name} - {d.specialization}</option>)}
        </select>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <div className="form-group">
          <label>Date *</label>
          <input className="form-control" name="date" type="date" value={form.date} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Time *</label>
          <input className="form-control" name="time" type="time" value={form.time} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Type</label>
          <select className="form-control" name="type" value={form.type} onChange={handleChange}>
            <option>Checkup</option><option>Follow-up</option><option>Consultation</option><option>Emergency</option><option>Surgery</option>
          </select>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select className="form-control" name="status" value={form.status} onChange={handleChange}>
            <option>Scheduled</option><option>Confirmed</option><option>Completed</option><option>Cancelled</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label>Notes</label>
        <textarea className="form-control" name="notes" rows="3" value={form.notes} onChange={handleChange} placeholder="Additional notes..." />
      </div>
      <div className="modal-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">{initial ? 'Update' : 'Book Appointment'}</button>
      </div>
    </form>
  );
};

AppointmentForm.propTypes = {
  initial: PropTypes.object,
  patients: PropTypes.array.isRequired,
  doctors: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

// Appointments Page
const Appointments = () => {
  const { appointments, patients, doctors, addAppointment, updateAppointment, deleteAppointment } = useAppContext();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      const matchSearch = a.patientName.toLowerCase().includes(search.toLowerCase()) || a.doctorName.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === 'All' || a.status === filter;
      return matchSearch && matchFilter;
    });
  }, [appointments, search, filter]);

  const handleAdd = (data) => { addAppointment(data); setShowModal(false); };
  const handleEdit = (data) => { updateAppointment(editing.id, data); setEditing(null); };
  const handleDelete = (id) => { if (window.confirm('Cancel this appointment?')) deleteAppointment(id); };

  const getStatusBadge = (status) => {
    const map = { Scheduled: 'warning', Confirmed: 'success', Completed: 'info', Cancelled: 'danger' };
    return map[status] || 'info';
  };

  const getTypeStyle = (type) => {
    if (type === 'Emergency') return { background: '#fee2e2', color: '#991b1b', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600 };
    return { background: '#f0fdf4', color: '#166534', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600 };
  };

  return (
    <div>
      <div className="page-header">
        <h1>Appointment Booking</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Book Appointment</button>
      </div>

      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input placeholder="Search by patient or doctor name..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="filter-bar">
        {['All', 'Scheduled', 'Confirmed', 'Completed', 'Cancelled'].map((f) => (
          <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f} ({f === 'All' ? appointments.length : appointments.filter(a => a.status === f).length})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state"><div className="empty-icon">📅</div><p>No appointments found</p></div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Type</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id}>
                  <td><strong>{a.patientName}</strong></td>
                  <td>{a.doctorName}</td>
                  <td>{a.date}</td>
                  <td>{a.time}</td>
                  <td><span style={getTypeStyle(a.type)}>{a.type}</span></td>
                  <td><span className={`badge badge-${getStatusBadge(a.status)}`}>{a.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-sm btn-primary" onClick={() => setEditing(a)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(a.id)}>Cancel</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Book New Appointment</h2>
            <AppointmentForm patients={patients} doctors={doctors} onSubmit={handleAdd} onCancel={() => setShowModal(false)} />
          </div>
        </div>
      )}

      {editing && (
        <div className="modal-overlay" onClick={() => setEditing(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Appointment</h2>
            <AppointmentForm initial={editing} patients={patients} doctors={doctors} onSubmit={handleEdit} onCancel={() => setEditing(null)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
