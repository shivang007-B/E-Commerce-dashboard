"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { GamifiedProductCard } from "@/components/ui/GamifiedProductCard";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Failed to load products:", data);
          setProducts([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen px-6 py-6 container mx-auto">
      {/* Hero Section */}
      <section className="mb-16 mt-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-6xl font-black uppercase italic tracking-tighter md:text-8xl">
          LEVEL UP YOUR <span className="gaming-gradient-text">GEAR</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-mono text-sm uppercase tracking-widest text-zinc-400">
          Equip the latest tech. Dominate the digital realm.
        </p>
      </section>

      {/* Feature Bento Grid */}
      <FeatureGrid />

      {/* Product Grid Section */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1.5 h-8 bg-[var(--neon-cyan)] shadow-[0_0_15px_var(--neon-cyan)]"></div>
          <h2 className="text-2xl font-bold tracking-widest uppercase italic text-white flex items-center gap-3">
            Available <span className="gaming-gradient-text">Loot</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {loading ? (
            <div className="col-span-full py-20 text-center">
              <div className="inline-block w-12 h-12 border-4 border-[var(--neon-cyan)] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_var(--neon-cyan)]"></div>
              <p className="mt-4 font-mono text-zinc-400 uppercase tracking-widest text-sm animate-pulse">Scanning database...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="col-span-full py-20 text-center border border-white/5 rounded-2xl bg-black/40">
              <p className="font-mono text-zinc-400 uppercase tracking-widest text-sm">No items found in the armory.</p>
            </div>
          ) : (
            products.map((product) => (
              <GamifiedProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
