"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useGamificationStore } from "@/store/useGamificationStore";
import { XP_REWARDS, POINT_REWARDS } from "@/lib/gamification";
import { Flame, Gift, X } from "lucide-react";

export default function DailyCheckinPopup() {
    const { showCheckinPopup, loginStreak, completeCheckin, dismissCheckinPopup } = useGamificationStore();

    const baseXP = XP_REWARDS.DAILY_CHECKIN;
    const basePoints = POINT_REWARDS.DAILY_CHECKIN;
    const streakMultiplier = Math.min(1 + loginStreak * 0.1, 3);
    const earnedXP = Math.floor(baseXP * streakMultiplier);
    const earnedPoints = Math.floor(basePoints * streakMultiplier);

    const handleCheckin = () => {
        completeCheckin();
    };

    return (
        <AnimatePresence>
            {showCheckinPopup && (
                <motion.div
                    className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="glass-strong p-8 rounded-3xl max-w-sm w-full mx-4 text-center relative gradient-border"
                        initial={{ scale: 0.8, y: 30 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <button onClick={dismissCheckinPopup} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
                            <X size={18} />
                        </button>

                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                            <Flame size={28} className="text-indigo-400" />
                        </div>

                        <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>Daily Check-In</h2>
                        <p className="text-sm text-slate-400 mb-6">Keep your streak alive!</p>

                        {/* Streak Calendar */}
                        <div className="flex justify-center gap-2 mb-6">
                            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                                <div
                                    key={day}
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${day <= loginStreak
                                            ? "bg-indigo-500/20 border border-indigo-500/40 text-indigo-400"
                                            : day === loginStreak + 1
                                                ? "bg-yellow-400/10 border-2 border-dashed border-yellow-400/40 text-yellow-400 animate-pulse"
                                                : "glass text-slate-600"
                                        }`}
                                >
                                    {day <= loginStreak ? "✓" : day}
                                </div>
                            ))}
                        </div>

                        {/* Current Streak */}
                        <div className="glass p-3 rounded-2xl mb-6">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Flame size={14} className="text-fuchsia-400" />
                                <span className="text-sm font-bold text-white">{loginStreak} Day Streak</span>
                            </div>
                            <p className="text-[10px] text-slate-500">Multiplier: {streakMultiplier.toFixed(1)}x</p>
                        </div>

                        {/* Rewards Preview */}
                        <div className="flex justify-center gap-4 mb-6">
                            <div className="text-center glass p-3 rounded-2xl flex-1">
                                <p className="text-lg font-black text-indigo-400 font-mono">+{earnedXP}</p>
                                <p className="text-[10px] text-slate-500">XP</p>
                            </div>
                            <div className="text-center glass p-3 rounded-2xl flex-1">
                                <p className="text-lg font-black text-yellow-400 font-mono">+{earnedPoints}</p>
                                <p className="text-[10px] text-slate-500">Points</p>
                            </div>
                        </div>

                        <button onClick={handleCheckin} className="btn-magnetic w-full py-3 text-sm flex items-center justify-center gap-2">
                            <Gift size={16} /> Claim Reward
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
