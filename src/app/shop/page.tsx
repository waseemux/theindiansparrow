import { getWixClient } from "@/lib/wixClientServer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import ShopClient from "@/components/ShopClient";
import styles from "./page.module.css";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Shop | The Indian Sparrow",
  description: "Explore our collection of ethically crafted, handwoven textiles.",
};

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
  priceData?: {
    price?: number;
  };
  productOptions?: {
    name?: string;
    choices?: {
      value?: string;
    }[];
  }[];
}

export default async function ShopPage() {
  const wixClient = await getWixClient();
  let rawProducts: WixProduct[] = [];

  try {
    const res = await wixClient.products.queryProducts().limit(100).find();
    rawProducts = res.items as unknown as WixProduct[];
  } catch (e) {
    console.error("Failed to fetch products", e);
  }

  // Transform products for client component
  const products = rawProducts.map((p) => ({
    _id: p._id,
    name: p.name,
    slug: p.slug,
    numericPrice: p.priceData?.price || 0,
    formattedPrice: p.price?.formatted?.price || "₹0",
    imageUrl: p.media?.mainMedia?.image?.url,
    sizes: p.productOptions
      ?.find((o) => o.name?.toLowerCase() === "size")
      ?.choices?.map((c) => c.value || "")
      .filter(Boolean) || [],
  }));

  // Extract filter data
  const prices = products.map((p) => p.numericPrice).filter((p) => p > 0);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 10000;

  const allSizes = products.flatMap((p) => p.sizes);
  const availableSizes = [...new Set(allSizes)].sort();

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Suspense fallback={<div>Loading...</div>}>
          <ShopClient
            products={products}
            minPrice={minPrice}
            maxPrice={maxPrice}
            availableSizes={availableSizes}
          />
        </Suspense>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}
