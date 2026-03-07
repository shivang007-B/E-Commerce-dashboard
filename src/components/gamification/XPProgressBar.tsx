"use client";
import { motion } from "framer-motion";
import { useGamificationStore } from "@/store/useGamificationStore";
import { getXPProgress, getXPForNextLevel, getLevelFromXP, getTierFromLevel, TIER_COLORS } from "@/lib/gamification";

interface XPProgressBarProps {
    xp: number;
    compact?: boolean;
}

export default function XPProgressBar({ xp, compact = false }: XPProgressBarProps) {
    const level = getLevelFromXP(xp);
    const tier = getTierFromLevel(level);
    const { percent, progress, needed } = getXPProgress(xp);
    const tierColor = TIER_COLORS[tier];

    if (compact) {
        return (
            <div className="flex items-center gap-2 min-w-[120px]">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black" style={{ background: `${tierColor}20`, color: tierColor, border: `1px solid ${tierColor}30` }}>
                    {level}
                </div>
                <div className="flex-1">
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                            className="h-full rounded-full"
                            style={{ background: `linear-gradient(to right, ${tierColor}, #0EA5E9)`, boxShadow: `0 0 8px ${tierColor}40` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${percent}%` }}
                            transition={{ duration: 0.8 }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg font-black" style={{ background: `${tierColor}15`, color: tierColor, border: `1px solid ${tierColor}30` }}>
                        {level}
                    </div>
                    <div>
                        <p className="text-xs font-bold text-white">Level {level}</p>
                        <p className="text-[10px] font-medium" style={{ color: tierColor }}>{tier}</p>
                    </div>
                </div>
                <div className="text-right font-mono">
                    <p className="text-xs text-white font-bold">{progress.toLocaleString()} / {needed.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-500">{getXPForNextLevel(level) - xp} XP to Level {level + 1}</p>
                </div>
            </div>

            <div className="relative h-3 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                    className="h-full rounded-full relative"
                    style={{ background: `linear-gradient(to right, ${tierColor}, #0EA5E9)`, boxShadow: `0 0 12px ${tierColor}40` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    {/* Shimmer */}
                    <div className="absolute inset-0 overflow-hidden rounded-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ width: "50%" }} />
                    </div>
                </motion.div>

                {/* Near level-up pulse */}
                {percent > 85 && (
                    <div className="absolute right-0 top-0 bottom-0 w-4 animate-glow-pulse rounded-r-full" style={{ background: tierColor, opacity: 0.5 }} />
                )}
            </div>
        </div>
    );
}
