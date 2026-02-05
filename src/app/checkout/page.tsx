"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import styles from "./page.module.css";

export default function CheckoutPage() {
    const router = useRouter();
    const { cart } = useCart();
    const [isLoggedIn] = useState(false); // Placeholder for auth

    const [address, setAddress] = useState({
        fullName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pinCode: "",
        country: "India",
    });

    const subtotal = cart.reduce(
        (acc, item) => acc + parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity,
        0
    );
    const delivery = 0;
    const total = subtotal + delivery;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = () => {
        // Validate address
        if (!address.fullName || !address.phone || !address.addressLine1 || !address.city || !address.pinCode) {
            alert("Please fill in all required fields");
            return;
        }
        // Placeholder for Razorpay integration
        alert("Razorpay integration coming soon!");
    };

    if (cart.length === 0) {
        router.push("/cart");
        return null;
    }

    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <div className={styles.grid}>
                    {/* Left: Address Form */}
                    <section className={styles.addressSection}>
                        <div className={styles.sectionHeader}>
                            <h1 className={styles.title}>Delivery Address</h1>
                            {!isLoggedIn && (
                                <p className={styles.loginPrompt}>
                                    Already have an account?{" "}
                                    <button className={styles.loginLink} onClick={() => router.push("/login")}>
                                        Log in
                                    </button>
                                </p>
                            )}
                        </div>

                        <form className={styles.addressForm}>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>Full Name *</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={address.fullName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={address.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Address Line 1 *</label>
                                <input
                                    type="text"
                                    name="addressLine1"
                                    value={address.addressLine1}
                                    onChange={handleInputChange}
                                    placeholder="House/Flat No., Building Name"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Address Line 2</label>
                                <input
                                    type="text"
                                    name="addressLine2"
                                    value={address.addressLine2}
                                    onChange={handleInputChange}
                                    placeholder="Street, Landmark"
                                />
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={address.city}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={address.state}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>PIN Code *</label>
                                    <input
                                        type="text"
                                        name="pinCode"
                                        value={address.pinCode}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Country</label>
                                    <select name="country" value={address.country} onChange={handleInputChange}>
                                        <option value="India">India</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </section>

                    {/* Right: Order Summary */}
                    <aside className={styles.summarySection}>
                        <h2 className={styles.summaryTitle}>Order Summary</h2>

                        <div className={styles.orderItems}>
                            {cart.map((item) => (
                                <div key={`${item.id}-${item.size || ""}`} className={styles.orderItem}>
                                    <div className={styles.orderItemImage}>
                                        <img src={item.image} alt={item.name} />
                                        <span className={styles.orderItemQty}>{item.quantity}</span>
                                    </div>
                                    <div className={styles.orderItemDetails}>
                                        <div className={styles.orderItemName}>{item.name}</div>
                                        {item.size && <div className={styles.orderItemSize}>Size: {item.size}</div>}
                                    </div>
                                    <div className={styles.orderItemPrice}>
                                        ₹{(parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity).toLocaleString("en-IN")}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>₹{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                        </div>

                        <div className={styles.summaryRow}>
                            <span>Delivery</span>
                            <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
                        </div>

                        <div className={styles.summaryTotal}>
                            <span>Total</span>
                            <span>₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                        </div>

                        <p className={styles.taxNote}>Tax included</p>

                        <button className={styles.payBtn} onClick={handlePlaceOrder}>
                            Pay with Razorpay
                        </button>

                        <p className={styles.secureNote}>🔒 Secure Checkout</p>
                    </aside>
                </div>
            </main>
            <Footer />
        </div>
    );
}
