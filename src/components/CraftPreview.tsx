import Link from "next/link";
import styles from "./CraftPreview.module.css";

export default function CraftPreview() {
    const crafts = [
        { title: "The Fabric", image: "/images/craft-fabric.jpg" },
        { title: "The Makers", image: "/images/craft-makers.jpg" },
        { title: "The Process", image: "/images/craft-process.jpg" },
    ];

    return (
        <section className={styles.craftSection}>
            <div className={styles.grid}>
                {crafts.map((craft, index) => (
                    <div key={index} className={styles.block}>
                        <div className={`${styles.imageBox} with-noise`}>
                            <img src={craft.image} alt={craft.title} className={styles.image} />
                            <div className={styles.overlay}>
                                <h3 className={styles.title}>{craft.title}</h3>
                                <Link href="/craft" className={styles.readBtn}>Read</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
