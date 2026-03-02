import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: 'SHOPNOVA | Gear Up',
  description: 'Equip the latest tech. Dominate the digital realm.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans flex flex-col min-h-screen bg-[var(--gaming-bg)] text-white antialiased`}>
        <Providers>
          <Navbar />
          <main className="flex-grow pt-[100px]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
