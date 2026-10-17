"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin dashboard exception:", error);
  }, [error]);

  return (
    <div className="p-8 sm:p-12 max-w-xl mx-auto my-12 bg-[#101217] border border-champagne-brass/30 space-y-6 text-porcelain text-center">
      <div className="w-12 h-12 mx-auto rounded-full bg-red-950/40 border border-red-800 flex items-center justify-center text-red-400 text-lg">
        ⚠
      </div>
      <div>
        <h2 className="text-xl font-display text-porcelain">
          Atelier Desk Notice
        </h2>
        <p className="text-xs text-porcelain/60 mt-1">
          An error occurred while loading administration resources.
        </p>
      </div>

      <div className="p-3.5 bg-black/40 border border-white/5 text-left text-xs font-mono text-red-300/80 break-words">
        {error.message || "Unable to complete request. Please verify MongoDB connectivity."}
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 bg-champagne-brass text-obsidian text-xs font-medium uppercase tracking-wider hover:bg-champagne-brass/90 transition-colors"
        >
          Retry Connection
        </button>
        <Link
          href="/admin"
          className="px-4 py-2.5 bg-white/5 border border-white/10 text-porcelain text-xs uppercase tracking-wider hover:bg-white/10 transition-colors"
        >
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
