"use client";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function CartPage() {
    const [isClient, setIsClient] = useState(false);
    const { items, removeItem, increaseQuantity, decreaseQuantity, getCartTotal } = useCartStore();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[var(--neon-cyan)] font-mono animate-pulse">
                Initializing Interface...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] py-12 px-4 sm:px-6 lg:px-8 font-mono">
            <div className="max-w-5xl mx-auto pt-16">
                {/* Header HUD */}
                <div className="flex items-center justify-between border-b-2 border-[var(--neon-cyan)]/30 pb-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
                            Tactical <span className="gaming-gradient-text">Loadout</span>
                        </h1>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] mt-1">
                            Inventory Management // Sector 01
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-zinc-500 text-[10px] uppercase">Active Slots</p>
                        <p className="text-xl font-bold text-[var(--neon-cyan)]">{items.length} / 99</p>
                    </div>
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-lg">
                        <p className="text-zinc-500 uppercase tracking-widest mb-6">Your arsenal is empty</p>
                        <Link
                            href="/"
                            className="inline-block border border-[var(--neon-cyan)] px-8 py-3 text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)] hover:text-black transition-all font-black uppercase tracking-tighter"
                        >
                            Return to Armory
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Item List */}
                        <div className="lg:col-span-2 space-y-4">
                            <AnimatePresence>
                                {items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="group relative bg-zinc-900/50 border border-white/10 p-4 flex gap-6 hover:border-[var(--neon-cyan)]/50 transition-all"
                                    >
                                        {/* Item Image Slot */}
                                        <div className="h-24 w-24 flex-shrink-0 bg-black border border-white/5 overflow-hidden">
                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>

                                        {/* Item Details */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-white font-bold uppercase text-sm tracking-tight">{item.name}</h3>
                                                    <p className="text-[var(--neon-cyan)] text-xs mt-1 font-bold">₹{item.price.toLocaleString('en-IN')}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-zinc-600 hover:text-[var(--neon-pink)] transition-colors text-[10px] uppercase font-black"
                                                >
                                                    [ Discard ]
                                                </button>
                                            </div>

                                            {/* Quantity Selector HUD */}
                                            <div className="flex items-center gap-4 mt-4">
                                                <div className="flex items-center border border-white/10 bg-black overflow-hidden">
                                                    <button
                                                        onClick={() => decreaseQuantity(item.id)}
                                                        className="px-3 py-1 text-zinc-400 hover:bg-white/10 hover:text-white"
                                                    >-</button>
                                                    <span className="px-4 py-1 text-xs text-[var(--neon-cyan)] border-x border-white/10">{item.quantity}</span>
                                                    <button
                                                        onClick={() => increaseQuantity(item.id)}
                                                        className="px-3 py-1 text-zinc-400 hover:bg-white/10 hover:text-white"
                                                    >+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Summary Panel (The "Transaction Terminal") */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 bg-zinc-900 border-2 border-[var(--neon-cyan)] p-6 relative">
                                <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-[var(--neon-cyan)]" />
                                <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-[var(--neon-cyan)]" />

                                <h2 className="text-xl font-black uppercase text-white mb-6 italic">Terminal_Summary</h2>

                                <div className="space-y-3 mb-8 text-xs uppercase tracking-widest">
                                    <div className="flex justify-between text-zinc-500">
                                        <span>Subtotal</span>
                                        <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between text-zinc-500">
                                        <span>Tax (GST)</span>
                                        <span>₹0.00</span>
                                    </div>
                                    <div className="h-px bg-white/10 my-4" />
                                    <div className="flex justify-between items-end">
                                        <span className="text-white font-black">Final Credits</span>
                                        <span className="text-2xl font-black text-[var(--neon-pink)] shadow-[var(--neon-pink)] drop-shadow-md">
                                            ₹{getCartTotal().toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                </div>

                                <Link
                                    href="/checkout"
                                    className="block w-full text-center bg-[var(--neon-cyan)] text-black font-black py-4 uppercase tracking-[0.2em] hover:bg-white transition-all transform hover:-translate-y-1 active:translate-y-0"
                                    style={{ clipPath: 'polygon(0 0, 90% 0, 100% 30%, 100% 100%, 10% 100%, 0 70%)' }}
                                >
                                    Initiate Checkout
                                </Link>

                                <p className="text-[8px] text-zinc-600 text-center mt-6 uppercase leading-relaxed">
                                    Notice: All transactions are logged by central command. Unauthorized credits will result in account suspension.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
