import React, { useState } from 'react';
import { X, Save, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';

export function ViewDetailModal({ registration, onClose }) {
  if (!registration) return null;

  return (
    <div className="modal-backdrop">
      <div className="glass-card" style={{ maxWidth: '650px', width: '100%', padding: '32px', borderColor: '#00f0ff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ff1e42', letterSpacing: '0.15em' }}>REGISTRATION DETAILS</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff' }}>{registration.registration_id}</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={24} /></button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Student Name</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>{registration.name}</p>
          </div>

          <div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Department</p>
            <p style={{ fontSize: '1.05rem', fontWeight: 600, color: '#00f0ff' }}>{registration.department}</p>
          </div>

          <div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Date of Birth</p>
            <p style={{ fontSize: '1rem', color: '#ffffff' }}>{registration.dob}</p>
          </div>

          <div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>WhatsApp / Mobile</p>
            <p style={{ fontSize: '1rem', color: '#ff1e42', fontWeight: 700 }}>{registration.phone}</p>
          </div>

          <div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Audition Category</p>
            <span className={`badge-category ${registration.category === 'Singing' ? 'badge-singing' : 'badge-instruments'}`}>
              {registration.category}
            </span>
          </div>

          <div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Instrument</p>
            <p style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>{registration.instrument || '—'}</p>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px' }}>Musical Experience</p>
          <div style={{ padding: '14px', background: 'rgba(6, 8, 14, 0.8)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#cbd5e1', fontSize: '0.95rem', whiteSpace: 'pre-wrap', maxHeight: '180px', overflowY: 'auto' }}>
            {registration.experience}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Registered: {new Date(registration.timestamp).toLocaleString()}
          </span>
          <button className="btn-secondary" onClick={onClose} style={{ padding: '8px 20px' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function EditModal({ registration, onClose, onSave }) {
  const [form, setForm] = useState({ ...registration });
  const [showConfirm, setShowConfirm] = useState(false);

  if (!registration) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const confirmSave = () => {
    onSave(form);
  };

  return (
    <div className="modal-backdrop">
      <div className="glass-card" style={{ maxWidth: '650px', width: '100%', padding: '32px', borderColor: '#ff1e42' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ff1e42' }}>Edit Registration #{registration.registration_id}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={22} /></button>
        </div>

        {!showConfirm ? (
          <form onSubmit={handleSaveClick}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <input className="form-input" name="department" value={form.department} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input className="form-input" type="date" name="dob" value={form.dob} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">WhatsApp Number</label>
                <input className="form-input" name="phone" value={form.phone} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-select" name="category" value={form.category} onChange={handleChange}>
                  <option value="Singing">Singing</option>
                  <option value="Instruments">Instruments</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Instrument</label>
                <input className="form-input" name="instrument" value={form.instrument} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Experience</label>
              <textarea className="form-textarea" name="experience" value={form.experience} onChange={handleChange} required />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
              <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn-primary"><Save size={16} /> Save Changes</button>
            </div>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <AlertTriangle size={48} color="#ff1e42" style={{ margin: '0 auto 16px' }} />
            <h4 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Save Changes?</h4>
            <p style={{ color: '#cbd5e1', marginBottom: '24px' }}>Are you sure you want to update this student's registration record?</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <button className="btn-secondary" onClick={() => setShowConfirm(false)}>CANCEL</button>
              <button className="btn-primary" onClick={confirmSave}><CheckCircle size={16} /> SAVE CHANGES</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function DeleteConfirmModal({ registration, onClose, onDelete }) {
  if (!registration) return null;

  return (
    <div className="modal-backdrop">
      <div className="glass-card" style={{ maxWidth: '480px', width: '100%', padding: '32px', textAlign: 'center', borderColor: '#ff1e42' }}>
        <div 
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(255, 30, 66, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            border: '1px solid #ff1e42'
          }}
        >
          <Trash2 size={28} color="#ff1e42" />
        </div>

        <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '8px', color: '#ffffff' }}>
          Delete Registration?
        </h3>
        <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '24px' }}>
          This action cannot be undone. Are you sure you want to delete the registration for <strong>{registration.name}</strong> ({registration.registration_id})?
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button className="btn-secondary" onClick={onClose} style={{ flex: 1 }}>
            CANCEL
          </button>
          <button 
            className="btn-primary" 
            onClick={() => onDelete(registration.id)}
            style={{ flex: 1, background: '#dc2626', borderColor: '#ff1e42' }}
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
