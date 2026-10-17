import { getAdminSession } from "@/lib/server/auth";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await getAdminSession();

  // If unauthenticated (e.g. on /admin/login), render children directly without sidebar/topbar.
  // middleware.ts handles edge redirects to /admin/login for all protected /admin routes.
  if (!isAdmin) {
    return <>{children}</>;
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
