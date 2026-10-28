// Procedural Web Audio API sound engine - Harry Potter enchanted celesta soundscape
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
      this.playHedwigOpening();
    }
    return this.enabled;
  }

  // Celesta chime note with warm bell harmonic
  private playCelestaNote(freq: number, duration: number, timeOffset: number) {
    if (!this.ctx) return;
    setTimeout(() => {
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const oscHarmonic = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        oscHarmonic.type = 'triangle';

        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        oscHarmonic.frequency.setValueAtTime(freq * 2.01, this.ctx.currentTime); // gentle bell overtone

        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0005, this.ctx.currentTime + duration);

        osc.connect(gain);
        oscHarmonic.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        oscHarmonic.start();
        osc.stop(this.ctx.currentTime + duration);
        oscHarmonic.stop(this.ctx.currentTime + duration);
      } catch {
        // ignore
      }
    }, timeOffset);
  }

  public playClick() {
    if (!this.enabled) return;
    this.init();
    this.playCelestaNote(880, 0.25, 0);
  }

  // Plays Hedwig's theme iconic opening motif!
  public playHedwigOpening() {
    this.init();
    if (!this.ctx) return;

    const hedwigNotes = [
      { f: 493.88, d: 0.5, t: 0 },    // B4
      { f: 659.25, d: 0.7, t: 450 },  // E5
      { f: 783.99, d: 0.35, t: 1100 },// G5
      { f: 739.99, d: 0.35, t: 1450 },// F#5
      { f: 659.25, d: 0.75, t: 1800 },// E5
      { f: 987.77, d: 0.5, t: 2500 }, // B5
      { f: 880.00, d: 1.1, t: 3000 }, // A5
      { f: 739.99, d: 1.1, t: 4000 }, // F#5
    ];

    hedwigNotes.forEach((n) => {
      this.playCelestaNote(n.f, n.d, n.t);
    });
  }

  public playGrandMagicChime() {
    this.init();
    if (!this.ctx) return;

    // Golden Snitch arrival / celebratory chime
    const chords = [
      { f: 523.25, d: 1.5, t: 0 },
      { f: 659.25, d: 1.5, t: 120 },
      { f: 783.99, d: 1.8, t: 240 },
      { f: 1046.50, d: 2.2, t: 360 },
      { f: 1318.51, d: 2.5, t: 480 },
    ];
    chords.forEach(c => this.playCelestaNote(c.f, c.d, c.t));
  }
}

export const sound = new SoundEngine();
