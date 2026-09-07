import React from 'react';

export default function CollegeHeader() {
  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: '0 8px',
        width: '100%',
        maxWidth: '100%'
      }}
    >
      <img 
        src="/kit-coimbatore-header.png" 
        alt="Kalaignarkarunanidhi Institute of Technology (KIT-COIMBATORE)" 
        className="kit-college-logo"
      />
    </div>
  );
}
