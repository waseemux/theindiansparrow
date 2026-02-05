"use client";

import { useState, useRef, TouchEvent } from "react";
import styles from "@/app/product/[slug]/page.module.css";

interface ImageGalleryProps {
    images: string[];
    productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const handleTouchStart = (e: TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0 && currentIndex < images.length - 1) {
                // Swipe left - next image
                setCurrentIndex(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right - previous image
                setCurrentIndex(currentIndex - 1);
            }
        }
    };

    if (images.length === 0) return null;

    return (
        <section className={styles.imageSection}>
            {/* Desktop: Show all images stacked */}
            <div className={styles.desktopImages}>
                {images.map((url, index) => (
                    <div key={index} className={`${styles.imageWrapper} with-noise`}>
                        <img src={url} alt={`${productName} - Image ${index + 1}`} />
                    </div>
                ))}
            </div>

            {/* Mobile: Swipeable gallery */}
            <div
                className={styles.mobileGallery}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className={styles.galleryTrack}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((url, index) => (
                        <div key={index} className={`${styles.gallerySlide} with-noise`}>
                            <img src={url} alt={`${productName} - Image ${index + 1}`} />
                        </div>
                    ))}
                </div>

                {/* Dots indicator */}
                {images.length > 1 && (
                    <div className={styles.galleryDots}>
                        {images.map((_, index) => (
                            <button
                                key={index}
                                className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ""}`}
                                onClick={() => setCurrentIndex(index)}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
