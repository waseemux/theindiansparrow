'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
    id: string;
    name: string;
    price: string;
    image: string;
    quantity: number;
    size?: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
    removeFromCart: (id: string, size?: string) => void;
    updateQuantity: (id: string, size: string | undefined, quantity: number) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Sync with localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('atelier_cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('atelier_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
        const qty = product.quantity || 1;
        setCart(prev => {
            // Match by id AND size for variants
            const existing = prev.find(item => item.id === product.id && item.size === product.size);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id && item.size === product.size
                        ? { ...item, quantity: item.quantity + qty }
                        : item
                );
            }
            return [...prev, { ...product, quantity: qty }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id: string, size?: string) => {
        setCart(prev => prev.filter(item => !(item.id === id && item.size === size)));
    };

    const updateQuantity = (id: string, size: string | undefined, quantity: number) => {
        if (quantity < 1) return;
        setCart(prev => prev.map(item =>
            item.id === id && item.size === size
                ? { ...item, quantity }
                : item
        ));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};
