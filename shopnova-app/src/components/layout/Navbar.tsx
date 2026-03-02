"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiUser, FiLogOut, FiShoppingCart } from "react-icons/fi";
import { usePathname } from "next/navigation";
import CartBadge from "@/components/ui/CartBadge";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();

    // Remove the mock cart state

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/#shop" },
        { name: "Categories", href: "/#categories" },
        { name: "About", href: "/#about" },
        { name: "Contact", href: "/#contact" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl text-white">
            {/* Top Bar */}
            <div className="bg-[#050505] text-[var(--neon-cyan)] text-xs py-2 border-b border-white/5">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex-1 flex justify-center items-center gap-2">
                        <span>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
                        <Link href="/#shop" className="font-semibold underline hover:text-gray-300">
                            ShopNow
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center gap-1 cursor-pointer hover:text-gray-300">
                        <span>English</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="container mx-auto px-6 py-4 flex items-center justify-between mt-2 mb-2">
                {/* Logo */}
                <Link href="/" className="text-2xl font-black tracking-tighter uppercase italic">
                    SHOP<span className="gaming-gradient-text">NOVA</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 font-mono text-sm uppercase tracking-widest text-zinc-300">
                    <Link href="/" className={`hover:text-[var(--neon-cyan)] transition-colors ${pathname === '/' ? 'text-[var(--neon-cyan)]' : ''}`}>Home</Link>
                    <Link href="/#contact" className={`hover:text-[var(--neon-cyan)] transition-colors ${pathname === '/contact' ? 'text-[var(--neon-cyan)]' : ''}`}>Contact</Link>
                    <Link href="/#about" className={`hover:text-[var(--neon-cyan)] transition-colors ${pathname === '/about' ? 'text-[var(--neon-cyan)]' : ''}`}>About</Link>
                    {!session && (
                        <Link href="/signup" className={`hover:text-[var(--neon-purple)] transition-colors ${pathname === '/signup' ? 'text-[var(--neon-purple)]' : ''}`}>Login / Spawn</Link>
                    )}
                </nav>

                {/* Actions (Search, Wishlist, Cart, Profile) */}
                <div className="flex items-center gap-6">
                    {/* Search Bar */}
                    <div className="hidden md:flex items-center bg-[#F5F5F5] px-4 py-2 rounded-md">
                        <input
                            type="text"
                            placeholder="What are you looking for?"
                            className="bg-transparent border-none outline-none text-sm w-48 text-black placeholder-gray-500"
                        />
                        <svg className="w-5 h-5 text-gray-800 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>

                    {/* Wishlist Icon */}
                    <button className="text-primary hover:text-accent transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </button>

                    {/* Cart Icon */}
                    <Link href="/cart" className="flex items-center">
                        <CartBadge />
                    </Link>

                    {/* User Profile / Logout (If logged in) */}
                    {session && (
                        <div className="relative group">
                            <button className="text-primary hover:text-accent transition-colors w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center">
                                <FiUser size={18} />
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md py-2 hidden group-hover:block transition-all z-50">
                                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                    <FiUser /> Manage My Account
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                >
                                    <FiLogOut /> Logout
                                </button>
                            </div>
                        </div>
                    )}

                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white hover:text-[var(--neon-cyan)] transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0c] border-b border-white/10 shadow-lg animate-in slide-in-from-top-2">
                    <div className="flex flex-col p-6 gap-4 font-mono uppercase tracking-widest text-sm text-zinc-300">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`hover:text-[var(--neon-cyan)] ${pathname === '/' ? 'text-[var(--neon-cyan)]' : ''}`}>Home</Link>
                        <Link href="/#contact" onClick={() => setMobileMenuOpen(false)} className={`hover:text-[var(--neon-cyan)] ${pathname === '/contact' ? 'text-[var(--neon-cyan)]' : ''}`}>Contact</Link>
                        <Link href="/#about" onClick={() => setMobileMenuOpen(false)} className={`hover:text-[var(--neon-cyan)] ${pathname === '/about' ? 'text-[var(--neon-cyan)]' : ''}`}>About</Link>
                        <hr className="border-white/10 my-2" />

                        {session ? (
                            <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="flex items-center justify-center gap-2 bg-red-900/50 text-red-400 hover:bg-red-900 hover:text-red-300 border border-red-900/50 px-5 py-3 rounded-md transition-colors">
                                <FiLogOut />
                                <span>Logout</span>
                            </button>
                        ) : (
                            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 bg-[var(--neon-purple)]/20 text-[var(--neon-purple)] border border-[var(--neon-purple)]/30 hover:bg-[var(--neon-purple)]/30 px-5 py-3 rounded-md transition-colors">
                                <FiUser />
                                <span>Spawn / Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
