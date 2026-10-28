import React, { useEffect, useRef } from 'react';

interface Candle {
  x: number;
  y: number;
  width: number;
  height: number;
  speedY: number;
  flickerSpeed: number;
  flickerPhase: number;
}

interface Spark {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Floating Candles (Hogwarts Great Hall)
    const candlesCount = Math.min(Math.floor(width / 140), 12);
    const candles: Candle[] = [];

    for (let i = 0; i < candlesCount; i++) {
      candles.push({
        x: (width / (candlesCount + 1)) * (i + 1) + (Math.random() - 0.5) * 60,
        y: Math.random() * (height * 0.45) + 30,
        width: 10 + Math.random() * 4,
        height: 40 + Math.random() * 30,
        speedY: (Math.random() - 0.5) * 0.25,
        flickerSpeed: 0.05 + Math.random() * 0.05,
        flickerPhase: Math.random() * Math.PI * 2,
      });
    }

    // Lumos Golden Magic Sparks
    const sparksCount = 45;
    const sparks: Spark[] = [];
    for (let i = 0; i < sparksCount; i++) {
      sparks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.5 - 0.1,
        opacity: Math.random() * 0.7 + 0.2,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Lumos Sparks
      sparks.forEach((s) => {
        s.x += s.speedX;
        s.y += s.speedY;

        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }
        if (s.x < -10) s.x = width + 10;
        if (s.x > width + 10) s.x = -10;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = '#FFE082';
        ctx.globalAlpha = s.opacity;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#FFD54F';
        ctx.fill();
      });

      // Render Floating Enchanted Candles
      candles.forEach((c) => {
        c.y += c.speedY;
        c.flickerPhase += c.flickerSpeed;

        // Gentle floating boundary bounce
        if (c.y < 20 || c.y > height * 0.5) {
          c.speedY *= -1;
        }

        const flameFlicker = Math.sin(c.flickerPhase) * 1.5;

        // Candle Wax Body
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(245, 235, 215, 0.45)';
        ctx.beginPath();
        ctx.roundRect(c.x - c.width / 2, c.y, c.width, c.height, 4);
        ctx.fill();

        // Candle Wick
        ctx.fillStyle = '#3A2E1E';
        ctx.fillRect(c.x - 0.75, c.y - 5, 1.5, 6);

        // Candle Flame (Golden Glow)
        const flameHeight = 12 + flameFlicker;
        const flameWidth = 5 + flameFlicker * 0.4;

        ctx.shadowBlur = 18;
        ctx.shadowColor = '#FFA000';
        ctx.fillStyle = '#FFD54F';
        ctx.beginPath();
        ctx.ellipse(c.x, c.y - 7 - flameHeight / 2, flameWidth, flameHeight, 0, 0, Math.PI * 2);
        ctx.fill();

        // Inner white-hot flame core
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.ellipse(c.x, c.y - 6 - flameHeight / 3, flameWidth * 0.4, flameHeight * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
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
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
