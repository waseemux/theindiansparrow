import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.brandColumn}>
            <div className={styles.logoBlock}>
              <span>TIS</span>
            </div>
            <h2 className={styles.brandName}>The Indian Sparrow</h2>
            <p className={styles.brandDescription}>
              Celebrating the art of slow fashion through handwoven textiles and conscious design.
              Rooted in tradition, crafted for the modern soul.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>Instagram</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>Facebook</a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>X (Twitter)</a>
            </div>
          </div>

          <div className={styles.linkColumns}>
            <div className={styles.column}>
              <h3 className={styles.columnTitle}>Explore</h3>
              <ul className={styles.linkList}>
                <li><Link href="/shop">Collection</Link></li>
                <li><Link href="/story">Our Story</Link></li>
                <li><Link href="/craft">The Craft</Link></li>
              </ul>
            </div>

            <div className={styles.column}>
              <h3 className={styles.columnTitle}>Support</h3>
              <ul className={styles.linkList}>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/shipping">Shipping & Returns</Link></li>
                <li><Link href="/size-guide">Size Guide</Link></li>
                <li><Link href="/care">Garment Care</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            © 2026 The Indian Sparrow. All rights reserved.
          </div>
          <div className={styles.legalLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
