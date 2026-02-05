'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import styles from './CartDrawer.module.css';

const CartDrawer = () => {
    const router = useRouter();
    const { isCartOpen, setIsCartOpen, cart, removeFromCart } = useCart();
    const subtotal = cart.reduce((acc, item) => acc + (parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity), 0);
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const handleViewBag = () => {
        setIsCartOpen(false);
        router.push('/cart');
    };

    const handleCheckout = () => {
        setIsCartOpen(false);
        router.push('/checkout');
    };

    return (
        <>
            <div
                className={`${styles.overlay} ${isCartOpen ? styles.open : ''}`}
                onClick={() => setIsCartOpen(false)}
            />
            <div className={`${styles.drawer} ${isCartOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Bag ({cartCount})</h2>
                    <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)} aria-label="Close Bag">
                        Close
                    </button>
                </div>

                <div className={styles.content}>
                    {cart.length === 0 ? (
                        <div className={styles.emptyState}>
                            <p className={styles.emptyText}>Your bag is currently empty.</p>
                        </div>
                    ) : (
                        <div className={styles.itemList}>
                            {cart.map(item => (
                                <div key={`${item.id}-${item.size || ''}`} className={styles.cartItem}>
                                    <div className={styles.itemImage}>
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className={styles.itemMeta}>
                                        <div className={styles.itemNameRow}>
                                            <h3 className={styles.itemName}>{item.name}</h3>
                                            <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>REMOVE</button>
                                        </div>
                                        <div className={styles.itemQtyPrice}>
                                            <span className={styles.itemQty}>QTY: {item.quantity}</span>
                                            {item.size && <span className={styles.itemSize}>Size: {item.size}</span>}
                                            <span className={styles.itemPrice}>{item.price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.footer}>
                    <div className={styles.summary}>
                        <div className={styles.summaryRow}>
                            <span className={styles.label}>SUBTOTAL</span>
                            <span className={styles.value}>
                                ₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                        </div>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button className={styles.viewBagBtn} onClick={handleViewBag}>
                            View Bag
                        </button>
                        <button className={styles.checkoutBtn} onClick={handleCheckout}>
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartDrawer;

