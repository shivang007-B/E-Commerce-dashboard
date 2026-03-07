"use client";
import { useCartStore } from "@/store/useCartStore";
import { useGamificationStore } from "@/store/useGamificationStore";
import { getProductXP } from "@/lib/gamification";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Trash2, Minus, Plus, Zap, ArrowLeft } from "lucide-react";

export default function CartPage() {
    const [isClient, setIsClient] = useState(false);
    const { items, removeItem, increaseQuantity, decreaseQuantity, getCartTotal } = useCartStore();
    const { points } = useGamificationStore();

    useEffect(() => { setIsClient(true); }, []);

    if (!isClient) {
        return (
            <div className="min-h-screen bg-[var(--deep-space)] flex items-center justify-center text-indigo-400 animate-pulse">
                Initializing Interface...
            </div>
        );
    }

    const totalXP = items.reduce((sum, item) => sum + getProductXP(item.price) * item.quantity, 0);
    const totalPts = Math.floor(getCartTotal() * 0.05);

    return (
        <div className="min-h-screen bg-[var(--deep-space)] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1100px] mx-auto pt-16">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
                            Tactical <span className="gaming-gradient-text">Loadout</span>
                        </h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] mt-1">Inventory Management</p>
                    </div>
                    <div className="text-right">
                        <p className="text-slate-500 text-[10px] uppercase">Active Slots</p>
                        <p className="text-xl font-bold text-indigo-400 font-mono">{items.length}</p>
                    </div>
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-20 glass rounded-3xl">
                        <p className="text-slate-500 mb-6">Your arsenal is empty</p>
                        <Link href="/" className="btn-magnetic px-8 py-3 text-sm inline-block">
                            <ArrowLeft size={14} className="inline mr-2" /> Return to Armory
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Items */}
                        <div className="lg:col-span-2 space-y-4">
                            <AnimatePresence>
                                {items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        className="group glass p-4 flex gap-6 rounded-2xl hover:bg-white/[0.04] transition-all"
                                    >
                                        <div className="h-24 w-24 flex-shrink-0 bg-[var(--midnight)] border border-white/5 overflow-hidden rounded-xl">
                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-white font-bold text-sm">{item.name}</h3>
                                                    <p className="text-indigo-400 text-xs mt-1 font-bold font-mono">₹{item.price.toLocaleString('en-IN')}</p>
                                                    <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1"><Zap size={9} /> +{getProductXP(item.price)} XP per item</p>
                                                </div>
                                                <button onClick={() => removeItem(item.id)} className="text-slate-600 hover:text-red-400 transition-colors p-1">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>

                                            <div className="flex items-center gap-4 mt-4">
                                                <div className="flex items-center glass overflow-hidden rounded-xl">
                                                    <button onClick={() => decreaseQuantity(item.id)} className="px-3 py-1.5 text-slate-400 hover:bg-white/5 hover:text-white"><Minus size={14} /></button>
                                                    <span className="px-4 py-1.5 text-xs text-indigo-400 border-x border-white/5 font-mono">{item.quantity}</span>
                                                    <button onClick={() => increaseQuantity(item.id)} className="px-3 py-1.5 text-slate-400 hover:bg-white/5 hover:text-white"><Plus size={14} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 glass-strong p-6 rounded-3xl gradient-border">
                                <h2 className="text-xl font-black text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>Summary</h2>

                                <div className="space-y-3 mb-6 text-xs uppercase tracking-widest">
                                    <div className="flex justify-between text-slate-500">
                                        <span>Subtotal</span>
                                        <span className="font-mono">₹{getCartTotal().toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500">
                                        <span>Tax (GST)</span>
                                        <span className="font-mono">₹0.00</span>
                                    </div>
                                    <div className="h-px bg-white/5 my-4" />
                                    <div className="flex justify-between items-end">
                                        <span className="text-white font-black">Total</span>
                                        <span className="text-2xl font-black text-indigo-400 font-mono">₹{getCartTotal().toLocaleString('en-IN')}</span>
                                    </div>
                                </div>

                                {/* XP Preview */}
                                <div className="mb-4 p-3 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">Rewards from this order</p>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-indigo-400 font-bold font-mono"><Zap size={12} className="inline" /> +{totalXP} XP</span>
                                        <span className="text-yellow-400 font-bold font-mono">💎 +{totalPts} pts</span>
                                    </div>
                                </div>

                                {points > 0 && (
                                    <div className="mb-6 p-3 rounded-2xl bg-yellow-400/5 border border-yellow-400/10">
                                        <p className="text-[10px] text-slate-400">💎 You have {points} points to redeem at checkout</p>
                                    </div>
                                )}

                                <Link href="/checkout" className="btn-magnetic block w-full text-center py-4 text-sm">
                                    Initiate Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
