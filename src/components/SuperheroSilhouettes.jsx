import React from 'react';

// Original Spider-Man inspired web-slinger crouching hero silhouette SVG
export function HeroCrouchSilhouette({ width = 360, height = 400 }) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 360 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 25px rgba(255, 13, 53, 0.6))' }}
    >
      <defs>
        <linearGradient id="heroRedGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff0d35" />
          <stop offset="60%" stopColor="#b8001d" />
          <stop offset="100%" stopColor="#080c18" />
        </linearGradient>
        <linearGradient id="spiderEye" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#00d4ff" />
        </linearGradient>
      </defs>

      {/* Background Web Rays */}
      <path d="M180 180 L20 20 M180 180 L340 20 M180 180 L20 380 M180 180 L340 380 M180 180 L180 0 M180 180 L360 180" stroke="rgba(255, 13, 53, 0.25)" strokeWidth="1.5" strokeDasharray="6 4" />
      <circle cx="180" cy="180" r="120" stroke="rgba(0, 212, 255, 0.2)" strokeWidth="1.5" fill="none" />

      {/* Stylized Crouching Hero Silhouette Body */}
      {/* Head */}
      <path d="M180 70 C165 70 155 85 155 105 C155 125 165 135 180 135 C195 135 205 125 205 105 C205 85 195 70 180 70 Z" fill="url(#heroRedGlow)" stroke="#ff0d35" strokeWidth="2"/>
      
      {/* Spider Eyes */}
      <polygon points="163,98 175,108 167,112" fill="url(#spiderEye)" />
      <polygon points="197,98 185,108 193,112" fill="url(#spiderEye)" />

      {/* Torso */}
      <path d="M145 130 C130 145 120 180 135 210 C150 240 210 240 225 210 C240 180 230 145 215 130 Z" fill="url(#heroRedGlow)" stroke="#ff0d35" strokeWidth="2"/>

      {/* Spider Emblem on Chest */}
      <path d="M180 160 L174 175 L180 185 L186 175 Z M174 165 L160 155 M186 165 L200 155 M174 175 L155 185 M186 175 L205 185 M178 182 L162 200 M182 182 L198 200" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round" />

      {/* Left Arm Crouched on Ground */}
      <path d="M140 140 L90 170 L60 230 L80 235 L105 185 L145 160 Z" fill="#990014" stroke="#ff0d35" strokeWidth="2" />
      {/* Right Arm Ready to Web Shoot */}
      <path d="M220 140 L270 150 L310 130 L320 142 L275 170 L215 160 Z" fill="#990014" stroke="#ff0d35" strokeWidth="2" />

      {/* Web Shooter Beam from Right Hand */}
      <path d="M320 136 L360 110 M320 136 L360 130 M320 136 L360 150" stroke="#00d4ff" strokeWidth="2" strokeDasharray="4 2" />

      {/* Crouched Legs */}
      <path d="M145 220 L100 260 L70 330 L110 340 L135 285 L170 240 Z" fill="#0055ff" stroke="#00d4ff" strokeWidth="2"/>
      <path d="M215 220 L260 260 L290 330 L250 340 L225 285 L190 240 Z" fill="#0055ff" stroke="#00d4ff" strokeWidth="2"/>
    </svg>
  );
}

// Original Web-slinging Swinging Hero Silhouette SVG (for Final CTA)
export function HeroSwingSilhouette({ width = 300, height = 350 }) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 300 350" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 30px rgba(0, 212, 255, 0.7))' }}
    >
      {/* Web Line stretching up */}
      <path d="M150 0 L150 140" stroke="#ffffff" strokeWidth="3" strokeDasharray="8 4" />
      <circle cx="150" cy="140" r="6" fill="#00d4ff" />

      {/* Swinging Body Silhouette */}
      <path d="M150 140 C135 150 120 170 125 195 C130 220 160 250 150 280 C140 310 110 330 90 340" stroke="#ff0d35" strokeWidth="18" strokeLinecap="round" />
      <path d="M150 140 C165 160 180 185 175 210 C170 235 145 265 155 295 C165 325 190 340 210 345" stroke="#0055ff" strokeWidth="14" strokeLinecap="round" />

      {/* Head */}
      <circle cx="150" cy="120" r="18" fill="#ff0d35" stroke="#ffffff" strokeWidth="2" />
      <polygon points="142,116 148,122 144,125" fill="#00d4ff" />
      <polygon points="158,116 152,122 156,125" fill="#00d4ff" />
    </svg>
  );
}

// Stylized Spider Icon SVG
export function SpiderIcon({ size = 24, color = "#ff0d35" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="11" rx="3" ry="4" fill={color} />
      <circle cx="12" cy="6" r="2" fill={color} />
      {/* Legs */}
      <path d="M10 9 C7 7, 4 8, 3 11 M14 9 C17 7, 20 8, 21 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 11 C6 11, 3 13, 2 16 M14 11 C18 11, 21 13, 22 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 13 C7 15, 5 18, 4 21 M14 13 C17 15, 19 18, 20 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
