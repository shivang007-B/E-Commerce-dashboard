"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { FiHome, FiShoppingBag, FiPackage, FiLogOut } from "react-icons/fi";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated" && (session?.user as any).role !== "admin") {
            router.push("/");
        }
    }, [status, router, session]);

    if (!mounted || status === "loading") {
        return <div className="min-h-screen flex items-center justify-center">Loading admin...</div>;
    }

    if (status === "authenticated" && (session?.user as any).role === "admin") {
        const navItems = [
            { name: "Dashboard", href: "/admin/dashboard", icon: <FiHome /> },
            { name: "Products", href: "/admin/products", icon: <FiShoppingBag /> },
            { name: "Orders", href: "/admin/orders", icon: <FiPackage /> },
        ];

        return (
            <div className="flex flex-col md:flex-row min-h-screen bg-bg-secondary w-full pt-20">
                {/* Admin Sidebar */}
                <aside className="w-full md:w-64 bg-white border-r border-border shrink-0 shadow-sm sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-primary mb-8 px-2 space-y-1">
                            Admin Panel
                            <span className="block text-xs text-accent font-medium uppercase tracking-widest mt-1">ShopNova</span>
                        </h2>
                        <nav className="flex flex-col gap-2">
                            {navItems.map((item) => {
                                const active = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${active ? "bg-primary text-white shadow-md" : "text-secondary hover:bg-bg-secondary hover:text-primary"
                                            }`}
                                    >
                                        <span className={active ? "text-white" : ""}>{item.icon}</span>
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </aside>

                {/* Dashboard Content */}
                <main className="flex-grow p-8 max-w-7xl mx-auto w-full">
                    {children}
                </main>
            </div>
        );
    }

    return null;
}
