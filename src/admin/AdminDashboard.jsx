import React, { useState, useEffect } from 'react';
import { 
  Users, Mic, Guitar, Calendar, Search, Filter, Download, 
  LogOut, Eye, Edit, Trash2, ChevronLeft, ChevronRight, 
  RotateCw, ShieldAlert, CheckCircle, AlertCircle 
} from 'lucide-react';
import { ViewDetailModal, EditModal, DeleteConfirmModal } from './AdminModals';
import { apiFetch } from './api';

export default function AdminDashboard({ token, onLogout }) {
  const [data, setData] = useState({
    stats: { total: 0, singing: 0, instruments: 0, today: 0 },
    registrations: [],
    pagination: { total: 0, page: 1, limit: 20, totalPages: 1 },
    departments: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Search & Filter State
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [instrument, setInstrument] = useState('All');
  const [department, setDepartment] = useState('All');
  const [date, setDate] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  // Selected Registration for Modals
  const [viewingRecord, setViewingRecord] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const [deletingRecord, setDeletingRecord] = useState(null);

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    setError('');

    try {
      const query = new URLSearchParams({
        search,
        category,
        instrument,
        department,
        date,
        sort,
        page,
        limit: 20
      });

      const { ok, status, data: result } = await apiFetch(`/api/admin/registrations?${query.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (status === 401 || status === 403) {
        onLogout();
        return;
      }

      if (!ok) {
        throw new Error(result.error || 'Failed to fetch registrations');
      }

      setData(result);
    } catch (err) {
      setError(err.message || 'Unable to load registrations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [search, category, instrument, department, date, sort, page]);

  // Export CSV Action
  const handleExportCsv = async () => {
    try {
      let response;
      try {
        response = await fetch('/api/admin/export', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (err) {
        // Fallback to direct backend URL
        response = await fetch('http://localhost:5000/api/admin/export', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }

      if (!response.ok) {
        response = await fetch('http://localhost:5000/api/admin/export', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }

      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `BAND_UNKNOWN_Registrations_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      showToast('Registration data exported successfully as CSV.');
    } catch (e) {
      showToast('Failed to export CSV file.', 'error');
    }
  };

  // Edit Action
  const handleSaveEdit = async (updatedRecord) => {
    try {
      const { ok, data: resData } = await apiFetch(`/api/admin/registrations/${updatedRecord.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedRecord)
      });
      if (!ok) throw new Error(resData.error || 'Failed to update');

      setEditingRecord(null);
      showToast('Registration updated successfully.');
      fetchRegistrations();
    } catch (e) {
      showToast(e.message || 'Failed to save edits.', 'error');
    }
  };

  // Delete Action
  const handleDeleteConfirm = async (id) => {
    try {
      const { ok, data: resData } = await apiFetch(`/api/admin/registrations/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!ok) throw new Error(resData.error || 'Failed to delete');

      setDeletingRecord(null);
      showToast('Registration deleted successfully.');
      fetchRegistrations();
    } catch (e) {
      showToast(e.message || 'Failed to delete record.', 'error');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#06070a', color: '#ffffff', paddingBottom: '60px' }}>
      {/* Toast Banner */}
      {toast && (
        <div 
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 2000,
            padding: '12px 20px',
            background: toast.type === 'error' ? 'rgba(239, 68, 68, 0.95)' : 'rgba(16, 185, 129, 0.95)',
            color: '#fff',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.9rem',
            fontWeight: 600
          }}
        >
          {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
          {toast.message}
        </div>
      )}

      {/* Admin Navbar */}
      <nav 
        style={{
          background: 'rgba(10, 14, 24, 0.95)',
          borderBottom: '1px solid rgba(255, 30, 66, 0.3)',
          padding: '16px 32px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h2 className="text-gradient-hero" style={{ fontSize: '1.4rem', fontWeight: 900 }}>
            BAND UNKNOWN
          </h2>
          <span style={{ height: '18px', width: '1px', background: 'rgba(255, 255, 255, 0.2)' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#00f0ff', letterSpacing: '0.1em' }}>
            AUDITION ADMIN DASHBOARD
          </span>
        </div>

        <button 
          onClick={onLogout} 
          className="btn-secondary" 
          style={{ padding: '8px 16px', fontSize: '0.85rem', borderColor: '#ff1e42', color: '#ff1e42' }}
        >
          <LogOut size={16} /> Logout
        </button>
      </nav>

      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '32px 24px' }}>
        
        {/* 1. STATISTICS CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '36px' }}>
          
          {/* TOTAL */}
          <div className="glass-card" style={{ padding: '24px', borderColor: 'rgba(255, 30, 66, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>TOTAL REGISTRATIONS</span>
              <Users size={22} color="#ff1e42" />
            </div>
            <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff' }}>{data.stats.total}</h3>
          </div>

          {/* SINGING */}
          <div className="glass-card" style={{ padding: '24px', borderColor: 'rgba(255, 30, 66, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ff4d6d', textTransform: 'uppercase' }}>SINGING</span>
              <Mic size={22} color="#ff4d6d" />
            </div>
            <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff' }}>{data.stats.singing}</h3>
          </div>

          {/* INSTRUMENTS */}
          <div className="glass-card" style={{ padding: '24px', borderColor: 'rgba(0, 240, 255, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#00f0ff', textTransform: 'uppercase' }}>INSTRUMENTS</span>
              <Guitar size={22} color="#00f0ff" />
            </div>
            <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff' }}>{data.stats.instruments}</h3>
          </div>

          {/* TODAY */}
          <div className="glass-card" style={{ padding: '24px', borderColor: 'rgba(255, 255, 255, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase' }}>TODAY</span>
              <Calendar size={22} color="#ffffff" />
            </div>
            <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff' }}>{data.stats.today}</h3>
          </div>

        </div>

        {/* 2. CONTROLS BAR: SEARCH, FILTERS, EXPORT */}
        <div className="glass-card" style={{ padding: '24px', marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={18} color="#ff1e42" /> AUDITION REGISTRATIONS
            </h3>

            <button className="btn-primary" onClick={handleExportCsv} style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
              <Download size={16} /> EXPORT DATA (CSV)
            </button>
          </div>

          {/* Filters Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <input 
                type="text"
                placeholder="Search registrations..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="form-input"
                style={{ paddingLeft: '38px', padding: '10px 12px 10px 38px', fontSize: '0.85rem' }}
              />
              <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            {/* Category Filter */}
            <select 
              value={category} 
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              className="form-select"
              style={{ padding: '10px 12px', fontSize: '0.85rem' }}
            >
              <option value="All">Category: All</option>
              <option value="Singing">Singing</option>
              <option value="Instruments">Instruments</option>
            </select>

            {/* Instrument Filter */}
            <select 
              value={instrument} 
              onChange={(e) => { setInstrument(e.target.value); setPage(1); }}
              className="form-select"
              style={{ padding: '10px 12px', fontSize: '0.85rem' }}
            >
              <option value="All">Instrument: All</option>
              <option value="Keyboard">Keyboard</option>
              <option value="Guitar">Guitar</option>
              <option value="Bass Guitar">Bass Guitar</option>
              <option value="Drums">Drums</option>
              <option value="Cajon">Cajon</option>
              <option value="Violin">Violin</option>
              <option value="Flute">Flute</option>
              <option value="Saxophone">Saxophone</option>
              <option value="Trumpet">Trumpet</option>
              <option value="Other">Other</option>
            </select>

            {/* Department Filter */}
            <select 
              value={department} 
              onChange={(e) => { setDepartment(e.target.value); setPage(1); }}
              className="form-select"
              style={{ padding: '10px 12px', fontSize: '0.85rem' }}
            >
              <option value="All">Dept: All</option>
              {data.departments.map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
            </select>

            {/* Date Filter */}
            <input 
              type="date"
              value={date}
              onChange={(e) => { setDate(e.target.value); setPage(1); }}
              className="form-input"
              style={{ padding: '10px 12px', fontSize: '0.85rem' }}
            />

            {/* Sort Dropdown */}
            <select 
              value={sort} 
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="form-select"
              style={{ padding: '10px 12px', fontSize: '0.85rem' }}
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="name_asc">Sort: Name (A-Z)</option>
              <option value="name_desc">Sort: Name (Z-A)</option>
              <option value="dept">Sort: Department</option>
              <option value="category">Sort: Category</option>
            </select>
          </div>
        </div>

        {/* 3. REGISTRATION DATA TABLE */}
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>
              <RotateCw className="animate-spin" size={32} color="#ff1e42" style={{ margin: '0 auto 16px' }} />
              <p>Loading registrations...</p>
            </div>
          ) : error ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#ff1e42' }}>
              <ShieldAlert size={36} style={{ margin: '0 auto 12px' }} />
              <p>{error}</p>
              <button className="btn-secondary" onClick={fetchRegistrations} style={{ marginTop: '16px' }}>
                RETRY
              </button>
            </div>
          ) : data.registrations.length === 0 ? (
            <div style={{ padding: '60px 24px', textAlign: 'center' }}>
              <Users size={48} color="#64748b" style={{ margin: '0 auto 16px' }} />
              <h4 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '8px' }}>NO REGISTRATIONS YET</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                Once students register for the audition, their registrations will appear here.
              </p>
            </div>
          ) : (
            <>
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Reg ID</th>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Date of Birth</th>
                      <th>WhatsApp</th>
                      <th>Category</th>
                      <th>Instrument</th>
                      <th>Registered At</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.registrations.map((reg) => (
                      <tr key={reg.id}>
                        <td style={{ fontWeight: 800, color: '#00f0ff', fontFamily: 'monospace' }}>
                          {reg.registration_id}
                        </td>
                        <td style={{ fontWeight: 700, color: '#ffffff' }}>
                          {reg.name}
                        </td>
                        <td>{reg.department}</td>
                        <td>{reg.dob}</td>
                        <td style={{ color: '#ff1e42', fontWeight: 600 }}>{reg.phone}</td>
                        <td>
                          <span className={`badge-category ${reg.category === 'Singing' ? 'badge-singing' : 'badge-instruments'}`}>
                            {reg.category}
                          </span>
                        </td>
                        <td style={{ fontWeight: 600 }}>{reg.instrument || '—'}</td>
                        <td style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                          {new Date(reg.timestamp).toLocaleDateString()} {new Date(reg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '6px' }}>
                            <button 
                              title="View Details"
                              onClick={() => setViewingRecord(reg)}
                              style={{ padding: '6px', background: 'rgba(0, 240, 255, 0.1)', border: '1px solid rgba(0, 240, 255, 0.3)', color: '#00f0ff', borderRadius: '6px', cursor: 'pointer' }}
                            >
                              <Eye size={16} />
                            </button>
                            <button 
                              title="Edit Registration"
                              onClick={() => setEditingRecord(reg)}
                              style={{ padding: '6px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.3)', color: '#ffffff', borderRadius: '6px', cursor: 'pointer' }}
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              title="Delete Registration"
                              onClick={() => setDeletingRecord(reg)}
                              style={{ padding: '6px', background: 'rgba(255, 30, 66, 0.1)', border: '1px solid rgba(255, 30, 66, 0.3)', color: '#ff1e42', borderRadius: '6px', cursor: 'pointer' }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION FOOTER */}
              <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', flexWrap: 'wrap', gap: '12px' }}>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  Showing {data.registrations.length > 0 ? (data.pagination.page - 1) * data.pagination.limit + 1 : 0} – {Math.min(data.pagination.page * data.pagination.limit, data.pagination.total)} of {data.pagination.total} registrations
                </span>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button 
                    disabled={data.pagination.page <= 1}
                    onClick={() => setPage(prev => prev - 1)}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem', opacity: data.pagination.page <= 1 ? 0.4 : 1 }}
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>

                  <span style={{ fontSize: '0.85rem', padding: '0 8px', color: '#ffffff' }}>
                    Page {data.pagination.page} of {data.pagination.totalPages}
                  </span>

                  <button 
                    disabled={data.pagination.page >= data.pagination.totalPages}
                    onClick={() => setPage(prev => prev + 1)}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem', opacity: data.pagination.page >= data.pagination.totalPages ? 0.4 : 1 }}
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

      </div>

      {/* DETAIL MODALS */}
      {viewingRecord && (
        <ViewDetailModal 
          registration={viewingRecord} 
          onClose={() => setViewingRecord(null)} 
        />
      )}

      {editingRecord && (
        <EditModal 
          registration={editingRecord} 
          onClose={() => setEditingRecord(null)}
          onSave={handleSaveEdit}
        />
      )}

      {deletingRecord && (
        <DeleteConfirmModal 
          registration={deletingRecord} 
          onClose={() => setDeletingRecord(null)} 
          onDelete={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
