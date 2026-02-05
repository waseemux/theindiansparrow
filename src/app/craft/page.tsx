import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavLogo from "@/components/NavLogo";
import styles from "./page.module.css";

export default function CraftPage() {
    return (
        <div className={styles.page}>
            <NavLogo />
            <Header />
            <main className={styles.main}>
                <section className={styles.hero}>
                    <h1>The Craft</h1>
                    <p>Coming soon. A deep dive into our handloom traditions.</p>
                </section>
            </main>
            <Footer />
        </div>
    );
}
