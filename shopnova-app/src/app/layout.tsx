import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'ShopNova - Modern E-Commerce',
  description: 'Your one-stop shop for everything you need with a premium experience.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-white text-black`}>
        <Providers>
          <Navbar />
          <main className="flex-grow pt-[140px] md:pt-[130px]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
