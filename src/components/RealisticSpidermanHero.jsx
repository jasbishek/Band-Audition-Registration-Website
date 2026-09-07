import React from 'react';

export default function RealisticSpidermanHero({ width = 420, height = 520 }) {
  return (
    <div 
      className="hero-spiderman-wrapper"
      style={{ 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'flex-end',
        width: '100%',
        marginRight: '-40px'
      }}
    >
      <img 
        src="/spiderman-hero-reach.png" 
        alt="Spider-Man Attached to Line" 
        className="hero-spiderman-img"
        style={{
          maxWidth: '100%',
          height: 'auto',
          maxHeight: `${height}px`,
          objectFit: 'contain',
          display: 'block',
          filter: 'drop-shadow(0 0 20px rgba(255, 13, 53, 0.45)) drop-shadow(0 0 10px rgba(0, 212, 255, 0.3))',
          transform: 'translateX(6px)',
          position: 'relative',
          zIndex: 2
        }} 
      />
    </div>
  );
}


