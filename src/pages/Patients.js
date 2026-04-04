import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import useAppContext from '../hooks/useAppContext';
import './Pages.css';

// PatientForm - demonstrates Props, Props Validation, controlled forms with Hooks
const PatientForm = ({ initial, onSubmit, onCancel }) => {
  const [form, setForm] = useState(
    initial || { name: '', age: '', gender: 'Male', phone: '', email: '', blood: 'A+', address: '', condition: '', status: 'Active', admitDate: '' }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.phone || !form.condition) {
      alert('Please fill in required fields: Name, Age, Phone, Condition');
      return;
    }
    onSubmit({ ...form, age: Number(form.age) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <div className="form-group">
          <label>Full Name *</label>
          <input className="form-control" name="name" value={form.name} onChange={handleChange} placeholder="Patient name" />
        </div>
        <div className="form-group">
          <label>Age *</label>
          <input className="form-control" name="age" type="number" value={form.age} onChange={handleChange} placeholder="Age" />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select className="form-control" name="gender" value={form.gender} onChange={handleChange}>
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Blood Group</label>
          <select className="form-control" name="blood" value={form.blood} onChange={handleChange}>
            {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(b => <option key={b}>{b}</option>)}
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
        <div className="form-group" style={{ gridColumn: 'span 2' }}>
          <label>Address</label>
          <input className="form-control" name="address" value={form.address} onChange={handleChange} placeholder="Full address" />
        </div>
        <div className="form-group">
          <label>Condition *</label>
          <input className="form-control" name="condition" value={form.condition} onChange={handleChange} placeholder="Medical condition" />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select className="form-control" name="status" value={form.status} onChange={handleChange}>
            <option>Active</option><option>Discharged</option><option>Critical</option>
          </select>
        </div>
        <div className="form-group">
          <label>Admit Date</label>
          <input className="form-control" name="admitDate" type="date" value={form.admitDate} onChange={handleChange} />
        </div>
      </div>
      <div className="modal-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">{initial ? 'Update Patient' : 'Add Patient'}</button>
      </div>
    </form>
  );
};

PatientForm.propTypes = {
  initial: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

// Patients Page - demonstrates useState, useMemo Hooks, conditional rendering
const Patients = () => {
  const { patients, addPatient, updatePatient, deletePatient } = useAppContext();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewPatient, setViewPatient] = useState(null);

  // useMemo for filtering - demonstrates Hooks
  const filtered = useMemo(() => {
    return patients.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.condition.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === 'All' || p.status === filter;
      return matchSearch && matchFilter;
    });
  }, [patients, search, filter]);

  const handleAdd = (data) => {
    addPatient(data);
    setShowModal(false);
  };

  const handleEdit = (data) => {
    updatePatient(editing.id, data);
    setEditing(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      deletePatient(id);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Patient Management</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Patient</button>
      </div>

      {/* Search & Filter */}
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input placeholder="Search patients by name or condition..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="filter-bar">
        {['All', 'Active', 'Discharged', 'Critical'].map((f) => (
          <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f} {f === 'All' ? `(${patients.length})` : `(${patients.filter(p => p.status === f).length})`}
          </button>
        ))}
      </div>

      {/* Patient Table */}
      {filtered.length === 0 ? (
        <div className="empty-state"><div className="empty-icon">🏥</div><p>No patients found</p></div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Patient</th><th>Age/Gender</th><th>Phone</th><th>Condition</th><th>Blood</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td><strong>{p.name}</strong><br /><span style={{ fontSize: 12, color: '#9ca3af' }}>{p.email}</span></td>
                  <td>{p.age} / {p.gender}</td>
                  <td>{p.phone}</td>
                  <td>{p.condition}</td>
                  <td><span className="badge badge-info">{p.blood}</span></td>
                  <td>
                    <span className={`badge badge-${p.status === 'Active' ? 'success' : p.status === 'Critical' ? 'danger' : 'info'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-sm btn-outline" onClick={() => setViewPatient(p)}>View</button>
                      <button className="btn btn-sm btn-primary" onClick={() => setEditing(p)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>Del</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Patient</h2>
            <PatientForm onSubmit={handleAdd} onCancel={() => setShowModal(false)} />
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="modal-overlay" onClick={() => setEditing(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Patient</h2>
            <PatientForm initial={editing} onSubmit={handleEdit} onCancel={() => setEditing(null)} />
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewPatient && (
        <div className="modal-overlay" onClick={() => setViewPatient(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Patient Details</h2>
            <div className="detail-grid">
              <div className="detail-item"><label>Name</label><span>{viewPatient.name}</span></div>
              <div className="detail-item"><label>Age</label><span>{viewPatient.age}</span></div>
              <div className="detail-item"><label>Gender</label><span>{viewPatient.gender}</span></div>
              <div className="detail-item"><label>Blood Group</label><span>{viewPatient.blood}</span></div>
              <div className="detail-item"><label>Phone</label><span>{viewPatient.phone}</span></div>
              <div className="detail-item"><label>Email</label><span>{viewPatient.email}</span></div>
              <div className="detail-item" style={{ gridColumn: 'span 2' }}><label>Address</label><span>{viewPatient.address}</span></div>
              <div className="detail-item"><label>Condition</label><span>{viewPatient.condition}</span></div>
              <div className="detail-item"><label>Status</label><span className={`badge badge-${viewPatient.status === 'Active' ? 'success' : viewPatient.status === 'Critical' ? 'danger' : 'info'}`}>{viewPatient.status}</span></div>
              <div className="detail-item"><label>Admit Date</label><span>{viewPatient.admitDate}</span></div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setViewPatient(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;
