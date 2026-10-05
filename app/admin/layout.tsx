import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getAdminSession } from "@/lib/server/auth";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

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

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
