import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import useAppContext from '../hooks/useAppContext';
import './Pages.css';

// PrescriptionForm - demonstrates Hooks (useState, useCallback), Props Validation
const PrescriptionForm = ({ initial, patients, doctors, onSubmit, onCancel }) => {
  const [form, setForm] = useState(
    initial || { patientName: '', doctorName: '', date: '', diagnosis: '', status: 'Active', medicines: [] }
  );
  const [med, setMed] = useState({ name: '', dosage: '', duration: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // useCallback - demonstrates Hooks optimization
  const addMedicine = useCallback(() => {
    if (!med.name || !med.dosage || !med.duration) {
      alert('Please fill all medicine fields');
      return;
    }
    setForm((prev) => ({ ...prev, medicines: [...prev.medicines, { ...med }] }));
    setMed({ name: '', dosage: '', duration: '' });
  }, [med]);

  const removeMedicine = (index) => {
    setForm((prev) => ({
      ...prev,
      medicines: prev.medicines.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.patientName || !form.doctorName || !form.date || !form.diagnosis) {
      alert('Please fill all required fields');
      return;
    }
    if (form.medicines.length === 0) {
      alert('Please add at least one medicine');
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
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
            {doctors.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Date *</label>
          <input className="form-control" name="date" type="date" value={form.date} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select className="form-control" name="status" value={form.status} onChange={handleChange}>
            <option>Active</option><option>Completed</option><option>Cancelled</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label>Diagnosis *</label>
        <input className="form-control" name="diagnosis" value={form.diagnosis} onChange={handleChange} placeholder="Patient diagnosis" />
      </div>

      {/* Medicine Builder */}
      <div style={{ marginTop: 8, marginBottom: 16 }}>
        <label style={{ fontWeight: 700, fontSize: 14, color: '#1f2937', marginBottom: 10, display: 'block' }}>
          Medicines ({form.medicines.length})
        </label>

        {form.medicines.length > 0 && (
          <div className="medicine-list" style={{ marginBottom: 12 }}>
            <div className="medicine-item header">
              <span>Medicine</span><span>Dosage</span><span>Duration</span>
            </div>
            {form.medicines.map((m, i) => (
              <div className="medicine-item" key={i} style={{ alignItems: 'center' }}>
                <span>{m.name}</span>
                <span>{m.dosage}</span>
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {m.duration}
                  <button type="button" className="btn btn-sm btn-danger" style={{ marginLeft: 8, padding: '2px 8px' }} onClick={() => removeMedicine(i)}>x</button>
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="medicine-input-row">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Medicine Name</label>
            <input className="form-control" value={med.name} onChange={(e) => setMed(p => ({ ...p, name: e.target.value }))} placeholder="Medicine name" />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Dosage</label>
            <input className="form-control" value={med.dosage} onChange={(e) => setMed(p => ({ ...p, dosage: e.target.value }))} placeholder="e.g. Twice daily" />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Duration</label>
            <input className="form-control" value={med.duration} onChange={(e) => setMed(p => ({ ...p, duration: e.target.value }))} placeholder="e.g. 30 days" />
          </div>
          <button type="button" className="btn btn-primary btn-sm" style={{ height: 40, marginTop: 22 }} onClick={addMedicine}>+ Add</button>
        </div>
      </div>

      <div className="modal-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">{initial ? 'Update' : 'Create Prescription'}</button>
      </div>
    </form>
  );
};

PrescriptionForm.propTypes = {
  initial: PropTypes.object,
  patients: PropTypes.array.isRequired,
  doctors: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

// Prescriptions Page
const Prescriptions = () => {
  const { prescriptions, patients, doctors, addPrescription, updatePrescription, deletePrescription } = useAppContext();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewRx, setViewRx] = useState(null);

  const filtered = useMemo(() => {
    return prescriptions.filter((rx) => {
      const matchSearch = rx.patientName.toLowerCase().includes(search.toLowerCase()) || rx.doctorName.toLowerCase().includes(search.toLowerCase()) || rx.diagnosis.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === 'All' || rx.status === filter;
      return matchSearch && matchFilter;
    });
  }, [prescriptions, search, filter]);

  const handleAdd = (data) => { addPrescription(data); setShowModal(false); };
  const handleEdit = (data) => { updatePrescription(editing.id, data); setEditing(null); };
  const handleDelete = (id) => { if (window.confirm('Delete this prescription?')) deletePrescription(id); };

  return (
    <div>
      <div className="page-header">
        <h1>Prescription & Pharmacy</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ New Prescription</button>
      </div>

      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input placeholder="Search by patient, doctor, or diagnosis..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="filter-bar">
        {['All', 'Active', 'Completed', 'Cancelled'].map((f) => (
          <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f} ({f === 'All' ? prescriptions.length : prescriptions.filter(r => r.status === f).length})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state"><div className="empty-icon">💊</div><p>No prescriptions found</p></div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Diagnosis</th><th>Medicines</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((rx) => (
                <tr key={rx.id}>
                  <td><strong>{rx.patientName}</strong></td>
                  <td>{rx.doctorName}</td>
                  <td>{rx.date}</td>
                  <td>{rx.diagnosis}</td>
                  <td>
                    <span className="badge badge-info">{rx.medicines.length} medicine(s)</span>
                  </td>
                  <td>
                    <span className={`badge badge-${rx.status === 'Active' ? 'success' : rx.status === 'Completed' ? 'info' : 'danger'}`}>
                      {rx.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-sm btn-outline" onClick={() => setViewRx(rx)}>View</button>
                      <button className="btn btn-sm btn-primary" onClick={() => setEditing(rx)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(rx.id)}>Del</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Prescription Modal */}
      {viewRx && (
        <div className="modal-overlay" onClick={() => setViewRx(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Prescription Details</h2>
            <div className="detail-grid">
              <div className="detail-item"><label>Patient</label><span>{viewRx.patientName}</span></div>
              <div className="detail-item"><label>Doctor</label><span>{viewRx.doctorName}</span></div>
              <div className="detail-item"><label>Date</label><span>{viewRx.date}</span></div>
              <div className="detail-item"><label>Status</label>
                <span className={`badge badge-${viewRx.status === 'Active' ? 'success' : 'info'}`}>{viewRx.status}</span>
              </div>
              <div className="detail-item" style={{ gridColumn: 'span 2' }}><label>Diagnosis</label><span>{viewRx.diagnosis}</span></div>
            </div>

            <label style={{ fontWeight: 700, fontSize: 14, color: '#1f2937', display: 'block', marginBottom: 8 }}>Prescribed Medicines</label>
            <div className="medicine-list">
              <div className="medicine-item header">
                <span>Medicine</span><span>Dosage</span><span>Duration</span>
              </div>
              {viewRx.medicines.map((m, i) => (
                <div className="medicine-item" key={i}>
                  <span style={{ fontWeight: 600 }}>{m.name}</span>
                  <span>{m.dosage}</span>
                  <span>{m.duration}</span>
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setViewRx(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" style={{ maxWidth: 640 }} onClick={(e) => e.stopPropagation()}>
            <h2>New Prescription</h2>
            <PrescriptionForm patients={patients} doctors={doctors} onSubmit={handleAdd} onCancel={() => setShowModal(false)} />
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="modal-overlay" onClick={() => setEditing(null)}>
          <div className="modal" style={{ maxWidth: 640 }} onClick={(e) => e.stopPropagation()}>
            <h2>Edit Prescription</h2>
            <PrescriptionForm initial={editing} patients={patients} doctors={doctors} onSubmit={handleEdit} onCancel={() => setEditing(null)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Prescriptions;
