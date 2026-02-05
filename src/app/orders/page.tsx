"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.css";

export default function OrdersPage() {
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/login");
        }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) return null;

    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <h1 className={styles.title}>My Orders</h1>

                <div className={styles.ordersContainer}>
                    <div className={styles.emptyState}>
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                            <path d="M3 6h18" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                        <h2>No orders yet</h2>
                        <p>When you place an order, it will appear here.</p>
                        <button className={styles.shopBtn} onClick={() => router.push("/shop")}>
                            Start Shopping
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
