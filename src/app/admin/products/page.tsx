"use client";

import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiBox } from "react-icons/fi";

export default function AdminProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/products")
            .then(res => res.json())
            .then(data => setProducts(Array.isArray(data) ? data : []))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
            if (res.ok) {
                setProducts(products.filter(p => p._id !== id));
            } else {
                alert("Failed to delete product");
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div>Loading products...</div>;

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">Manage Products</h1>
                    <p className="text-secondary text-sm">Add, edit, or remove products from your store catalog.</p>
                </div>
                <button className="bg-primary text-white font-medium px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-hover">
                    <FiPlus /> Add New Product
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                {products.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center">
                        <FiBox size={48} className="text-text-muted mb-4" />
                        <h3 className="text-lg font-bold text-primary mb-2">No Products Found</h3>
                        <p className="text-secondary mb-6 hover:text-primary">Click 'Add New Product' to stock your catalog.</p>
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-bg-secondary text-secondary text-sm">
                                <th className="p-4 font-semibold">Product Name</th>
                                <th className="p-4 font-semibold">Category</th>
                                <th className="p-4 font-semibold">Price</th>
                                <th className="p-4 font-semibold">Stock</th>
                                <th className="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id} className="border-b border-border last:border-b-0 hover:bg-gray-50">
                                    <td className="p-4 flex items-center gap-4">
                                        <div
                                            className="w-12 h-12 rounded-lg bg-cover bg-center border border-border flex-shrink-0"
                                            style={{ backgroundImage: `url(${product.image})` }}
                                        ></div>
                                        <span className="font-semibold text-primary">{product.name}</span>
                                    </td>
                                    <td className="p-4 text-sm text-secondary">{product.category}</td>
                                    <td className="p-4 font-medium text-primary">₹{product.price.toLocaleString("en-IN")}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${product.stock > 10 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                            }`}>
                                            {product.stock} in stock
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 text-secondary hover:text-accent bg-bg-secondary hover:bg-accent/10 rounded-lg transition-colors">
                                                <FiEdit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="p-2 text-secondary hover:text-red-500 bg-bg-secondary hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <FiTrash2 size={16} />
                                            </button>
                                        </div>
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
