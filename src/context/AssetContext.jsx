import React, { createContext, useContext, useState, useEffect } from 'react';

const AssetContext = createContext();

// Generated default SVG placeholders
const createPlaceholderSvg = (title, subtitle, width = 300, height = 200, color = '#ff1e42') => {
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="100%" height="100%" fill="#0a0e1a" stroke="${color}" stroke-width="2" stroke-dasharray="8 4" rx="12"/>
      <circle cx="${width / 2}" cy="${height / 2 - 20}" r="28" fill="none" stroke="${color}" stroke-width="2"/>
      <path d="M${width / 2 - 12} ${height / 2 - 20} L${width / 2 + 12} ${height / 2 - 20} M${width / 2} ${height / 2 - 32} L${width / 2} ${height / 2 - 8}" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
      <text x="50%" y="${height / 2 + 25}" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ffffff" text-anchor="middle">${title}</text>
      <text x="50%" y="${height / 2 + 45}" font-family="sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">${subtitle}</text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
};

const defaultAssets = {
  collegeLogo: '/kit-coimbatore-header.png',
  bandLogo: '/band-unknown-logo.png',
  slideshow: [
    '/slideshow/slide-1.jpg',
    '/slideshow/slide-2.jpg',
    '/slideshow/slide-3.jpg',
    '/slideshow/slide-4.jpg',
    '/slideshow/slide-5.jpg',
    '/slideshow/slide-6.jpg',
    '/slideshow/slide-7.jpg',
    '/slideshow/slide-8.jpg',
    '/slideshow/slide-9.jpg',
  ]
};

export const AssetProvider = ({ children }) => {
  const [assets, setAssets] = useState(() => {
    const saved = localStorage.getItem('band_unknown_custom_assets');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.slideshow || parsed.slideshow.length !== 9 || parsed.slideshow.some(s => typeof s === 'string' && s.includes('data:image/svg'))) {
          parsed.slideshow = defaultAssets.slideshow;
        }
        return parsed;
      } catch (e) {
        return defaultAssets;
      }
    }
    return defaultAssets;
  });

  useEffect(() => {
    try {
      localStorage.setItem('band_unknown_custom_assets', JSON.stringify(assets));
    } catch (e) {
      console.warn('LocalStorage limit exceeded for image data', e);
    }
  }, [assets]);

  const updateAsset = (key, value, index = null) => {
    setAssets((prev) => {
      if (index !== null && Array.isArray(prev[key])) {
        const updatedArray = [...prev[key]];
        updatedArray[index] = value;
        return { ...prev, [key]: updatedArray };
      }
      return { ...prev, [key]: value };
    });
  };

  const resetAssets = () => {
    setAssets(defaultAssets);
    localStorage.removeItem('band_unknown_custom_assets');
  };

  return (
    <AssetContext.Provider value={{ assets, updateAsset, resetAssets }}>
      {children}
    </AssetContext.Provider>
  );
};

export const useAssets = () => useContext(AssetContext);
