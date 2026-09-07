import React from 'react';
import { SpiderIcon } from './SuperheroSilhouettes';

export default function Footer() {
  return (
    <footer 
      style={{
        width: '100%',
        maxWidth: '100vw',
        background: '#020306',
        borderTop: '2px solid rgba(255, 13, 53, 0.3)',
        padding: 'clamp(28px, 4vw, 44px) clamp(16px, 3vw, 24px) clamp(24px, 3.5vw, 36px)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
          <SpiderIcon size={20} color="#ff0d35" />
          <h3 className="superhero-title" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', letterSpacing: '0.08em' }}>
            BAND UNKNOWN
          </h3>
          <SpiderIcon size={20} color="#00d4ff" />
        </div>

        <p style={{ fontSize: 'clamp(0.75rem, 2vw, 0.9rem)', color: '#00d4ff', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '14px' }}>
          COLLEGE BAND AUDITIONS 2026
        </p>

        {/* Audio Waveform lines */}
        <div className="equalizer-bar-container" style={{ height: '16px', marginBottom: '18px' }}>
          <div className="equalizer-bar" />
          <div className="equalizer-bar" />
          <div className="equalizer-bar" />
          <div className="equalizer-bar" />
          <div className="equalizer-bar" />
          <div className="equalizer-bar" />
          <div className="equalizer-bar" />
        </div>

        <p style={{ fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)', color: '#64748b', maxWidth: '600px', lineHeight: 1.5 }}>
          © 2026 BAND UNKNOWN. All Rights Reserved. Built for College Music Auditions.
        </p>
      </div>
    </footer>
  );
}
