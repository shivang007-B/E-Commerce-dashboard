"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiPackage, FiLogOut, FiSettings, FiCreditCard, FiLock } from "react-icons/fi";
import Link from "next/link";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("orders");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated") {
            fetch("/api/orders")
                .then(res => res.json())
                .then(data => {
                    setOrders(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to load orders", err);
                    setLoading(false);
                });
        }
    }, [status, router]);

    if (status === "loading" || loading) {
        return (
            <div className="flex-grow flex items-center justify-center min-h-[50vh]">
                <div className="text-secondary font-medium animate-pulse">Loading profile data...</div>
            </div>
        );
    }

    if (!session) return null;

    const isAdmin = (session.user as any).role === "admin";

    return (
        <div className="container mx-auto px-6 py-12 flex-grow">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">

                {/* Sidebar / Profile Summary */}
                <div className="w-full md:w-1/3 lg:w-1/4">
                    <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden sticky top-28">
                        <div className="p-8 text-center border-b border-border bg-bg-secondary flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold mb-4 shadow-md">
                                {session.user?.image ? (
                                    <img src={session.user.image} alt="User" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    session.user?.name?.charAt(0) || "U"
                                )}
                            </div>
                            <h2 className="text-xl font-bold text-primary">{session.user?.name}</h2>
                            <p className="text-sm text-secondary">{session.user?.email}</p>

                            {isAdmin && (
                                <span className="mt-3 inline-block bg-accent/10 text-accent font-semibold text-xs px-3 py-1 rounded-full border border-accent/20">
                                    Admin Account
                                </span>
                            )}
                        </div>

                        <div className="p-4 flex flex-col gap-2">
                            <button
                                onClick={() => setActiveTab("orders")}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${activeTab === "orders" ? "bg-primary text-white" : "text-secondary hover:bg-bg-secondary hover:text-primary"}`}
                            >
                                <FiPackage size={18} /> Order History
                            </button>
                            <button
                                onClick={() => setActiveTab("settings")}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${activeTab === "settings" ? "bg-primary text-white" : "text-secondary hover:bg-bg-secondary hover:text-primary"}`}
                            >
                                <FiSettings size={18} /> Account Settings
                            </button>

                            {isAdmin && (
                                <Link
                                    href="/admin/dashboard"
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm text-accent hover:bg-accent/10"
                                >
                                    <FiUser size={18} /> Admin Dashboard
                                </Link>
                            )}

                            <div className="my-2 border-t border-border"></div>

                            <button
                                onClick={() => signOut()}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm text-red-500 hover:bg-red-50"
                            >
                                <FiLogOut size={18} /> Sign Out
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="w-full md:w-2/3 lg:w-3/4">
                    <div className="bg-white rounded-2xl shadow-sm border border-border p-8 min-h-[500px]">
                        {activeTab === "orders" && (
                            <div className="animate-in fade-in duration-300">
                                <h1 className="text-2xl font-bold text-primary mb-6">Your Order History</h1>

                                {orders.length === 0 ? (
                                    <div className="text-center py-16 bg-bg-secondary rounded-xl border border-dashed border-border flex flex-col items-center">
                                        <FiPackage size={48} className="text-text-muted mb-4" />
                                        <h3 className="text-lg font-semibold text-primary mb-2">No orders found</h3>
                                        <p className="text-secondary mb-6 text-sm">You haven't placed any orders with ShopNova yet.</p>
                                        <Link href="/#shop" className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                                            Start Shopping
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {orders.map((order, i) => (
                                            <div key={order._id} className="border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-hover transition-shadow">
                                                {/* Order Header */}
                                                <div className="bg-bg-secondary px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between border-b border-border gap-4">
                                                    <div className="flex gap-8">
                                                        <div>
                                                            <p className="text-xs text-secondary uppercase font-semibold mb-1">Order Placed</p>
                                                            <p className="text-sm font-medium text-primary">{new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-secondary uppercase font-semibold mb-1">Total</p>
                                                            <p className="text-sm font-medium text-primary">₹{order.totalAmount.toLocaleString('en-IN')}</p>
                                                        </div>
                                                    </div>
                                                    <div className="sm:text-right">
                                                        <p className="text-xs text-secondary uppercase font-semibold mb-1">Order #</p>
                                                        <p className="text-sm font-mono text-primary font-medium">{order._id.substring(order._id.length - 8).toUpperCase()}</p>
                                                    </div>
                                                </div>

                                                {/* Order Status & Products */}
                                                <div className="p-6">
                                                    <div className="flex items-center gap-2 mb-6">
                                                        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${order.paymentStatus === 'paid' ? 'bg-green-50 text-green-600 border-green-200' :
                                                            order.paymentStatus === 'failed' ? 'bg-red-50 text-red-600 border-red-200' :
                                                                'bg-yellow-50 text-yellow-600 border-yellow-200'
                                                            }`}>
                                                            {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                                        </span>
                                                    </div>

                                                    <div className="space-y-4">
                                                        {order.products.map((item: any, idx: number) => (
                                                            <div key={idx} className="flex gap-4">
                                                                <div
                                                                    className="w-20 h-20 rounded-lg bg-bg-secondary border border-border bg-cover bg-center flex-shrink-0"
                                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                                ></div>
                                                                <div className="flex flex-col justify-center">
                                                                    <h4 className="font-semibold text-primary">{item.name}</h4>
                                                                    <p className="text-sm text-secondary">Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "settings" && (
                            <div className="animate-in fade-in duration-300">
                                <h1 className="text-2xl font-bold text-primary mb-6">Account Settings</h1>
                                <p className="text-secondary mb-8">Manage your personal information, security, and preferences.</p>

                                <div className="space-y-6 max-w-lg">
                                    <div>
                                        <label className="block text-sm font-medium text-primary mb-1 pl-1">Display Name</label>
                                        <input disabled type="text" value={session.user?.name || ""} className="w-full px-4 py-3 border border-border rounded-xl bg-bg-secondary text-primary cursor-not-allowed opacity-70" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-primary mb-1 pl-1">Email Address</label>
                                        <input disabled type="email" value={session.user?.email || ""} className="w-full px-4 py-3 border border-border rounded-xl bg-bg-secondary text-primary cursor-not-allowed opacity-70" />
                                        <p className="text-xs text-secondary mt-2 pl-1 flex items-center gap-1">
                                            <FiLock className="inline" /> Your email is linked to your NextAuth sign-in provider.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
