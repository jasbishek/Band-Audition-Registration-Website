import React, { useState, useEffect } from 'react';
import { useAssets } from '../context/AssetContext';
import { ChevronLeft, ChevronRight, Upload, Camera } from 'lucide-react';
import { SpiderIcon } from './SuperheroSilhouettes';

export default function PhotoSlideshow({ onOpenUploader }) {
  const { assets } = useAssets();
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideshowImages = assets.slideshow && assets.slideshow.length > 0 ? assets.slideshow : [];

  useEffect(() => {
    if (slideshowImages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [slideshowImages.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slideshowImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slideshowImages.length);
  };

  return (
    <section className="section-container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--spider-red)', marginBottom: '8px' }}>
          <SpiderIcon size={20} color="#ff0d35" />
          <span style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            STAGE MEMORIES & LIVE PERFORMANCE
          </span>
        </div>
        <h2 className="section-title superhero-title">
          BAND UNKNOWN — MOMENTS
        </h2>
      </div>

      <div className="slideshow-container">
        <div className="spider-web-corner-tl" />
        <div className="spider-web-corner-tr" />

        {slideshowImages.map((img, idx) => (
          <div 
            key={idx} 
            className={`slideshow-slide ${idx === currentIndex ? 'active' : ''}`}
          >
            <img 
              src={img} 
              alt={`BAND UNKNOWN Live Performance ${idx + 1}`} 
              className="slideshow-img" 
            />
            <div className="slideshow-overlay" />
          </div>
        ))}

        {/* Left / Right Controls */}
        <button className="slideshow-nav-btn prev" onClick={handlePrev} title="Previous Photo">
          <ChevronLeft size={26} />
        </button>
        <button className="slideshow-nav-btn next" onClick={handleNext} title="Next Photo">
          <ChevronRight size={26} />
        </button>

        {/* Pagination Dots */}
        <div 
          style={{
            position: 'absolute',
            bottom: '14px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 10
          }}
        >
          {slideshowImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: idx === currentIndex ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: idx === currentIndex ? '#ff0d35' : 'rgba(255, 255, 255, 0.4)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
