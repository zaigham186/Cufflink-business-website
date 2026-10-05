import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="h-16 border-b border-champagne-brass/20 bg-[#0d0e12]/80 backdrop-blur px-8 flex items-center justify-between shrink-0">
      <div className="flex items-center space-x-3">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="text-xs uppercase tracking-widest text-champagne-brass font-medium">
          Cuffkings Atelier Back Office
        </span>
        <span className="text-porcelain/30 text-xs hidden sm:inline">•</span>
        <span className="text-xs text-porcelain/50 hidden sm:inline font-mono">
          Peshawar &amp; Nationwide Express Fulfillment
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-2 text-[11px] text-porcelain/60 bg-white/5 px-3 py-1.5 border border-white/10">
          <span className="text-champagne-brass">Role:</span>
          <span className="font-medium text-porcelain">Atelier Director</span>
        </div>

        <Link
          href="/"
          target="_blank"
          className="px-3.5 py-1.5 bg-champagne-brass/10 border border-champagne-brass/30 text-champagne-brass text-xs uppercase tracking-wider hover:bg-champagne-brass hover:text-obsidian transition-colors font-medium"
        >
          Storefront ↗
        </Link>
      </div>
    </header>
  );
}
