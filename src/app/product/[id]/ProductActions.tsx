"use client";
import { useState } from "react";
import { Heart, Minus, Plus, Share2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useGamificationStore } from "@/store/useGamificationStore";
import { motion } from "framer-motion";

export default function ProductActions({ product }: { product: any }) {
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const { addItem } = useCartStore();
    const { recordShare } = useGamificationStore();

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) addItem({ ...product, id: product._id });
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({ title: product.name, text: `Check out ${product.name} on ShopNova!`, url: window.location.href }).then(() => recordShare());
        } else { navigator.clipboard.writeText(window.location.href); recordShare(); }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
                {/* Quantity */}
                <div className="flex items-center glass overflow-hidden rounded-xl h-12">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-11 h-full flex items-center justify-center hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                        <Minus size={16} />
                    </button>
                    <span className="w-12 h-full flex items-center justify-center font-bold text-indigo-400 border-x border-white/5 font-mono">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-11 h-full flex items-center justify-center hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                        <Plus size={16} />
                    </button>
                </div>

                {/* Add to Cart */}
                <motion.button
                    onClick={handleAddToCart}
                    className={`flex-1 h-12 font-black uppercase tracking-widest text-sm rounded-xl transition-all ${addedToCart ? "bg-green-500 text-black" : "btn-magnetic"}`}
                    whileTap={{ scale: 0.95 }}
                >
                    {addedToCart ? "✓ Added" : "Equip Item"}
                </motion.button>

                {/* Wishlist */}
                <button className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:border-fuchsia-500/30 hover:text-fuchsia-400 text-slate-500 transition-all">
                    <Heart size={18} />
                </button>

                {/* Share */}
                <button onClick={handleShare} className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:border-sky-500/30 hover:text-sky-400 text-slate-500 transition-all relative group">
                    <Share2 size={18} />
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] text-sky-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">+15 XP</span>
                </button>
            </div>
        </div>
    );
}
