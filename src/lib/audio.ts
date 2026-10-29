// Audio Engine: Background Harry Potter Prologue at 1.25x speed + Magical Chimes
class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgm: HTMLAudioElement | null = null;
  public enabled: boolean = true;

  private initAudio() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (!this.bgm) {
      this.bgm = new Audio('/audio/Prologue.mp3');
      this.bgm.loop = true;
      this.bgm.playbackRate = 1.25; // 1.25x speed requested by user
      this.bgm.volume = 0.6;
    }
  }

  public playBgm() {
    this.initAudio();
    if (this.bgm) {
      this.bgm.playbackRate = 1.25;
      if (this.bgm.paused) {
        this.bgm.play().catch(() => {
          // Autoplay policy: will resume on first user interaction
        });
      }
    }
  }

  public pauseBgm() {
    if (this.bgm) {
      this.bgm.pause();
    }
  }

  public toggle(): boolean {
    this.initAudio();
    this.enabled = !this.enabled;

    if (this.enabled) {
      this.playBgm();
      this.playGrandMagicChime();
    } else {
      this.pauseBgm();
    }
    return this.enabled;
  }

  private playCelestaNote(freq: number, duration: number, timeOffset: number) {
    if (!this.ctx) return;
    setTimeout(() => {
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0005, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch {
        // ignore
      }
    }, timeOffset);
  }

  public playClick() {
    this.initAudio();
    this.playCelestaNote(880, 0.2, 0);
  }

  public playGrandMagicChime() {
    this.initAudio();
    if (!this.ctx) return;
    const chords = [523.25, 659.25, 783.99, 1046.50];
    chords.forEach((freq, idx) => this.playCelestaNote(freq, 1.2, idx * 90));
  }
}

export const sound = new SoundEngine();
