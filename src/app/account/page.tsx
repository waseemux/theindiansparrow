"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.css";

type Tab = "account" | "addresses" | "wallet";

export default function AccountPage() {
    const router = useRouter();
    const { user, isLoggedIn, updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState<Tab>("account");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/login");
        }
    }, [isLoggedIn, router]);

    useEffect(() => {
        if (user?.name) {
            const parts = user.name.split(" ");
            setFirstName(parts[0] || "");
            setLastName(parts.slice(1).join(" ") || "");
        }
        if (user?.phone) {
            setPhone(user.phone);
        }
    }, [user]);

    const handleUpdateInfo = () => {
        updateUser({ name: `${firstName} ${lastName}`.trim(), phone });
        alert("Information updated!");
    };

    if (!isLoggedIn) return null;

    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <h1 className={styles.title}>Account Settings</h1>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === "account" ? styles.active : ""}`}
                        onClick={() => setActiveTab("account")}
                    >
                        My Account
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === "addresses" ? styles.active : ""}`}
                        onClick={() => setActiveTab("addresses")}
                    >
                        My Addresses
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === "wallet" ? styles.active : ""}`}
                        onClick={() => setActiveTab("wallet")}
                    >
                        My Wallet
                    </button>
                </div>

                <div className={styles.tabContent}>
                    {activeTab === "account" && (
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Account</h2>
                            <p className={styles.sectionDesc}>View and edit your personal info below.</p>

                            <div className={styles.infoBlock}>
                                <h3 className={styles.blockTitle}>Personal info</h3>
                                <p className={styles.blockDesc}>Update your personal information.</p>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label>First name</label>
                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Last name</label>
                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Phone</label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>

                                <div className={styles.buttonRow}>
                                    <button className={styles.discardBtn}>Discard</button>
                                    <button className={styles.updateBtn} onClick={handleUpdateInfo}>Update Info</button>
                                </div>
                            </div>

                            <div className={styles.infoBlock}>
                                <h3 className={styles.blockTitle}>Login info</h3>
                                <p className={styles.blockDesc}>View and update your login email and password.</p>

                                <div className={styles.loginInfo}>
                                    <div className={styles.loginRow}>
                                        <span className={styles.loginLabel}>Login email:</span>
                                        <span className={styles.loginValue}>{user?.email}</span>
                                    </div>
                                    <button className={styles.changeLink}>Change Email</button>
                                </div>

                                <div className={styles.loginInfo}>
                                    <div className={styles.loginRow}>
                                        <span className={styles.loginLabel}>Password:</span>
                                        <span className={styles.loginValue}>••••••</span>
                                    </div>
                                    <button className={styles.changeLink}>Change Password</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "addresses" && (
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>My Addresses</h2>
                            <p className={styles.sectionDesc}>Add and manage the addresses you use often.</p>

                            <div className={styles.emptyState}>
                                <p>You haven&apos;t saved any addresses yet.</p>
                                <button className={styles.addBtn}>Add New Address</button>
                            </div>
                        </div>
                    )}

                    {activeTab === "wallet" && (
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Wallet</h2>
                            <p className={styles.sectionDesc}>Save your payment details for faster checkout.</p>

                            <div className={styles.emptyState}>
                                <p>You haven&apos;t saved any payment methods yet</p>
                                <p className={styles.emptySubtext}>
                                    Securely save your payment details for faster checkout whenever you place an order.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
