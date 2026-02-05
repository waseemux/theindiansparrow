"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/product/[slug]/page.module.css";
import { useCart } from "@/context/CartContext";

interface ProductClientProps {
    product: {
        id: string;
        name: string;
        price: string;
        image: string;
    };
    sizes: string[];
    infoSections: {
        title: string;
        description: string;
    }[];
}

export default function ProductClient({ product, sizes, infoSections }: ProductClientProps) {
    const router = useRouter();
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [openSection, setOpenSection] = useState<string | null>(
        infoSections.length > 0 ? infoSections[0].title : null
    );

    const handleAddToCart = () => {
        if (sizes.length > 0 && !selectedSize) {
            alert("Please select a size");
            return;
        }
        addToCart({
            ...product,
            quantity,
            size: selectedSize || undefined,
        });
    };

    const toggleSection = (title: string) => {
        setOpenSection(openSection === title ? null : title);
    };

    return (
        <div className={styles.detailSection}>
            <button className={styles.backButton} onClick={() => router.back()}>
                ← Back
            </button>

            <h1 className={styles.title}>{product.name}</h1>

            <div className={styles.priceBlock}>
                <div className={styles.price}>{product.price}</div>
                <div className={styles.taxNote}>Taxes Included</div>
            </div>

            {sizes.length > 0 && (
                <div className={styles.sizeSection}>
                    <div className={styles.sizeLabel}>Size</div>
                    <div className={styles.sizeTiles}>
                        {sizes.map((size) => (
                            <button
                                key={size}
                                className={`${styles.sizeTile} ${selectedSize === size ? styles.selected : ""}`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className={styles.quantitySection}>
                <div className={styles.quantityLabel}>Quantity</div>
                <div className={styles.quantityControls}>
                    <button
                        className={styles.quantityBtn}
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                    >
                        −
                    </button>
                    <span className={styles.quantityValue}>{quantity}</span>
                    <button
                        className={styles.quantityBtn}
                        onClick={() => setQuantity(quantity + 1)}
                    >
                        +
                    </button>
                </div>
            </div>

            <div className={styles.buttonGroup}>
                <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                    Add to Cart
                </button>
                <button className={styles.buyNowBtn} onClick={handleAddToCart}>
                    Buy Now
                </button>
            </div>

            {infoSections.length > 0 && (
                <div className={styles.infoAccordion}>
                    {infoSections.map((section) => (
                        <div key={section.title} className={styles.accordionItem}>
                            <button
                                className={styles.accordionHeader}
                                onClick={() => toggleSection(section.title)}
                            >
                                <span>{section.title}</span>
                                <span className={styles.accordionToggle}>
                                    {openSection === section.title ? "−" : "+"}
                                </span>
                            </button>
                            {openSection === section.title && (
                                <div
                                    className={styles.accordionContent}
                                    dangerouslySetInnerHTML={{ __html: section.description }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
