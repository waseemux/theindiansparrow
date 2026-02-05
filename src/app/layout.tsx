import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "The Indian Sparrow",
  description: "The Indian Sparrow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Note to self: Global SVG filter for noise effect. Use .with-noise class on any element */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.5"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
        </svg>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

