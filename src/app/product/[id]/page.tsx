import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiStar, FiMinus, FiPlus, FiTruck, FiRefreshCcw } from "react-icons/fi";
import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";
import { notFound } from "next/navigation";

// Type definition for Next.js 13+ Page Props
interface ProductPageProps {
    params: {
        id: string;
    };
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
    // 1. Fetch data from DB
    await dbConnect();

    let product = null;
    try {
        const dbProduct = await Product.findById(params.id).lean();
        if (dbProduct) {
            // Serialize to pass from Server Component to Client
            product = JSON.parse(JSON.stringify(dbProduct));
        }
    } catch (e) {
        console.error("Invalid ID format", e);
    }

    if (!product) {
        return notFound();
    }

    // Ensure arrays exist for rendering
    const images = product.images?.length > 0 ? product.images : [product.image, product.image, product.image, product.image];
    const colors = product.colors?.length > 0 ? product.colors : ["#000000", "#DB4444"];
    const sizes = product.sizes?.length > 0 ? product.sizes : ["XS", "S", "M", "L", "XL"];

    return (
        <div className="container mx-auto px-6 py-10 bg-white">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-10">
                <Link href="/" className="hover:text-black">Account</Link>
                <span>/</span>
                <Link href="/" className="hover:text-black">{product.category}</Link>
                <span>/</span>
                <span className="text-black font-medium">{product.name}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Side - Image Gallery */}
                <div className="w-full lg:w-3/5 flex flex-col-reverse md:flex-row gap-6">
                    {/* Thumbnails */}
                    <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">
                        {images.slice(0, 4).map((img: string, i: number) => (
                            <div key={i} className="w-[170px] h-[138px] bg-[#F5F5F5] rounded flex items-center justify-center shrink-0 cursor-pointer overflow-hidden border-2 border-transparent hover:border-accent transition-colors">
                                <div
                                    className="w-3/4 h-3/4 bg-contain bg-center bg-no-repeat mix-blend-multiply"
                                    style={{ backgroundImage: `url(${img})` }}
                                ></div>
                            </div>
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="flex-1 bg-[#F5F5F5] rounded flex items-center justify-center h-[600px] overflow-hidden">
                        <div
                            className="w-4/5 h-4/5 bg-contain bg-center bg-no-repeat mix-blend-multiply"
                            style={{ backgroundImage: `url(${product.image})` }}
                        ></div>
                    </div>
                </div>

                {/* Right Side - Product Details */}
                <div className="w-full lg:w-2/5 flex flex-col">
                    <h1 className="text-3xl font-semibold mb-3 tracking-wide">{product.name}</h1>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1 text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                                <FiStar key={i} className={i < Math.floor(product.rating || 5) ? "fill-current" : "text-gray-300"} />
                            ))}
                        </div>
                        <span className="text-gray-500 text-sm">({product.reviewCount || 150} Reviews)</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-green-500 text-sm font-medium">{product.inStock !== false ? "In Stock" : "Out of Stock"}</span>
                    </div>

                    <p className="text-2xl font-medium mb-4">₹{product.price.toLocaleString('en-IN')}</p>

                    <p className="text-sm text-gray-700 leading-relaxed mb-6 border-b border-gray-200 pb-6">
                        {product.description || "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive."}
                    </p>

                    {/* Variations (Colors & Sizes) */}
                    <div className="flex flex-col gap-6 mb-8">
                        <div className="flex items-center gap-4">
                            <span className="font-medium w-16">Colours:</span>
                            <div className="flex items-center gap-2">
                                {colors.map((color: string, i: number) => (
                                    <button
                                        key={i}
                                        className={`w-5 h-5 rounded-full border-2 ${i === 0 ? 'border-black' : 'border-transparent'} ring-2 ring-transparent ${i === 0 ? 'ring-offset-1 ring-black' : ''} transition-all`}
                                        style={{ backgroundColor: color }}
                                    ></button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="font-medium w-16">Size:</span>
                            <div className="flex items-center gap-4">
                                {sizes.map((size: string, i: number) => (
                                    <button
                                        key={i}
                                        className={`w-8 h-8 rounded border flex items-center justify-center text-sm font-medium transition-colors ${i === 2 ? 'bg-accent text-white border-accent' : 'border-gray-300 hover:border-black'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Actions: Quantity, Buy, Heart */}
                    <div className="flex items-center gap-4 mb-10 w-full max-w-[400px]">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-gray-400 rounded h-11 w-1/3">
                            <button className="w-1/3 h-full flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent rounded-l transition-colors border-r border-gray-400"><FiMinus /></button>
                            <span className="w-1/3 h-full flex items-center justify-center font-medium">1</span>
                            <button className="w-1/3 h-full flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent rounded-r transition-colors border-l border-gray-400"><FiPlus /></button>
                        </div>

                        {/* Buy Now Button */}
                        <button className="flex-1 bg-accent text-white h-11 rounded font-medium hover:bg-red-600 transition-colors">
                            Buy Now
                        </button>

                        {/* Wishlist Button */}
                        <button className="w-11 h-11 border border-gray-400 rounded flex items-center justify-center hover:bg-gray-50 transition-colors shrink-0">
                            <FiHeart size={20} />
                        </button>
                    </div>

                    {/* Delivery Info Boxes */}
                    <div className="border border-gray-300 rounded flex flex-col">
                        <div className="p-6 flex items-start gap-4 border-b border-gray-300">
                            <FiTruck size={32} className="shrink-0 pt-1" />
                            <div>
                                <h3 className="font-medium mb-1">Free Delivery</h3>
                                <Link href="#" className="text-xs text-gray-500 font-medium underline">Enter your postal code for Delivery Availability</Link>
                            </div>
                        </div>
                        <div className="p-6 flex items-start gap-4">
                            <FiRefreshCcw size={32} className="shrink-0 pt-1" />
                            <div>
                                <h3 className="font-medium mb-1">Return Delivery</h3>
                                <p className="text-xs text-gray-500 font-medium">Free 30 Days Delivery Returns. <Link href="#" className="underline">Details</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
