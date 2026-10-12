import { CosmicBackground } from "@/components/CosmicBackground";
import { PetTarotApp } from "@/components/PetTarotApp";
import { AudioProvider } from "@/lib/audio";
import { I18nProvider } from "@/lib/i18n";

export default function Home() {
  return (
    <I18nProvider>
      <AudioProvider>
        <CosmicBackground />
        <PetTarotApp />
      </AudioProvider>
    </I18nProvider>
  );
}
