import React from 'react';
import { ArrowDown, Zap, Sparkles } from 'lucide-react';
import { SpiderIcon } from './SuperheroSilhouettes';
import RealisticSpidermanHero from './RealisticSpidermanHero';

export default function Hero({ onRegisterClick }) {
  return (
    <section 
      className="section-container hero-section-container" 
      style={{ 
        paddingTop: 'clamp(20px, 4vw, 40px)', 
        paddingBottom: 'clamp(36px, 5vw, 70px)',
        position: 'relative'
      }}
    >
      <div 
        className="glass-card hero-glass-card" 
        style={{ 
          padding: 'clamp(24px, 5vw, 60px) clamp(16px, 4vw, 40px)', 
          maxWidth: '1100px', 
          margin: '0 auto', 
          borderColor: 'var(--spider-red)',
          boxShadow: '0 0 50px rgba(255, 13, 53, 0.35), 0 0 20px rgba(0, 212, 255, 0.2)',
          background: 'linear-gradient(180deg, rgba(8, 12, 22, 0.95) 0%, rgba(3, 5, 9, 0.98) 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="spider-web-corner-tl" />
        <div className="spider-web-corner-tr" />

        <div className="hero-grid">
          
          {/* Left Side: Hero Text & Action Button */}
          <div className="hero-text-content">
            
            {/* Equalizer Visualizer Header */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 13, 53, 0.12)', border: '1px solid rgba(255, 13, 53, 0.4)', padding: '6px 16px', borderRadius: '30px', marginBottom: '20px', maxWidth: '100%' }}>
              <SpiderIcon size={16} color="#ff0d35" />
              <span style={{ fontSize: 'clamp(0.72rem, 1.8vw, 0.85rem)', fontWeight: 800, color: '#00d4ff', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                SPIDER-MAN × MUSIC AUDITIONS 2026
              </span>
              <div className="equalizer-bar-container" style={{ height: '16px' }}>
                <div className="equalizer-bar" />
                <div className="equalizer-bar" />
                <div className="equalizer-bar" />
              </div>
            </div>

            {/* Main Headings */}
            <h2 
              style={{ 
                fontSize: 'clamp(1.7rem, 4.5vw, 3.6rem)', 
                fontWeight: 900, 
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#ffffff',
                marginBottom: '8px',
                lineHeight: 1.1
              }}
            >
              THE STAGE IS CALLING.
            </h2>

            <h3 
              style={{ 
                fontSize: 'clamp(1.05rem, 2.5vw, 2rem)', 
                fontWeight: 800, 
                color: 'var(--spider-red)',
                marginBottom: '16px',
                textShadow: '0 0 20px rgba(255, 13, 53, 0.6)'
              }}
            >
              ARE YOU READY TO JOIN BAND UNKNOWN?
            </h3>

            {/* Description */}
            <p 
              style={{ 
                fontSize: 'clamp(0.92rem, 1.8vw, 1.1rem)', 
                color: '#cbd5e1', 
                margin: '0 0 24px',
                lineHeight: 1.6 
              }}
            >
              Calling all first-year students with a passion for music. Step into the spotlight, showcase your talent, and become part of our college band.
            </p>

            {/* Superhero Action Button */}
            <div style={{ marginBottom: '20px' }}>
              <button 
                className="btn-primary" 
                onClick={onRegisterClick}
                style={{ 
                  padding: '16px clamp(20px, 4vw, 42px)', 
                  fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', 
                  borderRadius: '50px' 
                }}
              >
                <Zap size={20} color="#00d4ff" />
                REGISTER FOR AUDITION
                <ArrowDown size={20} />
              </button>
            </div>

            {/* Tagline */}
            <p style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', letterSpacing: 'clamp(0.1em, 1.8vw, 0.3em)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <Sparkles size={16} color="#00d4ff" />
              SING • PLAY • PERFORM • INSPIRE
            </p>
          </div>

          {/* Right Side: Realistic Spiderman Reference Artwork */}
          <div className="hero-spiderman-column">
            <RealisticSpidermanHero width={380} height={480} />
          </div>

        </div>
      </div>
    </section>
  );
}
