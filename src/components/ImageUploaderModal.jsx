import React, { useState } from 'react';
import { useAssets } from '../context/AssetContext';
import { Upload, X, RefreshCw } from 'lucide-react';

export default function ImageUploaderModal({ isOpen, onClose }) {
  const { assets, updateAsset, resetAssets } = useAssets();
  const [activeTab, setActiveTab] = useState('logos');

  if (!isOpen) return null;

  const handleFileUpload = (e, assetKey, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      updateAsset(assetKey, event.target.result, index);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="modal-backdrop">
      <div 
        className="glass-card" 
        style={{ 
          maxWidth: '650px', 
          width: '100%', 
          padding: 'clamp(20px, 4vw, 28px)', 
          maxHeight: '90vh', 
          overflowY: 'auto' 
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', color: '#ff1e42', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Upload size={22} /> Replace Image Assets
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              Upload your custom PNG images for logos & slideshow photos.
            </p>
          </div>
          <button 
            onClick={onClose} 
            aria-label="Close modal"
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '6px' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Upload Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('logos')}
            className={activeTab === 'logos' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            Logos (College & Band)
          </button>
          <button
            onClick={() => setActiveTab('slideshow')}
            className={activeTab === 'slideshow' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            Slideshow Photos (1-4)
          </button>
        </div>

        {activeTab === 'logos' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* College Logo Item */}
            <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', color: '#00f0ff' }}>College Logo PNG</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <img src={assets.collegeLogo} alt="College Logo" style={{ height: '55px', maxWidth: '140px', objectFit: 'contain' }} />
                <label className="btn-secondary" style={{ cursor: 'pointer', fontSize: '0.8rem' }}>
                  <Upload size={16} /> Choose PNG File
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'collegeLogo')} style={{ display: 'none' }} />
                </label>
              </div>
            </div>

            {/* Band Logo Item */}
            <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', color: '#ff1e42' }}>BAND UNKNOWN Logo PNG</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <img src={assets.bandLogo} alt="Band Logo" style={{ height: '70px', maxWidth: '140px', objectFit: 'contain' }} />
                <label className="btn-primary" style={{ cursor: 'pointer', fontSize: '0.8rem' }}>
                  <Upload size={16} /> Choose PNG File
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'bandLogo')} style={{ display: 'none' }} />
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'slideshow' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
            {assets.slideshow.map((img, idx) => (
              <div key={idx} style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <h4 style={{ fontSize: '0.85rem', marginBottom: '8px', color: '#ffffff' }}>Slideshow Photo {idx + 1}</h4>
                <div style={{ width: '100%', height: '100px', marginBottom: '10px', borderRadius: '8px', overflow: 'hidden' }}>
                  <img src={img} alt={`Slideshow ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <label className="btn-secondary" style={{ cursor: 'pointer', fontSize: '0.75rem', width: '100%', justifyContent: 'center' }}>
                  <Upload size={14} /> Replace Photo {idx + 1}
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'slideshow', idx)} style={{ display: 'none' }} />
                </label>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', flexWrap: 'wrap', gap: '12px' }}>
          <button onClick={resetAssets} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
            <RefreshCw size={14} /> Reset Placeholders
          </button>
          <button className="btn-primary" onClick={onClose} style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
