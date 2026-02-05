import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={`${styles.hero} with-noise`}>
            <div className={styles.overlay}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Slow Living</h1>
                    <p className={styles.subtitle}>Ethically Crafted</p>
                    <Link href="/shop" className={styles.discoverBtn}>
                        Discover
                    </Link>
                </div>
            </div>
        </section>
    );
}
