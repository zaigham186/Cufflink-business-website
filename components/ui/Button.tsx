import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent";
  href?: string;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-block px-8 py-3 border border-hairline transition-all duration-200 font-medium text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]";

  const variantStyles = {
    primary:
      "bg-champagne-brass text-obsidian border-champagne-brass hover:bg-champagne-brass/90",
    secondary:
      "bg-transparent text-porcelain border-porcelain hover:bg-porcelain hover:text-obsidian",
    accent:
      "bg-deep-wine text-porcelain border-deep-wine hover:bg-deep-wine/90",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
