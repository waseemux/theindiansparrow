"use client";

import Link from "next/link";
import styles from "./NavLogo.module.css";

export default function NavLogo() {
    return (
        <Link href="/" className={styles.navLogo}>
            <div className={styles.logoContainer}>
                {/* Replace with actual logo image later */}
                <span className={styles.logoText}>TIS</span>
            </div>
        </Link>
    );
}
