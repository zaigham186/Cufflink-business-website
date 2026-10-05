"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Automatically close mobile sidebar whenever the route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-porcelain flex relative overflow-x-hidden">
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 animate-fadeIn"
          aria-hidden="true"
        />
      )}

      {/* Responsive Sidebar (Slide-over on mobile, static on desktop) */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-hidden">
        {/* Responsive Header with Hamburger Menu */}
        <AdminHeader onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        {/* Content Viewport with adaptive padding for mobile/tablet/desktop */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 xl:p-10 overflow-x-hidden overflow-y-auto bg-[#0a0b0e]">
          {children}
        </main>
      </div>
    </div>
  );
}
