import { useEffect, useRef, useState } from 'react';
import { FallingLeaves } from 'falling-leaves';
import {
  getCurrentSeason,
  getMsUntilNextBoundary,
  getSeasonOverride,
  type Season,
} from '../utils/seasonal';

export default function SeasonalEffects() {
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [systemSeason, setSystemSeason] = useState<Season>(() => getCurrentSeason());
  const [overrideSeason, setOverrideSeason] = useState<Season | null>(() => getSeasonOverride());

  const activeSeason = overrideSeason ?? systemSeason;

  useEffect(() => {
    setMounted(true);
    setSystemSeason(getCurrentSeason());
    setOverrideSeason(getSeasonOverride());

    // Schedule automatic transition when next month boundary arrives
    let timer: ReturnType<typeof setTimeout>;
    const scheduleNext = () => {
      const ms = getMsUntilNextBoundary();
      const safeMs = Math.min(ms, 2147483647);
      timer = setTimeout(() => {
        setSystemSeason(getCurrentSeason());
        scheduleNext();
      }, safeMs);
    };
    scheduleNext();

    // Listen for manual season override changes
    const handleSeasonChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ override: Season | null }>;
      setOverrideSeason(customEvent.detail?.override ?? null);
    };

    window.addEventListener('seasonChange', handleSeasonChange);

    // Coordinate with preloader
    const isPreloaderGone = typeof document !== 'undefined' && !document.getElementById('preloader');
    let startTimer: ReturnType<typeof setTimeout> | null = null;
    if (isPreloaderGone) {
      setReady(true);
    } else {
      const onPreloaderRemoved = () => setReady(true);
      window.addEventListener('preloaderFullyRemoved', onPreloaderRemoved, { once: true });
      startTimer = setTimeout(() => setReady(true), 1200);
      return () => {
        clearTimeout(timer);
        if (startTimer) clearTimeout(startTimer);
        window.removeEventListener('seasonChange', handleSeasonChange);
        window.removeEventListener('preloaderFullyRemoved', onPreloaderRemoved);
      };
    }

    return () => {
      clearTimeout(timer);
      if (startTimer) clearTimeout(startTimer);
      window.removeEventListener('seasonChange', handleSeasonChange);
    };
  }, []);

  if (!mounted || !ready) {
    return null;
  }

  // Render distinct seasonal visual effect
  return (
    <div
      key={activeSeason}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden"
    >
      {activeSeason === 'spring' && <SpringCanvas />}
      {activeSeason === 'summer' && <SummerCanvas />}
      {activeSeason === 'autumn' && <AutumnLeaves />}
      {activeSeason === 'winter' && <WinterCanvas />}
    </div>
  );
}

/**
 * Autumn (Sep – Nov):
 * Powered by 'falling-leaves' npm package with amber & burnt-orange foliage,
 * tumbling physics, natural sway, and rotation.
 * Configured with respectReducedMotion: false to guarantee full animation on any OS setting.
 */
function AutumnLeaves() {
  useEffect(() => {
    let leavesInstance: FallingLeaves | null = null;

    try {
      leavesInstance = new FallingLeaves({
        shapes: ['maple', 'oak', 'ginkgo', 'birch'],
        colors: ['#D97706', '#C2410C', '#B45309', '#EA580C', '#9A3412', '#F97316', '#E07A5F'],
        count: 30,
        opacity: 0.8,
        zIndex: 20,
        respectReducedMotion: false, // Ensures animation runs smoothly and never freezes
        autoStart: true,
        speed: [0.8, 1.8],
        wind: [-0.2, 0.8],
        sway: [0.6, 1.6],
        size: [16, 32],
      });

      // Explicitly guarantee animation loop starts immediately
      leavesInstance.start();
    } catch (err) {
      console.error('Error starting FallingLeaves:', err);
    }

    return () => {
      if (leavesInstance) {
        try {
          leavesInstance.destroy();
        } catch {}
      }
    };
  }, []);

  return null;
}

/**
 * Spring (Feb – May):
 * Soft pink cherry blossom petals and dandelion seeds drifting gently downward with horizontal wind vectors.
 */
function SpringCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number | null = null;
    let isVisible = !document.hidden;
    let lastTime = performance.now();

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        if (animId === null) animId = requestAnimationFrame(render);
      } else if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Particle pool: mix of cherry blossom petals and delicate dandelion seeds
    const count = Math.min(38, Math.max(22, Math.floor(window.innerWidth / 38)));
    const particles = Array.from({ length: count }, (_, i) => {
      const isDandelion = i % 3 === 0;
      return {
        isDandelion,
        x: Math.random() * (width + 100) - 50,
        y: Math.random() * height,
        size: isDandelion ? Math.random() * 2 + 1.8 : Math.random() * 4.5 + 4,
        speedY: isDandelion ? Math.random() * 0.6 + 0.35 : Math.random() * 0.9 + 0.6,
        windX: isDandelion ? Math.random() * 0.9 + 0.6 : Math.random() * 0.8 + 0.4, // Horizontal wind vector
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.015,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        opacity: isDandelion ? Math.random() * 0.35 + 0.45 : Math.random() * 0.35 + 0.5,
        colorIndex: i % 4,
      };
    });

    const petalColors = [
      { fill: 'rgba(244, 114, 182, ', border: 'rgba(249, 168, 212, ' }, // soft pink
      { fill: 'rgba(251, 113, 133, ', border: 'rgba(253, 164, 175, ' }, // rose blush
      { fill: 'rgba(251, 207, 232, ', border: 'rgba(244, 114, 182, ' }, // pastel petal
      { fill: 'rgba(244, 143, 177, ', border: 'rgba(248, 187, 208, ' }, // blossom
    ];

    const drawPetal = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: (typeof petalColors)[0],
      alpha: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      ctx.beginPath();
      ctx.moveTo(0, -size);
      // Delicate heart/petal curves
      ctx.bezierCurveTo(size * 0.85, -size * 0.8, size * 0.9, size * 0.5, 0, size);
      ctx.bezierCurveTo(-size * 0.9, size * 0.5, -size * 0.85, -size * 0.8, 0, -size);

      ctx.fillStyle = `${color.fill}${alpha * 0.85})`;
      ctx.fill();

      ctx.strokeStyle = `${color.border}${alpha * 0.9})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.restore();
    };

    const drawDandelion = (x: number, y: number, size: number, rotation: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Radial wisps
      ctx.strokeStyle = `rgba(226, 232, 240, ${alpha * 0.75})`;
      ctx.lineWidth = 0.75;
      for (let arm = 0; arm < 6; arm++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -size * 1.6);
        ctx.stroke();
        ctx.rotate(Math.PI / 3);
      }

      // Seed center
      ctx.fillStyle = `rgba(248, 250, 252, ${alpha * 0.95})`;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.45, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const render = (now: number) => {
      if (!isVisible) {
        animId = null;
        return;
      }
      const deltaMs = Math.min(now - lastTime, 64);
      lastTime = now;
      const timeScale = deltaMs > 0 ? deltaMs / 16.667 : 1;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.swayPhase += p.swaySpeed * timeScale;
        p.rotation += p.rotationSpeed * timeScale;

        // Downward drift + horizontal wind vector
        const sway = Math.sin(p.swayPhase) * 0.75;
        p.x += (p.windX + sway) * timeScale;
        p.y += p.speedY * timeScale;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * (width + 50) - 50;
        }
        if (p.x > width + 40) {
          p.x = -30;
        }

        if (p.isDandelion) {
          drawDandelion(p.x, p.y, p.size, p.rotation, p.opacity);
        } else {
          drawPetal(p.x, p.y, p.size, p.rotation, petalColors[p.colorIndex], p.opacity);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20 w-full h-full"
    />
  );
}

/**
 * Summer (Jun – Aug):
 * Ambient, slow-moving golden motes floating upward under a warm daylight glow.
 */
function SummerCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number | null = null;
    let isVisible = !document.hidden;
    let lastTime = performance.now();

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        if (animId === null) animId = requestAnimationFrame(render);
      } else if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Warm golden motes
    const count = Math.min(36, Math.max(20, Math.floor(window.innerWidth / 40)));
    const motes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      baseRadius: Math.random() * 2.2 + 1.6,
      speedY: -(Math.random() * 0.55 + 0.3), // Floating upward!
      speedX: (Math.random() - 0.5) * 0.35,
      glowPhase: Math.random() * Math.PI * 2,
      glowSpeed: Math.random() * 0.025 + 0.015,
      baseOpacity: Math.random() * 0.35 + 0.3,
    }));

    const render = (now: number) => {
      if (!isVisible) {
        animId = null;
        return;
      }
      const deltaMs = Math.min(now - lastTime, 64);
      lastTime = now;
      const timeScale = deltaMs > 0 ? deltaMs / 16.667 : 1;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.glowPhase += m.glowSpeed * timeScale;
        m.y += m.speedY * timeScale;
        m.x += (m.speedX + Math.sin(m.glowPhase) * 0.25) * timeScale;

        // Reached the top -> wrap around to bottom
        if (m.y < -20) {
          m.y = height + 15;
          m.x = Math.random() * width;
        }
        if (m.x < -20) m.x = width + 20;
        if (m.x > width + 20) m.x = -20;

        // Breathing daylight glow
        const pulse = Math.sin(m.glowPhase);
        const currentOpacity = Math.max(0.12, m.baseOpacity + pulse * 0.15);
        const currentRadius = Math.max(1.2, m.baseRadius + pulse * 0.5);

        // Soft outer daylight halo
        ctx.beginPath();
        ctx.arc(m.x, m.y, currentRadius + 3.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${currentOpacity * 0.22})`;
        ctx.fill();

        // Warm golden core
        ctx.beginPath();
        ctx.arc(m.x, m.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 191, 36, ${currentOpacity * 0.85})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20 w-full h-full"
    />
  );
}

/**
 * Winter (Dec – Jan):
 * Gentle, crisp falling snow particles visible on light mode backgrounds.
 */
function WinterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number | null = null;
    let isVisible = !document.hidden;
    let lastTime = performance.now();

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        if (animId === null) animId = requestAnimationFrame(render);
      } else if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Snowflake pool
    const count = Math.min(42, Math.max(24, Math.floor(window.innerWidth / 32)));
    const flakes = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.4 + 1.4,
      speedY: Math.random() * 1.1 + 0.65,
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.4 + 0.45,
      swing: Math.random() * Math.PI * 2,
      swingSpeed: Math.random() * 0.02 + 0.012,
      isCrystal: i % 4 === 0,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.025,
    }));

    const drawCrystal = (x: number, y: number, size: number, rot: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.strokeStyle = `rgba(96, 165, 250, ${alpha * 0.75})`;
      ctx.lineWidth = 1.1;
      ctx.lineCap = 'round';

      ctx.beginPath();
      for (let arm = 0; arm < 6; arm++) {
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -size);
        ctx.moveTo(0, -size * 0.55);
        ctx.lineTo(-size * 0.35, -size * 0.8);
        ctx.moveTo(0, -size * 0.55);
        ctx.lineTo(size * 0.35, -size * 0.8);
        ctx.rotate(Math.PI / 3);
      }
      ctx.stroke();

      ctx.fillStyle = `rgba(240, 248, 255, ${alpha * 0.95})`;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const render = (now: number) => {
      if (!isVisible) {
        animId = null;
        return;
      }
      const deltaMs = Math.min(now - lastTime, 64);
      lastTime = now;
      const timeScale = deltaMs > 0 ? deltaMs / 16.667 : 1;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.swing += f.swingSpeed * timeScale;
        f.rotation += f.rotationSpeed * timeScale;
        f.x += (f.speedX + Math.sin(f.swing) * 0.5) * timeScale;
        f.y += f.speedY * timeScale;

        if (f.y > height + 10) {
          f.y = -10;
          f.x = Math.random() * width;
        }
        if (f.x > width + 10) f.x = -10;
        if (f.x < -10) f.x = width + 10;

        if (f.isCrystal) {
          drawCrystal(f.x, f.y, f.radius * 2.2, f.rotation, f.opacity);
        } else {
          // Soft frosty blue outer rim for light mode visibility
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius + 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(147, 197, 253, ${f.opacity * 0.32})`;
          ctx.fill();

          // Crisp inner snowflake core
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(224, 242, 254, ${f.opacity * 0.9})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20 w-full h-full"
    />
  );
}
