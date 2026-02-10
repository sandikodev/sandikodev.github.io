export class SoundState {
  audioContext: AudioContext | null = null;
  enabled = $state(false);
  sounds = new Map<string, () => void>();
  volume = $state(0.3);

  constructor() {
    if (typeof window !== "undefined") {
      this.enabled = localStorage.getItem("sound-enabled") === "true";
      this.volume = parseFloat(localStorage.getItem("sound-volume") || "0.3");
    }
  }

  generateSounds() {
    if (!this.audioContext) return;

    // Keyboard click
    this.sounds.set("keyboard", () => {
      const ctx = this.audioContext!;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(this.volume * 0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    });

    // Beep
    this.sounds.set("beep", () => {
      const ctx = this.audioContext!;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.setValueAtTime(1000, ctx.currentTime);
      gain.gain.setValueAtTime(this.volume * 0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    });

    // Startup
    this.sounds.set("startup", () => {
      const ctx = this.audioContext!;
      const freqs = [440, 554, 659, 880];
      freqs.forEach((f, i) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.frequency.setValueAtTime(f, ctx.currentTime);
          gain.gain.setValueAtTime(this.volume * 0.1, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.3);
        }, i * 100);
      });
    });
  }

  init() {
    if (typeof window === "undefined") return;

    // Lazy load AudioContext
    const initAudio = () => {
      if (!this.audioContext) {
        this.audioContext = new (
          window.AudioContext || (window as any).webkitAudioContext
        )();
        this.generateSounds();
      }
    };

    document.addEventListener("click", initAudio, { once: true });
    document.addEventListener("keydown", initAudio, { once: true });
  }

  play(name: string) {
    if (!this.enabled || !this.sounds.has(name)) return;
    try {
      this.sounds.get(name)!();
    } catch (e) {
      console.warn("Sound error:", e);
    }
  }

  setVolume(v: number) {
    this.volume = Math.max(0, Math.min(1, v));
    localStorage.setItem("sound-volume", String(this.volume));
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem("sound-enabled", String(this.enabled));
    if (this.enabled) this.play("beep");
  }
}

export const soundState = new SoundState();
