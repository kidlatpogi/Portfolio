import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { getHolidaySeason, getMsUntilNextBoundary, type HolidaySeason } from '../utils/seasonal';

export default function SeasonalEffects() {
  const [season, setSeason] = useState<HolidaySeason>('none');
  const [override, setOverride] = useState<HolidaySeason | null>(null);

  const activeSeason = override ?? season;

  useEffect(() => {
    setSeason(getHolidaySeason());

    let timer: ReturnType<typeof setTimeout>;
    const scheduleNext = () => {
      const ms = getMsUntilNextBoundary();
      const safeMs = Math.min(ms, 2147483647);
      timer = setTimeout(() => {
        setSeason(getHolidaySeason());
        scheduleNext();
      }, safeMs);
    };

    scheduleNext();

    const handleOverride = (e: Event) => {
      const customEvent = e as CustomEvent<HolidaySeason | 'auto'>;
      if (customEvent.detail === 'auto') {
        setOverride(null);
      } else {
        setOverride(customEvent.detail);
      }
    };

    window.addEventListener('setSeasonalOverride', handleOverride);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('setSeasonalOverride', handleOverride);
    };
  }, []);

  if (activeSeason === 'christmas') {
    return <SnowCanvas />;
  }

  if (activeSeason === 'newyear') {
    return <FireworksLibraryEffect />;
  }

  return null;
}

/**
 * High-Visibility Frosty Snow Canvas
 * Optimized for light/white backgrounds with icy blue rims and crystal flakes
 */
function SnowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let isVisible = true;

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Diverse snowflake particle pool
    const count = Math.min(85, Math.floor(window.innerWidth / 16));
    const flakes = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.8 + 1.6,
      speedY: Math.random() * 1.4 + 0.7,
      speedX: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.45 + 0.55,
      swing: Math.random() * Math.PI * 2,
      swingSpeed: Math.random() * 0.025 + 0.012,
      isCrystal: i % 4 === 0,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03
    }));

    const drawCrystal = (x: number, y: number, size: number, rot: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.strokeStyle = `rgba(125, 160, 200, ${alpha * 0.75})`;
      ctx.lineWidth = 1.2;
      ctx.lineCap = 'round';

      for (let arm = 0; arm < 6; arm++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -size);
        ctx.moveTo(0, -size * 0.55);
        ctx.lineTo(-size * 0.35, -size * 0.8);
        ctx.moveTo(0, -size * 0.55);
        ctx.lineTo(size * 0.35, -size * 0.8);
        ctx.stroke();
        ctx.rotate(Math.PI / 3);
      }

      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.swing += f.swingSpeed;
        f.x += f.speedX + Math.sin(f.swing) * 0.6;
        f.y += f.speedY;
        f.rotation += f.rotationSpeed;

        if (f.y > height + 10) {
          f.y = -10;
          f.x = Math.random() * width;
        }
        if (f.x > width + 10) f.x = -10;
        if (f.x < -10) f.x = width + 10;

        if (f.isCrystal) {
          drawCrystal(f.x, f.y, f.radius * 2.2, f.rotation, f.opacity);
        } else {
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius + 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(148, 175, 210, ${f.opacity * 0.45})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240, 248, 255, ${f.opacity * 0.95})`;
          ctx.shadowColor = 'rgba(186, 215, 248, 0.7)';
          ctx.shadowBlur = 4;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 w-full h-full"
    />
  );
}

/**
 * 60fps Zero-Lag Fireworks using canvas-confetti library
 * High-performance, celebratory, smooth multi-origin bursts
 */
function FireworksLibraryEffect() {
  useEffect(() => {
    let isRunning = true;
    let timer: ReturnType<typeof setTimeout>;

    const colors = [
      '#C44900', // Signature Orange
      '#FF8A3D', // Amber Glow
      '#FFD700', // Festive Gold
      '#EF4444', // New Year Crimson
      '#10B981', // Emerald Green
      '#06B6D4', // Cyan Sky
      '#A855F7', // Electric Violet
      '#FFFFFF'  // Diamond Flash
    ];

    const launchBurst = () => {
      if (!isRunning || (typeof document !== 'undefined' && document.hidden)) return;

      // Random origin in the upper sky
      const x = Math.random() * 0.8 + 0.1;
      const y = Math.random() * 0.4 + 0.15;

      confetti({
        particleCount: Math.floor(Math.random() * 25) + 30,
        spread: 360,
        startVelocity: Math.random() * 12 + 20,
        decay: 0.93,
        scalar: 0.9,
        ticks: 80,
        gravity: 0.75,
        colors,
        origin: { x, y },
        zIndex: 30,
        disableForReducedMotion: true
      });

      // Staggered double spark pop
      if (Math.random() > 0.4) {
        setTimeout(() => {
          if (!isRunning || document.hidden) return;
          confetti({
            particleCount: 15,
            spread: 360,
            startVelocity: 14,
            decay: 0.94,
            scalar: 0.7,
            ticks: 50,
            gravity: 0.6,
            colors: ['#FFD700', '#FFFFFF', '#C44900'],
            origin: { x: x + (Math.random() - 0.5) * 0.06, y: y + (Math.random() - 0.5) * 0.06 },
            zIndex: 30
          });
        }, 150);
      }

      // Schedule next burst (every 600ms to 1200ms)
      const nextDelay = Math.random() * 600 + 600;
      timer = setTimeout(launchBurst, nextDelay);
    };

    // Initial pair of launches
    launchBurst();
    const initialPairTimer = setTimeout(launchBurst, 350);

    const handleVisibility = () => {
      if (!document.hidden && isRunning) {
        launchBurst();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      isRunning = false;
      clearTimeout(timer);
      clearTimeout(initialPairTimer);
      document.removeEventListener('visibilitychange', handleVisibility);
      confetti.reset();
    };
  }, []);

  return null;
}
