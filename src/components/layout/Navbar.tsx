"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, User, LogOut, Gift, ShoppingCart, Search, Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import CartBadge from "@/components/ui/CartBadge";
import { useSession, signOut } from "next-auth/react";
import XPProgressBar from "@/components/gamification/XPProgressBar";
import { useGamificationStore } from "@/store/useGamificationStore";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();
    const { xp, points, tier } = useGamificationStore();

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass-strong text-white">
            {/* Top Bar */}
            <div className="bg-[var(--midnight)] text-indigo-400 text-xs py-2 border-b border-white/5">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex-1 flex justify-center items-center gap-2">
                        <span className="animate-pulse">🎮</span>
                        <span className="text-slate-400">Earn XP on every purchase • Level Up • Unlock Rewards</span>
                        <Link href="/rewards" className="font-semibold text-indigo-400 hover:text-indigo-300 underline ml-2">
                            Play Now →
                        </Link>
                    </div>
                    {isClient && (
                        <div className="hidden md:flex items-center gap-3">
                            <span className="text-yellow-400 font-bold font-mono">💎 {points} pts</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Navbar */}
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-black tracking-tight uppercase" style={{ fontFamily: "var(--font-display)" }}>
                    SHOP<span className="gaming-gradient-text">NOVA</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                    <Link href="/" className={`hover:text-indigo-400 transition-colors ${pathname === '/' ? 'text-indigo-400' : ''}`}>Home</Link>
                    <Link href="/rewards" className={`hover:text-fuchsia-400 transition-colors flex items-center gap-1.5 ${pathname === '/rewards' ? 'text-fuchsia-400' : ''}`}>
                        <Gift size={14} />
                        Rewards
                    </Link>
                    <Link href="/#contact" className="hover:text-indigo-400 transition-colors">Contact</Link>
                    <Link href="/#about" className="hover:text-indigo-400 transition-colors">About</Link>
                    {!session && (
                        <Link href="/signup" className="hover:text-sky-400 transition-colors">Login / Spawn</Link>
                    )}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-5">
                    {/* XP/Level Indicator */}
                    {isClient && (
                        <Link href="/profile" className="hidden md:flex items-center gap-3 glass rounded-full px-4 py-2 hover:border-indigo-500/30 transition-all group">
                            <XPProgressBar xp={xp} compact />
                        </Link>
                    )}

                    {/* Search */}
                    <div className="hidden lg:flex items-center glass rounded-xl px-4 py-2">
                        <input
                            type="text"
                            placeholder="Search gear..."
                            className="bg-transparent border-none outline-none text-sm w-36 text-slate-300 placeholder-slate-600"
                        />
                        <Search size={16} className="text-slate-500" />
                    </div>

                    {/* Wishlist */}
                    <button className="text-slate-500 hover:text-fuchsia-400 transition-colors">
                        <Heart size={20} />
                    </button>

                    {/* Cart */}
                    <Link href="/cart" className="flex items-center">
                        <CartBadge />
                    </Link>

                    {/* User Profile */}
                    {session && (
                        <div className="relative group">
                            <button className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-indigo-500/20">
                                <User size={16} />
                            </button>
                            <div className="absolute right-0 mt-2 w-52 glass-strong rounded-2xl py-2 hidden group-hover:block transition-all z-50 shadow-2xl">
                                <Link href="/profile" className="block px-4 py-3 text-sm text-slate-300 hover:bg-white/5 flex items-center gap-2 transition-colors rounded-xl mx-1">
                                    <User size={14} /> Player Profile
                                </Link>
                                <Link href="/rewards" className="block px-4 py-3 text-sm text-slate-300 hover:bg-white/5 flex items-center gap-2 transition-colors rounded-xl mx-1">
                                    <Gift size={14} /> Rewards Center
                                </Link>
                                <hr className="border-white/5 my-1" />
                                <button
                                    onClick={() => signOut()}
                                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors rounded-xl mx-1"
                                >
                                    <LogOut size={14} /> Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-slate-300 hover:text-indigo-400 transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 glass-strong border-b border-white/5 shadow-2xl">
                    <div className="flex flex-col p-6 gap-4 text-sm text-slate-400">
                        {isClient && (
                            <div className="mb-2 p-3 glass rounded-2xl">
                                <XPProgressBar xp={xp} compact />
                                <div className="flex justify-between mt-2 text-[10px] text-slate-500">
                                    <span>💎 {points} points</span>
                                    <span>{tier} tier</span>
                                </div>
                            </div>
                        )}

                        <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`hover:text-indigo-400 ${pathname === '/' ? 'text-indigo-400' : ''}`}>Home</Link>
                        <Link href="/rewards" onClick={() => setMobileMenuOpen(false)} className={`hover:text-fuchsia-400 flex items-center gap-2 ${pathname === '/rewards' ? 'text-fuchsia-400' : ''}`}>
                            <Gift size={14} /> Rewards
                        </Link>
                        <Link href="/#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-400">Contact</Link>
                        <Link href="/#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-400">About</Link>
                        <hr className="border-white/5 my-2" />

                        {session ? (
                            <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="flex items-center justify-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 px-5 py-3 rounded-xl transition-colors">
                                <LogOut size={16} /> Logout
                            </button>
                        ) : (
                            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-5 py-3 rounded-xl transition-colors">
                                <User size={16} /> Spawn / Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
