"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import {
  FiMonitor,
  FiShoppingBag,
  FiWatch,
  FiHome,
  FiTruck,
  FiRefreshCw,
  FiShield,
  FiPhoneCall,
  FiStar
} from "react-icons/fi";
import { useCartStore } from "@/store/useCartStore";

import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Failed to load products:", data);
          setProducts([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* 1. Hero Section (Sidebar + Main Carousel) */}
      <section className="container mx-auto px-6 py-10 mb-20 bg-white">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar Categories */}
          <div className="w-full md:w-1/4 pr-4 md:border-r border-gray-200 flex flex-col gap-4 text-sm font-medium pt-8">
            <Link href="#" className="flex justify-between items-center hover:text-accent group">
              Woman's Fashion <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link href="#" className="flex justify-between items-center hover:text-accent group">
              Men's Fashion <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link href="#" className="hover:text-accent">Electronics</Link>
            <Link href="#" className="hover:text-accent">Home & Lifestyle</Link>
            <Link href="#" className="hover:text-accent">Medicine</Link>
            <Link href="#" className="hover:text-accent">Sports & Outdoor</Link>
            <Link href="#" className="hover:text-accent">Baby's & Toys</Link>
            <Link href="#" className="hover:text-accent">Groceries & Pets</Link>
            <Link href="#" className="hover:text-accent">Health & Beauty</Link>
          </div>

          {/* Right Hero Carousel Banner */}
          <div className="w-full md:w-3/4 md:pl-8 pt-8">
            <div className="bg-black text-white p-12 flex flex-col md:flex-row items-center justify-between h-[344px] relative">
              <div className="z-10 flex flex-col items-start gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full text-black">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.43 2.05A6.08 6.08 0 0115.17.6 5.86 5.86 0 0113.8 4 5.92 5.92 0 0111 5.37a5.52 5.52 0 011.43-3.32zM15 6a5.7 5.7 0 01-4 1.7 6.13 6.13 0 00-4 1.7 5.87 5.87 0 00-1.8 4 6 6 0 001.2 3.8L8 19c.6 1 1.2 1.3 2 1.3s1.2-.4 2.2-.4 1.5.4 2.3.4 1.3-.3 2-1l1.5-2.2a6.45 6.45 0 01-2.9-5A5.64 5.64 0 0118.5 7.5a6.07 6.07 0 00-3.5-1.5z" /></svg>
                  </div>
                  <span className="text-sm">iPhone 14 Series</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-semibold leading-tight max-w-[300px]">
                  Up to 10%<br />off Voucher
                </h1>
                <Link href="#shop" className="flex items-center gap-2 mt-4 hover:opacity-80 transition-opacity pb-1 border-b border-white">
                  Shop Now <FiArrowRight />
                </Link>
              </div>

              {/* Decorative elements representing the phone image */}
              <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden hidden md:flex items-center justify-end pr-8">
                <div className="w-64 h-64 bg-gray-800 rounded-lg transform rotate-12 flex flex-col justify-end items-center pb-4 opacity-50 relative">
                  <div className="absolute top-8 left-8 w-12 h-12 rounded-full border border-gray-600 bg-gray-900 shadow-inner"></div>
                  <div className="absolute top-24 left-8 w-12 h-12 rounded-full border border-gray-600 bg-gray-900 shadow-inner"></div>
                  <div className="absolute top-16 left-24 w-12 h-12 rounded-full border border-gray-600 bg-gray-900 shadow-inner"></div>
                </div>
              </div>

              {/* Slider Dots Placeholder */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
                <div className="w-3 h-3 rounded-full bg-white opacity-50"></div>
                <div className="w-3 h-3 rounded-full bg-white opacity-50"></div>
                <div className="w-3 h-3 rounded-full bg-accent border-2 border-white"></div>
                <div className="w-3 h-3 rounded-full bg-white opacity-50"></div>
                <div className="w-3 h-3 rounded-full bg-white opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Today's Flash Sales */}
      <section className="container mx-auto px-6 py-10 bg-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-5 h-10 bg-accent rounded-sm"></div>
          <span className="text-accent font-bold text-sm">Today's</span>
        </div>

        <div className="flex flex-col md:flex-row items-end md:items-center justify-between mb-10 gap-8">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-16">
            <h2 className="text-3xl font-bold tracking-wider">Flash Sales</h2>
            <div className="flex items-end gap-4 text-2xl font-bold">
              <div className="flex flex-col items-center"><span className="text-[10px] font-medium text-black">Days</span><span>03</span></div> <span className="text-accent mb-1">:</span>
              <div className="flex flex-col items-center"><span className="text-[10px] font-medium text-black">Hours</span><span>23</span></div> <span className="text-accent mb-1">:</span>
              <div className="flex flex-col items-center"><span className="text-[10px] font-medium text-black">Minutes</span><span>19</span></div> <span className="text-accent mb-1">:</span>
              <div className="flex flex-col items-center"><span className="text-[10px] font-medium text-black">Seconds</span><span>56</span></div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>
        </div>

        {/* Product Grid Mockup for Flash Sales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Flash Sale Item 1 */}
          <div className="group relative bg-[#F5F5F5] rounded flex flex-col">
            <div className="absolute top-3 left-3 bg-accent text-white text-[10px] px-3 py-1 rounded">-40%</div>
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 z-10"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg></button>
              <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 z-10"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></button>
            </div>
            <div className="h-64 flex items-center justify-center p-8">
              <div className="w-full h-full bg-gray-300 rounded shadow-inner flex items-center justify-center relative"><span className="text-gray-500 font-bold">Gamepad Image</span></div>
            </div>
            <button className="absolute bottom-0 left-0 w-full bg-black text-white text-sm font-medium py-2 opacity-0 group-hover:opacity-100 transition-opacity">Add To Cart</button>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-1">HAVIT HV-G92 Gamepad</h3>
            <div className="flex items-center gap-3">
              <span className="text-accent font-semibold">$120</span>
              <span className="text-gray-500 line-through text-sm">$160</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-yellow-500">
              <FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="text-gray-300" />
              <span className="text-gray-500 text-xs ml-1">(88)</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-16 mb-20 border-b border-gray-200 pb-20">
          <button className="bg-accent text-white px-12 py-4 rounded font-medium hover:bg-red-600 transition-colors">
            View All Products
          </button>
        </div>
      </section>

      {/* 3. Browse By Category */}
      <section id="categories" className="container mx-auto px-6 mb-20">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-5 h-10 bg-accent rounded-sm"></div>
          <span className="text-accent font-bold text-sm">Categories</span>
        </div>

        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold tracking-wider">Browse By Category</h2>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 border-b border-gray-200 pb-20">
          {[
            { name: "Phones", icon: <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg> },
            { name: "Computers", icon: <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> },
            { name: "SmartWatch", icon: <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> },
            { name: "Camera", icon: <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>, active: true },
            { name: "HeadPhones", icon: <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg> },
            { name: "Gaming", icon: <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> },
          ].map((cat, i) => (
            <div
              key={i}
              className={`border ${cat.active ? 'bg-accent text-white border-accent' : 'border-gray-300 text-black hover:bg-accent hover:text-white hover:border-accent'} rounded flex flex-col items-center justify-center p-6 aspect-square transition-colors cursor-pointer`}
            >
              {cat.icon}
              <span className="text-sm">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Best Selling Products */}
      <section id="shop" className="container mx-auto px-6 mb-28">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-5 h-10 bg-accent rounded-sm"></div>
          <span className="text-accent font-bold text-sm">This Month</span>
        </div>

        <div className="flex flex-col md:flex-row items-end md:items-center justify-between mb-10 gap-4">
          <h2 className="text-3xl font-bold tracking-wider">Best Selling Products</h2>
          <button className="bg-accent text-white px-10 py-3 rounded font-medium hover:bg-red-600 transition-colors">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full py-12 text-center text-secondary">Loading premium products...</div>
          ) : products.length === 0 ? (
            <div className="col-span-full py-12 text-center text-secondary">No products available.</div>
          ) : products.slice(0, 4).map((product) => (
            <div key={product._id} className="group relative flex flex-col">
              <Link href={`/product/${product._id}`} className="flex flex-col">
                <div className="relative bg-[#F5F5F5] rounded h-64 mb-4 overflow-hidden flex items-center justify-center">
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button onClick={(e) => e.preventDefault()} className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 z-10"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg></button>
                    <button onClick={(e) => e.preventDefault()} className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 z-10"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></button>
                  </div>
                  <div
                    className="w-3/4 h-3/4 bg-contain bg-center bg-no-repeat mix-blend-multiply"
                    style={{ backgroundImage: `url(${product.image})` }}
                  ></div>
                  <button
                    onClick={(e) => { e.preventDefault(); addItem({ ...product, id: product._id }) }}
                    className="absolute bottom-0 left-0 w-full bg-black text-white text-sm font-medium py-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    Add To Cart
                  </button>
                </div>
                <h3 className="font-semibold mb-1 line-clamp-1 hover:text-accent transition-colors">{product.name}</h3>
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-accent font-semibold">₹{product.price.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className={i < Math.floor(product.rating || 5) ? "fill-current" : "text-gray-300"} />
                ))}
                <span className="text-gray-500 text-xs ml-1">({Math.floor(Math.random() * 100) + 20})</span>
              </div>
            </div>
          ))}
        </div>
      </section >

      {/* 5. Service Features */}
      < section className="container mx-auto px-6 mb-20" >
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-6 border-[8px] border-gray-100">
              <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
              </div>
            </div>
            <h4 className="text-xl font-bold mb-2 uppercase tracking-wide">Free and Fast Delivery</h4>
            <p className="text-sm">Free delivery for all orders over $140</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-6 border-[8px] border-gray-100">
              <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </div>
            </div>
            <h4 className="text-xl font-bold mb-2 uppercase tracking-wide">24/7 Customer Service</h4>
            <p className="text-sm">Friendly 24/7 customer support</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-6 border-[8px] border-gray-100">
              <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
            </div>
            <h4 className="text-xl font-bold mb-2 uppercase tracking-wide">Money Back Guarantee</h4>
            <p className="text-sm">We return money within 30 days</p>
          </div>
        </div>
      </section >
    </>
  );
}
