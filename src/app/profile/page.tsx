"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function PlayerProfile() {
    const { data: session, status } = useSession();
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        if (session) {
            fetch("/api/orders")
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setOrders(data);
                    }
                })
                .catch(console.error);
        }
    }, [session]);

    if (status === "loading") {
        return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[var(--neon-cyan)] font-mono animate-pulse">Initializing Interface...</div>;
    }

    if (!session) {
        return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-red-500 font-mono">Access Denied: Please authentic to access Player Profile.</div>;
    }

    return (
        <div className="min-h-screen bg-[#050505] p-8 text-white font-mono pt-12">
            <div className="max-w-4xl mx-auto border-2 border-[var(--neon-cyan)] p-6 bg-black/40 backdrop-blur-md relative overflow-hidden">
                {/* Decorative HUD Scanline */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--neon-cyan)]/5 to-transparent h-1 w-full animate-scanline pointer-events-none" />

                <header className="flex justify-between items-end border-b-2 border-[var(--neon-cyan)]/30 pb-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-black italic tracking-tighter uppercase relative z-10">User Profile</h1>
                        <p className="text-[var(--neon-cyan)] text-xs mt-1 relative z-10">Status: Online // Sector 7G</p>
                    </div>
                    <div className="text-right relative z-10">
                        <p className="text-zinc-500 text-[10px] uppercase">Connection Established</p>
                        <p className="text-sm text-zinc-300">Active</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    {/* Stats Column */}
                    <div className="space-y-6">
                        <div className="bg-zinc-900/50 p-4 border-l-4 border-[var(--neon-pink)]">
                            <p className="text-zinc-500 text-[10px] uppercase">Alias</p>
                            <p className="text-xl font-bold">{session?.user?.name || "Unknown_Entity"}</p>
                        </div>
                        <div className="bg-zinc-900/50 p-4 border-l-4 border-[var(--neon-purple)]">
                            <p className="text-zinc-500 text-[10px] uppercase">Comms Link (Email)</p>
                            <p className="text-sm font-bold break-all">{session?.user?.email || "N/A"}</p>
                        </div>
                        <div className="bg-zinc-900/50 p-4 border-l-4 border-[var(--neon-cyan)]">
                            <p className="text-zinc-500 text-[10px] uppercase">Class</p>
                            <p className="text-xl font-bold uppercase">Operative</p>
                        </div>
                    </div>

                    {/* Quest Log (Order History) */}
                    <div className="md:col-span-2">
                        <h2 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
                            <span className="h-2 w-2 bg-[var(--neon-cyan)] animate-pulse" />
                            Recent Quest Log (Orders)
                        </h2>
                        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {orders.length === 0 ? (
                                <div className="p-4 bg-white/5 border border-white/10 text-center text-zinc-500 text-sm italic">No quests completed yet.</div>
                            ) : (
                                orders.map((order: any) => (
                                    <div key={order._id} className="flex flex-col sm:flex-row justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group gap-4">
                                        <div>
                                            <p className="text-sm font-bold text-[var(--neon-cyan)]">#ORD-{order._id.substring(order._id.length - 6).toUpperCase()}</p>
                                            <p className="text-[10px] text-zinc-400 mt-1">{order.items?.length || 0} Items // {order.status || 'Processing'}</p>
                                            <p className="text-[10px] text-zinc-600 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-left sm:text-right flex flex-col justify-between">
                                            <p className="text-[var(--neon-pink)] font-bold text-lg">₹{order.totalAmount?.toLocaleString('en-IN')}</p>
                                            <button className="text-[10px] uppercase tracking-widest text-zinc-400 group-hover:text-white mt-2 sm:mt-0 transition-colors">View Data</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
