import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import styles from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | The Indian Sparrow",
  description: "The story behind The Indian Sparrow - celebrating slow fashion through handwoven textiles and conscious design.",
};

export default function StoryPage() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>Our Story</h1>

        <p className={styles.paragraph}>
          Our journey began in 2012, inspired by the soulfulness of handcrafted creations. Drawing from India&apos;s rich heritage, we curate garments that blend tradition with contemporary elegance, crafting each piece with love, and respect for the artisans behind them.
        </p>

        <div className={styles.image}>
          <img src="/images/story.jpg" alt="The Indian Sparrow workshop" />
        </div>

        <p className={styles.paragraph}>
          Our designs ardently follow sustainable practices, using natural-dyed organic cottons, khadi, jamdani, and hand-block printed kalamkaris. Every leftover fabric is cherished and upcycled into buttons, tags, or other meaningful creations, ensuring nothing goes to waste.
        </p>

        <p className={styles.paragraph}>
          From humble beginnings, The Indian Sparrow now perches in select sustainable clothing stores like <strong>Either Or</strong> in Pune and <strong>Paper Boat Collective</strong> in Goa.
        </p>

        <h2 className={styles.sectionTitle}>The Founder</h2>

        <p className={styles.paragraph}>
          Sonali Brid, the heart behind The Indian Sparrow, is a designer, dreamer, and storyteller. A graduate of the School of Fashion Technology, Pune, and a former embroidery designer for global brands like Ralph Lauren.
        </p>

        <div className={styles.image}>
          <img src="/images/founder.jpg" alt="Sonali Brid, Founder" />
        </div>

        <p className={styles.paragraph}>
          After years of crafting embroideries for international collections, she returned to her roots in Pune to build her dream nest — The Indian Sparrow.
        </p>

        <p className={styles.paragraph}>
          With just one master craftsman by her side, Sonali began creating garments with no blueprint for business, only a passion for her craft. Her home doubles as her studio, a nest filled with cats, fabric swatches, and endless creativity.
        </p>

        <p className={styles.paragraph}>
          For Sonali, The Indian Sparrow is not just a brand — it&apos;s a mission to honor the artisans who inspire her and to create a more sustainable, thoughtful world.
        </p>

        <p className={styles.pullQuote}>
          &ldquo;Design and creation are my forte; business is something I&apos;m learning along the way. But fair trade and integrity will always be the strength of my wings.&rdquo;
        </p>
        <p className={styles.quoteAuthor}>— Sonali Brid</p>

        <div className={styles.divider}></div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
}
