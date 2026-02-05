import { getWixClient } from "@/lib/wixClientServer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductClient from "@/components/ProductClient";
import ImageGallery from "@/components/ImageGallery";
import styles from "./page.module.css";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;
  const wixClient = await getWixClient();
  const res = await wixClient.products.queryProducts().eq("slug", slug).find();
  const product = res.items[0];

  return {
    title: `${product?.name} | The Indian Sparrow`,
    description: product?.description || "Ethically crafted, handwoven textiles.",
  };
}

interface WixProduct {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  media?: {
    mainMedia?: {
      image?: {
        url: string;
      };
    };
    items?: {
      image?: {
        url: string;
      };
    }[];
  };
  price?: {
    formatted?: {
      price: string;
    };
  };
  productOptions?: {
    name?: string;
    choices?: {
      value?: string;
    }[];
  }[];
  additionalInfoSections?: {
    title?: string;
    description?: string;
  }[];
}

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;
  const wixClient = await getWixClient();

  let product: WixProduct | null = null;

  try {
    const res = await wixClient.products.queryProducts().eq("slug", slug).find();
    product = res.items[0] as unknown as WixProduct;
  } catch (e) {
    console.error("Failed to fetch product", e);
  }

  if (!product) {
    return notFound();
  }

  // Get all images
  const images = product.media?.items?.map((item) => item.image?.url).filter(Boolean) || [];
  if (images.length === 0 && product.media?.mainMedia?.image?.url) {
    images.push(product.media.mainMedia.image.url);
  }

  // Get sizes from product options
  const sizes =
    product.productOptions
      ?.find((o) => o.name?.toLowerCase() === "size")
      ?.choices?.map((c) => c.value || "")
      .filter(Boolean) || [];

  // Build info sections: Description first, then additional info sections
  const infoSections: { title: string; description: string }[] = [];

  if (product.description) {
    infoSections.push({
      title: "Description",
      description: product.description,
    });
  }

  if (product.additionalInfoSections) {
    product.additionalInfoSections.forEach((section) => {
      if (section.title && section.description) {
        infoSections.push({
          title: section.title,
          description: section.description,
        });
      }
    });
  }

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className={styles.grid}>
          <ImageGallery images={images as string[]} productName={product.name} />

          <ProductClient
            product={{
              id: product._id,
              name: product.name,
              price: product.price?.formatted?.price || "₹0",
              image: product.media?.mainMedia?.image?.url || "",
            }}
            sizes={sizes}
            infoSections={infoSections}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
