import React from 'react';
import { MapPin, User, MessageSquare, Phone } from 'lucide-react';
import { SpiderIcon } from './SuperheroSilhouettes';

export default function VenueContact() {
  return (
    <section className="section-container" style={{ paddingTop: '30px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px' }} className="grid-2">
        
        {/* AUDITION VENUE CARD */}
        <div 
          className="glass-card" 
          style={{ 
            padding: '40px 32px', 
            textAlign: 'center',
            borderColor: 'var(--spider-red)',
            background: 'linear-gradient(135deg, rgba(14, 20, 36, 0.95) 0%, rgba(8, 10, 18, 0.98) 100%)'
          }}
        >
          <div className="spider-web-corner-tl" />

          <div 
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(255, 13, 53, 0.2)',
              border: '2px solid #ff0d35',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px',
              boxShadow: '0 0 25px rgba(255, 13, 53, 0.5)'
            }}
          >
            <MapPin size={36} color="#ff0d35" />
          </div>

          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#00d4ff', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            LOCATION COMMAND
          </span>

          <h3 style={{ fontSize: '2rem', fontWeight: 900, margin: '8px 0', textTransform: 'uppercase' }}>
            AUDITION VENUE
          </h3>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 13, 53, 0.25)', border: '1px solid rgba(255, 13, 53, 0.5)', padding: '10px 24px', borderRadius: '30px', margin: '14px 0' }}>
            <span style={{ fontSize: '1.3rem', fontWeight: 900, color: '#ffffff' }}>
              📍 AUDITORIUM
            </span>
          </div>

          <p style={{ fontSize: '1.1rem', color: '#00d4ff', marginTop: '10px', fontWeight: 800, letterSpacing: '0.05em' }}>
            YOUR STAGE AWAITS.
          </p>
        </div>

        {/* CONTACT INFORMATION CARD */}
        <div 
          className="glass-card" 
          style={{ 
            padding: '40px 32px', 
            borderColor: 'var(--spider-blue)',
            background: 'linear-gradient(135deg, rgba(14, 20, 36, 0.95) 0%, rgba(8, 10, 18, 0.98) 100%)'
          }}
        >
          <div className="spider-web-corner-tr" />

          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ff0d35', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              COMMUNICATION MATRIX
            </span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginTop: '4px', textTransform: 'uppercase' }}>
              FOR FURTHER INFORMATION, CONTACT
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Contact 1 */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '16px 20px', 
                background: 'rgba(6, 9, 16, 0.85)', 
                borderRadius: '14px',
                border: '1px solid rgba(255, 13, 53, 0.3)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div 
                  style={{ 
                    width: '52px', 
                    height: '52px', 
                    borderRadius: '50%', 
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '2px solid #ff0d35',
                    boxShadow: '0 0 12px rgba(255, 13, 53, 0.4)',
                    background: '#0a0e1a'
                  }}
                >
                  <img 
                    src="/jas-abishek.png" 
                    alt="Jas Abishek Profile" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      objectPosition: '50% 20%',
                      display: 'block' 
                    }} 
                  />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>Jas Abishek</h4>
                  <p style={{ fontSize: '0.95rem', color: '#00d4ff', fontWeight: 700 }}>9500741878</p>
                </div>
              </div>
              
              <a 
                href="https://wa.me/919500741878" 
                target="_blank" 
                rel="noreferrer"
                className="btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.8rem' }}
              >
                <MessageSquare size={14} /> WhatsApp
              </a>
            </div>

            {/* Contact 2 */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '16px 20px', 
                background: 'rgba(6, 9, 16, 0.85)', 
                borderRadius: '14px',
                border: '1px solid rgba(0, 212, 255, 0.3)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div 
                  style={{ 
                    width: '52px', 
                    height: '52px', 
                    borderRadius: '50%', 
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '2px solid #00d4ff',
                    boxShadow: '0 0 12px rgba(0, 212, 255, 0.4)',
                    background: '#0a0e1a'
                  }}
                >
                  <img 
                    src="/carolin-mary.jpg" 
                    alt="Carolin Mary Profile" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      objectPosition: '50% 15%',
                      display: 'block' 
                    }} 
                  />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>Carolin Mary</h4>
                  <p style={{ fontSize: '0.95rem', color: '#ff0d35', fontWeight: 700 }}>93458 84261</p>
                </div>
              </div>

              <a 
                href="https://wa.me/919345884261" 
                target="_blank" 
                rel="noreferrer"
                className="btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.8rem' }}
              >
                <MessageSquare size={14} /> WhatsApp
              </a>
            </div>

            {/* Contact 3 */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '16px 20px', 
                background: 'rgba(6, 9, 16, 0.85)', 
                borderRadius: '14px',
                border: '1px solid rgba(255, 13, 53, 0.3)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div 
                  style={{ 
                    width: '52px', 
                    height: '52px', 
                    borderRadius: '50%', 
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '2px solid #ff0d35',
                    boxShadow: '0 0 12px rgba(255, 13, 53, 0.4)',
                    background: '#0a0e1a'
                  }}
                >
                  <img 
                    src="/pragadeeswar.jpg" 
                    alt="Pragadeeswar Profile" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      objectPosition: '50% 20%',
                      display: 'block' 
                    }} 
                  />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>Pragadeeswar</h4>
                  <p style={{ fontSize: '0.95rem', color: '#00d4ff', fontWeight: 700 }}>93423 67473</p>
                </div>
              </div>

              <a 
                href="https://wa.me/919342367473" 
                target="_blank" 
                rel="noreferrer"
                className="btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.8rem' }}
              >
                <MessageSquare size={14} /> WhatsApp
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
