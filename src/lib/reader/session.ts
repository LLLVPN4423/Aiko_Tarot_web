import type { ReadingResult } from "./types";

const KEY = "celestial-reading-session-v1";

export type FollowUpTurn = {
  id: string;
  at: string;
  prompt: string;
  answer: { vi: string; en: string };
};

export type ReadingSession = {
  readingId: string;
  createdAt: string;
  updatedAt: string;
  result: ReadingResult;
  followUps: FollowUpTurn[];
};

function canUseStorage() {
  return typeof window !== "undefined" && !!window.localStorage;
}

export function saveReadingSession(result: ReadingResult): ReadingSession {
  const now = new Date().toISOString();
  const session: ReadingSession = {
    readingId: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    result,
    followUps: [],
  };
  if (canUseStorage()) {
    localStorage.setItem(KEY, JSON.stringify(session));
  }
  return session;
}

export function loadReadingSession(): ReadingSession | null {
  if (!canUseStorage()) return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ReadingSession;
  } catch {
    return null;
  }
}

export function updateReadingSession(session: ReadingSession): void {
  if (!canUseStorage()) return;
  session.updatedAt = new Date().toISOString();
  localStorage.setItem(KEY, JSON.stringify(session));
}

export function clearFollowUps(session: ReadingSession): ReadingSession {
  const next = { ...session, followUps: [], updatedAt: new Date().toISOString() };
  updateReadingSession(next);
  return next;
}

export function clearReadingSession(): void {
  if (!canUseStorage()) return;
  localStorage.removeItem(KEY);
}
