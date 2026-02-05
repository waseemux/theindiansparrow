import styles from "./Quote.module.css";

export default function Quote() {
    return (
        <section className={styles.quoteSection}>
            <div className={styles.container}>
                <blockquote className={styles.blockquote}>
                    <p className={styles.text}>
                        "Clothes should be more than just fabric on skin. They should be a gentle embrace of
                        nature, a whisper of heritage."
                    </p>
                    <footer className={styles.author}>
                        Sonali Brid <span className={styles.title}>(Founder, The Indian Sparrow)</span>
                    </footer>
                </blockquote>
            </div>
        </section>
    );
}
