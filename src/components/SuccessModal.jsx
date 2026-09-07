import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Music, ArrowLeft } from 'lucide-react';
import { SpiderIcon } from './SuperheroSilhouettes';

export default function SuccessModal({ student, onClose }) {
  useEffect(() => {
    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.55 },
        colors: ['#ff0d35', '#00d4ff', '#ffffff', '#0055ff']
      });
    } catch (e) {
      console.log('Confetti effect triggered');
    }
  }, []);

  if (!student) return null;

  return (
    <div className="modal-backdrop">
      <div 
        className="glass-card" 
        style={{ 
          maxWidth: '580px', 
          width: '100%', 
          padding: 'clamp(24px, 5vw, 44px) clamp(16px, 4vw, 36px)', 
          textAlign: 'center',
          borderColor: 'var(--spider-blue)',
          boxShadow: '0 0 60px rgba(0, 212, 255, 0.5), 0 0 30px rgba(255, 13, 53, 0.4)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <div className="spider-web-corner-tl" />
        <div className="spider-web-corner-tr" />

        {/* Spider Icon Header */}
        <div 
          style={{
            width: 'clamp(64px, 14vw, 84px)',
            height: 'clamp(64px, 14vw, 84px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, rgba(255, 13, 53, 0.25) 100%)',
            border: '2px solid #00d4ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 0 30px rgba(0, 212, 255, 0.6)',
            flexShrink: 0
          }}
        >
          <Music size={36} color="#00d4ff" />
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--spider-red)', marginBottom: '8px' }}>
          <SpiderIcon size={16} color="#ff0d35" />
          <span style={{ fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            REGISTRATION CONFIRMED
          </span>
        </div>

        <h2 className="superhero-title" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', margin: '4px 0 12px' }}>
          YOU'RE IN!
        </h2>

        <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#ffffff', fontWeight: 800, marginBottom: '14px', letterSpacing: '0.05em' }}>
          REGISTRATION SUCCESSFUL
        </h3>

        {student.registration_id && (
          <div 
            style={{ 
              display: 'inline-block',
              padding: '8px 18px',
              background: 'rgba(255, 13, 53, 0.2)',
              border: '1px solid rgba(255, 13, 53, 0.5)',
              borderRadius: '30px',
              fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '18px',
              letterSpacing: '0.08em',
              maxWidth: '100%',
              wordBreak: 'break-word'
            }}
          >
            REGISTRATION ID: <span style={{ color: '#00d4ff' }}>{student.registration_id}</span>
          </div>
        )}

        <p style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', color: '#cbd5e1', marginBottom: '8px', fontWeight: 600 }}>
          Thank you for registering for the <strong style={{ color: '#ff0d35' }}>BAND UNKNOWN</strong> audition.
        </p>

        <p style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)', color: '#00d4ff', marginBottom: '28px', fontWeight: 700 }}>
          The stage is waiting for you.
        </p>

        <button 
          className="btn-primary"
          onClick={onClose}
          style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
        >
          <ArrowLeft size={18} /> BACK TO HOME
        </button>
      </div>
    </div>
  );
}
