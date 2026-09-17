import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark";
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
    "inline-block px-8 py-3.5 border transition-colors duration-200 font-medium text-sm rounded-none tracking-normal disabled:opacity-40 disabled:cursor-not-allowed text-center";

  const variantStyles = {
    primary:
      "bg-champagne-brass text-obsidian border-champagne-brass hover:bg-champagne-brass/90",
    secondary:
      "bg-transparent text-porcelain border-porcelain/40 hover:border-porcelain hover:text-porcelain",
    dark:
      "bg-obsidian text-porcelain border-champagne-brass/30 hover:border-champagne-brass hover:text-champagne-brass",
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
