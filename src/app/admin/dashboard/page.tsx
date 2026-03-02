"use client";

import { useEffect, useState } from "react";
import { FiDollarSign, FiShoppingBag, FiPackage } from "react-icons/fi";

export default function AdminDashboard() {
    const [orders, setOrders] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch("/api/admin/orders").then(res => res.json()),
            fetch("/api/products").then(res => res.json())
        ])
            .then(([ordersData, productsData]) => {
                setOrders(Array.isArray(ordersData) ? ordersData : []);
                setProducts(Array.isArray(productsData) ? productsData : []);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading dashboard stats...</div>;

    const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
    const totalProductsSold = orders.reduce((acc, order) => {
        return acc + (order.products?.reduce((sum: number, p: any) => sum + p.quantity, 0) || 0);
    }, 0);

    return (
        <div className="animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold text-primary mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-border flex items-center gap-4">
                    <div className="w-14 h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                        <FiDollarSign size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-secondary font-medium">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-primary">₹{totalRevenue.toLocaleString("en-IN")}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-border flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <FiPackage size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-secondary font-medium">Total Orders</p>
                        <h3 className="text-2xl font-bold text-primary">{orders.length}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-border flex items-center gap-4">
                    <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                        <FiShoppingBag size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-secondary font-medium">Products Catalog</p>
                        <h3 className="text-2xl font-bold text-primary">{products.length}</h3>
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-bold text-primary mb-6">Recent Orders</h2>
            <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-bg-secondary text-secondary text-sm">
                            <th className="p-4 font-semibold">Order ID</th>
                            <th className="p-4 font-semibold">Customer</th>
                            <th className="p-4 font-semibold">Date</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.slice(0, 5).map(order => (
                            <tr key={order._id} className="border-b border-border last:border-b-0 hover:bg-gray-50">
                                <td className="p-4 font-mono text-xs">{order._id.substring(order._id.length - 8).toUpperCase()}</td>
                                <td className="p-4 text-sm font-medium">{order.userId?.name || "Guest"}</td>
                                <td className="p-4 text-sm text-secondary">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${order.paymentStatus === 'paid' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                                        }`}>
                                        {order.paymentStatus}
                                    </span>
                                </td>
                                <td className="p-4 text-right font-medium">₹{order.totalAmount.toLocaleString("en-IN")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && (
                    <div className="p-8 text-center text-secondary">No recent orders.</div>
                )}
            </div>
        </div>
    );
}
