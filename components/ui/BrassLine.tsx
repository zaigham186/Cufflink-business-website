export default function BrassLine({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-px bg-champagne-brass/30 ${className}`}
      aria-hidden="true"
    />
  );
}
