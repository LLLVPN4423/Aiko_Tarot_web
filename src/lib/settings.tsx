"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type DeckMode = "major" | "full";

export type AppSettings = {
  reversedEnabled: boolean;
  reversedChance: number;
  reduceMotion: boolean;
  deckMode: DeckMode;
  onboardingDone: boolean;
};

const STORAGE_KEY = "celestial-cat-settings-v1";

const defaults: AppSettings = {
  reversedEnabled: true,
  reversedChance: 0.35,
  reduceMotion: false,
  deckMode: "major",
  onboardingDone: false,
};

type SettingsContextValue = AppSettings & {
  updateSettings: (patch: Partial<AppSettings>) => void;
  resetSettings: () => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaults);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings({ ...defaults, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((next: AppSettings) => {
    setSettings(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const updateSettings = useCallback((patch: Partial<AppSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const resetSettings = useCallback(() => persist(defaults), [persist]);

  const value = useMemo(
    () => ({ ...settings, updateSettings, resetSettings }),
    [settings, updateSettings, resetSettings],
  );

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
