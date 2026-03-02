"use client";

import { useCartStore } from "@/store/useCartStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FiCheckCircle, FiLock, FiCreditCard } from "react-icons/fi";

export default function CheckoutPage() {
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
            alert("Please log in to place an order.");
            router.push("/login");
            return;
        }

        setIsProcessing(true);

        const res = await loadRazorpayScript();
        if (!res) {
            alert("Razorpay SDK failed to load. Please check your connection.");
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
                        street: "", // Will grab from form in real implementation
                        city: "",
                        postalCode: ""
                    }
                })
            });

            const data = await orderRes.json();

            if (!orderRes.ok) throw new Error(data.message);

            // 2. Initialize Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_fallback",
                amount: data.amount,
                currency: data.currency,
                name: "ShopNova Premium",
                description: "Purchase of Premium Lifestyle Products",
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
                            alert("Payment verification failed: " + verifyData.message);
                        }
                    } catch (err: any) {
                        alert("Error verifying payment");
                        console.error(err);
                    }
                },
                prefill: {
                    name: session.user?.name || "Customer",
                    email: session.user?.email || "customer@example.com",
                },
                theme: {
                    color: "#0f172a"
                }
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.on("payment.failed", function (response: any) {
                alert("Payment failed. Please try again.");
                console.error(response.error);
            });
            paymentObject.open();

        } catch (error: any) {
            alert(error.message || "Something went wrong during checkout.");
            console.error(error);
        } finally {
            setIsProcessing(false);
        }
    };

    if (!isClient) return null;

    if (isSuccess) {
        return (
            <div className="flex-grow flex items-center justify-center py-20 px-6 animate-in zoom-in duration-500">
                <div className="bg-white p-12 rounded-3xl shadow-hover max-w-lg w-full text-center border border-border">
                    <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                        <FiCheckCircle size={48} />
                    </div>
                    <h1 className="text-3xl font-bold text-primary mb-4">Payment Successful!</h1>
                    <p className="text-secondary mb-8 leading-relaxed">
                        Thank you for shopping with ShopNova. Your premium lifestyle products are on their way. Order #SN-{orderId || Math.floor(100000 + Math.random() * 900000)}
                    </p>
                    <button
                        onClick={() => router.push("/")}
                        className="bg-primary text-white font-semibold px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors w-full"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12 flex-grow">
            <h1 className="text-3xl font-bold text-primary mb-8">Secure Checkout</h1>

            <div className="lg:grid lg:grid-cols-12 gap-12 items-start">
                {/* Checkout Form */}
                <div className="lg:col-span-7 bg-white p-8 rounded-2xl shadow-sm border border-border mb-8 lg:mb-0 animate-in fade-in slide-in-from-left-4">
                    <form onSubmit={handleRazorpayPayment}>
                        {/* Contact Info */}
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">1</span>
                            Contact Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div>
                                <label className="block text-sm font-medium text-primary mb-1 pl-1">First Name</label>
                                <input required type="text" className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-accent outline-none text-primary" placeholder="Aditya" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-primary mb-1 pl-1">Last Name</label>
                                <input required type="text" className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-accent outline-none text-primary" placeholder="Sharma" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-primary mb-1 pl-1">Email Address</label>
                                <input required type="email" className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-accent outline-none text-primary" placeholder="aditya@example.com" />
                            </div>
                        </div>

                        <hr className="border-border mb-8" />

                        {/* Shipping Info */}
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">2</span>
                            Shipping Address
                        </h2>
                        <div className="grid grid-cols-1 gap-4 mb-8">
                            <div>
                                <label className="block text-sm font-medium text-primary mb-1 pl-1">Street Address</label>
                                <input required type="text" className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-accent outline-none text-primary" placeholder="123 Premium Lane" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-primary mb-1 pl-1">City</label>
                                    <input required type="text" className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-accent outline-none text-primary" placeholder="Mumbai" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-primary mb-1 pl-1">Postal Code</label>
                                    <input required type="text" className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-accent outline-none text-primary" placeholder="400001" />
                                </div>
                            </div>
                        </div>

                        <hr className="border-border mb-8" />

                        {/* Payment Info */}
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">3</span>
                            Payment Details
                        </h2>
                        <div className="bg-bg-secondary p-6 rounded-xl border border-border mb-8">
                            <div className="flex items-center gap-3 mb-6 text-primary font-semibold">
                                <FiCreditCard size={24} />
                                <span>Credit / Debit Card (Demo)</span>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <input required type="text" className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-accent outline-none font-mono text-primary" placeholder="Card Number (0000 0000 0000 0000)" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input required type="text" className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-accent outline-none text-primary" placeholder="MM/YY" />
                                    <input required type="text" className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-accent outline-none text-primary" placeholder="CVC" />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isProcessing}
                            className="w-full bg-primary hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-3 shadow-md disabled:bg-gray-400 disabled:cursor-wait"
                        >
                            {isProcessing ? (
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <FiLock />
                                    <span>Pay Securely with Razorpay (₹{getCartTotal().toLocaleString('en-IN')})</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-5 bg-bg-secondary p-8 rounded-2xl border border-border sticky top-28 animate-in fade-in slide-in-from-right-4">
                    <h2 className="text-xl font-bold mb-6">In Your Cart</h2>

                    <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                        {items.map(item => (
                            <div key={item.id} className="flex gap-4 items-center">
                                <div
                                    className="w-16 h-16 rounded-lg bg-white border border-border bg-cover bg-center flex-shrink-0 relative"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                >
                                    <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                        {item.quantity}
                                    </span>
                                </div>
                                <div className="flex-grow">
                                    <h4 className="text-sm font-semibold text-primary line-clamp-1">{item.name}</h4>
                                    <p className="text-xs text-secondary">{item.category}</p>
                                </div>
                                <div className="font-semibold text-primary">
                                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-border pt-6 space-y-3 text-sm">
                        <div className="flex justify-between text-secondary">
                            <span>Subtotal</span>
                            <span className="font-medium text-primary">₹{getCartTotal().toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-secondary">
                            <span>Shipping</span>
                            <span className="font-medium text-green-600">Free</span>
                        </div>
                        <div className="flex justify-between text-secondary">
                            <span>Taxes</span>
                            <span className="font-medium text-primary">₹0</span>
                        </div>

                        <div className="border-t border-border pt-4 mt-4 flex justify-between items-center">
                            <span className="font-bold text-lg">Total</span>
                            <span className="font-bold text-2xl text-primary">₹{getCartTotal().toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
