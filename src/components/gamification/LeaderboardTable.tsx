"use client";
import { LEADERBOARD, TIER_COLORS } from "@/lib/gamification";
import { Trophy, Medal } from "lucide-react";

export default function LeaderboardTable() {
    const medals = ["🥇", "🥈", "🥉"];

    return (
        <div className="space-y-2">
            {LEADERBOARD.map((player, i) => (
                <div
                    key={player.rank}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${i < 3
                            ? "glass gradient-border"
                            : "glass hover:bg-white/[0.04]"
                        }`}
                >
                    {/* Rank */}
                    <div className="w-10 text-center">
                        {i < 3 ? (
                            <span className="text-xl">{medals[i]}</span>
                        ) : (
                            <span className="text-slate-500 font-mono font-bold text-sm">#{player.rank}</span>
                        )}
                    </div>

                    {/* Avatar */}
                    <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black"
                        style={{ background: `${TIER_COLORS[player.tier]}15`, color: TIER_COLORS[player.tier], border: `1px solid ${TIER_COLORS[player.tier]}30` }}
                    >
                        {player.level}
                    </div>

                    {/* Name */}
                    <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold truncate ${i < 3 ? "text-white" : "text-slate-300"}`}>{player.name}</p>
                        <p className="text-[10px] font-medium" style={{ color: TIER_COLORS[player.tier] }}>{player.tier}</p>
                    </div>

                    {/* XP */}
                    <div className="text-right">
                        <p className="text-sm font-black text-indigo-400 font-mono">{player.xp.toLocaleString()}</p>
                        <p className="text-[10px] text-slate-500">XP</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
