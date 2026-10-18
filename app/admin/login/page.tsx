"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Authentication failed. Incorrect passcode.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("An unexpected network error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-champagne-brass/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-md bg-obsidian border border-champagne-brass/25 p-8 sm:p-10 relative z-10 shadow-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center group mb-3">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-obsidian-deep border border-champagne-brass/40 p-1 mb-3 shadow-[0_0_25px_rgba(198,161,91,0.15)] group-hover:border-champagne-brass/70 group-hover:shadow-[0_0_35px_rgba(198,161,91,0.25)] transition-all">
              <Image
                src="/logo.png"
                alt="CuffKings Royal Monogram"
                fill
                sizes="64px"
                className="object-contain"
                priority
              />
            </div>
            <span className="font-display text-2xl tracking-widest text-porcelain group-hover:text-champagne-brass transition-colors">
              CUFFKINGS
            </span>
          </Link>
          <div className="h-px w-12 bg-champagne-brass/40 mx-auto mb-3" />
          <p className="text-xs uppercase tracking-widest text-champagne-brass/80 font-sans">
            Atelier Portal Authentication
          </p>
        </div>

        <form onSubmit={handleSubmit} suppressHydrationWarning className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="password"
                className="block text-xs uppercase tracking-wider text-porcelain/70 font-sans"
              >
                Master Passcode
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-champagne-brass/80 hover:text-champagne-brass tracking-wider uppercase transition-colors"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••••••"
                suppressHydrationWarning
                className="w-full px-4 py-3 bg-white/5 border border-champagne-brass/20 text-porcelain placeholder-porcelain/30 text-sm focus:outline-none focus:border-champagne-brass focus:ring-1 focus:ring-champagne-brass transition-colors"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-950/40 border border-deep-wine/60 text-red-300 text-xs">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            suppressHydrationWarning
            className="w-full py-3.5 bg-champagne-brass text-obsidian text-xs uppercase tracking-widest font-medium hover:bg-champagne-brass/90 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Enter Atelier"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-champagne-brass/10 text-center">
          <Link
            href="/"
            className="text-[11px] text-porcelain/50 hover:text-champagne-brass transition-colors tracking-wide"
          >
            ← Return to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
