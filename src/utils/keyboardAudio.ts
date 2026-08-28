// High-fidelity Mechanical Keyboard Sound Engine (inspired by x0054/MKS)
// Recreates authentic Cherry MX switch acoustics (click mechanism + bottom-out snap) using Web Audio API

class MechanicalSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  // Play realistic Cherry MX switch click & housing bottom-out sound
  public playKeySound(isSpace = false, isBackspace = false) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Micro-pitch variance for natural keystroke feel
    const pitchMod = (Math.random() - 0.5) * 0.09;

    // 1. Switch Click Leaf (High Frequency Metallic Click)
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    const clickFilter = ctx.createBiquadFilter();

    clickOsc.type = 'triangle';
    const baseClickFreq = isSpace ? 1900 : isBackspace ? 2100 : 2500;
    clickOsc.frequency.setValueAtTime(baseClickFreq * (1 + pitchMod), now);
    clickOsc.frequency.exponentialRampToValueAtTime(320, now + 0.018);

    clickFilter.type = 'bandpass';
    clickFilter.frequency.setValueAtTime(baseClickFreq, now);
    clickFilter.Q.setValueAtTime(4.5, now);

    clickGain.gain.setValueAtTime(0.22, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.024);

    clickOsc.connect(clickFilter);
    clickFilter.connect(clickGain);
    clickGain.connect(ctx.destination);

    clickOsc.start(now);
    clickOsc.stop(now + 0.028);

    // 2. Housing Bottom-Out & Keycap Clack (Mid/Low Acoustic Resonance)
    const clackOsc = ctx.createOscillator();
    const clackGain = ctx.createGain();
    const clackFilter = ctx.createBiquadFilter();

    clackOsc.type = 'sine';
    const baseClackFreq = isSpace ? 150 : isBackspace ? 220 : 310;
    clackOsc.frequency.setValueAtTime(baseClackFreq * (1 + pitchMod), now + 0.004);
    clackOsc.frequency.exponentialRampToValueAtTime(60, now + 0.045);

    clackFilter.type = 'lowpass';
    clackFilter.frequency.setValueAtTime(isSpace ? 480 : 750, now);
    clackFilter.Q.setValueAtTime(2.0, now);

    clackGain.gain.setValueAtTime(0, now);
    clackGain.gain.setValueAtTime(isSpace ? 0.28 : 0.20, now + 0.004);
    clackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    clackOsc.connect(clackFilter);
    clackFilter.connect(clackGain);
    clackGain.connect(ctx.destination);

    clackOsc.start(now + 0.004);
    clackOsc.stop(now + 0.055);
  }
}

export const keyboardAudio = new MechanicalSoundEngine();