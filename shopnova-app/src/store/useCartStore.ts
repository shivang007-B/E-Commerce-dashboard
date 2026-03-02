import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rating: number;
}

export interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: number) => void;
    increaseQuantity: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartCount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item.id === product.id);

                if (existingItem) {
                    set({
                        items: currentItems.map((item) =>
                            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                        ),
                    });
                } else {
                    set({ items: [...currentItems, { ...product, quantity: 1 }] });
                }
            },
            removeItem: (productId) => {
                set({ items: get().items.filter((item) => item.id !== productId) });
            },
            increaseQuantity: (productId) => {
                set({
                    items: get().items.map((item) =>
                        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                });
            },
            decreaseQuantity: (productId) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item.id === productId);

                if (existingItem && existingItem.quantity > 1) {
                    set({
                        items: currentItems.map((item) =>
                            item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                        ),
                    });
                } else {
                    set({ items: currentItems.filter((item) => item.id !== productId) });
                }
            },
            clearCart: () => set({ items: [] }),
            getCartTotal: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
            getCartCount: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },
        }),
        {
            name: "shopnova-cart-storage", // stores in localStorage by default
        }
    )
);
