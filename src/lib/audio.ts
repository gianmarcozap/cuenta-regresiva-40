// Procedural Web Audio API sound engine - no external mp3 or network dependencies needed
class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = false;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.init();
      this.playChime();
    }
    return this.enabled;
  }

  public playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // AudioContext safe fail
    }
  }

  public playChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx) return;
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.35);
        } catch {
          // ignore
        }
      }, idx * 80);
    });
  }

  public playFanfare() {
    this.init();
    if (!this.ctx) return;

    // Harmonized brass fanfare
    const fanfareNotes = [
      { f: 523.25, d: 0.18, t: 0 },
      { f: 523.25, d: 0.18, t: 160 },
      { f: 523.25, d: 0.18, t: 320 },
      { f: 659.25, d: 0.35, t: 480 },
      { f: 783.99, d: 0.5, t: 780 },
      { f: 659.25, d: 0.2, t: 1100 },
      { f: 1046.50, d: 1.2, t: 1300 },
    ];

    fanfareNotes.forEach((n) => {
      setTimeout(() => {
        if (!this.ctx) return;
        try {
          const osc = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc2.type = 'sawtooth';

          osc.frequency.setValueAtTime(n.f, this.ctx.currentTime);
          osc2.frequency.setValueAtTime(n.f * 1.002, this.ctx.currentTime); // Chorus micro-detune

          gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + n.d);

          osc.connect(gain);
          osc2.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start();
          osc2.start();
          osc.stop(this.ctx.currentTime + n.d);
          osc2.stop(this.ctx.currentTime + n.d);
        } catch {
          // ignore
        }
      }, n.t);
    });
  }
}

export const sound = new SoundEngine();
