"use client";

import { useCartStore } from "@/store/useCartStore";
import { useGamificationStore } from "@/store/useGamificationStore";
import { getProductXP } from "@/lib/gamification";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import PointsRedeemSlider from "@/components/gamification/PointsRedeemSlider";
import { Zap, Lock, CheckCircle, RotateCw } from "lucide-react";

export default function MissionCheckout() {
    const { items, getCartTotal, clearCart } = useCartStore();
    const { points, recordPurchase, redeemPoints } = useGamificationStore();
    const [isClient, setIsClient] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [pointsDiscount, setPointsDiscount] = useState(0);
    const [showRewards, setShowRewards] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const totalXP = items.reduce((sum, item) => sum + getProductXP(item.price) * item.quantity, 0);
    const totalPts = Math.floor(getCartTotal() * 0.05);

    useEffect(() => {
        setIsClient(true);
        if (items.length === 0 && !isSuccess) router.push("/cart");
    }, [items, router, isSuccess]);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleRazorpayPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) { alert("Please log in."); router.push("/login"); return; }

        setIsProcessing(true);
        const res = await loadRazorpayScript();
        if (!res) { alert("Razorpay failed to load."); setIsProcessing(false); return; }

        try {
            const orderRes = await fetch("/api/checkout/razorpay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items, totalAmount: getCartTotal() - pointsDiscount, shippingAddress: { street: "Sector 7G", city: "Neo Tokyo", postalCode: "100000" } })
            });
            const data = await orderRes.json();
            if (!orderRes.ok) throw new Error(data.message);

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
                amount: data.amount, currency: data.currency,
                name: "SHOPNOVA", description: "Gaming Gear Acquisition",
                order_id: data.orderId,
                handler: async function (response: any) {
                    try {
                        const verifyRes = await fetch("/api/checkout/verify", {
                            method: "POST", headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ razorpay_payment_id: response.razorpay_payment_id, razorpay_order_id: response.razorpay_order_id, razorpay_signature: response.razorpay_signature, dbOrderId: data.dbOrderId })
                        });
                        const verifyData = await verifyRes.json();
                        if (verifyRes.ok) {
                            setOrderId(data.dbOrderId.substring(data.dbOrderId.length - 8).toUpperCase());
                            if (pointsDiscount > 0) redeemPoints(pointsDiscount);
                            recordPurchase(getCartTotal(), items[0]?.category || "General");
                            setIsSuccess(true);
                            clearCart();
                            setTimeout(() => setShowRewards(true), 1000);
                        } else { alert("Verification Failed: " + verifyData.message); }
                    } catch (err: any) { alert("Error during verification."); console.error(err); }
                },
                prefill: { name: session.user?.name || "Operative", email: session.user?.email || "" },
                theme: { color: "#6366F1" }
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.on("payment.failed", function (response: any) { alert("Payment Failed."); console.error(response.error); });
            paymentObject.open();
        } catch (error: any) { alert(error.message || "Checkout error."); console.error(error); }
        finally { setIsProcessing(false); }
    };

    if (!isClient) return null;

    if (isSuccess) {
        return (
            <div className="flex-grow flex items-center justify-center min-h-[70vh] px-6">
                <motion.div
                    className="glass-strong p-12 rounded-3xl shadow-2xl shadow-indigo-500/10 max-w-lg w-full text-center gradient-border relative overflow-hidden"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                    <div className="w-20 h-20 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle size={40} />
                    </div>

                    <h1 className="text-3xl font-black text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>Mission Complete!</h1>
                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                        Credits Transferred. Logistics dispatched.<br />
                        Order: <span className="text-indigo-400 font-mono font-bold">#{`ORD-${orderId || "NOVA"}`}</span>
                    </p>

                    {showRewards && (
                        <motion.div
                            className="mb-8 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-3">🎮 Rewards Earned</p>
                            <div className="flex justify-center gap-6">
                                <div className="text-center"><p className="text-2xl font-black text-indigo-400 animate-xp-pop font-mono">+{totalXP}</p><p className="text-[10px] text-slate-500">XP</p></div>
                                <div className="text-center"><p className="text-2xl font-black text-yellow-400 animate-xp-pop font-mono" style={{ animationDelay: "0.2s" }}>+{totalPts}</p><p className="text-[10px] text-slate-500">Points</p></div>
                                <div className="text-center"><p className="text-2xl font-black text-sky-400 animate-xp-pop" style={{ animationDelay: "0.4s" }}>+1</p><p className="text-[10px] text-slate-500">Spin</p></div>
                            </div>
                        </motion.div>
                    )}

                    <div className="flex gap-3">
                        <button onClick={() => router.push("/")} className="flex-1 btn-magnetic py-4 text-sm">Continue Shopping</button>
                        <button onClick={() => router.push("/rewards")} className="flex-1 btn-ghost py-4 text-sm">Spin the Wheel 🎡</button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--deep-space)] py-20 px-6 text-white pt-32">
            <div className="max-w-2xl mx-auto relative">
                <div className="mb-10 text-center">
                    <h2 className="text-4xl font-black text-white tracking-tight relative z-10" style={{ fontFamily: "var(--font-display)" }}>Mission Briefing</h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-sky-500 mx-auto mt-4 rounded-full" />
                </div>

                <div className="glass-strong p-8 rounded-3xl gradient-border relative overflow-hidden">
                    <form onSubmit={handleRazorpayPayment} className="relative z-10">
                        <div className="border-b border-white/5 pb-6 mb-6">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-indigo-400 mb-4 font-medium">Items</p>
                            <div className="space-y-3 max-h-[30vh] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm glass p-3 rounded-2xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[var(--midnight)] border border-white/5 rounded-xl overflow-hidden">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                                            </div>
                                            <div>
                                                <span className="text-slate-300 line-clamp-1 max-w-[200px] block">{item.name} <span className="text-fuchsia-400">×{item.quantity}</span></span>
                                                <span className="text-[10px] text-slate-600 flex items-center gap-1"><Zap size={8} /> +{getProductXP(item.price) * item.quantity} XP</span>
                                            </div>
                                        </div>
                                        <span className="text-indigo-400 font-bold font-mono">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Rewards preview */}
                        <div className="mb-6 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                            <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">🎮 You will earn</p>
                            <div className="flex gap-6 text-sm">
                                <span className="text-indigo-400 font-bold font-mono"><Zap size={12} className="inline" /> +{totalXP} XP</span>
                                <span className="text-yellow-400 font-bold font-mono">💎 +{totalPts} Points</span>
                                <span className="text-sky-400 font-bold"><RotateCw size={12} className="inline" /> +1 Spin</span>
                            </div>
                        </div>

                        <div className="mb-6"><PointsRedeemSlider maxDiscount={Math.floor(getCartTotal() * 0.2)} onRedeem={(v) => setPointsDiscount(v)} /></div>

                        <div className="flex justify-between items-center py-4 mb-6 glass p-4 rounded-2xl">
                            <div>
                                <span className="text-lg font-black text-slate-400 block">Total</span>
                                {pointsDiscount > 0 && <span className="text-[10px] text-yellow-400 font-mono">💎 -{pointsDiscount} points applied</span>}
                            </div>
                            <span className="text-3xl font-black text-indigo-400 font-mono">₹{(getCartTotal() - pointsDiscount).toLocaleString('en-IN')}</span>
                        </div>

                        <button type="submit" disabled={isProcessing} className={`w-full btn-magnetic py-5 text-lg ${isProcessing ? 'opacity-50 cursor-wait' : ''}`}>
                            {isProcessing ? (
                                <span className="flex items-center justify-center gap-3">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Processing...
                                </span>
                            ) : "Confirm & Pay"}
                        </button>

                        <div className="mt-6 text-center">
                            <p className="text-[10px] text-slate-600 flex items-center justify-center gap-2">
                                <Lock size={10} /> Encrypted via Razorpay • 256-Bit
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
