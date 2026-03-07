import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";
import GamificationOverlays from "@/components/gamification/GamificationOverlays";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: 'SHOPNOVA | Level Up Your Shopping',
  description: 'A gamified e-commerce experience. Earn XP, unlock badges, complete missions, and dominate the leaderboard.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} font-sans flex flex-col min-h-screen bg-[var(--deep-space)] text-slate-200 antialiased`}>
        <Providers>
          <Navbar />
          <main className="flex-grow pt-[100px]">
            {children}
          </main>
          <Footer />
          <GamificationOverlays />
        </Providers>
      </body>
    </html>
  );
}
