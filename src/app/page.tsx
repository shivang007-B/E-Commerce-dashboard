"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { GamifiedProductCard } from "@/components/ui/GamifiedProductCard";
import { useGamificationStore } from "@/store/useGamificationStore";
import { getXPProgress, getXPForNextLevel } from "@/lib/gamification";
import { ChevronRight, Zap, Target } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { xp, level, tier, points, activeMissions } = useGamificationStore();
  const [isClient, setIsClient] = useState(false);
  const { percent } = getXPProgress(xp);

  useEffect(() => {
    setIsClient(true);
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data);
        else setProducts([]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const incompleteMissions = activeMissions?.filter(m => !m.completed) || [];

  return (
    <main className="min-h-screen px-6 py-6 max-w-[1280px] mx-auto">
      {/* Hero */}
      <section className="mb-16 mt-8 text-center relative">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.h1
          className="text-6xl font-black uppercase tracking-tight md:text-8xl relative z-10"
          style={{ fontFamily: "var(--font-display)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          LEVEL UP YOUR <span className="gaming-gradient-text">GAME</span>
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-sm tracking-wider text-slate-500 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Shop. Earn XP. Unlock Rewards. Dominate the Leaderboard.
        </motion.p>

        {/* XP Status */}
        {isClient && (
          <motion.div
            className="max-w-lg mx-auto mt-8 p-5 rounded-3xl glass relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-500/20">
                  {level}
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white">Level {level} • {tier}</p>
                  <p className="text-[10px] text-slate-500 font-mono">{getXPForNextLevel(level) - xp} XP to next level</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-yellow-400">💎 {points}</p>
                <p className="text-[10px] text-slate-500">Points</p>
              </div>
            </div>
            <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-500"
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ boxShadow: "0 0 15px rgba(99,102,241,0.4)" }}
              />
            </div>
          </motion.div>
        )}
      </section>

      {/* Mission Spotlight */}
      {isClient && incompleteMissions.length > 0 && (
        <motion.section
          className="mb-12 p-6 rounded-3xl glass gradient-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 25 }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-2xl animate-float">
                {incompleteMissions[0].icon}
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-fuchsia-400 mb-1 flex items-center gap-1">
                  <Target size={10} /> Active Mission
                </p>
                <h3 className="text-lg font-bold text-white">{incompleteMissions[0].title}</h3>
                <p className="text-xs text-slate-500">{incompleteMissions[0].description}</p>
              </div>
            </div>
            <Link
              href="/rewards"
              className="btn-ghost px-6 py-2.5 text-xs flex items-center gap-2"
            >
              View All <ChevronRight size={14} />
            </Link>
          </div>
        </motion.section>
      )}

      {/* Feature Bento Grid */}
      <FeatureGrid />

      {/* Products */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1.5 h-8 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/30"></div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3" style={{ fontFamily: "var(--font-display)" }}>
            Available <span className="gaming-gradient-text">Loot</span>
          </h2>
          <div className="ml-auto text-[10px] font-mono text-slate-500 flex items-center gap-2">
            <Zap size={12} className="text-indigo-400" /> Earn XP on every purchase
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {loading ? (
            <div className="col-span-full py-20 text-center">
              <div className="inline-block w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin shadow-lg shadow-indigo-500/20"></div>
              <p className="mt-4 text-slate-500 text-sm animate-pulse">Scanning database...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="col-span-full py-20 text-center glass rounded-3xl">
              <p className="text-slate-500 text-sm">No items found in the armory.</p>
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
