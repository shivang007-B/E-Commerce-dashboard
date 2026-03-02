"use client";

import Link from "next/link";
import { FiTwitter, FiInstagram, FiFacebook } from "react-icons/fi";

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-20 pb-6 mt-16" id="contact">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
                    {/* Brand Col */}
                    <div className="flex flex-col gap-4">
                        <span className="text-2xl font-bold tracking-tight mb-2">Exclusive</span>
                        <h4 className="text-lg font-medium">Subscribe</h4>
                        <p className="text-gray-300 text-sm mb-2">
                            Get 10% off your first order
                        </p>
                        <form className="flex relative w-64" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!') }}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                required
                                className="bg-transparent border border-white text-white px-4 py-3 rounded flex-grow placeholder:text-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-white transition-shadow"
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-0 bottom-0 px-4 text-white hover:text-gray-300"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </button>
                        </form>
                    </div>

                    {/* Support Links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xl font-medium mb-2">Support</h4>
                        <p className="text-gray-300 text-sm max-w-[200px]">
                            111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
                        </p>
                        <p className="text-gray-300 text-sm">exclusive@gmail.com</p>
                        <p className="text-gray-300 text-sm">+88015-88888-9999</p>
                    </div>

                    {/* Account Links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xl font-medium mb-2">Account</h4>
                        <Link href="#" className="text-gray-300 hover:text-white text-sm transition-colors">My Account</Link>
                        <Link href="/login" className="text-gray-300 hover:text-white text-sm transition-colors">Login / Register</Link>
                        <Link href="/cart" className="text-gray-300 hover:text-white text-sm transition-colors">Cart</Link>
                        <Link href="/wishlist" className="text-gray-300 hover:text-white text-sm transition-colors">Wishlist</Link>
                        <Link href="/#shop" className="text-gray-300 hover:text-white text-sm transition-colors">Shop</Link>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xl font-medium mb-2">Quick Link</h4>
                        <Link href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Terms Of Use</Link>
                        <Link href="#" className="text-gray-300 hover:text-white text-sm transition-colors">FAQ</Link>
                        <Link href="/#contact" className="text-gray-300 hover:text-white text-sm transition-colors">Contact</Link>
                    </div>

                    {/* App Links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xl font-medium mb-2">Download App</h4>
                        <p className="text-gray-400 text-xs font-medium">Save $3 with App New User Only</p>
                        <div className="flex gap-2">
                            {/* Placeholder for QR Code and App Store links */}
                            <div className="w-20 h-20 bg-gray-800 border border-white flex items-center justify-center text-xs text-gray-400">QR Code</div>
                            <div className="flex flex-col gap-2">
                                <div className="w-28 h-9 border border-white flex items-center justify-center text-xs bg-black text-white">Google Play</div>
                                <div className="w-28 h-9 border border-white flex items-center justify-center text-xs bg-black text-white">App Store</div>
                            </div>
                        </div>
                        <div className="flex gap-6 mt-4">
                            <a href="#" className="text-white hover:text-gray-300 transition-colors"><FiFacebook size={24} /></a>
                            <a href="#" className="text-white hover:text-gray-300 transition-colors"><FiTwitter size={24} /></a>
                            <a href="#" className="text-white hover:text-gray-300 transition-colors"><FiInstagram size={24} /></a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
                    <p className="flex items-center justify-center gap-2">
                        <span>© Copyright Rimel 2022. All right reserved</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
