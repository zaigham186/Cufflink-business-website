import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/frontend/components/layout/Navbar";
import Footer from "@/frontend/components/layout/Footer";
import ScrollProgress from "@/frontend/components/motion/ScrollProgress";
import PageTransition from "@/frontend/components/motion/PageTransition";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#101110",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://cuffkings.pk"),
  title: {
    default: "CuffKings | Handcrafted Men's Cufflinks & Formal Accessories",
    template: "%s | CuffKings",
  },
  description:
    "Handcrafted men's cufflinks made in Peshawar, Pakistan. Solid jeweler's brass, cold-cured vitreous enamel, and precision swivel-bar mechanisms across Classical, Signature, and Premium collections.",
  keywords: [
    "cufflinks Pakistan",
    "men cufflinks Peshawar",
    "formal cufflinks",
    "wedding cufflinks Pakistan",
    "brass cufflinks",
    "enamel cufflinks",
    "luxury men accessories",
    "cash on delivery cufflinks",
    "CuffKings",
  ],
  authors: [{ name: "CuffKings Atelier", url: "https://cuffkings.pk" }],
  creator: "CuffKings",
  publisher: "CuffKings",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "CuffKings | Handcrafted Men's Cufflinks & Formal Accessories",
    description:
      "Handcrafted men's cufflinks made in Peshawar, Pakistan. Solid jeweler's brass, cold-cured vitreous enamel, and precision swivel-bar mechanisms.",
    url: "https://cuffkings.pk",
    siteName: "CuffKings",
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CuffKings | Handcrafted Men's Cufflinks",
    description:
      "Handcrafted men's cufflinks made in Peshawar, Pakistan. Classical, Signature, and Premium collections.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${playfairDisplay.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Production dynamic chunk loading recovery
              window.addEventListener('error', function(event) {
                if (
                  event &&
                  (
                    (event.message && (event.message.indexOf('Loading chunk') !== -1 || event.message.indexOf('ChunkLoadError') !== -1)) ||
                    (event.error && event.error.name === 'ChunkLoadError')
                  )
                ) {
                  var lastReload = sessionStorage.getItem('chunk_reload');
                  var now = Date.now();
                  if (!lastReload || (now - parseInt(lastReload, 10)) > 10000) {
                    sessionStorage.setItem('chunk_reload', String(now));
                    window.location.reload();
                  }
                }
              });
            `,
          }}
        />
      </head>
      <body 
        className="bg-obsidian text-porcelain font-sans antialiased min-h-screen selection:bg-champagne-brass selection:text-obsidian"
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-champagne-brass focus:text-obsidian focus:font-medium focus:text-xs focus:tracking-wider focus:uppercase focus:outline-none"
        >
          Skip to main content
        </a>
        <ScrollProgress />
        <PageTransition />
        <Navbar />
        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

