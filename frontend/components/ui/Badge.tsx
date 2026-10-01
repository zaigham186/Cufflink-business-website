import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "sale" | "limited";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const baseStyles =
    "inline-block px-2 py-1 text-xs font-medium tracking-wide border-sharp";

  const variantStyles = {
    default: "bg-porcelain text-warm-charcoal border border-champagne-brass/25",
    sale: "bg-deep-wine text-porcelain",
    limited: "bg-obsidian text-porcelain border border-champagne-brass/25",
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
