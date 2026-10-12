"use client";

import type { ReactNode } from "react";
import { AudioProvider } from "@/lib/audio";
import { I18nProvider } from "@/lib/i18n";
import { SettingsProvider } from "@/lib/settings";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <SettingsProvider>
        <AudioProvider>{children}</AudioProvider>
      </SettingsProvider>
    </I18nProvider>
  );
}
