"use client";

import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiShield, FiShoppingCart } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function CartPage() {
    const [isClient, setIsClient] = useState(false);
    const { items, increaseQuantity, decreaseQuantity, removeItem, getCartTotal } = useCartStore();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return <div className="min-h-[50vh] flex items-center justify-center">Loading cart...</div>;

    return (
        <div className="container mx-auto px-6 py-12 flex-grow">
            <h1 className="text-3xl font-bold text-primary mb-8">Shopping Cart</h1>

            {items.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-border p-12 text-center animate-in fade-in">
                    <div className="w-24 h-24 bg-bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiShoppingCart size={40} className="text-secondary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                    <p className="text-secondary mb-8">Looks like you haven't added any premium products to your cart yet.</p>
                    <Link
                        href="/#shop"
                        className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
                    >
                        Start Shopping <FiArrowRight />
                    </Link>
                </div>
            ) : (
                <div className="lg:grid lg:grid-cols-12 gap-12 items-start animate-in fade-in">
                    {/* Cart Items */}
                    <div className="lg:col-span-8 space-y-6">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-border flex flex-col sm:flex-row gap-6 items-center"
                            >
                                <div
                                    className="w-32 h-32 bg-bg-secondary rounded-xl bg-cover bg-center flex-shrink-0"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                ></div>

                                <div className="flex-grow flex flex-col justify-between h-full w-full">
                                    <div className="flex justify-between items-start mb-4 sm:mb-0 w-full">
                                        <div>
                                            <p className="text-sm font-semibold text-secondary uppercase tracking-wide mb-1">{item.category}</p>
                                            <h3 className="text-lg font-bold text-primary">{item.name}</h3>
                                        </div>
                                        <span className="text-lg font-bold text-primary">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                    </div>

                                    <div className="flex justify-between items-center w-full mt-4">
                                        <div className="flex items-center gap-4 bg-bg-secondary rounded-full px-4 py-2 border border-border">
                                            <button
                                                onClick={() => decreaseQuantity(item.id)}
                                                className="text-secondary hover:text-primary transition-colors"
                                            >
                                                <FiMinus size={16} />
                                            </button>
                                            <span className="font-semibold w-6 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => increaseQuantity(item.id)}
                                                className="text-secondary hover:text-primary transition-colors"
                                            >
                                                <FiPlus size={16} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 p-2.5 rounded-full transition-colors flex items-center justify-center"
                                            title="Remove item"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="lg:col-span-4 mt-8 lg:mt-0 sticky top-28">
                        <div className="bg-white rounded-2xl shadow-hover border border-border p-8">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6 text-sm">
                                <div className="flex justify-between text-secondary">
                                    <span>Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                                    <span className="font-medium text-primary">₹{getCartTotal().toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-secondary">
                                    <span>Shipping Estimate</span>
                                    <span className="font-medium text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between text-secondary">
                                    <span>Tax</span>
                                    <span className="font-medium text-primary">Calculated at checkout</span>
                                </div>
                            </div>

                            <div className="border-t border-border pt-6 mb-8">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-lg">Total</span>
                                    <span className="font-bold text-2xl text-primary">₹{getCartTotal().toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-4 px-6 rounded-xl hover:bg-gray-800 transition-colors shadow-sm"
                            >
                                Proceed to Checkout <FiArrowRight />
                            </Link>

                            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-secondary">
                                <FiShield size={16} />
                                <span>100% Secure Checkout Guarantee</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
