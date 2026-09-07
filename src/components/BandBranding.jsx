import React from 'react';
import { Sparkles } from 'lucide-react';
import { SpiderIcon } from './SuperheroSilhouettes';

export default function BandBranding() {
  return (
    <>
      {/* Clean Standalone BAND UNKNOWN Logo Image */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: 0, padding: '0 8px', width: '100%', maxWidth: '100%' }}>
        <img
          src="/band-unknown-logo.png"
          alt="BAND UNKNOWN SINCE 2022"
          className="band-logo"
        />
      </div>

      {/* BAND UNKNOWN Title */}
      <h1
        className="superhero-title"
        style={{
          fontSize: 'clamp(2.2rem, 7vw, 5rem)',
          margin: 0,
          lineHeight: 1.05
        }}
      >
        BAND UNKNOWN
      </h1>

      {/* Tagline */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          background: 'rgba(255, 13, 53, 0.15)',
          border: '1.5px solid rgba(255, 13, 53, 0.45)',
          padding: '8px clamp(12px, 2.5vw, 24px)',
          borderRadius: '30px',
          boxShadow: '0 0 20px rgba(255, 13, 53, 0.3)',
          margin: 0,
          maxWidth: '95%'
        }}
      >
        <SpiderIcon size={18} color="#ff0d35" />
        <span
          style={{
            fontSize: 'clamp(0.72rem, 2.2vw, 1.05rem)',
            fontWeight: 800,
            letterSpacing: 'clamp(0.08em, 1.5vw, 0.25em)',
            color: '#ffffff',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap'
          }}
        >
          COLLEGE BAND AUDITIONS 2026
        </span>
        <Sparkles size={18} color="#00d4ff" />
      </div>
    </>
  );
}
