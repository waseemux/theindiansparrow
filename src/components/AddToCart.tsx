'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

interface AddToCartProps {
    product: {
        id: string;
        name: string;
        price: string;
        image: string;
    };
}

const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <button
            className="btn-elite"
            style={{ width: '100%', justifyContent: 'space-between' }}
            onClick={() => addToCart(product)}
        >
            <span>ADD TO BAG</span>
            <span style={{ opacity: 0.5 }}>[{product.price}]</span>
        </button>
    );
};

export default AddToCart;
