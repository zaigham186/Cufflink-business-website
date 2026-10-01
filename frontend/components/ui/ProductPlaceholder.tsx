export default function ProductPlaceholder() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-champagne-brass/10 to-obsidian flex items-center justify-center relative overflow-hidden">
      {/* Subtle pattern background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="brass-pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="20"
              x2="40"
              y2="20"
              stroke="#C6A15B"
              strokeWidth="0.5"
            />
            <line
              x1="20"
              y1="0"
              x2="20"
              y2="40"
              stroke="#C6A15B"
              strokeWidth="0.5"
            />
            <circle cx="20" cy="20" r="1" fill="#C6A15B" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#brass-pattern)" />
      </svg>

      {/* Center icon */}
      <div className="relative z-10 text-center">
        <svg
          className="w-16 h-16 mx-auto text-champagne-brass/40"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          viewBox="0 0 24 24"
        >
          <rect
            x="4"
            y="8"
            width="6"
            height="8"
            rx="1"
            fill="none"
          />
          <rect
            x="14"
            y="8"
            width="6"
            height="8"
            rx="1"
            fill="none"
          />
          <line x1="7" y1="8" x2="7" y2="4" />
          <line x1="17" y1="8" x2="17" y2="4" />
          <circle cx="7" cy="3" r="1" fill="currentColor" />
          <circle cx="17" cy="3" r="1" fill="currentColor" />
        </svg>
        <p className="mt-4 text-xs text-champagne-brass/50 font-medium">
          Photography coming soon
        </p>
      </div>
    </div>
  );
}
