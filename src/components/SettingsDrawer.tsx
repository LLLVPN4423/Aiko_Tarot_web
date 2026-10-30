"use client";

import { useI18n } from "@/lib/i18n";
import { useSettings } from "@/lib/settings";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function SettingsDrawer({ open, onClose }: Props) {
  const { t } = useI18n();
  const s = useSettings();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-label={t("Đóng", "Close")}
      />
      <aside className="glass-panel relative h-full w-full max-w-sm overflow-y-auto border-l border-cyan-400/20 p-6">
        <h2 className="font-serif text-lg text-amber-100">
          {t("Cài đặt", "Settings")}
        </h2>
        <label className="mt-6 flex items-center justify-between gap-4 text-sm">
          <span>{t("Lá ngược", "Reversed cards")}</span>
          <input
            type="checkbox"
            checked={s.reversedEnabled}
            onChange={(e) => s.updateSettings({ reversedEnabled: e.target.checked })}
          />
        </label>
        {s.reversedEnabled && (
          <label className="mt-4 block text-sm">
            <span>{t("Tỉ lệ ngược", "Reversed chance")}: {Math.round(s.reversedChance * 100)}%</span>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(s.reversedChance * 100)}
              onChange={(e) =>
                s.updateSettings({ reversedChance: Number(e.target.value) / 100 })
              }
              className="mt-2 w-full"
            />
          </label>
        )}
        <label className="mt-4 flex items-center justify-between gap-4 text-sm">
          <span>{t("Giảm chuyển động", "Reduce motion")}</span>
          <input
            type="checkbox"
            checked={s.reduceMotion}
            onChange={(e) => s.updateSettings({ reduceMotion: e.target.checked })}
          />
        </label>
        <label className="mt-4 block text-sm">
          <span>{t("Bộ bài", "Deck")}</span>
          <select
            className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
            value={s.deckMode}
            onChange={(e) =>
              s.updateSettings({
                deckMode: e.target.value === "full" ? "full" : "major",
              })
            }
          >
            <option value="major">
              {t("Major Arcana (22)", "Major Arcana (22)")}
            </option>
            <option value="full">
              {t("Đầy đủ 72 lá", "Full 72-card deck")}
            </option>
          </select>
        </label>
        <button
          type="button"
          onClick={() => s.updateSettings({ onboardingDone: false })}
          className="mt-8 text-xs text-[var(--color-antique-gold)] underline"
        >
          {t("Xem lại hướng dẫn", "Replay onboarding")}
        </button>
      </aside>
    </div>
  );
}
