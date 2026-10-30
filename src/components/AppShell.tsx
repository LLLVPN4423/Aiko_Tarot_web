"use client";

import { useState, type ReactNode } from "react";
import { CosmicBackground } from "./CosmicBackground";
import { OnboardingModal } from "./OnboardingModal";
import { SettingsDrawer } from "./SettingsDrawer";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

export function AppShell({ children }: { children: ReactNode }) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <CosmicBackground />
      <SiteNav onOpenSettings={() => setSettingsOpen(true)} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <OnboardingModal />
      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
