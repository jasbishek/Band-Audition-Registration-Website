import React from 'react';
import { SpiderIcon } from './SuperheroSilhouettes';

export default function FinalCTA({ onJoinClick }) {
  return (
    <section className="section-container final-cta-section-container" style={{ paddingTop: 'clamp(20px, 3.5vw, 50px)', paddingBottom: 'clamp(36px, 5vw, 80px)', textAlign: 'center' }}>
      <div 
        className="glass-card final-cta-glass-card" 
        style={{ 
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
          
          {/* Left Column: Heading, Subtitle, and Spider-Man Eyes CTA Button */}
          <div className="final-cta-text-content">
            <div className="final-cta-badge">
              <SpiderIcon size={16} color="#00d4ff" />
              <span className="final-cta-badge-text">
                THE FINAL CALL
              </span>
            </div>

            <h2 className="final-cta-heading">
              “If Music is your Language, here's your Stage.”
            </h2>

            <h3 className="final-cta-subheading">
              “Your Stage is waiting. Are You ?”
            </h3>

            <div className="final-cta-btn-container">
              {/* Spiderman Character Full-Fit Edge-to-Edge CTA Pill Button */}
              <button 
                onClick={onJoinClick}
                title="Register For Auditions"
                aria-label="Register For Auditions"
                className="final-cta-action-btn"
              >
                <img 
                  src="/spiderman-cta-button.jpg" 
                  alt="Spiderman Join Audition" 
                  className="final-cta-btn-img"
                />
              </button>
            </div>
          </div>

          {/* Right Column: Spider-Man Hanging from Card Top Border */}
          <div className="spiderman-hanging-container">
            {/* Small web knot / anchor tied directly to the top line */}
            <div className="spiderman-web-knot" />
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
