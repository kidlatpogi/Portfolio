import { useEffect, useRef, useState } from 'react';
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
    return <FireworksCanvas />;
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
      isCrystal: i % 4 === 0, // 25% are detailed 6-point star crystals
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03
    }));

    // Draw a single 6-pointed ice crystal snowflake
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
        // Small side branch
        ctx.moveTo(0, -size * 0.55);
        ctx.lineTo(-size * 0.35, -size * 0.8);
        ctx.moveTo(0, -size * 0.55);
        ctx.lineTo(size * 0.35, -size * 0.8);
        ctx.stroke();
        ctx.rotate(Math.PI / 3);
      }

      // Bright white central glint
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
          // Soft frosty pellet with icy outer contrast rim & bright core
          // Outer subtle icy shadow rim
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius + 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(148, 175, 210, ${f.opacity * 0.45})`;
          ctx.fill();

          // Bright frosty center
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
 * Enhanced Celebratory Fireworks Canvas
 * Dynamic multi-burst rockets, sparkles & 60fps capped particle system
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
      hasTrail?: boolean;
    }

    interface Rocket {
      x: number;
      y: number;
      targetY: number;
      vy: number;
      color: string;
      type: 'classic' | 'double' | 'ring';
    }

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];

    const PALETTES = [
      ['#C44900', '#FF8A3D', '#FFD166'], // Warm Sunset & Gold
      ['#EF4444', '#F43F5E', '#FFE4E6'], // Crimson & Rose
      ['#10B981', '#34D399', '#A7F3D0'], // Emerald & Mint
      ['#06B6D4', '#38BDF8', '#E0F2FE'], // Cyan & Sky
      ['#8B5CF6', '#D946EF', '#FDF4FF'], // Purple & Magenta
      ['#F59E0B', '#EAB308', '#FEF08A']  // Brilliant Gold
    ];

    const spawnRocket = (forcedX?: number) => {
      const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      const color = palette[0];
      const types: ('classic' | 'double' | 'ring')[] = ['classic', 'double', 'ring'];
      const type = types[Math.floor(Math.random() * types.length)];

      rockets.push({
        x: forcedX ?? Math.random() * (width * 0.85) + width * 0.075,
        y: height + 10,
        targetY: Math.random() * (height * 0.5) + height * 0.12,
        vy: -(Math.random() * 4 + 9.5),
        color,
        type
      });
    };

    const explodeRocket = (x: number, y: number, type: 'classic' | 'double' | 'ring') => {
      if (particles.length > 550) return;

      const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      const count = type === 'ring' ? 36 : Math.floor(Math.random() * 20) + 40;

      for (let i = 0; i < count; i++) {
        let angle = (Math.PI * 2 * i) / count;
        let speed = Math.random() * 4.8 + 1.8;

        if (type === 'ring') {
          speed = 3.8;
        } else {
          angle += (Math.random() - 0.5) * 0.3;
        }

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: Math.random() * 0.016 + 0.011,
          color: palette[Math.floor(Math.random() * palette.length)],
          radius: Math.random() * 2.2 + 1.2,
          hasTrail: Math.random() > 0.6
        });
      }

      if (type === 'double') {
        setTimeout(() => {
          if (particles.length < 500) {
            for (let i = 0; i < 24; i++) {
              const angle = Math.random() * Math.PI * 2;
              const speed = Math.random() * 2.5 + 0.8;
              particles.push({
                x: x + (Math.random() - 0.5) * 15,
                y: y + (Math.random() - 0.5) * 15,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                decay: Math.random() * 0.02 + 0.015,
                color: '#FFFFFF',
                radius: 1.5
              });
            }
          }
        }, 120);
      }
    };

    // Initial flurry of 2 rockets
    spawnRocket(width * 0.3);
    spawnRocket(width * 0.7);

    let launchTimer = 0;
    let lastTime = performance.now();

    const render = (time: number) => {
      if (!isVisible) return;

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      launchTimer += dt;
      if (launchTimer > 0.85) {
        launchTimer = 0;
        spawnRocket();
        if (Math.random() > 0.4) {
          setTimeout(() => spawnRocket(), 200);
        }
      }

      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      // Update & Draw Rockets with Spark Trails
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy;
        r.vy += 0.06;

        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 8;
        ctx.fill();

        // Rocket ember spark
        if (Math.random() > 0.3 && particles.length < 550) {
          particles.push({
            x: r.x + (Math.random() - 0.5) * 2,
            y: r.y + 4,
            vx: (Math.random() - 0.5) * 0.8,
            vy: Math.random() * 1.5 + 0.5,
            alpha: 0.8,
            decay: 0.05,
            color: '#FEF08A',
            radius: 1.2
          });
        }

        if (r.y <= r.targetY || r.vy >= 0) {
          explodeRocket(r.x, r.y, r.type);
          rockets.splice(i, 1);
        }
      }

      // Update & Draw Explosion Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.075; // Gravity
        p.vx *= 0.978; // Air drag
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
        ctx.shadowBlur = 6;
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
