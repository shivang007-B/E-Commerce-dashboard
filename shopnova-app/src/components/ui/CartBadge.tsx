"use client";

import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";

export default function CartBadge() {
    const [isClient, setIsClient] = useState(false);
    const cartItemsCount = useCartStore((state) => state.getCartCount());

    // Prevent hydration error due to local storage mismatch
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="relative text-primary hover:text-accent transition-colors">
            <FiShoppingCart size={22} />
            {isClient && cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                    {cartItemsCount}
                </span>
            )}
        </div>
    );
}
