import React from 'react';
import { SpiderIcon } from './SuperheroSilhouettes';

export default function FinalCTA({ onJoinClick }) {
  return (
    <section className="section-container" style={{ paddingTop: 'clamp(24px, 4vw, 50px)', paddingBottom: 'clamp(40px, 6vw, 80px)', textAlign: 'center' }}>
      <div 
        className="glass-card" 
        style={{ 
          padding: 'clamp(28px, 5vw, 64px) clamp(16px, 4vw, 36px)', 
          maxWidth: '1000px', 
          margin: '0 auto',
          borderColor: 'var(--spider-red)',
          boxShadow: '0 0 60px rgba(255, 13, 53, 0.4), 0 0 30px rgba(0, 212, 255, 0.25)',
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 13, 53, 0.18) 0%, rgba(3, 5, 9, 0.98) 85%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="spider-web-corner-tl" />
        <div className="spider-web-corner-tr" />

        <div className="final-cta-grid">
          
          <div className="final-cta-text-content">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#00d4ff', marginBottom: '16px' }}>
              <SpiderIcon size={20} color="#00d4ff" />
              <span style={{ fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                THE FINAL CALL
              </span>
            </div>

            <h2 
              style={{ 
                fontSize: 'clamp(1.4rem, 3.5vw, 2.8rem)', 
                fontWeight: 900, 
                color: '#ffffff',
                lineHeight: 1.3,
                marginBottom: '12px'
              }}
            >
              “If Music is your Language, here's your Stage.”
            </h2>

            <h3 
              style={{ 
                fontSize: 'clamp(1.15rem, 3vw, 2.4rem)', 
                fontWeight: 800, 
                color: 'var(--spider-red)',
                textShadow: '0 0 25px rgba(255, 13, 53, 0.7)',
                marginBottom: '28px'
              }}
            >
              “Your Stage is waiting. Are You ?”
            </h3>

            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              {/* Spiderman Character Full-Fit Edge-to-Edge CTA Pill Button */}
              <button 
                onClick={onJoinClick}
                title="Register For Auditions"
                aria-label="Register For Auditions"
                style={{ 
                  padding: 0,
                  margin: 0,
                  borderRadius: '50px',
                  display: 'block',
                  width: '100%',
                  maxWidth: '380px',
                  height: 'clamp(68px, 14vw, 85px)',
                  overflow: 'hidden',
                  border: '2px solid #ff0d35',
                  boxShadow: '0 0 30px rgba(255, 13, 53, 0.6), 0 0 15px rgba(0, 212, 255, 0.3)',
                  cursor: 'pointer',
                  background: '#080c16',
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
                  touchAction: 'manipulation'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 0 45px rgba(255, 13, 53, 0.8), 0 0 25px rgba(0, 212, 255, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 13, 53, 0.6), 0 0 15px rgba(0, 212, 255, 0.3)';
                }}
              >
                <img 
                  src="/spiderman-cta-button.jpg" 
                  alt="Spiderman Join Audition" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    border: 'none',
                    margin: 0,
                    padding: 0
                  }} 
                />
              </button>
            </div>
          </div>

          {/* Spider-Man Hanging Tied to the Card Top Border Line */}
          <div className="spiderman-hanging-container">
            {/* Small web knot / anchor tied directly to the top line */}
            <div 
              style={{
                width: '10px',
                height: '5px',
                background: '#ffffff',
                borderRadius: '0 0 5px 5px',
                boxShadow: '0 0 8px rgba(0, 212, 255, 0.9), 0 0 4px #ffffff',
                marginBottom: '-4px',
                zIndex: 2,
                flexShrink: 0
              }} 
            />
            <img 
              src="/spiderman-hanging.png" 
              alt="Spider-Man Hanging on Web" 
              className="spiderman-hanging-img"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
