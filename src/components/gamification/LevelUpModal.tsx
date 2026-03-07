"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useGamificationStore } from "@/store/useGamificationStore";
import { getTierFromLevel, TIER_COLORS } from "@/lib/gamification";
import { Sparkles } from "lucide-react";

export default function LevelUpModal() {
    const { showLevelUp, level, dismissLevelUp } = useGamificationStore();
    const tier = getTierFromLevel(level);
    const tierColor = TIER_COLORS[tier];

    return (
        <AnimatePresence>
            {showLevelUp && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={dismissLevelUp}
                >
                    {/* Radial pulse */}
                    <motion.div
                        className="absolute w-[400px] h-[400px] rounded-full"
                        style={{ background: `radial-gradient(circle, ${tierColor}30, transparent)` }}
                        initial={{ scale: 0.5, opacity: 1 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />

                    {/* Particles */}
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full"
                            style={{ background: tierColor }}
                            initial={{
                                x: 0, y: 0, scale: 1, opacity: 1,
                            }}
                            animate={{
                                x: (Math.random() - 0.5) * 400,
                                y: (Math.random() - 0.5) * 400,
                                scale: 0,
                                opacity: 0,
                            }}
                            transition={{ duration: 1.5 + Math.random(), delay: Math.random() * 0.3, ease: "easeOut" }}
                        />
                    ))}

                    <motion.div
                        className="relative z-10 glass-strong p-12 rounded-3xl text-center max-w-sm mx-4"
                        initial={{ scale: 0.5, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Sparkles size={30} style={{ color: tierColor }} className="mx-auto mb-4" />

                        <div
                            className="w-24 h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center text-5xl font-black animate-level-up-glow"
                            style={{ background: `${tierColor}15`, color: tierColor, border: `2px solid ${tierColor}` }}
                        >
                            {level}
                        </div>

                        <h2 className="text-3xl font-black text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>LEVEL UP!</h2>
                        <p className="text-lg font-bold mb-1" style={{ color: tierColor }}>{tier} Tier</p>
                        <p className="text-sm text-slate-400 mb-8">You've reached Level {level}!</p>

                        <button
                            onClick={dismissLevelUp}
                            className="btn-magnetic w-full py-3 text-sm"
                        >
                            Continue
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
