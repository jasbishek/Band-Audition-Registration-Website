import React from 'react';
import { Mic, Guitar, ArrowRight, Sparkles } from 'lucide-react';
import { SpiderIcon } from './SuperheroSilhouettes';

export default function AuditionCategory({ selectedCategory, onSelectCategory }) {
  return (
    <section id="audition-selection" className="section-container" style={{ paddingTop: 'clamp(20px, 3vw, 40px)' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--spider-red)', marginBottom: '8px' }}>
          <SpiderIcon size={20} color="#ff0d35" />
          <span style={{ fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            SUPERHERO AUDITION COMMANDS
          </span>
        </div>
        <h2 className="section-title superhero-title">
          CHOOSE YOUR AUDITION
        </h2>
        <p className="section-subtitle">
          Select your musical specialty below to launch your registration panel.
        </p>
      </div>

      <div className="category-grid">
        {/* CARD 1: SINGING */}
        <div 
          className={`glass-card glass-card-hover ${selectedCategory === 'Singing' ? 'active-card' : ''}`}
          style={{
            padding: 'clamp(28px, 4.5vw, 46px) clamp(18px, 3.5vw, 36px)',
            textAlign: 'center',
            borderColor: selectedCategory === 'Singing' ? '#ff0d35' : 'rgba(255, 13, 53, 0.35)',
            boxShadow: selectedCategory === 'Singing' ? '0 0 40px rgba(255, 13, 53, 0.6)' : undefined,
            background: 'linear-gradient(135deg, rgba(14, 20, 36, 0.95) 0%, rgba(8, 10, 18, 0.98) 100%)'
          }}
        >
          <div className="spider-web-corner-tl" />

          {/* Spider-Man Microphone Category Artwork */}
          <div 
            style={{
              width: 'clamp(110px, 20vw, 140px)',
              height: 'clamp(110px, 20vw, 140px)',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid #ff0d35',
              margin: '0 auto 20px',
              boxShadow: '0 0 30px rgba(255, 13, 53, 0.6)',
              background: '#080c16',
              flexShrink: 0
            }}
          >
            <img 
              src="/spiderman-singing-icon.jpg" 
              alt="Spider-Man Singing Vocals" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block'
              }}
            />
          </div>

          <h3 style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.2rem)', fontWeight: 900, marginBottom: '4px', letterSpacing: '0.05em' }}>
            SINGING
          </h3>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#00d4ff', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>
            VOCALS
          </span>

          <p style={{ color: '#cbd5e1', fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', marginBottom: '28px', fontWeight: 600 }}>
            Your voice. Your power. Your stage.
          </p>

          <button 
            className="btn-primary" 
            onClick={() => onSelectCategory('Singing')}
            style={{ width: '100%', padding: '16px 24px', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}
          >
            REGISTER FOR SINGING <ArrowRight size={20} />
          </button>
        </div>

        {/* CARD 2: INSTRUMENTS */}
        <div 
          className={`glass-card glass-card-hover ${selectedCategory === 'Instruments' ? 'active-card' : ''}`}
          style={{
            padding: 'clamp(28px, 4.5vw, 46px) clamp(18px, 3.5vw, 36px)',
            textAlign: 'center',
            borderColor: selectedCategory === 'Instruments' ? '#00d4ff' : 'rgba(0, 212, 255, 0.35)',
            boxShadow: selectedCategory === 'Instruments' ? '0 0 40px rgba(0, 212, 255, 0.6)' : undefined,
            background: 'linear-gradient(135deg, rgba(14, 20, 36, 0.95) 0%, rgba(8, 10, 18, 0.98) 100%)'
          }}
        >
          <div className="spider-web-corner-tr" />

          {/* Spider-Man Guitar Category Artwork */}
          <div 
            style={{
              width: 'clamp(110px, 20vw, 140px)',
              height: 'clamp(110px, 20vw, 140px)',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid #00d4ff',
              margin: '0 auto 20px',
              boxShadow: '0 0 30px rgba(0, 212, 255, 0.6)',
              background: '#080c16',
              flexShrink: 0
            }}
          >
            <img 
              src="/spiderman-instruments-icon.jpg" 
              alt="Spider-Man Playing Guitar" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block'
              }}
            />
          </div>

          <h3 style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.2rem)', fontWeight: 900, marginBottom: '4px', letterSpacing: '0.05em' }}>
            INSTRUMENTS
          </h3>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ff0d35', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>
            KEYBOARD • GUITAR • DRUMS & MORE
          </span>

          <p style={{ color: '#cbd5e1', fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', marginBottom: '28px', fontWeight: 600 }}>
            Every hero needs a soundtrack. What's yours?
          </p>

          <button 
            className="btn-primary" 
            onClick={() => onSelectCategory('Instruments')}
            style={{ 
              width: '100%', 
              padding: '16px 24px',
              fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
              background: 'linear-gradient(135deg, #0088ff 0%, #0044cc 100%)', 
              borderColor: '#00d4ff', 
              boxShadow: '0 6px 25px rgba(0, 136, 255, 0.5)' 
            }}
          >
            REGISTER FOR INSTRUMENTS <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
