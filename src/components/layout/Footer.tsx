"use client";

import Link from "next/link";
import { Twitter, Instagram, Facebook, Send } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[var(--midnight)] text-white pt-20 pb-6 mt-16 border-t border-white/5" id="contact">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <span className="text-2xl font-black tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                            SHOP<span className="gaming-gradient-text">NOVA</span>
                        </span>
                        <h4 className="text-lg font-medium text-white">Subscribe</h4>
                        <p className="text-slate-400 text-sm mb-2">Get 10% off your first order</p>
                        <form className="flex relative w-64" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!') }}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                required
                                className="bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl flex-grow placeholder:text-slate-600 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-shadow"
                            />
                            <button type="submit" className="absolute right-0 top-0 bottom-0 px-4 text-indigo-400 hover:text-indigo-300">
                                <Send size={16} />
                            </button>
                        </form>
                    </div>

                    {/* Support */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-lg font-medium mb-2 text-white">Support</h4>
                        <p className="text-slate-400 text-sm max-w-[200px]">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
                        <p className="text-slate-400 text-sm">exclusive@gmail.com</p>
                        <p className="text-slate-400 text-sm">+88015-88888-9999</p>
                    </div>

                    {/* Account */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-lg font-medium mb-2 text-white">Account</h4>
                        <Link href="/profile" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Player Profile</Link>
                        <Link href="/login" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Login / Register</Link>
                        <Link href="/cart" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Cart</Link>
                        <Link href="/rewards" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Rewards</Link>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-lg font-medium mb-2 text-white">Quick Link</h4>
                        <Link href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Terms Of Use</Link>
                        <Link href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">FAQ</Link>
                        <Link href="/#contact" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Contact</Link>
                    </div>

                    {/* Social */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-lg font-medium mb-2 text-white">Connect</h4>
                        <div className="flex gap-4 mt-2">
                            {[
                                { icon: <Facebook size={18} />, color: "hover:text-sky-400" },
                                { icon: <Twitter size={18} />, color: "hover:text-indigo-400" },
                                { icon: <Instagram size={18} />, color: "hover:text-fuchsia-400" },
                            ].map((s, i) => (
                                <a key={i} href="#" className={`text-slate-500 ${s.color} transition-colors p-2 glass rounded-xl`}>
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-6 text-center text-slate-600 text-sm">
                    <p>© 2024 ShopNova. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
