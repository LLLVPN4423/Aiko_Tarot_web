import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import { Providers } from "@/components/Providers";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: {
    default: "Celestial Cat Tarot",
    template: "%s · Celestial Cat Tarot",
  },
  description:
    "Premium online Celestial Cat Tarot — 72-card deck, immersive reading room, bilingual VI/EN.",
  openGraph: {
    title: "Celestial Cat Tarot",
    description: "Mystical pet tarot — 22 Major Arcana in the stars.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#080910",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${cinzel.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-full flex flex-col font-sans text-slate-300">
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
