import React from 'react';
import Link from 'next/link';

export const FeatureGrid = () => (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 lg:p-8 rounded-[32px] glass mb-16">
        {/* Hero Feature */}
        <div className="md:col-span-2 md:row-span-2 rounded-3xl p-8 glass relative overflow-hidden group gradient-border">
            <p className="text-fuchsia-400 text-xs uppercase tracking-widest mb-3 z-10 relative font-medium">🎮 Gamified Shopping</p>
            <h2 className="text-4xl md:text-5xl font-black text-white z-10 relative tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                PLAY. SHOP.<br />
                <span className="gaming-gradient-text">LEVEL UP.</span>
            </h2>
            <p className="text-slate-400 text-sm mt-4 z-10 relative leading-relaxed">
                Every purchase earns XP. Climb the ranks from Rookie to Elite. Unlock exclusive rewards along the way.
            </p>

            <Link href="/rewards" className="mt-8 relative z-10 inline-block btn-magnetic px-6 py-3 text-xs">
                Enter Rewards Hub →
            </Link>

            <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500 opacity-10 blur-[120px] rounded-full transition-transform duration-700 group-hover:scale-150" />
        </div>

        {/* Spin & Win */}
        <Link href="/rewards#spin" className="rounded-3xl p-6 glass relative overflow-hidden group hover:border-sky-500/20 transition-all">
            <div className="text-3xl mb-2 animate-float">🎡</div>
            <p className="text-sky-400 text-xs uppercase tracking-widest mb-2 font-medium">Spin & Win</p>
            <h3 className="text-lg font-bold text-white tracking-tight">Daily Wheel</h3>
            <p className="text-[10px] text-slate-500 mt-1">Win XP, discounts & more</p>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-sky-500 opacity-5 blur-2xl rounded-full transition-transform duration-500 group-hover:scale-150" />
        </Link>

        {/* Leaderboard */}
        <Link href="/rewards#leaderboard" className="rounded-3xl p-6 glass relative overflow-hidden group hover:border-fuchsia-500/20 transition-all">
            <div className="text-3xl mb-2">🏆</div>
            <p className="text-fuchsia-400 text-xs uppercase tracking-widest mb-2 font-medium">Compete</p>
            <h3 className="text-lg font-bold text-white tracking-tight">Leaderboard</h3>
            <p className="text-[10px] text-slate-500 mt-1">Climb the ranks</p>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-fuchsia-500 opacity-5 blur-2xl rounded-full transition-transform duration-500 group-hover:scale-150" />
        </Link>

        {/* Missions Banner */}
        <div className="md:col-span-2 rounded-3xl p-6 glass relative overflow-hidden flex items-center justify-between group">
            <div>
                <p className="text-yellow-400 text-xs uppercase tracking-widest mb-2 font-medium">🎯 Weekly Missions</p>
                <h3 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                    Complete Quests. Earn Badges.
                </h3>
                <p className="text-xs text-slate-500 mt-1">New challenges every week</p>
            </div>
            <div className="flex gap-2">
                {["🎯", "🔥", "👑"].map((emoji, i) => (
                    <div key={i} className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-xl animate-float" style={{ animationDelay: `${i * 0.2}s` }}>
                        {emoji}
                    </div>
                ))}
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-yellow-400 opacity-5 blur-[80px] rounded-full" />
        </div>
    </section>
);
