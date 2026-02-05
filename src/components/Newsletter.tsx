"use client";

import { useState } from "react";
import styles from "./Newsletter.module.css";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwMNTEf6ckhH-ZiRuQBLEMt24CyhiJ8MEnZv6eoetFAs9SC9YothoBJfejlWYBR-Fz-/exec";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className={styles.newsletter}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Join Our Story</h2>
          <p className={styles.subtitle}>
            Receive updates on our latest collections and stories from the artisans.
          </p>
          {status === "success" ? (
            <p className={styles.successMessage}>Thank you for subscribing!</p>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Your email address"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading"}
              />
              <button type="submit" className={styles.button} disabled={status === "loading"}>
                {status === "loading" ? "..." : "Subscribe"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className={styles.errorMessage}>Something went wrong. Please try again.</p>
          )}
        </div>
      </div>
    </section>
  );
}