"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import XPProgressBar from "@/components/gamification/XPProgressBar";
import { BadgeGrid } from "@/components/gamification/BadgeCard";
import MissionCard from "@/components/gamification/MissionCard";
import { useGamificationStore } from "@/store/useGamificationStore";
import { TIER_COLORS } from "@/lib/gamification";
import Link from "next/link";
import { Package, MessageSquare, Share2, RotateCw, Wallet } from "lucide-react";

export default function PlayerProfile() {
    const { data: session, status } = useSession();
    const [orders, setOrders] = useState<any[]>([]);
    const [isClient, setIsClient] = useState(false);

    const {
        xp, level, points, tier, totalSpent,
        unlockedBadges, activeMissions,
        loginStreak, totalOrders, totalReviews, totalShares, spinsAvailable,
    } = useGamificationStore();

    useEffect(() => {
        setIsClient(true);
        if (session) {
            fetch("/api/orders").then(res => res.json()).then(data => {
                if (Array.isArray(data)) setOrders(data);
            }).catch(console.error);
        }
    }, [session]);

    if (status === "loading" || !isClient) {
        return <div className="min-h-screen bg-[var(--deep-space)] flex items-center justify-center text-indigo-400 animate-pulse">Initializing Player Hub...</div>;
    }

    if (!session) {
        return <div className="min-h-screen bg-[var(--deep-space)] flex items-center justify-center text-red-400">Access Denied: Please login to access Player Profile.</div>;
    }

    const tierColor = TIER_COLORS[tier];
    const completedMissions = activeMissions.filter(m => m.completed).length;

    return (
        <div className="min-h-screen bg-[var(--deep-space)] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1100px] mx-auto pt-8">
                {/* Player Card */}
                <motion.div
                    className="relative rounded-3xl glass p-8 mb-8 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                    <div className="absolute inset-0 opacity-10 blur-[80px]" style={{ background: tierColor }} />

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div
                                className="w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black border-2 animate-level-up-glow"
                                style={{ borderColor: tierColor, color: tierColor, background: `${tierColor}15` }}
                            >
                                {level}
                            </div>
                            <div>
                                <h1 className="text-3xl font-black tracking-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
                                    {session?.user?.name || "Unknown_Entity"}
                                </h1>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: tierColor }}>
                                        {tier} Tier
                                    </span>
                                    <span className="text-slate-600">•</span>
                                    <span className="text-xs text-slate-400">{session?.user?.email}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {[
                                { label: "XP", value: xp.toLocaleString(), cls: "text-indigo-400" },
                                { label: "Points", value: points.toString(), cls: "text-yellow-400" },
                                { label: "Streak", value: `🔥 ${loginStreak}`, cls: "text-fuchsia-400" },
                            ].map((s) => (
                                <div key={s.label} className="text-center px-4 py-2 rounded-2xl glass">
                                    <p className={`text-xl font-black font-mono ${s.cls}`}>{s.value}</p>
                                    <p className="text-[10px] text-slate-500 uppercase">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 mt-6">
                        <XPProgressBar xp={xp} />
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <motion.div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    {[
                        { label: "Orders", value: totalOrders, icon: <Package size={18} /> },
                        { label: "Reviews", value: totalReviews, icon: <MessageSquare size={18} /> },
                        { label: "Shares", value: totalShares, icon: <Share2 size={18} /> },
                        { label: "Spins Left", value: spinsAvailable, icon: <RotateCw size={18} /> },
                        { label: "Total Spent", value: `₹${totalSpent.toLocaleString('en-IN')}`, icon: <Wallet size={18} /> },
                    ].map((s) => (
                        <div key={s.label} className="p-4 rounded-2xl glass text-center">
                            <span className="text-slate-400 flex justify-center mb-1">{s.icon}</span>
                            <p className="text-lg font-black text-white font-mono">{s.value}</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest">{s.label}</p>
                        </div>
                    ))}
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Missions */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-bold flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                                <span className="h-2 w-2 rounded-full bg-fuchsia-500 animate-pulse" />
                                Active Missions ({completedMissions}/{activeMissions.length})
                            </h2>
                            <Link href="/rewards" className="text-[10px] text-slate-500 uppercase tracking-widest hover:text-indigo-400 transition-colors">
                                View All →
                            </Link>
                        </div>
                        {activeMissions.map((m) => <MissionCard key={m.id} mission={m} />)}
                    </div>

                    {/* Orders */}
                    <div>
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                            Recent Orders
                        </h2>
                        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {orders.length === 0 ? (
                                <div className="p-4 glass text-center text-slate-500 text-sm italic rounded-2xl">No quests completed yet.</div>
                            ) : (
                                orders.map((order: any) => (
                                    <div key={order._id} className="p-4 glass hover:bg-white/[0.04] transition-colors rounded-2xl">
                                        <p className="text-sm font-bold text-indigo-400 font-mono">#ORD-{order._id.substring(order._id.length - 6).toUpperCase()}</p>
                                        <div className="flex justify-between items-center mt-1">
                                            <p className="text-[10px] text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                            <p className="text-fuchsia-400 font-bold font-mono">₹{order.totalAmount?.toLocaleString('en-IN')}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Badges */}
                <motion.div className="mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1.5 h-6 bg-sky-500 rounded-full shadow-lg shadow-sky-500/30"></div>
                        <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                            Badge Collection ({unlockedBadges.length}/12)
                        </h2>
                    </div>
                    <BadgeGrid unlockedBadges={unlockedBadges} />
                </motion.div>
            </div>
        </div>
    );
}
