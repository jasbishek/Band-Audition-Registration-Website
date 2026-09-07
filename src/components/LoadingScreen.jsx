import React, { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Fast loading duration (~1.4s)
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(onComplete, 450);
    }, 1400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#030509',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.45s ease-out',
        pointerEvents: fading ? 'none' : 'auto'
      }}
    >
      <div 
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: 'loadingScaleUp 1.2s ease-out forwards'
        }}
      >
        {/* Circular Loading Area with Subtle Red Halo Glow */}
        <div 
          style={{ 
            marginBottom: '20px',
            position: 'relative',
            borderRadius: '50%',
            padding: '16px',
            background: 'radial-gradient(circle, rgba(255, 13, 53, 0.25) 0%, rgba(3, 5, 9, 0.95) 75%)',
            border: '2px solid rgba(255, 13, 53, 0.4)',
            boxShadow: '0 0 45px rgba(255, 13, 53, 0.6), 0 0 20px rgba(0, 212, 255, 0.3)'
          }}
        >
          <img 
            src="/band-unknown-logo.png" 
            alt="BAND UNKNOWN SINCE 2022" 
            style={{ 
              height: '180px', 
              width: '180px', 
              objectFit: 'contain',
              display: 'block',
              mixBlendMode: 'screen',
              filter: 'brightness(1.1) contrast(1.05)'
            }} 
          />
        </div>

        <h2 className="superhero-title" style={{ fontSize: '2.2rem', letterSpacing: '0.1em', marginBottom: '14px' }}>
          BAND UNKNOWN
        </h2>

        {/* Audio Equalizer bars */}
        <div className="equalizer-bar-container" style={{ marginBottom: '18px' }}>
          <div className="equalizer-bar" />
          <div className="equalizer-bar" />
          <div className="equalizer-bar" />
          <div className="equalizer-bar" />
          <div className="equalizer-bar" />
          <div className="equalizer-bar" />
          <div className="equalizer-bar" />
        </div>

        <p style={{ fontSize: '0.88rem', fontWeight: 800, color: '#00d4ff', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          CONNECTING TO THE STAGE...
        </p>
      </div>

      <style>{`
        @keyframes loadingScaleUp {
          0% { transform: scale(0.92); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
