import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import useAppContext from '../hooks/useAppContext';
import StatCard from '../components/common/StatCard';
import './Pages.css';

// BillForm - demonstrates Props, Props Validation, controlled forms
const BillForm = ({ initial, patients, onSubmit, onCancel }) => {
  const [form, setForm] = useState(
    initial || { patientName: '', date: '', items: '', amount: '', paid: '', status: 'Unpaid', method: 'Cash' }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.patientName || !form.date || !form.items || !form.amount) {
      alert('Please fill required fields: Patient, Date, Items, Amount');
      return;
    }
    const amount = Number(form.amount);
    const paid = Number(form.paid) || 0;
    let status = 'Unpaid';
    if (paid >= amount) status = 'Paid';
    else if (paid > 0) status = 'Partial';
    onSubmit({ ...form, amount, paid, status });
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <div className="form-group">
          <label>Date *</label>
          <input className="form-control" name="date" type="date" value={form.date} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Payment Method</label>
          <select className="form-control" name="method" value={form.method} onChange={handleChange}>
            <option>Cash</option><option>Card</option><option>Bank Transfer</option><option>Insurance</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label>Items / Services *</label>
        <textarea className="form-control" name="items" rows="2" value={form.items} onChange={handleChange} placeholder="e.g. Consultation + ECG + Blood Test" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <div className="form-group">
          <label>Total Amount (Rs) *</label>
          <input className="form-control" name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="0" />
        </div>
        <div className="form-group">
          <label>Amount Paid (Rs)</label>
          <input className="form-control" name="paid" type="number" value={form.paid} onChange={handleChange} placeholder="0" />
        </div>
      </div>
      <div className="modal-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">{initial ? 'Update Bill' : 'Create Bill'}</button>
      </div>
    </form>
  );
};

BillForm.propTypes = {
  initial: PropTypes.object,
  patients: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

// Billing Page - demonstrates Hooks (useState, useMemo, useContext)
const Billing = () => {
  const { bills, patients, addBill, updateBill, deleteBill } = useAppContext();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  // Computed stats using useMemo
  const stats = useMemo(() => {
    const totalRevenue = bills.reduce((s, b) => s + b.amount, 0);
    const totalCollected = bills.reduce((s, b) => s + b.paid, 0);
    const totalPending = totalRevenue - totalCollected;
    const paidCount = bills.filter(b => b.status === 'Paid').length;
    return { totalRevenue, totalCollected, totalPending, paidCount };
  }, [bills]);

  const filtered = useMemo(() => {
    return bills.filter((b) => {
      const matchSearch = b.patientName.toLowerCase().includes(search.toLowerCase()) || b.items.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === 'All' || b.status === filter;
      return matchSearch && matchFilter;
    });
  }, [bills, search, filter]);

  const handleAdd = (data) => { addBill(data); setShowModal(false); };
  const handleEdit = (data) => { updateBill(editing.id, data); setEditing(null); };
  const handleDelete = (id) => { if (window.confirm('Delete this bill?')) deleteBill(id); };

  const getStatusBadge = (status) => {
    const map = { Paid: 'success', Partial: 'warning', Unpaid: 'danger' };
    return map[status] || 'info';
  };

  return (
    <div>
      <div className="page-header">
        <h1>Billing & Payments</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Create Bill</button>
      </div>

      {/* Revenue Stats */}
      <div className="stats-grid">
        <StatCard icon="💰" label="Total Revenue" value={`Rs ${stats.totalRevenue.toLocaleString()}`} color="#16a34a" />
        <StatCard icon="✅" label="Collected" value={`Rs ${stats.totalCollected.toLocaleString()}`} color="#3b82f6" />
        <StatCard icon="⏳" label="Pending" value={`Rs ${stats.totalPending.toLocaleString()}`} color="#f59e0b" />
        <StatCard icon="📄" label="Paid Bills" value={`${stats.paidCount} / ${bills.length}`} color="#8b5cf6" />
      </div>

      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input placeholder="Search bills by patient or service..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="filter-bar">
        {['All', 'Paid', 'Partial', 'Unpaid'].map((f) => (
          <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f} ({f === 'All' ? bills.length : bills.filter(b => b.status === f).length})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state"><div className="empty-icon">💳</div><p>No bills found</p></div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Patient</th><th>Date</th><th>Services</th><th>Amount</th><th>Paid</th><th>Balance</th><th>Method</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id}>
                  <td><strong>{b.patientName}</strong></td>
                  <td>{b.date}</td>
                  <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.items}</td>
                  <td><strong>Rs {b.amount.toLocaleString()}</strong></td>
                  <td style={{ color: '#16a34a', fontWeight: 600 }}>Rs {b.paid.toLocaleString()}</td>
                  <td style={{ color: b.amount - b.paid > 0 ? '#ef4444' : '#16a34a', fontWeight: 600 }}>
                    Rs {(b.amount - b.paid).toLocaleString()}
                  </td>
                  <td>{b.method}</td>
                  <td><span className={`badge badge-${getStatusBadge(b.status)}`}>{b.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-sm btn-primary" onClick={() => setEditing(b)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(b.id)}>Del</button>
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
            <h2>Create New Bill</h2>
            <BillForm patients={patients} onSubmit={handleAdd} onCancel={() => setShowModal(false)} />
          </div>
        </div>
      )}

      {editing && (
        <div className="modal-overlay" onClick={() => setEditing(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Bill</h2>
            <BillForm initial={editing} patients={patients} onSubmit={handleEdit} onCancel={() => setEditing(null)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
