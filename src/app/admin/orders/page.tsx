"use client";

import { useEffect, useState } from "react";
import { FiPackage, FiEye } from "react-icons/fi";

export default function AdminOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/orders")
            .then(res => res.json())
            .then(data => setOrders(Array.isArray(data) ? data : []))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading orders...</div>;

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">Manage Orders</h1>
                    <p className="text-secondary text-sm">View and manage all customer purchases.</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                {orders.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center">
                        <FiPackage size={48} className="text-text-muted mb-4" />
                        <h3 className="text-lg font-bold text-primary mb-2">No Orders Found</h3>
                        <p className="text-secondary mb-6 hover:text-primary">Waiting for the first customer purchase...</p>
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-bg-secondary text-secondary text-sm">
                                <th className="p-4 font-semibold">Order ID</th>
                                <th className="p-4 font-semibold">Customer</th>
                                <th className="p-4 font-semibold">Date</th>
                                <th className="p-4 font-semibold">Total</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id} className="border-b border-border last:border-b-0 hover:bg-gray-50 flex-wrap">
                                    <td className="p-4 font-mono text-xs">{order._id.substring(order._id.length - 8).toUpperCase()}</td>
                                    <td className="p-4">
                                        <p className="text-sm font-semibold">{order.userId?.name || "Guest"}</p>
                                        <p className="text-xs text-secondary">{order.userId?.email || "No email"}</p>
                                    </td>
                                    <td className="p-4 text-sm text-secondary">{new Date(order.createdAt).toLocaleString()}</td>
                                    <td className="p-4 font-medium text-primary">₹{order.totalAmount.toLocaleString("en-IN")}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full border ${order.paymentStatus === 'paid' ? 'bg-green-50 text-green-600 border-green-200' :
                                                order.paymentStatus === 'failed' ? 'bg-red-50 text-red-600 border-red-200' :
                                                    'bg-yellow-50 text-yellow-600 border-yellow-200'
                                            }`}>
                                            {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="p-2 text-secondary hover:text-accent bg-bg-secondary hover:bg-accent/10 rounded-lg transition-colors" title="View Details">
                                            <FiEye size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
