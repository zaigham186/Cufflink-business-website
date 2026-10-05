import { orderService } from "@/lib/server/services/order.service";
import OrderTable from "@/components/admin/OrderTable";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const formattedOrders = await orderService.getOrders();

  // Calculate real revenue & status metrics
  const totalRevenue = formattedOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = formattedOrders.filter((o) => o.status === "pending").length;
  const dispatchedOrders = formattedOrders.filter((o) => o.status === "dispatched").length;
  const deliveredOrders = formattedOrders.filter((o) => o.status === "delivered").length;

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-champagne-brass/20">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display text-porcelain tracking-tight">
            Orders &amp; Dispatch Desk
          </h1>
          <p className="text-[11px] sm:text-xs text-porcelain/60 uppercase tracking-widest font-sans mt-1">
            Nationwide fulfillment, courier tracking &amp; client communication
          </p>
        </div>

        <div className="flex items-center space-x-2.5 sm:space-x-3 w-full sm:w-auto">
          <Link
            href="/admin"
            className="flex-1 sm:flex-none text-center px-3.5 sm:px-4 py-2 border border-champagne-brass/30 text-champagne-brass text-xs uppercase tracking-wider hover:bg-champagne-brass/10 transition-colors"
          >
            ← Overview
          </Link>
          <Link
            href="/shop"
            target="_blank"
            className="flex-1 sm:flex-none text-center px-3.5 sm:px-4 py-2 bg-champagne-brass text-obsidian text-xs font-medium uppercase tracking-wider hover:bg-champagne-brass/90 transition-colors"
          >
            Store ↗
          </Link>
        </div>
      </div>

      {/* KPI Cards for Orders Desk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-champagne-brass/20 p-5">
          <p className="text-[10px] uppercase tracking-widest text-champagne-brass font-sans">
            Total Orders Logged
          </p>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-3xl font-display text-porcelain">
              {formattedOrders.length}
            </span>
            <span className="text-xs text-porcelain/40">registered</span>
          </div>
        </div>

        <div className="bg-white/5 border border-amber-800/40 p-5">
          <p className="text-[10px] uppercase tracking-widest text-amber-300 font-sans flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Pending Dispatch
          </p>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-3xl font-display text-porcelain">
              {pendingOrders}
            </span>
            <span className="text-xs text-amber-200/50">action required</span>
          </div>
        </div>

        <div className="bg-white/5 border border-purple-800/40 p-5">
          <p className="text-[10px] uppercase tracking-widest text-purple-300 font-sans">
            In Transit (Courier)
          </p>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-3xl font-display text-porcelain">
              {dispatchedOrders}
            </span>
            <span className="text-xs text-purple-200/50">with TCS/Leopards</span>
          </div>
        </div>

        <div className="bg-white/5 border border-champagne-brass/20 p-5">
          <p className="text-[10px] uppercase tracking-widest text-champagne-brass font-sans">
            Total Order Volume (PKR)
          </p>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-3xl font-display text-porcelain font-mono">
              Rs. {totalRevenue.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Orders Table Component */}
      <OrderTable initialOrders={formattedOrders as any} />
    </div>
  );
}
