import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-obsidian text-porcelain border-t border-champagne-brass/20">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-base font-medium tracking-[0.3em] mb-6">
              CUFFKINGS
            </h3>
            <p className="text-sm opacity-70 leading-relaxed">
              Cufflinks built around polished metal, considered patterns and the details of formal dressing.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-medium mb-6 text-sm">Shop</h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li>
                <Link
                  href="/shop"
                  className="hover:opacity-100 hover:text-champagne-brass transition-all duration-200"
                >
                  All products
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/gold-cufflinks"
                  className="hover:opacity-100 hover:text-champagne-brass transition-all duration-200"
                >
                  Gold cufflinks
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/silver-cufflinks"
                  className="hover:opacity-100 hover:text-champagne-brass transition-all duration-200"
                >
                  Silver cufflinks
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/gunmetal-cufflinks"
                  className="hover:opacity-100 hover:text-champagne-brass transition-all duration-200"
                >
                  Gunmetal cufflinks
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium mb-6 text-sm">Company</h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li>
                <Link
                  href="/about"
                  className="hover:opacity-100 hover:text-champagne-brass transition-all duration-200"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:opacity-100 hover:text-champagne-brass transition-all duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-medium mb-6 text-sm">Connect</h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 hover:text-champagne-brass transition-all duration-200"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@cuffkings.pk"
                  className="hover:opacity-100 hover:text-champagne-brass transition-all duration-200"
                >
                  Email
                </a>
              </li>
            </ul>
            <p className="mt-6 text-xs opacity-50">Peshawar, Pakistan</p>
          </div>
        </div>

        {/* Bottom bar with brass line */}
        <div className="mt-16 pt-8 border-t border-champagne-brass/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm opacity-50">
              © {currentYear} CuffKings. All rights reserved.
            </p>
            <div className="h-px w-24 bg-champagne-brass/30" />
          </div>
        </div>
      </div>
    </footer>
  );
}
