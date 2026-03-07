"use client"
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { getProductXP } from "@/lib/gamification";
import Link from "next/link";
import { Zap } from "lucide-react";

export const GamifiedProductCard = ({ product }: { product: any }) => {
    const { addItem } = useCartStore();
    const xpReward = getProductXP(product.price);
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: y * -10, y: x * 10 });
    };

    const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ rotateX: tilt.x, rotateY: tilt.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ perspective: 1000, transformStyle: "preserve-3d" }}
            className="group relative overflow-hidden rounded-3xl glass p-4 cursor-pointer"
        >
            {/* XP Badge */}
            <div className="absolute top-6 right-6 z-20 bg-black/60 backdrop-blur-md border border-indigo-500/30 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5">
                <Zap size={10} className="text-indigo-400" />
                <span className="text-[10px] text-indigo-400 font-bold">+{xpReward} XP</span>
            </div>

            {/* Product Image */}
            <Link href={`/product/${product._id}`}>
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-[var(--midnight)] border border-white/5">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
            </Link>

            {/* Info */}
            <div className="mt-4 relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-fuchsia-400">Rarity: Epic</p>
                <Link href={`/product/${product._id}`}>
                    <h3 className="text-base font-bold text-white line-clamp-1 hover:text-indigo-400 transition-colors mt-1">{product.name}</h3>
                </Link>

                <div className="mt-3 flex items-center justify-between">
                    <span className="font-mono text-xl font-bold text-indigo-400">
                        ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <button
                        onClick={(e) => { e.preventDefault(); addItem({ ...product, id: product._id }) }}
                        className="btn-magnetic px-4 py-2 text-[10px] rounded-xl"
                    >
                        Equip
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
