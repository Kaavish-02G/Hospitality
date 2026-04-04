import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import useAppContext from '../hooks/useAppContext';
import './Pages.css';

// DoctorForm - demonstrates Props Validation
const DoctorForm = ({ initial, onSubmit, onCancel }) => {
  const [form, setForm] = useState(
    initial || { name: '', specialization: '', phone: '', email: '', experience: '', status: 'Available', schedule: '', fee: '' }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.specialization || !form.phone) {
      alert('Please fill in required fields: Name, Specialization, Phone');
      return;
    }
    onSubmit({ ...form, experience: Number(form.experience), fee: Number(form.fee) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <div className="form-group">
          <label>Full Name *</label>
          <input className="form-control" name="name" value={form.name} onChange={handleChange} placeholder="Dr. Name" />
        </div>
        <div className="form-group">
          <label>Specialization *</label>
          <select className="form-control" name="specialization" value={form.specialization} onChange={handleChange}>
            <option value="">Select</option>
            {['Cardiology','Orthopedics','Neurology','General Medicine','Dermatology','Pediatrics','Gynecology','Ophthalmology','ENT','Psychiatry'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Phone *</label>
          <input className="form-control" name="phone" value={form.phone} onChange={handleChange} placeholder="03XX-XXXXXXX" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input className="form-control" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email address" />
        </div>
        <div className="form-group">
          <label>Experience (Years)</label>
          <input className="form-control" name="experience" type="number" value={form.experience} onChange={handleChange} placeholder="Years" />
        </div>
        <div className="form-group">
          <label>Fee (Rs)</label>
          <input className="form-control" name="fee" type="number" value={form.fee} onChange={handleChange} placeholder="Consultation fee" />
        </div>
        <div className="form-group">
          <label>Schedule</label>
          <input className="form-control" name="schedule" value={form.schedule} onChange={handleChange} placeholder="e.g. Mon-Fri 9AM-5PM" />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select className="form-control" name="status" value={form.status} onChange={handleChange}>
            <option>Available</option><option>Busy</option><option>On Leave</option>
          </select>
        </div>
      </div>
      <div className="modal-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">{initial ? 'Update Doctor' : 'Add Doctor'}</button>
      </div>
    </form>
  );
};

DoctorForm.propTypes = {
  initial: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

// DoctorCard - demonstrates Styling in React (CSS-in-JS style objects)
const DoctorCard = ({ doctor, onEdit, onDelete }) => {
  const statusColors = {
    Available: { bg: '#dcfce7', color: '#166534' },
    Busy: { bg: '#fef3c7', color: '#92400e' },
    'On Leave': { bg: '#fee2e2', color: '#991b1b' },
  };
  const sc = statusColors[doctor.status] || statusColors.Available;

  const cardStyle = {
    background: '#fff',
    borderRadius: 14,
    padding: 24,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  };

  const avatarStyle = {
    width: 56,
    height: 56,
    borderRadius: 14,
    background: 'linear-gradient(135deg, #16a34a, #22c55e)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
    fontWeight: 700,
  };

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={avatarStyle}>{doctor.name.charAt(4) || doctor.name.charAt(0)}</div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1f2937', margin: 0 }}>{doctor.name}</h3>
          <p style={{ fontSize: 13, color: '#16a34a', fontWeight: 600, margin: 0 }}>{doctor.specialization}</p>
        </div>
        <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: sc.bg, color: sc.color }}>{doctor.status}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13, color: '#6b7280' }}>
        <div>📞 {doctor.phone}</div>
        <div>⏱️ {doctor.experience} years exp.</div>
        <div>🕐 {doctor.schedule}</div>
        <div>👥 {doctor.patients} patients</div>
        <div style={{ gridColumn: 'span 2', fontWeight: 600, color: '#16a34a', fontSize: 15 }}>Fee: Rs {doctor.fee?.toLocaleString()}</div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <button className="btn btn-sm btn-primary" style={{ flex: 1 }} onClick={() => onEdit(doctor)}>Edit</button>
        <button className="btn btn-sm btn-danger" onClick={() => onDelete(doctor.id)}>Remove</button>
      </div>
    </div>
  );
};

DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    specialization: PropTypes.string.isRequired,
    phone: PropTypes.string,
    experience: PropTypes.number,
    status: PropTypes.string,
    schedule: PropTypes.string,
    patients: PropTypes.number,
    fee: PropTypes.number,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

// Doctors Page
const Doctors = () => {
  const { doctors, addDoctor, updateDoctor, deleteDoctor } = useAppContext();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === 'All' || d.status === filter;
      return matchSearch && matchFilter;
    });
  }, [doctors, search, filter]);

  const handleAdd = (data) => { addDoctor(data); setShowModal(false); };
  const handleEdit = (data) => { updateDoctor(editing.id, data); setEditing(null); };
  const handleDelete = (id) => { if (window.confirm('Remove this doctor?')) deleteDoctor(id); };

  return (
    <div>
      <div className="page-header">
        <h1>Doctor & Staff Management</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Doctor</button>
      </div>

      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input placeholder="Search doctors by name or specialization..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="filter-bar">
        {['All', 'Available', 'Busy', 'On Leave'].map((f) => (
          <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f} ({f === 'All' ? doctors.length : doctors.filter(d => d.status === f).length})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state"><div className="empty-icon">👨‍⚕️</div><p>No doctors found</p></div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
          {filtered.map((d) => (
            <DoctorCard key={d.id} doctor={d} onEdit={setEditing} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Doctor</h2>
            <DoctorForm onSubmit={handleAdd} onCancel={() => setShowModal(false)} />
          </div>
        </div>
      )}

      {editing && (
        <div className="modal-overlay" onClick={() => setEditing(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Doctor</h2>
            <DoctorForm initial={editing} onSubmit={handleEdit} onCancel={() => setEditing(null)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;
