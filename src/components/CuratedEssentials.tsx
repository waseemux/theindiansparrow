import Link from "next/link";
import styles from "./CuratedEssentials.module.css";
import { getWixClient } from "@/lib/wixClientServer";

interface WixProduct {
    _id: string;
    name: string;
    slug?: string;
    media?: {
        mainMedia?: {
            image?: {
                url: string;
            };
        };
    };
    price?: {
        formatted?: {
            price: string;
        };
    };
}

export default async function CuratedEssentials() {
    const wixClient = await getWixClient();
    let products: WixProduct[] = [];

    try {
        const res = await wixClient.products.queryProducts().limit(10).find();
        products = res.items as unknown as WixProduct[];
    } catch (e) {
        console.error("Failed to fetch products for carousel", e);
    }

    return (
        <section className={styles.essentials}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerTitle}>
                        <h2 className={styles.title}>Curated Essentials</h2>
                        <p className={styles.subtitle}>Timeless pieces designed to be cherished for years, not seasons.</p>
                    </div>
                    <Link href="/shop" className={styles.viewAll}>View All</Link>
                </div>

                <div className={styles.grid}>
                    {products.slice(0, 4).map((product) => (
                        <Link href={`/product/${product.slug}`} key={product._id} className={styles.productCard}>
                            <div className={`${styles.imageBox} with-noise`}>
                                <img
                                    src={product.media?.mainMedia?.image?.url}
                                    alt={product.name}
                                    className={styles.image}
                                />
                            </div>
                            <div className={styles.meta}>
                                <h3 className={styles.name}>{product.name}</h3>
                                <p className={styles.price}>{product.price?.formatted?.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
