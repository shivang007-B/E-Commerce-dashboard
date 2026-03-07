"use client";
import { motion } from "framer-motion";
import { BADGE_DEFINITIONS } from "@/lib/gamification";
import { Award, Lock } from "lucide-react";

interface BadgeCardProps {
    badge: typeof BADGE_DEFINITIONS[0];
    unlocked: boolean;
}

export default function BadgeCard({ badge, unlocked }: BadgeCardProps) {
    return (
        <motion.div
            whileHover={unlocked ? { scale: 1.05, y: -5 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`relative p-5 rounded-3xl text-center transition-all ${unlocked
                    ? "glass gradient-border"
                    : "bg-white/[0.02] border border-white/5 opacity-50"
                }`}
        >
            {/* Lock overlay */}
            {!unlocked && (
                <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/30 backdrop-blur-sm z-10">
                    <Lock size={20} className="text-slate-600" />
                </div>
            )}

            <div className="text-4xl mb-3">{badge.icon}</div>
            <h3 className="text-sm font-bold text-white mb-1">{badge.name}</h3>
            <p className="text-[10px] text-slate-500 mb-3 leading-relaxed">{badge.description}</p>
            <div className="flex items-center justify-center gap-1 text-indigo-400 text-[10px] font-bold font-mono">
                <Award size={10} /> +{badge.xpReward} XP
            </div>

            {unlocked && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                    <span className="text-green-400 text-[10px]">✓</span>
                </div>
            )}
        </motion.div>
    );
}

export function BadgeGrid({ unlockedBadges }: { unlockedBadges: string[] }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {BADGE_DEFINITIONS.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} unlocked={unlockedBadges.includes(badge.id)} />
            ))}
        </div>
    );
}
