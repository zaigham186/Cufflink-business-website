import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-obsidian text-porcelain min-h-screen flex items-center justify-center pt-20 pb-20">
      <div className="max-w-md mx-auto px-6 text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-block border border-champagne-brass/30 px-6 py-2">
            <span className="text-3xl font-display text-champagne-brass">
              404
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display text-porcelain">
            Page not found
          </h1>
          <p className="text-sm text-porcelain/70 leading-relaxed">
            The piece or page you requested cannot be located.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Link
            href="/"
            className="px-8 py-3 bg-champagne-brass text-obsidian text-sm font-medium border border-champagne-brass hover:bg-champagne-brass/90 transition-all duration-200"
          >
            Return home
          </Link>
          <Link
            href="/shop"
            className="px-8 py-3 bg-transparent text-porcelain text-sm font-medium border border-champagne-brass/30 hover:border-champagne-brass hover:text-champagne-brass transition-all duration-200"
          >
            Explore collection
          </Link>
        </div>
      </div>
    </div>
  );
}
