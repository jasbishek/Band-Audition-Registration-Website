import React from 'react';
import { Sparkles } from 'lucide-react';
import { SpiderIcon } from './SuperheroSilhouettes';

export default function BandBranding() {
  return (
    <>
      {/* Clean Standalone BAND UNKNOWN Logo Image */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: 0, padding: 0, width: '100%' }}>
        <img
          src="/band-unknown-logo.png"
          alt="BAND UNKNOWN SINCE 2022"
          className="band-logo"
          style={{
            display: 'block',
            width: '90%',
            maxWidth: '380px',
            height: 'auto',
            margin: '0 auto',
            background: 'transparent',
            border: 'none',
            boxShadow: 'none',
            filter: 'none',
            opacity: 1,
            objectFit: 'contain'
          }}
        />
      </div>

      {/* BAND UNKNOWN Title */}
      <h1
        className="superhero-title"
        style={{
          fontSize: 'clamp(2.8rem, 7.5vw, 5rem)',
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
          gap: '12px',
          background: 'rgba(255, 13, 53, 0.15)',
          border: '1.5px solid rgba(255, 13, 53, 0.45)',
          padding: '8px 24px',
          borderRadius: '30px',
          boxShadow: '0 0 20px rgba(255, 13, 53, 0.3)',
          margin: 0
        }}
      >
        <SpiderIcon size={18} color="#ff0d35" />
        <span
          style={{
            fontSize: '1.05rem',
            fontWeight: 800,
            letterSpacing: '0.25em',
            color: '#ffffff',
            textTransform: 'uppercase'
          }}
        >
          COLLEGE BAND AUDITIONS 2026
        </span>
        <Sparkles size={18} color="#00d4ff" />
      </div>
    </>
  );
}
