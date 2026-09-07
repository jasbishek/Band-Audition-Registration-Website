import React from 'react';
import { ArrowDown, Zap, Sparkles } from 'lucide-react';
import { SpiderIcon } from './SuperheroSilhouettes';
import RealisticSpidermanHero from './RealisticSpidermanHero';

export default function Hero({ onRegisterClick }) {
  return (
    <section 
      className="section-container hero-section-container" 
      style={{ 
        paddingTop: 'clamp(16px, 3.5vw, 40px)', 
        paddingBottom: 'clamp(28px, 4.5vw, 70px)',
        position: 'relative'
      }}
    >
      <div 
        className="glass-card hero-glass-card" 
        style={{ 
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
          
          {/* Left / Spider-Man Artwork Column (Order 2 on desktop, Order 1 on mobile) */}
          <div className="hero-spiderman-column">
            <RealisticSpidermanHero width={380} height={480} />
          </div>

          {/* Right / Content Column (Order 1 on desktop, Order 2 on mobile) */}
          <div className="hero-text-content">
            
            {/* Equalizer Visualizer Header Badge */}
            <div className="hero-badge">
              <SpiderIcon size={14} color="#ff0d35" />
              <span className="hero-badge-text">
                SPIDER-MAN × MUSIC AUDITIONS 2026
              </span>
              <div className="equalizer-bar-container hero-equalizer-bars">
                <div className="equalizer-bar" />
                <div className="equalizer-bar" />
                <div className="equalizer-bar" />
              </div>
            </div>

            {/* Main Headings */}
            <h2 className="hero-main-heading">
              THE STAGE IS CALLING.
            </h2>

            <h3 className="hero-sub-heading">
              ARE YOU READY TO JOIN BAND UNKNOWN?
            </h3>

            {/* Description */}
            <p className="hero-desc-text">
              Calling all first-year students with a passion for music. Step into the spotlight, showcase your talent, and become part of our college band.
            </p>

            {/* Superhero Action Button */}
            <div className="hero-btn-wrapper">
              <button 
                className="btn-primary hero-action-btn" 
                onClick={onRegisterClick}
              >
                <Zap size={18} color="#00d4ff" />
                REGISTER FOR AUDITION
                <ArrowDown size={18} />
              </button>
            </div>

            {/* Tagline */}
            <p className="hero-tagline-text">
              <Sparkles size={14} color="#00d4ff" />
              SING • PLAY • PERFORM • INSPIRE
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
