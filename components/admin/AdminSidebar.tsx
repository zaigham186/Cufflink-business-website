"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
      setLoggingOut(false);
    }
  };

  const navGroups = [
    {
      title: "Inventory & Commerce",
      items: [
        { label: "Executive Dashboard", href: "/admin", exact: true, icon: "◈" },
        { label: "Cufflink Catalog", href: "/admin/products", exact: false, icon: "❖" },
        { label: "Orders & Dispatches", href: "/admin/orders", exact: false, icon: "◩" },
      ],
    },
    {
      title: "Curation & Atelier",
      items: [
        { label: "Collection Tiers", href: "/admin/collections", exact: false, icon: "⬡" },
        { label: "Storefront & Policies", href: "/admin/content", exact: false, icon: "◪" },
      ],
    },
  ];

  const isActive = (item: { href: string; exact?: boolean }) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-50 w-72 lg:w-64 max-w-[85vw] bg-[#0d0e12] border-r border-champagne-brass/20 flex flex-col justify-between p-5 sm:p-6 shrink-0 min-h-screen select-none transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="flex-1 overflow-y-auto pr-1">
        {/* Brand Header & Mobile Close Button */}
        <div className="pb-5 border-b border-champagne-brass/15 mb-6 flex items-start justify-between">
          <Link
            href="/admin"
            onClick={onClose}
            className="group block"
          >
            <span className="font-display text-xl tracking-wider text-porcelain group-hover:text-champagne-brass transition-colors">
              CUFFKINGS
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] tracking-widest text-champagne-brass/80 uppercase font-sans">
                Atelier Executive Suite
              </span>
            </div>
          </Link>

          {/* Close button for mobile */}
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1.5 text-porcelain/60 hover:text-champagne-brass hover:bg-white/5 border border-white/10 rounded-sm transition-colors"
            aria-label="Close Navigation"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Groups */}
        <nav className="space-y-6" aria-label="Admin Navigation">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-porcelain/40 font-mono block px-3">
                {group.title}
              </span>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = isActive(item);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-3 py-2.5 text-xs tracking-wider uppercase font-sans transition-all duration-200 border-l-2 ${
                        active
                          ? "border-champagne-brass text-champagne-brass bg-champagne-brass/10 font-medium"
                          : "border-transparent text-porcelain/70 hover:text-porcelain hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-[11px] opacity-60 font-mono">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {active && (
                        <span className="w-1.5 h-1.5 bg-champagne-brass rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer / Storefront link and Logout */}
      <div className="pt-5 border-t border-champagne-brass/15 space-y-2 mt-4 shrink-0">
        <Link
          href="/"
          target="_blank"
          onClick={onClose}
          className="flex items-center justify-between px-3 py-2 text-xs text-porcelain/70 hover:text-champagne-brass hover:bg-white/5 transition-colors"
        >
          <span>Live Storefront</span>
          <span className="text-xs">↗</span>
        </Link>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full text-left flex items-center justify-between px-3 py-2 text-xs tracking-wider uppercase text-red-400/80 hover:text-red-300 hover:bg-red-500/10 transition-colors disabled:opacity-50"
        >
          <span>{loggingOut ? "Signing out..." : "Sign Out"}</span>
          <span className="text-xs">⏻</span>
        </button>
      </div>
    </aside>
  );
}
