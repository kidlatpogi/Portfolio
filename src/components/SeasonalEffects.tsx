import { useEffect, useRef, useState } from 'react';
import { getHolidaySeason, getMsUntilNextBoundary, type HolidaySeason } from '../utils/seasonal';

export default function SeasonalEffects() {
  const [season, setSeason] = useState<HolidaySeason>('none');
  const [override, setOverride] = useState<HolidaySeason | null>(null);

  const activeSeason = override ?? season;

  useEffect(() => {
    // Initial calculation
    setSeason(getHolidaySeason());

    // Schedule next boundary update without polling loops
    let timer: ReturnType<typeof setTimeout>;
    const scheduleNext = () => {
      const ms = getMsUntilNextBoundary();
      // Cap at 24 days to prevent 32-bit int overflow in setTimeout
      const safeMs = Math.min(ms, 2147483647);
      timer = setTimeout(() => {
        setSeason(getHolidaySeason());
        scheduleNext();
      }, safeMs);
    };

    scheduleNext();

    // Listen for simulation override events from test buttons
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
    return <FireworksCanvas />;
  }

  return null;
}

/**
 * Ultra-lightweight 60fps Canvas Snow
 * Zero external dependencies, minimal CPU/GPU footprint
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

    // Generate ~50 lightweight snowflake particles
    const particleCount = Math.min(60, Math.floor(window.innerWidth / 25));
    const flakes = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 1.2,
      density: Math.random() * 1 + 0.5,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.6 + 0.35,
      swing: Math.random() * Math.PI * 2,
      swingSpeed: Math.random() * 0.02 + 0.01
    }));

    const render = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.swing += f.swingSpeed;
        f.x += f.speedX + Math.sin(f.swing) * 0.5;
        f.y += f.speedY;

        // Wrap around boundaries
        if (f.y > height + 5) {
          f.y = -5;
          f.x = Math.random() * width;
        }
        if (f.x > width + 5) f.x = -5;
        if (f.x < -5) f.x = width + 5;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
        ctx.shadowBlur = 4;
        ctx.fill();
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
 * Ultra-lightweight Celebratory Fireworks Canvas
 * Smooth particle decay with vibrant colors & zero frame drops
 */
function FireworksCanvas() {
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
        lastTime = performance.now();
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

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      decay: number;
      color: string;
      radius: number;
    }

    interface Rocket {
      x: number;
      y: number;
      targetY: number;
      vy: number;
      color: string;
    }

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];

    const PALETTE = [
      '#C44900', // Portfolio Signature Orange
      '#FFD700', // Festive Gold
      '#FF3B30', // New Year Crimson
      '#34C759', // Emerald Green
      '#00C7FF', // Electric Cyan
      '#AF52DE', // Celebration Purple
      '#FF9500'  // Amber
    ];

    const spawnRocket = () => {
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      rockets.push({
        x: Math.random() * (width * 0.8) + width * 0.1,
        y: height,
        targetY: Math.random() * (height * 0.45) + height * 0.15,
        vy: -(Math.random() * 4 + 9),
        color
      });
    };

    const explodeRocket = (x: number, y: number, color: string) => {
      const count = Math.floor(Math.random() * 25) + 35;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.2;
        const speed = Math.random() * 4.5 + 1.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.012,
          color,
          radius: Math.random() * 2 + 1.2
        });
      }
    };

    // Initial launch
    spawnRocket();
    let launchTimer = 0;
    let lastTime = performance.now();

    const render = (time: number) => {
      if (!isVisible) return;

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      launchTimer += dt;
      if (launchTimer > 1.4) {
        launchTimer = 0;
        spawnRocket();
        if (Math.random() > 0.4) {
          setTimeout(spawnRocket, 300);
        }
      }

      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      // Update & Draw Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy;
        r.vy += 0.05; // Gentle gravity

        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 6;
        ctx.fill();

        if (r.y <= r.targetY || r.vy >= 0) {
          explodeRocket(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Update & Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.07; // Gravity
        p.vx *= 0.98; // Air resistance
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.globalAlpha = 1;
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
