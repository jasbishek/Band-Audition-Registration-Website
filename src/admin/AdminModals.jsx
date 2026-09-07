import React, { useState } from 'react';
import { X, Save, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';

export function ViewDetailModal({ registration, onClose }) {
  if (!registration) return null;

  return (
    <div className="modal-backdrop">
      <div 
        className="glass-card" 
        style={{ 
          maxWidth: '650px', 
          width: '100%', 
          padding: 'clamp(20px, 4vw, 32px)', 
          borderColor: '#00f0ff',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '14px', gap: '10px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ff1e42', letterSpacing: '0.15em' }}>REGISTRATION DETAILS</span>
            <h3 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 900, color: '#ffffff', wordBreak: 'break-word' }}>{registration.registration_id}</h3>
          </div>
          <button onClick={onClose} aria-label="Close modal" style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' }}><X size={22} /></button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '20px' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Student Name</p>
            <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', wordBreak: 'break-word' }}>{registration.name}</p>
          </div>

          <div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Department</p>
            <p style={{ fontSize: '1rem', fontWeight: 600, color: '#00f0ff', wordBreak: 'break-word' }}>{registration.department}</p>
          </div>

          <div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Date of Birth</p>
            <p style={{ fontSize: '0.95rem', color: '#ffffff' }}>{registration.dob}</p>
          </div>

          <div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>WhatsApp / Mobile</p>
            <p style={{ fontSize: '0.95rem', color: '#ff1e42', fontWeight: 700 }}>{registration.phone}</p>
          </div>

          <div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Audition Category</p>
            <span className={`badge-category ${registration.category === 'Singing' ? 'badge-singing' : 'badge-instruments'}`} style={{ marginTop: '4px' }}>
              {registration.category}
            </span>
          </div>

          <div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Instrument</p>
            <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>{registration.instrument || '—'}</p>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px' }}>Musical Experience</p>
          <div style={{ padding: '12px 14px', background: 'rgba(6, 8, 14, 0.8)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#cbd5e1', fontSize: '0.9rem', whiteSpace: 'pre-wrap', maxHeight: '160px', overflowY: 'auto', lineHeight: 1.5 }}>
            {registration.experience}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', flexWrap: 'wrap', gap: '10px' }}>
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
            Registered: {new Date(registration.timestamp).toLocaleString()}
          </span>
          <button className="btn-secondary" onClick={onClose} style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
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
      <div 
        className="glass-card" 
        style={{ 
          maxWidth: '650px', 
          width: '100%', 
          padding: 'clamp(20px, 4vw, 32px)', 
          borderColor: '#ff1e42',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '10px' }}>
          <h3 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', fontWeight: 800, color: '#ff1e42', wordBreak: 'break-word' }}>
            Edit Registration #{registration.registration_id}
          </h3>
          <button onClick={onClose} aria-label="Close modal" style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' }}><X size={22} /></button>
        </div>

        {!showConfirm ? (
          <form onSubmit={handleSaveClick} style={{ width: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
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

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
              <button type="button" className="btn-secondary" onClick={onClose} style={{ padding: '10px 18px' }}>Cancel</button>
              <button type="submit" className="btn-primary" style={{ padding: '10px 20px' }}><Save size={16} /> Save Changes</button>
            </div>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <AlertTriangle size={44} color="#ff1e42" style={{ margin: '0 auto 14px' }} />
            <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Save Changes?</h4>
            <p style={{ color: '#cbd5e1', marginBottom: '20px', fontSize: '0.95rem' }}>Are you sure you want to update this student's registration record?</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button className="btn-secondary" onClick={() => setShowConfirm(false)} style={{ padding: '10px 20px' }}>CANCEL</button>
              <button className="btn-primary" onClick={confirmSave} style={{ padding: '10px 20px' }}><CheckCircle size={16} /> SAVE CHANGES</button>
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
      <div 
        className="glass-card" 
        style={{ 
          maxWidth: '480px', 
          width: '100%', 
          padding: 'clamp(24px, 4vw, 32px)', 
          textAlign: 'center', 
          borderColor: '#ff1e42',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <div 
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(255, 30, 66, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            border: '1px solid #ff1e42',
            flexShrink: 0
          }}
        >
          <Trash2 size={26} color="#ff1e42" />
        </div>

        <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.4rem)', fontWeight: 900, marginBottom: '8px', color: '#ffffff' }}>
          Delete Registration?
        </h3>
        <p style={{ color: '#cbd5e1', fontSize: '0.92rem', marginBottom: '24px', lineHeight: 1.5 }}>
          This action cannot be undone. Are you sure you want to delete the registration for <strong>{registration.name}</strong> ({registration.registration_id})?
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-secondary" onClick={onClose} style={{ flex: '1 1 120px', padding: '10px 18px' }}>
            CANCEL
          </button>
          <button 
            className="btn-primary" 
            onClick={() => onDelete(registration.id)}
            style={{ flex: '1 1 120px', background: '#dc2626', borderColor: '#ff1e42', padding: '10px 18px' }}
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
