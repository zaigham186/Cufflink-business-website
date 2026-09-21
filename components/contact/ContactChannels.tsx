import React from "react";

interface ContactChannelsProps {
  whatsappNumber?: string;
}

export default function ContactChannels({
  whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923001234567",
}: ContactChannelsProps) {
  const channels = [
    {
      id: "whatsapp",
      title: "WhatsApp Direct",
      value: `+${whatsappNumber}`,
      subtitle: "Instant order support & availability",
      href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        "Hello CuffKings, I am inquiring about your cufflinks."
      )}`,
      isExternal: true,
      icon: (
        <svg
          className="w-5 h-5 text-champagne-brass"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
    },
    {
      id: "email",
      title: "Direct Email",
      value: "info@cuffkings.pk",
      subtitle: "For partnerships & corporate gifts",
      href: "mailto:info@cuffkings.pk",
      isExternal: false,
      icon: (
        <svg
          className="w-5 h-5 text-champagne-brass"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      id: "social",
      title: "Instagram",
      value: "@cuffkings",
      subtitle: "Editorial looks & new releases",
      href: "https://instagram.com",
      isExternal: true,
      icon: (
        <svg
          className="w-5 h-5 text-champagne-brass"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
    {
      id: "location",
      title: "Workshop & Atelier",
      value: "Peshawar, Pakistan",
      subtitle: "Khyber Pakhtunkhwa",
      href: null,
      isExternal: false,
      icon: (
        <svg
          className="w-5 h-5 text-champagne-brass"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      {channels.map((channel) => {
        const content = (
          <div className="group relative p-6 bg-obsidian/60 border border-champagne-brass/20 hover:border-champagne-brass transition-all duration-300 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-none bg-champagne-brass/10 border border-champagne-brass/25 flex items-center justify-center group-hover:border-champagne-brass transition-colors">
                  {channel.icon}
                </div>
                {channel.href && (
                  <span className="text-xs text-porcelain/40 group-hover:text-champagne-brass group-hover:translate-x-0.5 transition-all">
                    ↗
                  </span>
                )}
              </div>

              <div className="text-xs tracking-wider uppercase text-porcelain/50 mb-1">
                {channel.title}
              </div>

              <div className="text-base font-display text-porcelain group-hover:text-champagne-brass transition-colors inline-block relative">
                <span>{channel.value}</span>
                {channel.href && (
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-px bg-champagne-brass mt-0.5" />
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-champagne-brass/10 text-xs text-porcelain/60">
              {channel.subtitle}
            </div>
          </div>
        );

        if (channel.href) {
          return (
            <a
              key={channel.id}
              href={channel.href}
              target={channel.isExternal ? "_blank" : undefined}
              rel={channel.isExternal ? "noopener noreferrer" : undefined}
              className="block h-full focus:outline-none"
            >
              {content}
            </a>
          );
        }

        return (
          <div key={channel.id} className="h-full">
            {content}
          </div>
        );
      })}
    </div>
  );
}
