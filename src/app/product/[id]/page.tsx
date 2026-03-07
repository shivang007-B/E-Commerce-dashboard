import Link from "next/link";
import { Star, Truck, RefreshCw, Zap } from "lucide-react";
import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";
import { notFound } from "next/navigation";
import { getProductXP } from "@/lib/gamification";
import ProductActions from "./ProductActions";

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
    const { id } = await params;
    await dbConnect();

    let product = null;
    try {
        const dbProduct = await Product.findById(id).lean();
        if (dbProduct) product = JSON.parse(JSON.stringify(dbProduct));
    } catch (e) { console.error("Invalid ID format", e); }

    if (!product) return notFound();

    const images = product.images?.length > 0 ? product.images : [product.image, product.image, product.image, product.image];
    const xpReward = getProductXP(product.price);

    return (
        <div className="min-h-screen bg-[var(--deep-space)] py-10 px-6">
            <div className="max-w-[1280px] mx-auto">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-10">
                    <Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link>
                    <span className="text-slate-700">/</span>
                    <Link href="/" className="hover:text-indigo-400 transition-colors">{product.category}</Link>
                    <span className="text-slate-700">/</span>
                    <span className="text-white">{product.name}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Image Gallery */}
                    <div className="w-full lg:w-3/5 flex flex-col-reverse md:flex-row gap-6">
                        <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">
                            {images.slice(0, 4).map((img: string, i: number) => (
                                <div key={i} className="w-[100px] h-[80px] glass rounded-2xl flex items-center justify-center shrink-0 cursor-pointer overflow-hidden hover:border-indigo-500/30 transition-all">
                                    <div className="w-3/4 h-3/4 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${img})` }} />
                                </div>
                            ))}
                        </div>

                        <div className="flex-1 glass rounded-3xl flex items-center justify-center h-[500px] overflow-hidden relative group">
                            <div
                                className="w-4/5 h-4/5 bg-contain bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                                style={{ backgroundImage: `url(${product.image})` }}
                            />
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-indigo-500/30 rounded-2xl px-3 py-2 flex items-center gap-2">
                                <Zap size={12} className="text-indigo-400" />
                                <span className="text-sm text-indigo-400 font-black font-mono">+{xpReward} XP</span>
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="w-full lg:w-2/5 flex flex-col">
                        <h1 className="text-3xl font-black tracking-tight text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>{product.name}</h1>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} className={i < Math.floor(product.rating || 5) ? "fill-current" : "text-slate-700"} />
                                ))}
                            </div>
                            <span className="text-slate-500 text-sm font-mono">({product.reviewCount || 150} Reviews)</span>
                            <span className="text-slate-700">|</span>
                            <span className="text-green-400 text-sm font-bold">{product.inStock !== false ? "In Stock" : "Out of Stock"}</span>
                        </div>

                        <p className="text-3xl font-black text-indigo-400 mb-4 font-mono">₹{product.price.toLocaleString('en-IN')}</p>

                        {/* XP Teaser */}
                        <div className="mb-6 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                            <p className="text-xs text-slate-400 flex items-center gap-2">
                                <Zap size={12} className="text-indigo-400" />
                                Purchase to earn <span className="text-indigo-400 font-bold">+{xpReward} XP</span> and
                                <span className="text-yellow-400 font-bold">+{Math.floor(product.price * 0.05)} Points</span>
                            </p>
                        </div>

                        <p className="text-sm text-slate-400 leading-relaxed mb-6 border-b border-white/5 pb-6">
                            {product.description || "Premium product engineered for peak performance."}
                        </p>

                        <ProductActions product={product} />

                        {/* Delivery */}
                        <div className="glass rounded-2xl flex flex-col overflow-hidden mt-8">
                            <div className="p-5 flex items-start gap-4 border-b border-white/5">
                                <Truck size={20} className="shrink-0 mt-0.5 text-indigo-400" />
                                <div>
                                    <h3 className="font-bold text-white text-sm">Free Delivery</h3>
                                    <p className="text-xs text-slate-500 mt-0.5">Enter postal code for availability</p>
                                </div>
                            </div>
                            <div className="p-5 flex items-start gap-4">
                                <RefreshCw size={20} className="shrink-0 mt-0.5 text-sky-400" />
                                <div>
                                    <h3 className="font-bold text-white text-sm">Return Delivery</h3>
                                    <p className="text-xs text-slate-500 mt-0.5">Free 30 Days Returns</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
