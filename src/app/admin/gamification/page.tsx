"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { XP_REWARDS, POINT_REWARDS, BADGE_DEFINITIONS, MISSION_TEMPLATES } from "@/lib/gamification";

export default function AdminGamificationPage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Gamification Settings</h1>
                <p className="text-gray-500 text-sm">Configure XP rewards, badges, and missions</p>
            </div>

            {/* XP Values */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">⚡ XP Reward Values</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(XP_REWARDS).map(([key, value]) => (
                        <div key={key} className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 uppercase tracking-widest">{key.replace(/_/g, ' ')}</p>
                            <p className="text-2xl font-bold text-indigo-600 mt-1">{value} XP</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Point Values */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">💎 Points Configuration</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(POINT_REWARDS).map(([key, value]) => (
                        <div key={key} className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 uppercase tracking-widest">{key.replace(/_/g, ' ')}</p>
                            <p className="text-2xl font-bold text-purple-600 mt-1">
                                {typeof value === 'number' && value < 1 ? `${value * 100}%` : value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Badges */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">🏅 Badge Definitions ({BADGE_DEFINITIONS.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {BADGE_DEFINITIONS.map((badge) => (
                        <div key={badge.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <span className="text-2xl">{badge.icon}</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900 truncate">{badge.name}</p>
                                <p className="text-[11px] text-gray-500 truncate">{badge.description}</p>
                            </div>
                            <span className="text-xs font-bold text-indigo-600 whitespace-nowrap">+{badge.xpReward} XP</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Missions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">🎯 Mission Templates ({MISSION_TEMPLATES.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {MISSION_TEMPLATES.map((mission) => (
                        <div key={mission.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <span className="text-2xl">{mission.icon}</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900">{mission.title}</p>
                                <p className="text-[11px] text-gray-500">{mission.description}</p>
                                <p className="text-[10px] text-gray-400 mt-1">
                                    Type: {mission.type} • Target: {mission.target}
                                </p>
                            </div>
                            <div className="text-right whitespace-nowrap">
                                <p className="text-xs font-bold text-indigo-600">+{mission.xpReward} XP</p>
                                <p className="text-xs font-bold text-purple-600">+{mission.pointReward} pts</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <p className="text-xs text-gray-400 text-center">
                Gamification values are currently defined in <code className="bg-gray-100 px-1 rounded">lib/gamification.ts</code>.
                To update values, modify the constants in that file.
            </p>
        </div>
    );
}
