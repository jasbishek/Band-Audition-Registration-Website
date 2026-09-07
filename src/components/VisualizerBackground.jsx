import React, { useEffect, useRef } from 'react';

export default function VisualizerBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Floating Particles: Musical Notes & Spider Particles
    const symbols = ['♪', '♫', '♬', '⚡', '🎤', '🎸', '🕸️'];
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 16 + 12,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      speedY: -(Math.random() * 0.4 + 0.15),
      speedX: Math.sin(Math.random() * Math.PI) * 0.35,
      opacity: Math.random() * 0.35 + 0.1,
      color: Math.random() > 0.4 ? '#ff0d35' : '#00d4ff'
    }));

    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      phase += 0.015;

      // 1. Draw Spider-Man Web Grids in Corner Areas
      ctx.lineWidth = 1;

      // Top-Left Spider Web
      ctx.strokeStyle = 'rgba(255, 13, 53, 0.18)';
      for (let r = 40; r <= 360; r += 45) {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI / 2);
        ctx.stroke();
      }
      for (let angle = 0; angle <= Math.PI / 2; angle += Math.PI / 12) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * 380, Math.sin(angle) * 380);
        ctx.stroke();
      }

      // Top-Right Spider Web
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.16)';
      for (let r = 40; r <= 360; r += 45) {
        ctx.beginPath();
        ctx.arc(width, 0, r, Math.PI / 2, Math.PI);
        ctx.stroke();
      }
      for (let angle = Math.PI / 2; angle <= Math.PI; angle += Math.PI / 12) {
        ctx.beginPath();
        ctx.moveTo(width, 0);
        ctx.lineTo(width + Math.cos(angle) * 380, Math.sin(angle) * 380);
        ctx.stroke();
      }

      // Bottom-Left Spider Web
      ctx.strokeStyle = 'rgba(255, 13, 53, 0.12)';
      for (let r = 40; r <= 280; r += 45) {
        ctx.beginPath();
        ctx.arc(0, height, r, -Math.PI / 2, 0);
        ctx.stroke();
      }

      // 2. Draw Floating Superhero Particles
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(phase + p.y * 0.01) * 0.3;

        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.font = `${p.size}px sans-serif`;
        ctx.fillText(p.symbol, p.x, p.y);
        ctx.restore();
      });

      // 3. Audio Equalizer Waveform line at bottom
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255, 13, 53, 0.25)';
      for (let x = 0; x < width; x += 8) {
        const y = height - 50 + Math.sin(x * 0.012 + phase) * 18 + Math.cos(x * 0.02 - phase) * 10;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
