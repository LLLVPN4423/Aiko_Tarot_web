"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "pet-tarot-audio-muted";

const PATHS = {
  bgm: "/assets/audio/mystic-bgm.mp3",
  hover: "/assets/audio/hover.mp3",
  flip: "/assets/audio/flip.mp3",
} as const;

type AudioContextValue = {
  muted: boolean;
  toggleMute: () => void;
  playHover: () => void;
  playFlip: () => void;
  unlockAudio: () => void;
};

const AudioCtx = createContext<AudioContextValue | null>(null);

function useWebAudioFallback() {
  const ctxRef = useRef<AudioContext | null>(null);
  const bgmNodesRef = useRef<OscillatorNode[]>([]);
  const bgmGainRef = useRef<GainNode | null>(null);

  const ensureCtx = () => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  };

  const startBgmFallback = useCallback(() => {
    const ctx = ensureCtx();
    if (!ctx || bgmNodesRef.current.length) return;
    const master = ctx.createGain();
    master.gain.value = 0.04;
    master.connect(ctx.destination);
    bgmGainRef.current = master;
    const freqs = [55, 82.5, 110];
    for (const f of freqs) {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.15;
      osc.connect(g);
      g.connect(master);
      osc.start();
      bgmNodesRef.current.push(osc);
    }
  }, []);

  const stopBgmFallback = useCallback(() => {
    bgmNodesRef.current.forEach((o) => {
      try {
        o.stop();
      } catch {
        /* already stopped */
      }
    });
    bgmNodesRef.current = [];
    void ctxRef.current?.close();
    ctxRef.current = null;
  }, []);

  const playTone = useCallback((freq: number, duration: number, vol = 0.08) => {
    const ctx = ensureCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    osc.type = "triangle";
    gain.gain.value = vol;
    osc.connect(gain);
    gain.connect(ctx.destination);
    const t = ctx.currentTime;
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    osc.start(t);
    osc.stop(t + duration);
  }, []);

  return { startBgmFallback, stopBgmFallback, playTone, ensureCtx };
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const hoverRef = useRef<HTMLAudioElement | null>(null);
  const flipRef = useRef<HTMLAudioElement | null>(null);
  const bgmOkRef = useRef(false);
  const fallback = useWebAudioFallback();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "0") setMuted(false);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const bgm = new Audio(PATHS.bgm);
    bgm.loop = true;
    bgm.volume = 0.35;
    bgm.addEventListener("canplaythrough", () => {
      bgmOkRef.current = true;
    });
    bgm.addEventListener("error", () => {
      bgmOkRef.current = false;
    });
    bgmRef.current = bgm;
    hoverRef.current = new Audio(PATHS.hover);
    hoverRef.current.volume = 0.45;
    flipRef.current = new Audio(PATHS.flip);
    flipRef.current.volume = 0.55;
    return () => {
      bgm.pause();
      fallback.stopBgmFallback();
    };
  }, [fallback]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, muted ? "1" : "0");
    } catch {
      /* ignore */
    }
    if (!unlocked) return;

    if (muted) {
      bgmRef.current?.pause();
      fallback.stopBgmFallback();
      return;
    }

    fallback.ensureCtx()?.resume();

    if (bgmOkRef.current && bgmRef.current) {
      bgmRef.current.play().catch(() => {
        fallback.startBgmFallback();
      });
    } else {
      fallback.startBgmFallback();
    }
  }, [muted, unlocked, fallback]);

  const unlockAudio = useCallback(() => {
    setUnlocked(true);
    fallback.ensureCtx()?.resume();
  }, [fallback]);

  const playOneShot = (
    ref: React.RefObject<HTMLAudioElement | null>,
    fallbackFreq: number,
  ) => {
    if (muted || !unlocked) return;
    const el = ref.current;
    if (el) {
      el.currentTime = 0;
      el.play().catch(() => fallback.playTone(fallbackFreq, 0.12, 0.06));
    } else {
      fallback.playTone(fallbackFreq, 0.12, 0.06);
    }
  };

  const toggleMute = useCallback(() => {
    setUnlocked(true);
    setMuted((m) => !m);
  }, []);

  const playHover = useCallback(
    () => playOneShot(hoverRef, 520),
    [muted, unlocked],
  );
  const playFlip = useCallback(
    () => playOneShot(flipRef, 280),
    [muted, unlocked],
  );

  const value = useMemo(
    () => ({
      muted,
      toggleMute,
      playHover,
      playFlip,
      unlockAudio,
    }),
    [muted, toggleMute, playHover, playFlip, unlockAudio],
  );

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}
