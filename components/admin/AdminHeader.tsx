"use client";

import Link from "next/link";

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
}

export default function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  return (
    <header className="h-16 border-b border-champagne-brass/20 bg-[#0d0e12]/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between shrink-0 sticky top-0 z-30">
      {/* Left: Mobile Hamburger Toggle & Title */}
      <div className="flex items-center space-x-3 min-w-0">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden p-2 -ml-1 text-champagne-brass hover:bg-white/5 border border-champagne-brass/30 transition-colors"
          aria-label="Toggle navigation menu"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="flex items-center space-x-2.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span className="text-xs uppercase tracking-widest text-champagne-brass font-medium truncate">
            <span className="hidden sm:inline">Cuffkings </span>Atelier Desk
          </span>
          <span className="text-porcelain/30 text-xs hidden md:inline">•</span>
          <span className="text-xs text-porcelain/50 hidden md:inline font-mono truncate">
            Executive Operations
          </span>
        </div>
      </div>

      {/* Right: Role indicator & Storefront button */}
      <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
        <div className="hidden sm:flex items-center space-x-1.5 text-[11px] text-porcelain/60 bg-white/5 px-2.5 py-1 border border-white/10">
          <span className="text-champagne-brass">Role:</span>
          <span className="font-medium text-porcelain">Director</span>
        </div>

        <Link
          href="/"
          target="_blank"
          className="px-2.5 sm:px-3.5 py-1.5 bg-champagne-brass/10 border border-champagne-brass/30 text-champagne-brass text-[11px] sm:text-xs uppercase tracking-wider hover:bg-champagne-brass hover:text-obsidian transition-colors font-medium whitespace-nowrap"
        >
          <span>Storefront</span>
          <span className="ml-1">↗</span>
        </Link>
      </div>
    </header>
  );
}
