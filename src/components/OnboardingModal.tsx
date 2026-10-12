"use client";

import { useI18n } from "@/lib/i18n";
import { useSettings } from "@/lib/settings";
import { GlassPanel } from "./GlassPanel";

export function OnboardingModal() {
  const { t } = useI18n();
  const { onboardingDone, updateSettings } = useSettings();

  if (onboardingDone) return null;

  const steps = [
    t(
      "Chọn kiểu trải bài và chủ đề, rồi vào bàn xem bài.",
      "Pick a spread and topic, then enter the reading table.",
    ),
    t(
      "Xào bài và chọn từng lá úp trên bộ bài.",
      "Shuffle and pick face-down cards from the deck.",
    ),
    t(
      "Chạm lá để lật, chạm lần nữa để phóng to; lưu nhật ký hoặc xuất ảnh.",
      "Tap to flip, tap again to zoom; save to journal or export PNG.",
    ),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" />
      <GlassPanel className="relative z-10 max-w-md">
        <h2 className="font-serif text-xl text-amber-100">
          {t("Chào bạn đến Celestial Cat Tarot", "Welcome to Celestial Cat Tarot")}
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-300">
          {steps.map((step) => (
            <li key={step.slice(0, 24)}>{step}</li>
          ))}
        </ol>
        <button
          type="button"
          onClick={() => updateSettings({ onboardingDone: true })}
          className="mt-6 w-full rounded-full bg-cyan-600/80 py-2 text-sm font-semibold text-white"
        >
          {t("Bắt đầu", "Get started")}
        </button>
      </GlassPanel>
    </div>
  );
}
