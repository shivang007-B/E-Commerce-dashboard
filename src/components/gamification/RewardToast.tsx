"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useGamificationStore } from "@/store/useGamificationStore";
import { Zap, Award, Gift, Tag } from "lucide-react";
import { useEffect } from "react";

const ICONS: Record<string, React.ReactNode> = {
    xp: <Zap size={16} className="text-indigo-400" />,
    badge: <Award size={16} className="text-fuchsia-400" />,
    points: <Gift size={16} className="text-yellow-400" />,
    discount: <Tag size={16} className="text-green-400" />,
};

const COLORS: Record<string, string> = {
    xp: "border-indigo-500/30 bg-indigo-500/5",
    badge: "border-fuchsia-500/30 bg-fuchsia-500/5",
    points: "border-yellow-500/30 bg-yellow-500/5",
    discount: "border-green-500/30 bg-green-500/5",
};

export default function RewardToast() {
    const { showRewardToast, rewardToastMessage, rewardToastType, dismissRewardToast } = useGamificationStore();

    useEffect(() => {
        if (showRewardToast) {
            const timer = setTimeout(() => dismissRewardToast(), 3000);
            return () => clearTimeout(timer);
        }
    }, [showRewardToast, dismissRewardToast]);

    return (
        <AnimatePresence>
            {showRewardToast && rewardToastMessage && (
                <motion.div
                    className={`fixed top-24 right-6 z-[90] flex items-center gap-3 px-5 py-4 rounded-2xl border backdrop-blur-md shadow-2xl cursor-pointer ${COLORS[rewardToastType] || COLORS.xp}`}
                    initial={{ x: 300, opacity: 0, scale: 0.8 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: 300, opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onClick={dismissRewardToast}
                >
                    <div className="flex-shrink-0">
                        {ICONS[rewardToastType] || ICONS.xp}
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">{rewardToastType}</p>
                        <p className="text-sm font-bold text-white">{rewardToastMessage}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
