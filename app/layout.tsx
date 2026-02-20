import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dr. Dorsa Ghasemi - Board-Certified Pathologist",
  description: "Board-certified pathologist specializing in anatomical and clinical pathology, surgical pathology, cytopathology, and molecular diagnostics. Published researcher in gynecopathology, oncology, and dermatopathology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <svg width="0" height="0" aria-hidden="true" className="absolute">
          <defs>
            <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#96c03a" />
              <stop offset="60%" stopColor="#00aecc" />
            </linearGradient>
          </defs>
        </svg>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
