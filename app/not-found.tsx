import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="bg-khaddar-ivory min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-block border border-antique-brass px-6 py-3">
            <span className="text-4xl font-fraunces text-antique-brass">404</span>
          </div>
          <h1 className="text-3xl font-fraunces">Page not found</h1>
          <p className="text-sm opacity-70 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/" variant="primary">
            Go home
          </Button>
          <Button href="/shop" variant="secondary">
            Shop cufflinks
          </Button>
        </div>
      </div>
    </div>
  );
}
