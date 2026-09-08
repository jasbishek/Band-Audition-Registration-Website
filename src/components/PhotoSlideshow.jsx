import React, { useState, useEffect } from 'react';
import { useAssets } from '../context/AssetContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SpiderIcon } from './SuperheroSilhouettes';

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function PhotoSlideshow() {
  const { assets } = useAssets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayImages, setDisplayImages] = useState([]);

  useEffect(() => {
    if (assets.slideshow && assets.slideshow.length > 0) {
      setDisplayImages(shuffleArray(assets.slideshow));
      setCurrentIndex(0);
    }
  }, [assets.slideshow]);

  useEffect(() => {
    if (displayImages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [displayImages.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayImages.length);
  };

  const imagesToRender = displayImages.length > 0 ? displayImages : (assets.slideshow || []);

  return (
    <section className="section-container" style={{ paddingTop: 'clamp(20px, 3vw, 40px)', paddingBottom: 'clamp(20px, 3vw, 40px)' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--spider-red)', marginBottom: '8px' }}>
          <SpiderIcon size={20} color="#ff0d35" />
          <span style={{ fontSize: 'clamp(0.72rem, 1.8vw, 0.85rem)', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
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

        {imagesToRender.map((img, idx) => (
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
        <button className="slideshow-nav-btn prev" onClick={handlePrev} title="Previous Photo" aria-label="Previous Photo">
          <ChevronLeft size={24} />
        </button>
        <button className="slideshow-nav-btn next" onClick={handleNext} title="Next Photo" aria-label="Next Photo">
          <ChevronRight size={24} />
        </button>

        {/* Pagination Dots */}
        <div 
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 10
          }}
        >
          {imagesToRender.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: idx === currentIndex ? '24px' : '8px',
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
