import React from 'react';
import { ArrowDown, Zap, Sparkles } from 'lucide-react';
import { SpiderIcon } from './SuperheroSilhouettes';
import RealisticSpidermanHero from './RealisticSpidermanHero';

export default function Hero({ onRegisterClick }) {
  return (
    <section 
      className="section-container" 
      style={{ 
        paddingTop: '40px', 
        paddingBottom: '70px',
        position: 'relative'
      }}
    >
      <div 
        className="glass-card" 
        style={{ 
          padding: '60px 40px', 
          maxWidth: '1100px', 
          margin: '0 auto', 
          borderColor: 'var(--spider-red)',
          boxShadow: '0 0 50px rgba(255, 13, 53, 0.35), 0 0 20px rgba(0, 212, 255, 0.2)',
          background: 'linear-gradient(180deg, rgba(8, 12, 22, 0.95) 0%, rgba(3, 5, 9, 0.98) 100%)'
        }}
      >
        <div className="spider-web-corner-tl" />
        <div className="spider-web-corner-tr" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px', alignItems: 'center' }} className="grid-2">
          
          {/* Left Side: Hero Text & Action Button */}
          <div style={{ textAlign: 'left' }}>
            
            {/* Equalizer Visualizer Header */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'rgba(255, 13, 53, 0.12)', border: '1px solid rgba(255, 13, 53, 0.4)', padding: '6px 18px', borderRadius: '30px', marginBottom: '24px' }}>
              <SpiderIcon size={18} color="#ff0d35" />
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#00d4ff', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                SPIDER-MAN × MUSIC AUDITIONS 2026
              </span>
              <div className="equalizer-bar-container" style={{ height: '18px' }}>
                <div className="equalizer-bar" />
                <div className="equalizer-bar" />
                <div className="equalizer-bar" />
              </div>
            </div>

            {/* Main Headings */}
            <h2 
              style={{ 
                fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', 
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
                fontSize: 'clamp(1.3rem, 3vw, 2rem)', 
                fontWeight: 800, 
                color: 'var(--spider-red)',
                marginBottom: '20px',
                textShadow: '0 0 20px rgba(255, 13, 53, 0.6)'
              }}
            >
              ARE YOU READY TO JOIN BAND UNKNOWN?
            </h3>

            {/* Description */}
            <p 
              style={{ 
                fontSize: '1.1rem', 
                color: '#cbd5e1', 
                margin: '0 0 32px',
                lineHeight: 1.7 
              }}
            >
              Calling all first-year students with a passion for music. Step into the spotlight, showcase your talent, and become part of our college band.
            </p>

            {/* Superhero Action Button */}
            <div style={{ marginBottom: '28px' }}>
              <button 
                className="btn-primary" 
                onClick={onRegisterClick}
                style={{ padding: '18px 42px', fontSize: '1.2rem', borderRadius: '50px' }}
              >
                <Zap size={22} color="#00d4ff" />
                REGISTER FOR AUDITION
                <ArrowDown size={22} />
              </button>
            </div>

            {/* Tagline */}
            <p style={{ fontSize: '0.85rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.3em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color="#00d4ff" />
              SING • PLAY • PERFORM • INSPIRE
            </p>
          </div>

          {/* Right Side: Realistic Spiderman Reference Artwork */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <RealisticSpidermanHero width={380} height={480} />
          </div>

        </div>
      </div>
    </section>
  );
}
