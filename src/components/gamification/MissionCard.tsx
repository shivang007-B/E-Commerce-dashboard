"use client";
import { motion } from "framer-motion";
import { Zap, Gift, CheckCircle } from "lucide-react";

interface Mission {
    id: string;
    title: string;
    description: string;
    icon: string;
    type: string;
    target: number;
    progress?: number;
    completed?: boolean;
    xpReward: number;
    pointReward: number;
}

export default function MissionCard({ mission }: { mission: Mission }) {
    const progress = mission.progress || 0;
    const percent = Math.min((progress / mission.target) * 100, 100);
    const isDone = mission.completed || progress >= mission.target;

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`p-5 rounded-3xl glass relative overflow-hidden ${isDone ? "border-green-500/20" : ""}`}
        >
            <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${isDone ? "bg-green-500/10 border border-green-500/20" : "glass"}`}>
                    {isDone ? <CheckCircle size={20} className="text-green-400" /> : mission.icon}
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-bold ${isDone ? "text-slate-400 line-through" : "text-white"}`}>{mission.title}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{mission.description}</p>

                    {/* Progress Bar */}
                    <div className="mt-3 h-2 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                            className={`h-full rounded-full ${isDone ? "bg-green-500" : "bg-gradient-to-r from-indigo-500 to-sky-500"}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${percent}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            style={{ boxShadow: isDone ? "0 0 8px rgba(34,197,94,0.4)" : "0 0 8px rgba(99,102,241,0.3)" }}
                        />
                    </div>

                    <div className="flex justify-between items-center mt-2">
                        <span className="text-[10px] text-slate-500 font-mono">{progress}/{mission.target}</span>
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] text-indigo-400 font-bold flex items-center gap-1 font-mono"><Zap size={9} /> {mission.xpReward} XP</span>
                            <span className="text-[10px] text-yellow-400 font-bold flex items-center gap-1 font-mono"><Gift size={9} /> {mission.pointReward} pts</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
