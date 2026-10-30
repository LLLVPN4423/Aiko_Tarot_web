"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
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

type SettingsListener = () => void;
const settingsListeners = new Set<SettingsListener>();

/** Cached snapshot — getSnapshot must return stable refs between notifications. */
let cachedSettings: AppSettings = defaults;
let cacheHydrated = false;

function subscribeSettings(listener: SettingsListener) {
  settingsListeners.add(listener);
  return () => {
    settingsListeners.delete(listener);
  };
}

function notifySettingsListeners() {
  settingsListeners.forEach((listener) => listener());
}

function parseSettings(raw: string | null): AppSettings {
  if (!raw) return defaults;
  try {
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return defaults;
  }
}

function readSettingsFromStorage(): AppSettings {
  if (typeof window === "undefined") return defaults;
  if (!cacheHydrated) {
    cachedSettings = parseSettings(localStorage.getItem(STORAGE_KEY));
    cacheHydrated = true;
  }
  return cachedSettings;
}

function writeSettings(next: AppSettings) {
  cachedSettings = next;
  cacheHydrated = true;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  notifySettingsListeners();
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const settings = useSyncExternalStore(
    subscribeSettings,
    readSettingsFromStorage,
    () => defaults,
  );

  const updateSettings = useCallback((patch: Partial<AppSettings>) => {
    writeSettings({ ...readSettingsFromStorage(), ...patch });
  }, []);

  const resetSettings = useCallback(() => {
    writeSettings(defaults);
  }, []);

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
