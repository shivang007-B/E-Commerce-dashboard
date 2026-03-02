"use client"
import { motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";

export const GamifiedProductCard = ({ product }: { product: any }) => {
    const { addItem } = useCartStore();

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="neon-border group relative overflow-hidden rounded-lg bg-[var(--gaming-card)] p-4 shadow-2xl"
        >
            {/* Product Image with "Scan" Effect */}
            <div className="relative aspect-square overflow-hidden rounded-md bg-zinc-900 border border-white/5">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Info Section */}
            <div className="mt-4 relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#bc13fe]">Rarity: Epic</p>
                <h3 className="text-lg font-bold uppercase tracking-tight text-white line-clamp-1">{product.name}</h3>

                <div className="mt-2 flex items-center justify-between">
                    <span className="font-mono text-xl font-bold text-[var(--neon-cyan)]">
                        ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <button
                        onClick={(e) => { e.preventDefault(); addItem({ ...product, id: product._id }) }}
                        className="rounded-sm border border-[var(--neon-cyan)] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)] hover:text-black transition-all duration-300"
                    >
                        Equip Item
                    </button>
                </div>
            </div>

            {/* Aesthetic Corner Accents */}
            <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-[var(--neon-cyan)] opacity-50 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-[var(--neon-cyan)] opacity-50 transition-opacity group-hover:opacity-100" />
        </motion.div>
    );
};
