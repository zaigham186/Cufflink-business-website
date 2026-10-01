import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Noir Atelier Palette — Bespoke Sartorial Luxury
        obsidian: "#101110",
        "deep-petrol": "#203A3A",
        porcelain: "#F3EFE7",
        "champagne-brass": "#C6A15B",
        "champagne-brass-light": "#D4B373",
        "champagne-brass-dark": "#A88440",
        "deep-wine": "#641F2B",
        "warm-charcoal": "#211D19",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      borderRadius: {
        sharp: "0px",
        minimal: "2px",
        DEFAULT: "0px",
      },
      fontSize: {
        display: ["clamp(3.5rem, 8vw, 8.5rem)", { lineHeight: "1" }],
        h1: ["clamp(3rem, 6vw, 6.5rem)", { lineHeight: "1.1" }],
        h2: ["clamp(2.25rem, 4vw, 4.5rem)", { lineHeight: "1.2" }],
        h3: ["clamp(1.5rem, 2.5vw, 2.5rem)", { lineHeight: "1.3" }],
        body: ["clamp(0.95rem, 1vw, 1.1rem)", { lineHeight: "1.6" }],
      },
      maxWidth: {
        container: "1600px",
      },
      spacing: {
        section: "clamp(5rem, 10vw, 10rem)",
        "section-lg": "clamp(8rem, 15vw, 15rem)",
      },
      transitionTimingFunction: {
        "luxury-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

