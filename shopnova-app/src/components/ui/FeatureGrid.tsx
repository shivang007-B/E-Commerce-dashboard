import React from 'react';

export const FeatureGrid = () => (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 lg:p-8 bg-black/40 rounded-3xl border border-white/10 mb-16">
        {/* Large Hero Feature */}
        <div className="md:col-span-2 md:row-span-2 bg-zinc-900 rounded-3xl p-8 border border-white/5 relative overflow-hidden group">
            <h2 className="text-4xl md:text-5xl font-black text-white z-10 relative italic tracking-tighter">NEW LOOT DROPPED</h2>
            <p className="text-zinc-400 font-mono text-sm mt-4 z-10 relative">Upgrade your battle station with next-gen peripherals engineered for ultimate performance and zero latency.</p>

            <button className="mt-8 rounded-sm relative z-10 border border-[var(--neon-pink)] px-6 py-2 text-xs font-black uppercase tracking-widest text-[var(--neon-pink)] hover:bg-[var(--neon-pink)] hover:text-white transition-all duration-300">
                Commence Raid
            </button>

            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--neon-pink)] opacity-20 blur-[100px] rounded-full transition-transform duration-700 group-hover:scale-150" />
        </div>

        {/* Small Bento Boxes */}
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-3xl p-6 border border-white/5 relative overflow-hidden group">
            <p className="text-[var(--neon-cyan)] font-mono text-xs uppercase tracking-widest mb-2">RANK UP</p>
            <h3 className="text-xl font-bold text-white tracking-tight uppercase">Elite Membership</h3>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[var(--neon-cyan)] opacity-10 blur-2xl rounded-full transition-transform duration-500 group-hover:scale-150" />
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-3xl p-6 border border-white/5 relative overflow-hidden group">
            <p className="text-[var(--neon-pink)] font-mono text-xs uppercase tracking-widest mb-2">SPEED RUN</p>
            <h3 className="text-xl font-bold text-white tracking-tight uppercase">24h Delivery</h3>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[var(--neon-pink)] opacity-10 blur-2xl rounded-full transition-transform duration-500 group-hover:scale-150" />
        </div>

        <div className="md:col-span-2 bg-gradient-to-br from-zinc-900 to-[#111] backdrop-blur-sm rounded-3xl p-6 border border-white/5 relative overflow-hidden flex items-center justify-between group">
            <div>
                <p className="text-[var(--neon-purple)] font-mono text-xs uppercase tracking-widest mb-2">ACHIEVEMENT UNLOCKED</p>
                <h3 className="text-2xl font-bold text-white tracking-tight uppercase italic">Free Global Shipping</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-[var(--neon-purple)]/20 border border-[var(--neon-purple)]/50 flex items-center justify-center relative z-10">
                <svg className="w-6 h-6 text-[var(--neon-purple)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--neon-purple)] opacity-10 blur-[80px] rounded-full" />
        </div>
    </section>
);
