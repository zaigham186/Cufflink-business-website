import { orderService } from "@/lib/server/services/order.service";
import OrderTable from "@/components/admin/OrderTable";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  let formattedOrders: any[] = [];
  try {
    formattedOrders = await orderService.getOrders();
  } catch (e) {
    console.error("Failed to fetch admin orders:", e);
  }

  // Genuine revenue calculations
  const deliveredRevenue = formattedOrders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const pipelineValue = formattedOrders
    .filter((o) => o.status === "confirmed" || o.status === "dispatched")
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const pendingOrders = formattedOrders.filter((o) => o.status === "pending").length;
  const dispatchedOrders = formattedOrders.filter((o) => o.status === "dispatched").length;
  const deliveredOrders = formattedOrders.filter((o) => o.status === "delivered").length;

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display text-porcelain tracking-tight">
            Order Registry
          </h1>
          <p className="text-xs text-porcelain/60 uppercase tracking-widest font-sans mt-1">
            Genuine customer orders, status tracking &amp; client communication
          </p>
        </div>

        <div className="flex items-center space-x-2.5 sm:space-x-3 w-full sm:w-auto">
          <Link
            href="/admin/dispatch"
            className="flex-1 sm:flex-none text-center px-4 py-2 border border-champagne-brass/30 text-champagne-brass text-xs uppercase tracking-wider hover:bg-champagne-brass/10 transition-colors"
          >
            Dispatch Desk →
          </Link>
          <Link
            href="/admin"
            className="flex-1 sm:flex-none text-center px-4 py-2 bg-white/5 border border-white/10 text-porcelain text-xs uppercase tracking-wider hover:bg-white/10 transition-colors"
          >
            ← Overview
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Logged */}
        <div className="bg-[#101217] border border-white/10 p-5">
          <p className="text-[10px] uppercase tracking-widest text-champagne-brass font-sans">
            Total Orders Recorded
          </p>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-3xl font-display text-porcelain font-mono">
              {formattedOrders.length}
            </span>
            <span className="text-xs text-porcelain/40">orders recorded</span>
          </div>
          <p className="text-[11px] text-porcelain/50 mt-1">
            {formattedOrders.length === 0 ? "No records in database yet" : `${deliveredOrders} completed deliveries`}
          </p>
        </div>

        {/* Pending Orders */}
        <div className="bg-[#101217] border border-amber-800/40 p-5">
          <p className="text-[10px] uppercase tracking-widest text-amber-300 font-sans flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Pending Inquiries / Orders
          </p>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-3xl font-display text-porcelain font-mono">
              {pendingOrders}
            </span>
            <span className="text-xs text-amber-200/50">awaiting confirmation</span>
          </div>
          <p className="text-[11px] text-porcelain/50 mt-1">
            Requires customer WhatsApp verification
          </p>
        </div>

        {/* In Transit */}
        <div className="bg-[#101217] border border-purple-800/40 p-5">
          <p className="text-[10px] uppercase tracking-widest text-purple-300 font-sans">
            In Transit / Dispatched
          </p>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-3xl font-display text-porcelain font-mono">
              {dispatchedOrders}
            </span>
            <span className="text-xs text-purple-200/50">with couriers</span>
          </div>
          <p className="text-[11px] text-porcelain/50 mt-1 font-mono">
            Pipeline: Rs. {pipelineValue.toLocaleString()}
          </p>
        </div>

        {/* Completed Revenue */}
        <div className="bg-[#101217] border border-emerald-800/40 p-5">
          <p className="text-[10px] uppercase tracking-widest text-emerald-300 font-sans">
            Delivered Sales Revenue
          </p>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-2xl sm:text-3xl font-display text-porcelain font-mono">
              Rs. {deliveredRevenue.toLocaleString()}
            </span>
          </div>
          <p className="text-[11px] text-porcelain/50 mt-1">
            Calculated strictly from completed orders
          </p>
        </div>
      </div>

      {/* Orders Table Component */}
      <OrderTable initialOrders={formattedOrders as any} />
    </div>
  );
}
