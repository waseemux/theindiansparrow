"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";
import NavLogo from "./NavLogo";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { cart } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setIsProfileOpen(!isProfileOpen);
    } else {
      router.push("/login");
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    router.push("/");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLogo />

        <div className={styles.desktopLinks}>
          <Link href="/story" className={styles.navLink}>Story</Link>
          <Link href="/craft" className={styles.navLink}>Craft</Link>
        </div>

        <div className={styles.navRight}>
          <Link href="/shop" className={styles.shopBtn}>Shop</Link>

          <div className={styles.icons}>
            <button className={styles.iconBtn} aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>

            <Link href="/cart" className={styles.iconBtn} aria-label="Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className={styles.cartBadge}>{cartCount}</span>
              )}
            </Link>

            {/* Profile Button */}
            <div className={styles.profileWrapper} ref={profileRef}>
              <button
                className={styles.iconBtn}
                onClick={handleProfileClick}
                aria-label="Profile"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                </svg>
              </button>

              {isLoggedIn && isProfileOpen && (
                <div className={styles.profileDropdown}>
                  <Link href="/account" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                    Account Settings
                  </Link>
                  <Link href="/orders" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                    My Orders
                  </Link>
                  <button className={styles.dropdownItem} onClick={handleLogout}>
                    Log Out
                  </button>
                </div>
              )}
            </div>

            <button
              className={styles.hamburger}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {isMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <>
                    <path d="M4 8h16" />
                    <path d="M4 16h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}>
        <div className={styles.mobileMenuContent}>
          <Link href="/story" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Story</Link>
          <Link href="/craft" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Craft</Link>
        </div>
      </div>
    </header>
  );
}


