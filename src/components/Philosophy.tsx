import Link from "next/link";
import styles from "./Philosophy.module.css";

export default function Philosophy() {
    return (
        <section className={styles.philosophy}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.imageColumn}>
                        <div className={`${styles.imageWrapper} with-noise`}>
                            <img src="/images/philosophy.jpg" alt="Handloom textile detail" className={`${styles.image} with-noise`} />
                        </div>
                    </div>

                    <div className={styles.textColumn}>
                        <h2 className={styles.headline}>Weaving stories into every thread.</h2>
                        <p className={styles.description}>
                            In a world of fast fashion, we choose to slow down. Each garment is a testament to the
                            time-honored traditions of Indian handloom, crafted with patience, intention, and
                            respect for nature.
                        </p>
                        <Link href="/story" className={styles.storyLink}>
                            Read the full story
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
