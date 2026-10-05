import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getAdminSession } from "@/lib/server/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || headerList.get("next-url") || "";

  if (pathname.includes("/login")) {
    return <>{children}</>;
  }

  const isAdmin = await getAdminSession();

  if (!isAdmin) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-porcelain flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <AdminHeader />

        {/* Content Viewport */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-auto bg-[#0a0b0e]">
          {children}
        </main>
      </div>
    </div>
  );
}
