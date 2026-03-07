"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SpinWheel from "@/components/gamification/SpinWheel";
import LeaderboardTable from "@/components/gamification/LeaderboardTable";
import MissionCard from "@/components/gamification/MissionCard";
import { BadgeGrid } from "@/components/gamification/BadgeCard";
import XPProgressBar from "@/components/gamification/XPProgressBar";
import { useGamificationStore } from "@/store/useGamificationStore";
import { Zap, Flame, Package, RotateCw } from "lucide-react";

export default function RewardsPage() {
    const [isClient, setIsClient] = useState(false);
    const { xp, level, points, tier, unlockedBadges, activeMissions, loginStreak, totalOrders, spinsAvailable } =
        useGamificationStore();

    useEffect(() => { setIsClient(true); }, []);

    if (!isClient) {
        return (
            <div className="min-h-screen bg-[var(--deep-space)] flex items-center justify-center text-indigo-400 animate-pulse">
                Loading Rewards Hub...
            </div>
        );
    }

    const stats = [
        { label: "Total XP", value: xp.toLocaleString(), icon: <Zap size={20} />, color: "text-indigo-400", glow: "shadow-indigo-500/20" },
        { label: "Points", value: points.toLocaleString(), icon: "💎", color: "text-yellow-400", glow: "shadow-yellow-500/20" },
        { label: "Login Streak", value: `${loginStreak} days`, icon: <Flame size={20} />, color: "text-fuchsia-400", glow: "shadow-fuchsia-500/20" },
        { label: "Orders", value: totalOrders.toString(), icon: <Package size={20} />, color: "text-sky-400", glow: "shadow-sky-500/20" },
    ];

    return (
        <div className="min-h-screen bg-[var(--deep-space)] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1280px] mx-auto pt-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-12 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/8 rounded-full blur-[100px] pointer-events-none" />
                    <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-4 relative z-10" style={{ fontFamily: "var(--font-display)" }}>
                        Rewards <span className="gaming-gradient-text">Center</span>
                    </h1>
                    <p className="text-sm text-slate-500 tracking-widest relative z-10">
                        Your gamified command center • Earn • Spin • Compete
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 25 }}
                >
                    {stats.map((stat) => (
                        <div key={stat.label} className={`p-5 rounded-3xl glass text-center hover:bg-white/[0.04] transition-all shadow-lg ${stat.glow}`}>
                            <div className={`text-2xl mb-2 ${stat.color} flex justify-center`}>{stat.icon}</div>
                            <p className={`text-2xl font-black font-mono ${stat.color}`}>{stat.value}</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* XP Progress */}
                <motion.div
                    className="mb-12 p-6 rounded-3xl glass"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <XPProgressBar xp={xp} />
                </motion.div>

                {/* Spin Wheel */}
                <motion.section
                    id="spin"
                    className="mb-16 scroll-mt-32"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-1.5 h-8 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/30"></div>
                        <h2 className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
                            Spin the <span className="gaming-gradient-text">Wheel</span>
                        </h2>
                        <span className="text-xs text-slate-500 font-mono ml-auto flex items-center gap-1"><RotateCw size={12} /> {spinsAvailable} spins</span>
                    </div>
                    <div className="p-8 rounded-3xl glass relative overflow-hidden">
                        <div className="absolute inset-0 bento-glow-indigo pointer-events-none" />
                        <SpinWheel />
                    </div>
                </motion.section>

                {/* Missions */}
                <motion.section className="mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-1.5 h-8 bg-fuchsia-500 rounded-full shadow-lg shadow-fuchsia-500/30"></div>
                        <h2 className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
                            Active <span className="text-fuchsia-400">Missions</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeMissions.map((mission) => (
                            <MissionCard key={mission.id} mission={mission} />
                        ))}
                    </div>
                </motion.section>

                {/* Badges */}
                <motion.section className="mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-1.5 h-8 bg-sky-500 rounded-full shadow-lg shadow-sky-500/30"></div>
                        <h2 className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
                            Badge <span className="text-sky-400">Collection</span>
                        </h2>
                        <span className="text-xs text-slate-500 font-mono ml-auto">{unlockedBadges.length} / 12 unlocked</span>
                    </div>
                    <div className="p-6 rounded-3xl glass">
                        <BadgeGrid unlockedBadges={unlockedBadges} />
                    </div>
                </motion.section>

                {/* Leaderboard */}
                <motion.section id="leaderboard" className="mb-16 scroll-mt-32" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-1.5 h-8 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/30"></div>
                        <h2 className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
                            Global <span className="text-yellow-400">Leaderboard</span>
                        </h2>
                    </div>
                    <div className="p-6 rounded-3xl glass">
                        <LeaderboardTable />
                    </div>
                </motion.section>
            </div>
        </div>
    );
}
