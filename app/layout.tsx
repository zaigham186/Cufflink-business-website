import type { Metadata } from "next";
import { Instrument_Serif, Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import CustomCursor from "@/components/motion/CustomCursor";
import PageTransition from "@/components/motion/PageTransition";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://cuffkings.pk"),
  title: "CuffKings — Premium men's cufflinks",
  description: "Cufflinks built around polished metal, considered patterns and the details of formal dressing. Based in Peshawar, Pakistan.",
  openGraph: {
    title: "CuffKings — Premium men's cufflinks",
    description: "Cufflinks built around polished metal, considered patterns and the details of formal dressing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${cormorantGaramond.variable} ${manrope.variable}`}>
      <body suppressHydrationWarning>
        <CustomCursor />
        <PageTransition />
        <Navbar />
        <CartDrawer />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
