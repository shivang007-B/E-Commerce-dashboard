"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useGamificationStore } from "@/store/useGamificationStore";
import { SPIN_SEGMENTS, spinWheel } from "@/lib/gamification";
import { RotateCw } from "lucide-react";

export default function SpinWheel() {
    const { spinsAvailable, useSpin, addXP, addPoints } = useGamificationStore();
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState<string | null>(null);
    const wheelRef = useRef<SVGGElement>(null);

    const segmentAngle = 360 / SPIN_SEGMENTS.length;

    const handleSpin = () => {
        if (spinning || spinsAvailable <= 0) return;
        setSpinning(true);
        setResult(null);

        const won = spinWheel();
        const segmentIndex = SPIN_SEGMENTS.findIndex(s => s.label === won.label);
        const targetAngle = 360 - (segmentIndex * segmentAngle + segmentAngle / 2);
        const newRotation = rotation + 360 * 5 + targetAngle;
        setRotation(newRotation);

        setTimeout(() => {
            useSpin();
            if (won.type === "xp") addXP(won.value);
            if (won.type === "points") addPoints(won.value);
            setResult(won.label);
            setSpinning(false);
        }, 4000);
    };

    const radius = 140;
    const cx = 160, cy = 160;

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute -inset-4 rounded-full border border-indigo-500/20 animate-glow-pulse" style={{ boxShadow: "0 0 30px rgba(99,102,241,0.15)" }} />

                <svg width="320" height="320" viewBox="0 0 320 320" className="drop-shadow-2xl">
                    {/* Wheel */}
                    <motion.g
                        ref={wheelRef}
                        animate={{ rotate: rotation }}
                        transition={{ duration: 4, ease: [0.17, 0.67, 0.12, 0.99] }}
                        style={{ transformOrigin: `${cx}px ${cy}px` }}
                    >
                        {SPIN_SEGMENTS.map((seg, i) => {
                            const startAngle = (i * segmentAngle * Math.PI) / 180;
                            const endAngle = ((i + 1) * segmentAngle * Math.PI) / 180;
                            const x1 = cx + radius * Math.cos(startAngle);
                            const y1 = cy + radius * Math.sin(startAngle);
                            const x2 = cx + radius * Math.cos(endAngle);
                            const y2 = cy + radius * Math.sin(endAngle);
                            const largeArc = segmentAngle > 180 ? 1 : 0;
                            const midAngle = (startAngle + endAngle) / 2;
                            const labelX = cx + (radius * 0.65) * Math.cos(midAngle);
                            const labelY = cy + (radius * 0.65) * Math.sin(midAngle);
                            const labelRotation = (midAngle * 180) / Math.PI;

                            return (
                                <g key={i}>
                                    <path
                                        d={`M${cx},${cy} L${x1},${y1} A${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`}
                                        fill={seg.color}
                                        stroke="rgba(0,0,0,0.3)"
                                        strokeWidth="1"
                                        opacity={0.85}
                                    />
                                    <text
                                        x={labelX} y={labelY}
                                        textAnchor="middle" dominantBaseline="middle"
                                        fill="white" fontSize="10" fontWeight="800"
                                        transform={`rotate(${labelRotation}, ${labelX}, ${labelY})`}
                                        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
                                    >
                                        {seg.label}
                                    </text>
                                </g>
                            );
                        })}
                        {/* Center */}
                        <circle cx={cx} cy={cy} r="25" fill="#0A0A1A" stroke="rgba(99,102,241,0.4)" strokeWidth="2" />
                        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="10" fontWeight="800">SPIN</text>
                    </motion.g>

                    {/* Pointer */}
                    <polygon points="160,8 150,28 170,28" fill="#6366F1" stroke="white" strokeWidth="1" filter="drop-shadow(0 0 6px rgba(99,102,241,0.6))" />
                </svg>
            </div>

            {/* Spin Button */}
            <button
                onClick={handleSpin}
                disabled={spinning || spinsAvailable <= 0}
                className={`btn-magnetic px-8 py-3 text-sm flex items-center gap-2 ${(spinning || spinsAvailable <= 0) ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
                <RotateCw size={16} className={spinning ? 'animate-spin' : ''} />
                {spinning ? 'Spinning...' : spinsAvailable <= 0 ? 'No Spins Left' : `Spin (${spinsAvailable} left)`}
            </button>

            {/* Result */}
            {result && (
                <motion.div
                    className="text-center p-4 glass rounded-2xl"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">You Won</p>
                    <p className="text-2xl font-black gaming-gradient-text font-mono">{result}</p>
                </motion.div>
            )}
        </div>
    );
}
