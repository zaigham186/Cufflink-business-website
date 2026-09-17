import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923001234567";

  return (
    <footer className="bg-obsidian text-porcelain border-t border-champagne-brass/25">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Column: logo + one line */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block text-sm font-medium tracking-[0.3em] text-porcelain hover:text-champagne-brass transition-colors"
            >
              CUFFKINGS
            </Link>
            <p className="text-sm text-porcelain/70 leading-relaxed max-w-xs">
              Cufflinks built around polished metal, considered patterns and the
              details of formal dressing.
            </p>
          </div>

          {/* Shop Column: category links */}
          <div className="space-y-4">
            <p className="text-sm font-medium text-porcelain">Shop</p>
            <ul className="space-y-3 text-sm text-porcelain/70">
              <li>
                <Link
                  href="/shop"
                  className="hover:text-champagne-brass transition-colors"
                >
                  All cufflinks
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=gold-cufflinks"
                  className="hover:text-champagne-brass transition-colors"
                >
                  Gold cufflinks
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=silver-cufflinks"
                  className="hover:text-champagne-brass transition-colors"
                >
                  Silver cufflinks
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=gunmetal-cufflinks"
                  className="hover:text-champagne-brass transition-colors"
                >
                  Gunmetal cufflinks
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column: About, Contact */}
          <div className="space-y-4">
            <p className="text-sm font-medium text-porcelain">Company</p>
            <ul className="space-y-3 text-sm text-porcelain/70">
              <li>
                <Link
                  href="/about"
                  className="hover:text-champagne-brass transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-champagne-brass transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column: WhatsApp, email, social, Peshawar */}
          <div className="space-y-4">
            <p className="text-sm font-medium text-porcelain">Connect</p>
            <ul className="space-y-3 text-sm text-porcelain/70">
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-champagne-brass transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@cuffkings.pk"
                  className="hover:text-champagne-brass transition-colors"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-champagne-brass transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li className="pt-2 text-xs text-porcelain/50">
                Peshawar, Pakistan
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar: copyright, centered, 60% opacity */}
        <div className="mt-16 pt-8 border-t border-champagne-brass/15 text-center">
          <p className="text-xs text-porcelain/60">
            © {currentYear} CuffKings. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
