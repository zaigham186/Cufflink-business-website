import { orderService } from "@/lib/server/services/order.service";
import DispatchDesk from "@/components/admin/DispatchDesk";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDispatchPage() {
  let formattedOrders: any[] = [];
  try {
    formattedOrders = await orderService.getOrders();
  } catch (e) {
    console.error("Failed to fetch admin dispatch orders:", e);
  }

  const awaitingDispatch = formattedOrders.filter(
    (o) => o.status === "pending" || o.status === "confirmed"
  ).length;

  const inTransit = formattedOrders.filter((o) => o.status === "dispatched").length;
  const delivered = formattedOrders.filter((o) => o.status === "delivered").length;

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display text-porcelain tracking-tight">
              Dispatch &amp; Courier Desk
            </h1>
            <span className="px-2 py-0.5 text-[9px] sm:text-[10px] uppercase font-mono tracking-widest bg-champagne-brass/10 border border-champagne-brass/30 text-champagne-brass">
              Live Fulfillment
            </span>
          </div>
          <p className="text-xs text-porcelain/60 uppercase tracking-widest font-sans mt-1">
            Genuine courier assignments, consignment tracking &amp; delivery verification
          </p>
        </div>

        <div className="flex items-center space-x-2.5 sm:space-x-3 w-full sm:w-auto">
          <Link
            href="/admin/orders"
            className="flex-1 sm:flex-none text-center px-4 py-2 border border-champagne-brass/30 text-champagne-brass text-xs uppercase tracking-wider hover:bg-champagne-brass/10 transition-colors"
          >
            ← Orders Registry
          </Link>
          <Link
            href="/admin"
            className="flex-1 sm:flex-none text-center px-4 py-2 bg-white/5 border border-white/10 text-porcelain text-xs uppercase tracking-wider hover:bg-white/10 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>

      {/* Dispatch Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Awaiting Dispatch */}
        <div className="bg-[#101217] border border-amber-800/40 p-5">
          <p className="text-[10px] uppercase tracking-widest text-amber-300 font-sans flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Ready for Packing / Dispatch
          </p>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-3xl font-display text-porcelain font-mono">
              {awaitingDispatch}
            </span>
            <span className="text-xs text-amber-200/50">orders awaiting pickup</span>
          </div>
          <p className="text-[11px] text-porcelain/50 mt-1">
            {awaitingDispatch === 0 ? "Fulfillment queue clear" : "Requires courier slip assignment"}
          </p>
        </div>

        {/* In Transit */}
        <div className="bg-[#101217] border border-purple-800/40 p-5">
          <p className="text-[10px] uppercase tracking-widest text-purple-300 font-sans flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            Active In Transit
          </p>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-3xl font-display text-porcelain font-mono">
              {inTransit}
            </span>
            <span className="text-xs text-purple-200/50">with couriers</span>
          </div>
          <p className="text-[11px] text-porcelain/50 mt-1">
            TCS / Leopards / Trax consignments
          </p>
        </div>

        {/* Successfully Delivered */}
        <div className="bg-[#101217] border border-emerald-800/40 p-5">
          <p className="text-[10px] uppercase tracking-widest text-emerald-300 font-sans flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Confirmed Delivered
          </p>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-3xl font-display text-porcelain font-mono">
              {delivered}
            </span>
            <span className="text-xs text-emerald-200/50">completed deliveries</span>
          </div>
          <p className="text-[11px] text-porcelain/50 mt-1">
            Verified receipts &amp; payments
          </p>
        </div>

        {/* Total Handled */}
        <div className="bg-[#101217] border border-white/10 p-5">
          <p className="text-[10px] uppercase tracking-widest text-champagne-brass font-sans">
            Total Handled Consignments
          </p>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-3xl font-display text-porcelain font-mono">
              {formattedOrders.length}
            </span>
            <span className="text-xs text-porcelain/40">recorded orders</span>
          </div>
          <p className="text-[11px] text-porcelain/50 mt-1">
            Active fulfillment consignments
          </p>
        </div>
      </div>

      {/* Main Dispatch Desk Table */}
      <DispatchDesk initialOrders={formattedOrders as any} />
    </div>
  );
}
