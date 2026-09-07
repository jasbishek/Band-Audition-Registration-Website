import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { apiFetch } from './api';

export default function AdminLogin({ onLoginSuccess }) {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!adminId || !password) {
      setErrorMsg('Please enter both User ID and Password');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const { ok, data } = await apiFetch('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ adminId, password })
      });

      if (!ok) {
        throw new Error(data.error || 'Invalid User ID or Password.');
      }

      // Save token in sessionStorage (cleared upon tab close / logout)
      sessionStorage.setItem('band_unknown_admin_token', data.token);
      onLoginSuccess(data.token);
    } catch (err) {
      setErrorMsg(err.message || 'Invalid User ID or Password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 'clamp(16px, 3vw, 24px)',
        background: 'radial-gradient(circle at 50% 30%, #161d30 0%, #06070a 80%)'
      }}
    >
      <div 
        className="glass-card" 
        style={{ 
          maxWidth: '460px', 
          width: '100%', 
          padding: 'clamp(28px, 5vw, 40px) clamp(18px, 4vw, 32px)', 
          borderColor: '#ff1e42',
          boxShadow: '0 0 40px rgba(255, 30, 66, 0.3)'
        }}
      >
        <div className="spider-web-corner-tl" />
        <div className="spider-web-corner-tr" />

        {/* Back to Public Site link */}
        <div style={{ marginBottom: '20px' }}>
          <a 
            href="/" 
            style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft size={16} /> Return to Public Portal
          </a>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div 
            style={{
              width: '58px',
              height: '58px',
              borderRadius: '50%',
              background: 'rgba(255, 30, 66, 0.15)',
              border: '2px solid #ff1e42',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px',
              boxShadow: '0 0 20px rgba(255, 30, 66, 0.4)'
            }}
          >
            <ShieldCheck size={30} color="#ff1e42" />
          </div>

          <h2 className="text-gradient-hero" style={{ fontSize: 'clamp(1.5rem, 4vw, 1.8rem)', fontWeight: 900, letterSpacing: '0.06em' }}>
            BAND UNKNOWN
          </h2>
          <h3 style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', fontWeight: 800, color: '#00f0ff', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '4px 0 2px' }}>
            ADMIN ACCESS
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            Audition Management Portal
          </p>
        </div>

        {errorMsg && (
          <div style={{ padding: '12px 16px', background: 'rgba(255, 30, 66, 0.15)', border: '1px solid #ff1e42', borderRadius: '10px', color: '#ffffff', fontSize: '0.9rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={18} color="#ff1e42" style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {/* User ID */}
          <div className="form-group">
            <label className="form-label">USER ID</label>
            <div style={{ position: 'relative', width: '100%' }}>
              <input 
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="Enter User ID"
                className="form-input"
                style={{ paddingLeft: '44px' }}
                autoComplete="off"
              />
              <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">PASSWORD</label>
            <div style={{ position: 'relative', width: '100%' }}>
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="form-input"
                style={{ paddingLeft: '44px', paddingRight: '44px' }}
              />
              <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            className="btn-primary"
            disabled={isSubmitting}
            style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '8px' }}
          >
            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
}
