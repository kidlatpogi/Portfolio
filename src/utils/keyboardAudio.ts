// High-fidelity synthetic mechanical keyboard audio generator via Web Audio API
export type SwitchType = 'clicky' | 'linear' | 'tactile' | 'thock' | 'mute';

class MechanicalSoundEngine {
  private ctx: AudioContext | null = null;
  private currentSwitch: SwitchType = 'thock';

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

  public setSwitch(type: SwitchType) {
    this.currentSwitch = type;
  }

  public getSwitch(): SwitchType {
    return this.currentSwitch;
  }

  public playKeySound(isSpace = false) {
    if (this.currentSwitch === 'mute') return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Pitch randomization for hyper-realistic variation
    const pitchMod = (Math.random() - 0.5) * 0.08;

    switch (this.currentSwitch) {
      case 'clicky': {
        // High-pitched click + switch housing bottom out
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime((isSpace ? 1800 : 2600) * (1 + pitchMod), now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.025);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(2200, now);
        filter.Q.setValueAtTime(4.0, now);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }

      case 'linear': {
        // Smooth soft clack
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime((isSpace ? 280 : 380) * (1 + pitchMod), now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.04);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);

        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }

      case 'tactile': {
        // Subtle bump and mid clack
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime((isSpace ? 420 : 650) * (1 + pitchMod), now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.035);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1100, now);
        filter.Q.setValueAtTime(2.0, now);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.045);
        break;
      }

      case 'thock':
      default: {
        // Deep, creamy, resonant mechanical thock
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime((isSpace ? 160 : 220) * (1 + pitchMod), now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.06);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now);
        filter.Q.setValueAtTime(1.5, now);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }
    }
  }
}

export const keyboardAudio = new MechanicalSoundEngine();