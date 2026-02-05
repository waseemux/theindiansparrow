"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "@/app/shop/page.module.css";

interface Product {
    _id: string;
    name: string;
    slug?: string;
    numericPrice: number;
    formattedPrice: string;
    imageUrl?: string;
    sizes: string[];
}

interface ShopClientProps {
    products: Product[];
    minPrice: number;
    maxPrice: number;
    availableSizes: string[];
}

type SortOption = "recommended" | "newest" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

const SORT_LABELS: Record<SortOption, string> = {
    recommended: "Recommended",
    newest: "Newest",
    "price-asc": "Price (low to high)",
    "price-desc": "Price (high to low)",
    "name-asc": "Name A-Z",
    "name-desc": "Name Z-A",
};

export default function ShopClient({ products, minPrice, maxPrice, availableSizes }: ShopClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State from URL params or defaults
    const [priceMin, setPriceMin] = useState(Number(searchParams.get("minPrice")) || minPrice);
    const [priceMax, setPriceMax] = useState(Number(searchParams.get("maxPrice")) || maxPrice);
    const [selectedSizes, setSelectedSizes] = useState<string[]>(
        searchParams.get("sizes")?.split(",").filter(Boolean) || []
    );
    const [sortBy, setSortBy] = useState<SortOption>(
        (searchParams.get("sort") as SortOption) || "recommended"
    );
    const [sortOpen, setSortOpen] = useState(false);
    const [priceOpen, setPriceOpen] = useState(true);
    const [sizeOpen, setSizeOpen] = useState(false);

    // Update URL params
    const updateUrl = (params: Record<string, string | null>) => {
        const newParams = new URLSearchParams(searchParams.toString());
        Object.entries(params).forEach(([key, value]) => {
            if (value === null || value === "") {
                newParams.delete(key);
            } else {
                newParams.set(key, value);
            }
        });
        router.push(`/shop?${newParams.toString()}`, { scroll: false });
    };

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let result = products.filter((p) => {
            // Price filter
            if (p.numericPrice < priceMin || p.numericPrice > priceMax) return false;
            // Size filter
            if (selectedSizes.length > 0 && !p.sizes.some((s) => selectedSizes.includes(s))) return false;
            return true;
        });

        // Sort
        switch (sortBy) {
            case "price-asc":
                result.sort((a, b) => a.numericPrice - b.numericPrice);
                break;
            case "price-desc":
                result.sort((a, b) => b.numericPrice - a.numericPrice);
                break;
            case "name-asc":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-desc":
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            // "recommended" and "newest" keep original order (CMS order)
        }

        return result;
    }, [products, priceMin, priceMax, selectedSizes, sortBy]);

    const handleSizeToggle = (size: string) => {
        const newSizes = selectedSizes.includes(size)
            ? selectedSizes.filter((s) => s !== size)
            : [...selectedSizes, size];
        setSelectedSizes(newSizes);
        updateUrl({ sizes: newSizes.join(",") || null });
    };

    const handleSortChange = (option: SortOption) => {
        setSortBy(option);
        setSortOpen(false);
        updateUrl({ sort: option === "recommended" ? null : option });
    };

    const handlePriceChange = (type: "min" | "max", value: number) => {
        if (type === "min") {
            setPriceMin(value);
            updateUrl({ minPrice: value === minPrice ? null : String(value) });
        } else {
            setPriceMax(value);
            updateUrl({ maxPrice: value === maxPrice ? null : String(value) });
        }
    };

    const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

    return (
        <>
            <div className={styles.headerRow}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.title}>All Products</h1>
                </div>
                <div className={styles.sortWrapper}>
                    <button
                        className={styles.sortButton}
                        onClick={() => setSortOpen(!sortOpen)}
                        aria-expanded={sortOpen}
                    >
                        Sort by: {SORT_LABELS[sortBy]}
                    </button>
                    {sortOpen && (
                        <div className={`${styles.sortDropdown} ${styles.open}`}>
                            {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
                                <button
                                    key={option}
                                    className={`${styles.sortOption} ${sortBy === option ? styles.active : ""}`}
                                    onClick={() => handleSortChange(option)}
                                >
                                    {SORT_LABELS[option]}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.grid}>
                <aside className={styles.filters}>
                    <div className={styles.filterTitle}>Filter by</div>

                    <div className={styles.filterGroup}>
                        <div className={styles.filterHeader} onClick={() => setPriceOpen(!priceOpen)}>
                            <span className={styles.filterLabel}>Price</span>
                            <button className={styles.filterToggle}>{priceOpen ? "−" : "+"}</button>
                        </div>
                        {priceOpen && (
                            <div className={styles.filterContent}>
                                <div className={styles.dualRangeSlider}>
                                    <div className={styles.sliderTrack}>
                                        <div
                                            className={styles.sliderRange}
                                            style={{
                                                left: `${((priceMin - minPrice) / (maxPrice - minPrice)) * 100}%`,
                                                right: `${100 - ((priceMax - minPrice) / (maxPrice - minPrice)) * 100}%`
                                            }}
                                        />
                                    </div>
                                    <input
                                        type="range"
                                        min={minPrice}
                                        max={maxPrice}
                                        value={priceMin}
                                        onChange={(e) => {
                                            const val = Number(e.target.value);
                                            if (val < priceMax) handlePriceChange("min", val);
                                        }}
                                        className={styles.rangeSlider}
                                    />
                                    <input
                                        type="range"
                                        min={minPrice}
                                        max={maxPrice}
                                        value={priceMax}
                                        onChange={(e) => {
                                            const val = Number(e.target.value);
                                            if (val > priceMin) handlePriceChange("max", val);
                                        }}
                                        className={styles.rangeSlider}
                                    />
                                </div>
                                <div className={styles.priceRange}>
                                    <span>{formatPrice(priceMin)}</span>
                                    <span>{formatPrice(priceMax)}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {availableSizes.length > 0 && (
                        <div className={styles.filterGroup}>
                            <div className={styles.filterHeader} onClick={() => setSizeOpen(!sizeOpen)}>
                                <span className={styles.filterLabel}>Size</span>
                                <button className={styles.filterToggle}>{sizeOpen ? "−" : "+"}</button>
                            </div>
                            {sizeOpen && (
                                <div className={styles.filterContent}>
                                    <div className={styles.sizeOptions}>
                                        {availableSizes.map((size) => (
                                            <label key={size} className={styles.sizeOption}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedSizes.includes(size)}
                                                    onChange={() => handleSizeToggle(size)}
                                                />
                                                <span>{size}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </aside>

                <div className={styles.productGrid}>
                    {filteredProducts.length === 0 ? (
                        <p className={styles.noResults}>No products match your filters.</p>
                    ) : (
                        filteredProducts.map((product) => (
                            <Link href={`/product/${product.slug}`} key={product._id} className={styles.productCard}>
                                <div className={`${styles.imageWrapper} with-noise`}>
                                    <img src={product.imageUrl} alt={product.name} />
                                </div>
                                <div className={styles.meta}>
                                    <div className={styles.name}>{product.name}</div>
                                    <div className={styles.nameDivider}></div>
                                    <div className={styles.price}>{product.formattedPrice}</div>
                                    <div className={styles.tax}>Taxes Included</div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
