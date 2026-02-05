import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import CuratedEssentials from "@/components/CuratedEssentials";
import Quote from "@/components/Quote";
import CraftPreview from "@/components/CraftPreview";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <Hero />
        <Philosophy />
        <CuratedEssentials />
        <Quote />
        <CraftPreview />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
