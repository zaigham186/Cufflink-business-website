"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.items);
  const openDrawer = useCartStore((state) => state.openDrawer);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle scroll for solid obsidian background (no blur)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Exact links as specified in section 5: Home, About, Shop, Contact
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/shop", label: "Shop" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          scrolled
            ? "bg-obsidian border-b border-champagne-brass/20"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="text-sm sm:text-base font-medium tracking-[0.3em] text-porcelain hover:text-champagne-brass transition-colors duration-200"
            >
              CUFFKINGS
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-champagne-brass"
                      : "text-porcelain/70 hover:text-porcelain"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side - Cart & Mobile Toggle */}
            <div className="flex items-center space-x-6">
              {/* Cart Button (Opens drawer) */}
              <button
                type="button"
                onClick={openDrawer}
                className="relative text-porcelain hover:text-champagne-brass transition-colors duration-200 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={`Shopping cart with ${totalQuantity} items`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {totalQuantity > 0 && (
                  <span className="absolute top-1 right-1 bg-champagne-brass text-obsidian text-[10px] font-bold rounded-[2px] min-w-[18px] h-[18px] px-1 flex items-center justify-center leading-none">
                    {totalQuantity}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-porcelain hover:text-champagne-brass transition-colors duration-200 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-obsidian text-porcelain flex flex-col justify-between p-6">
          {/* Top bar inside mobile overlay */}
          <div className="flex items-center justify-between h-20 border-b border-champagne-brass/20">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium tracking-[0.3em] text-porcelain"
            >
              CUFFKINGS
            </Link>

            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openDrawer();
                }}
                className="relative p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-porcelain"
                aria-label="Cart"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {totalQuantity > 0 && (
                  <span className="absolute top-1 right-1 bg-champagne-brass text-obsidian text-[10px] font-bold rounded-[2px] min-w-[18px] h-[18px] px-1 flex items-center justify-center leading-none">
                    {totalQuantity}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-porcelain hover:text-champagne-brass"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Vertical Links Entrance */}
          <div className="flex-1 flex flex-col justify-center space-y-6 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`min-h-[44px] flex items-center text-3xl sm:text-4xl font-display transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-champagne-brass"
                    : "text-porcelain/70 hover:text-porcelain"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Footer note */}
          <div className="pt-6 border-t border-champagne-brass/20 text-xs text-porcelain/50 flex justify-between items-center">
            <span>Peshawar, Pakistan</span>
            <span className="text-champagne-brass/80">Formal accessories</span>
          </div>
        </div>
      )}
    </>
  );
}
