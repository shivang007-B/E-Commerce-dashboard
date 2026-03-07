"use client";
import { useState } from "react";
import { useGamificationStore } from "@/store/useGamificationStore";
import { POINT_REWARDS } from "@/lib/gamification";
import { Gift } from "lucide-react";

interface PointsRedeemSliderProps {
    maxDiscount: number;
    onRedeem: (value: number) => void;
}

export default function PointsRedeemSlider({ maxDiscount, onRedeem }: PointsRedeemSliderProps) {
    const { points } = useGamificationStore();
    const [sliderValue, setSliderValue] = useState(0);

    const maxRedeemable = Math.min(
        Math.floor(points / POINT_REWARDS.POINTS_TO_CURRENCY),
        maxDiscount
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        setSliderValue(val);
        onRedeem(val);
    };

    if (points <= 0) return null;

    return (
        <div className="glass p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Gift size={14} className="text-yellow-400" />
                    <span className="text-sm font-bold text-white">Redeem Points</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">💎 {points} available</span>
            </div>

            <input
                type="range"
                min={0}
                max={maxRedeemable}
                value={sliderValue}
                onChange={handleChange}
                className="w-full h-2 rounded-full bg-white/5 appearance-none cursor-pointer accent-indigo-500"
                style={{
                    background: `linear-gradient(to right, #6366F1 ${(sliderValue / Math.max(maxRedeemable, 1)) * 100}%, rgba(255,255,255,0.05) ${(sliderValue / Math.max(maxRedeemable, 1)) * 100}%)`
                }}
            />

            <div className="flex justify-between mt-2 text-[10px] font-mono">
                <span className="text-slate-500">₹0</span>
                <span className="text-indigo-400 font-bold">-₹{sliderValue} discount</span>
                <span className="text-slate-500">₹{maxRedeemable}</span>
            </div>

            {sliderValue > 0 && (
                <p className="text-[10px] text-yellow-400 mt-2 text-center">
                    Using {sliderValue * POINT_REWARDS.POINTS_TO_CURRENCY} points for ₹{sliderValue} off
                </p>
            )}
        </div>
    );
}
