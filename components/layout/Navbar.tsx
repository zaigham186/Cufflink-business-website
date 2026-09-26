"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { searchProducts, Product } from "@/lib/products";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [mobileSearchResults, setMobileSearchResults] = useState<Product[]>([]);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const cartItems = useCartStore((state) => state.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Close mobile menu and search dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
    setMobileSearchQuery("");
  }, [pathname]);

  // Handle outside click to close desktop search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Desktop search filter
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const results = searchProducts(searchQuery);
      setSearchResults(results);
      setSearchOpen(true);
    } else {
      setSearchResults([]);
      setSearchOpen(false);
    }
  }, [searchQuery]);

  // Mobile search filter
  useEffect(() => {
    if (mobileSearchQuery.trim().length > 0) {
      const results = searchProducts(mobileSearchQuery);
      setMobileSearchResults(results);
    } else {
      setMobileSearchResults([]);
    }
  }, [mobileSearchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleMobileSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      setMobileMenuOpen(false);
      router.push(`/shop?search=${encodeURIComponent(mobileSearchQuery.trim())}`);
    }
  };

  // Nav links: Home, About, Shop, Contact
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/shop", label: "Shop" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* 
        Solid Obsidian navbar on every page, at every scroll position.
        Order: CUFFKINGS logo — Home / About / Shop / Contact — Search — Cart.
      */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-obsidian border-b border-champagne-brass/20">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* 1. Logo */}
            <Link
              href="/"
              className="text-sm sm:text-base font-medium tracking-[0.3em] text-porcelain hover:text-champagne-brass transition-colors duration-200 flex-shrink-0"
            >
              CUFFKINGS
            </Link>

            {/* 2. Desktop Navigation: Home / About / Shop / Contact */}
            <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
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

            {/* Right side group: Search + Cart (+ Mobile toggle) */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* 3. Search input (Desktop) */}
              <div
                ref={searchContainerRef}
                className="relative hidden sm:block w-48 lg:w-64"
              >
                <form onSubmit={handleSearchSubmit} className="relative">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => {
                        if (searchQuery.trim()) setSearchOpen(true);
                      }}
                      placeholder="Search cufflinks..."
                      aria-label="Search cufflinks"
                      className="w-full bg-white/5 text-porcelain placeholder:text-porcelain/40 text-xs px-3.5 py-2 pl-8 border border-champagne-brass/25 focus:border-champagne-brass focus:outline-none transition-colors duration-200"
                    />
                    <svg
                      className="w-3.5 h-3.5 text-porcelain/50 absolute left-2.5 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>

                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery("");
                          setSearchOpen(false);
                        }}
                        className="absolute right-2.5 text-porcelain/40 hover:text-porcelain text-xs"
                        aria-label="Clear search"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </form>

                {/* Instant Search Results Dropdown */}
                {searchOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-obsidian border border-champagne-brass/30 shadow-2xl z-50 overflow-hidden max-h-96 overflow-y-auto">
                    {searchResults.length > 0 ? (
                      <div className="py-2 divide-y divide-champagne-brass/10">
                        <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-champagne-brass font-medium">
                          Found {searchResults.length}{" "}
                          {searchResults.length === 1 ? "piece" : "pieces"}
                        </div>
                        {searchResults.slice(0, 5).map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            onClick={() => setSearchOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/10 transition-colors group"
                          >
                            <div className="relative w-10 h-10 flex-shrink-0 bg-obsidian border border-champagne-brass/20 overflow-hidden">
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-porcelain group-hover:text-champagne-brass transition-colors truncate">
                                {product.name}
                              </p>
                              <p className="text-[11px] text-porcelain/50 truncate">
                                {product.material}
                              </p>
                            </div>
                            <div className="text-xs font-medium text-champagne-brass flex-shrink-0">
                              Rs. {product.price.toLocaleString()}
                            </div>
                          </Link>
                        ))}

                        <Link
                          href={`/shop?search=${encodeURIComponent(searchQuery)}`}
                          onClick={() => setSearchOpen(false)}
                          className="block px-3 py-2 text-center text-xs text-champagne-brass hover:text-porcelain bg-white/5 transition-colors"
                        >
                          View all results in Shop →
                        </Link>
                      </div>
                    ) : (
                      <div className="p-4 text-center text-xs text-porcelain/60">
                        No cufflinks match &ldquo;{searchQuery}&rdquo;
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 4. Cart Button (Links to cart page) */}
              <Link
                href="/cart"
                className="relative text-porcelain hover:text-champagne-brass transition-colors duration-200 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0"
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
              </Link>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-porcelain hover:text-champagne-brass transition-colors duration-200 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0"
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
        <div className="md:hidden fixed inset-0 z-50 bg-obsidian text-porcelain flex flex-col justify-between p-6 overflow-y-auto">
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
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
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
              </Link>

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

          {/* Search bar inside mobile overlay */}
          <div className="py-6">
            <form onSubmit={handleMobileSearchSubmit} className="relative">
              <input
                type="text"
                value={mobileSearchQuery}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
                placeholder="Search cufflinks..."
                className="w-full bg-white/5 text-porcelain placeholder:text-porcelain/40 text-sm px-4 py-3 pl-10 border border-champagne-brass/30 focus:border-champagne-brass focus:outline-none"
              />
              <svg
                className="w-4 h-4 text-porcelain/50 absolute left-3.5 top-3.5 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </form>

            {mobileSearchResults.length > 0 && (
              <div className="mt-3 bg-white/5 border border-champagne-brass/20 max-h-48 overflow-y-auto divide-y divide-champagne-brass/10">
                {mobileSearchResults.slice(0, 4).map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-2.5"
                  >
                    <div className="relative w-8 h-8 flex-shrink-0 bg-obsidian overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-porcelain truncate">
                        {product.name}
                      </p>
                      <p className="text-[10px] text-porcelain/50 truncate">
                        {product.material}
                      </p>
                    </div>
                    <span className="text-xs text-champagne-brass">
                      Rs. {product.price.toLocaleString()}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Vertical Links Entrance */}
          <div className="flex-1 flex flex-col justify-center space-y-6 px-2 py-4">
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
