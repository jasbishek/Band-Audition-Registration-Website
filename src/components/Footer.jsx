import React from 'react';
import { SpiderIcon } from './SuperheroSilhouettes';

export default function Footer() {
  return (
    <footer 
      style={{
        width: '100%',
        background: '#020306',
        borderTop: '2px solid rgba(255, 13, 53, 0.3)',
        padding: '44px 24px 36px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <SpiderIcon size={24} color="#ff0d35" />
          <h3 className="superhero-title" style={{ fontSize: '2rem', letterSpacing: '0.1em' }}>
            BAND UNKNOWN
          </h3>
          <SpiderIcon size={24} color="#00d4ff" />
        </div>

        <p style={{ fontSize: '0.9rem', color: '#00d4ff', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>
          COLLEGE BAND AUDITIONS 2026
        </p>

        {/* Audio Waveform lines */}
        <div className="equalizer-bar-container" style={{ height: '16px', marginBottom: '20px' }}>
          <div className="equalizer-bar" />
          <div className="equalizer-bar" />
          <div className="equalizer-bar" />
          <div className="equalizer-bar" />
          <div className="equalizer-bar" />
          <div className="equalizer-bar" />
          <div className="equalizer-bar" />
        </div>

        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
          © 2026 BAND UNKNOWN. All Rights Reserved. Built for College Music Auditions.
        </p>
      </div>
    </footer>
  );
}
