"use client";

import { useCartStore } from "@/store/useCartStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function MissionCheckout() {
    const { items, getCartTotal, clearCart } = useCartStore();
    const [isClient, setIsClient] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
        if (items.length === 0 && !isSuccess) {
            router.push("/cart");
        }
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

        if (!session) {
            alert("Please log in to initiate mission (checkout).");
            router.push("/login");
            return;
        }

        setIsProcessing(true);

        const res = await loadRazorpayScript();
        if (!res) {
            alert("System Error: Razorpay Uplink Failed. Check network connection.");
            setIsProcessing(false);
            return;
        }

        try {
            // 1. Create order on backend
            const orderRes = await fetch("/api/checkout/razorpay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items,
                    totalAmount: getCartTotal(),
                    shippingAddress: {
                        street: "Sector 7G",
                        city: "Neo Tokyo",
                        postalCode: "100000"
                    }
                })
            });

            const data = await orderRes.json();

            if (!orderRes.ok) throw new Error(data.message);

            // 2. Initialize Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
                amount: data.amount,
                currency: data.currency,
                name: "SHOPNOVA: Gear Up",
                description: "Acquisition of Tactical Equipment",
                order_id: data.orderId,
                handler: async function (response: any) {
                    try {
                        // 3. Verify Payment
                        const verifyRes = await fetch("/api/checkout/verify", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                dbOrderId: data.dbOrderId
                            })
                        });

                        const verifyData = await verifyRes.json();

                        if (verifyRes.ok) {
                            setOrderId(data.dbOrderId.substring(data.dbOrderId.length - 8).toUpperCase());
                            setIsSuccess(true);
                            clearCart();
                        } else {
                            alert("Uplink Verification Failed: " + verifyData.message);
                        }
                    } catch (err: any) {
                        alert("Error securing connection during verification.");
                        console.error(err);
                    }
                },
                prefill: {
                    name: session.user?.name || "Operative",
                    email: session.user?.email || "operative@shopnova.com",
                },
                theme: {
                    color: "#00f2ff" // Neon Cyan Razorpay UI
                }
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.on("payment.failed", function (response: any) {
                alert("Mission Failed: Funds Transfer Unsuccessful.");
                console.error(response.error);
            });
            paymentObject.open();

        } catch (error: any) {
            alert(error.message || "System error during checkout initiation.");
            console.error(error);
        } finally {
            setIsProcessing(false);
        }
    };

    if (!isClient) return null;

    if (isSuccess) {
        return (
            <div className="flex-grow flex items-center justify-center min-h-[70vh] px-6">
                <div className="bg-black/80 backdrop-blur-xl p-12 rounded-xl shadow-[0_0_30px_var(--neon-cyan)] max-w-lg w-full text-center border-2 border-[var(--neon-cyan)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--neon-cyan)]/10 to-transparent h-2 w-full animate-scanline pointer-events-none" />

                    <div className="w-24 h-24 border border-[var(--neon-cyan)] text-[var(--neon-cyan)] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_15px_var(--neon-cyan)]">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h1 className="text-3xl font-black italic uppercase text-white mb-4">Transmission Secure</h1>
                    <p className="font-mono text-zinc-400 uppercase text-sm mb-8 leading-relaxed">
                        Credits Transferred. Logistics dispatched.<br />
                        Track Order: <span className="text-[var(--neon-cyan)]">#ORD-{orderId || "HACKED"}</span>
                    </p>
                    <button
                        onClick={() => router.push("/")}
                        className="w-full bg-[var(--neon-cyan)] text-black font-black py-4 uppercase tracking-[0.2em] hover:bg-white transition-colors"
                    >
                        Return to Base
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] py-20 px-6 font-mono text-white pt-32">
            <div className="max-w-2xl mx-auto relative">
                {/* Decorative Cyber Grid BG */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none -z-10 opacity-30"></div>

                <div className="mb-10 text-center">
                    <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase relative z-10">Mission Briefing</h2>
                    <div className="h-1 w-24 bg-[var(--neon-cyan)] mx-auto mt-4 shadow-[0_0_10px_var(--neon-cyan)]" />
                </div>

                <div className="space-y-4 bg-zinc-900/80 p-8 border border-[var(--neon-cyan)]/30 rounded-sm backdrop-blur-xl relative overflow-hidden group">
                    {/* Scanline Effect inside Card */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--neon-cyan)]/5 to-transparent h-1 w-full animate-scanline pointer-events-none" />

                    {/* Top Right Corner Accent */}
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--neon-cyan)] transition-transform group-hover:scale-110" />

                    <form onSubmit={handleRazorpayPayment} className="relative z-10">
                        <div className="border-b border-white/10 pb-6 mb-6">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--neon-cyan)] mb-4">Tactical Inventory (Cart)</p>
                            <div className="space-y-3 max-h-[30vh] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm font-mono bg-white/5 p-3 rounded">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-black border border-white/10 rounded overflow-hidden">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                                            </div>
                                            <span className="text-zinc-300 line-clamp-1 max-w-[200px]">{item.name} <span className="text-[var(--neon-pink)]">x{item.quantity}</span></span>
                                        </div>
                                        <span className="text-[var(--neon-cyan)] font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center py-4 mb-6 bg-black/50 p-4 border border-white/5 rounded">
                            <span className="text-lg font-black uppercase text-zinc-400">Total Credits Required</span>
                            <span className="text-3xl font-black text-[var(--neon-pink)] drop-shadow-[0_0_10px_rgba(255,0,122,0.5)]">
                                ₹{getCartTotal().toLocaleString('en-IN')}
                            </span>
                        </div>

                        <button
                            type="submit"
                            disabled={isProcessing}
                            className={`w-full bg-[var(--neon-cyan)] text-black font-black py-5 text-lg uppercase tracking-[0.2em] relative transition-all duration-300 ${isProcessing ? 'opacity-50 cursor-wait' : 'hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_var(--neon-cyan)] hover:bg-white'} `}
                            style={{ clipPath: 'polygon(5% 0, 100% 0, 100% 70%, 95% 100%, 0 100%, 0 30%)' }}
                        >
                            {isProcessing ? (
                                <span className="flex items-center justify-center gap-3">
                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                    ESTABLISHING SECURE COMMS...
                                </span>
                            ) : (
                                "Confirm Tactical Drop & Pay"
                            )}
                        </button>

                        <div className="mt-6 border-t border-white/5 pt-4 text-center">
                            <p className="text-[10px] text-zinc-600 uppercase flex items-center justify-center gap-2">
                                <svg className="w-3 h-3 text-[var(--neon-cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                Encrypted Payload via Razorpay Secure Terminal // 256-Bit Protection
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
