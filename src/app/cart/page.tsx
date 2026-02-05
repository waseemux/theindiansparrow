"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { getWixClientBrowser } from "@/lib/wixClientBrowser";
import styles from "./page.module.css";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const [promoCode, setPromoCode] = useState("");
    const [orderNote, setOrderNote] = useState("");
    const [promoOpen, setPromoOpen] = useState(false);
    const [noteOpen, setNoteOpen] = useState(false);
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const subtotal = cart.reduce(
        (acc, item) => acc + parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity,
        0
    );
    const delivery = 0; // Free delivery
    const total = subtotal + delivery;

    const handleCheckout = async () => {
        if (cart.length === 0 || isCheckingOut) return;

        setIsCheckingOut(true);

        try {
            const wixClient = getWixClientBrowser();

            // Create checkout with line items
            // Note: For basic products without Wix variants, we just pass catalogItemId
            const checkoutResult = await wixClient.checkout.createCheckout({
                lineItems: cart.map(item => ({
                    catalogReference: {
                        catalogItemId: item.id,
                        appId: "1380b703-ce81-ff05-f115-39571d94dfcd", // Wix Stores app ID
                    },
                    quantity: item.quantity,
                })),
                channelType: "WEB",
            });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const checkoutId = (checkoutResult as any)?._id || (checkoutResult as any)?.checkout?._id;

            if (checkoutId) {
                // Create redirect session to Wix checkout
                const redirect = await wixClient.redirects.createRedirectSession({
                    ecomCheckout: { checkoutId },
                    callbacks: {
                        postFlowUrl: window.location.origin + "/shop",
                        thankYouPageUrl: window.location.origin + "/thank-you",
                    },
                });

                if (redirect.redirectSession?.fullUrl) {
                    clearCart();
                    window.location.href = redirect.redirectSession.fullUrl;
                }
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <div className={styles.grid}>
                    {/* Left: Cart Items */}
                    <section className={styles.cartSection}>
                        <div className={styles.cartHeader}>
                            <h1 className={styles.title}>My cart</h1>
                            <Link href="/shop" className={styles.continueLink}>
                                Continue Browsing →
                            </Link>
                        </div>

                        {cart.length === 0 ? (
                            <div className={styles.emptyCart}>
                                <p>Your cart is empty.</p>
                                <Link href="/shop" className={styles.shopLink}>
                                    Browse Products
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className={styles.itemList}>
                                    {cart.map((item) => {
                                        const itemKey = `${item.id}-${item.size || ""}`;
                                        const unitPrice = parseFloat(item.price.replace(/[^0-9.]/g, ""));
                                        const itemTotal = unitPrice * item.quantity;

                                        return (
                                            <div key={itemKey} className={styles.cartItem}>
                                                <div className={styles.itemImage}>
                                                    <img src={item.image} alt={item.name} />
                                                </div>

                                                <div className={styles.itemDetails}>
                                                    <h3 className={styles.itemName}>{item.name}</h3>
                                                    <div className={styles.itemPrice}>{item.price}</div>
                                                    {item.size && <div className={styles.itemSize}>Size: {item.size}</div>}
                                                </div>

                                                <div className={styles.quantityControls}>
                                                    <button
                                                        className={styles.qtyBtn}
                                                        onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        −
                                                    </button>
                                                    <span className={styles.qtyValue}>{item.quantity}</span>
                                                    <button
                                                        className={styles.qtyBtn}
                                                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <div className={styles.itemTotal}>
                                                    ₹{itemTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                                </div>

                                                <button
                                                    className={styles.removeBtn}
                                                    onClick={() => removeFromCart(item.id, item.size)}
                                                    aria-label="Remove item"
                                                >
                                                    🗑
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Promo Code - Collapsible */}
                                <div className={styles.collapsibleSection}>
                                    <button
                                        className={styles.collapsibleHeader}
                                        onClick={() => setPromoOpen(!promoOpen)}
                                    >
                                        <span>✎ Enter a promo code</span>
                                        <span>{promoOpen ? "−" : "+"}</span>
                                    </button>
                                    {promoOpen && (
                                        <div className={styles.collapsibleContent}>
                                            <div className={styles.promoRow}>
                                                <input
                                                    type="text"
                                                    placeholder="e.g., SAVE50"
                                                    value={promoCode}
                                                    onChange={(e) => setPromoCode(e.target.value)}
                                                    className={styles.promoInput}
                                                />
                                                <button className={styles.applyBtn}>Apply</button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Add a Note - Collapsible */}
                                <div className={styles.collapsibleSection}>
                                    <button
                                        className={styles.collapsibleHeader}
                                        onClick={() => setNoteOpen(!noteOpen)}
                                    >
                                        <span>📝 Add a note</span>
                                        <span>{noteOpen ? "−" : "+"}</span>
                                    </button>
                                    {noteOpen && (
                                        <div className={styles.collapsibleContent}>
                                            <textarea
                                                placeholder="e.g., Leave outside the front door"
                                                value={orderNote}
                                                onChange={(e) => setOrderNote(e.target.value)}
                                                className={styles.noteInput}
                                            />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </section>

                    {/* Right: Order Summary */}
                    <aside className={styles.summarySection}>
                        <h2 className={styles.summaryTitle}>Order summary</h2>

                        <div className={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>₹{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                        </div>

                        <div className={styles.summaryRow}>
                            <span>Delivery</span>
                            <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
                        </div>

                        <div className={styles.deliveryLocation}>
                            <a href="#">India</a>
                        </div>

                        <div className={styles.summaryTotal}>
                            <span>Total</span>
                            <span>₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                        </div>

                        <p className={styles.taxNote}>Tax included</p>

                        <button
                            className={styles.checkoutBtn}
                            onClick={handleCheckout}
                            disabled={cart.length === 0}
                        >
                            Checkout
                        </button>

                        <p className={styles.secureNote}>🔒 Secure Checkout</p>
                    </aside>
                </div>
            </main>
            <Footer />
        </div>
    );
}
