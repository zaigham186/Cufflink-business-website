import Link from "next/link";
import Image from "next/image";
import { productService } from "@/lib/server/services/product.service";
import { orderService } from "@/lib/server/services/order.service";
import { contentService } from "@/lib/server/services/content.service";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // Defensively fetch products, orders, and content in parallel via server services
  let products: any[] = [];
  let rawOrders: any[] = [];
  let siteContent: any = null;
  let dbError: string | null = null;

  try {
    const results = await Promise.all([
      productService.getAllProducts().catch((e) => {
        console.error("Failed to load products in admin dashboard:", e);
        return [];
      }),
      orderService.getOrders().catch((e) => {
        console.error("Failed to load orders in admin dashboard:", e);
        return [];
      }),
      contentService.getSiteContent().catch((e) => {
        console.error("Failed to load content in admin dashboard:", e);
        return null;
      }),
    ]);
    products = results[0] || [];
    rawOrders = results[1] || [];
    siteContent = results[2] || null;
  } catch (err: any) {
    console.error("Admin dashboard data fetch error:", err);
    dbError = "Database connectivity notice: Unable to query MongoDB. Please verify Atlas connection string and Network Access in Vercel.";
  }

  const totalProducts = products.length;
  const publishedProducts = products.filter((p: any) => p.isPublished !== false && !p.archived).length;
  const draftProducts = products.filter((p: any) => p.isPublished === false || p.archived).length;

  let classicalCount = 0;
  let signatureCount = 0;
  let premiumCount = 0;

  products.forEach((p: any) => {
    if (p.category === "Classical") classicalCount++;
    else if (p.category === "Signature") signatureCount++;
    else if (p.category === "Premium") premiumCount++;
  });

  // Genuine Orders metrics (zero fake/demo data)
  const totalOrders = rawOrders.length;
  const pendingOrders = rawOrders.filter((o: any) => o.status === "pending").length;
  const confirmedOrders = rawOrders.filter((o: any) => o.status === "confirmed").length;
  const dispatchedOrders = rawOrders.filter((o: any) => o.status === "dispatched").length;
  const deliveredOrders = rawOrders.filter((o: any) => o.status === "delivered").length;

  // Delivered revenue is strictly confirmed completed sales
  const deliveredRevenue = rawOrders
    .filter((o: any) => o.status === "delivered")
    .reduce((sum: number, o: any) => sum + (o.total || 0), 0);

  // Active pipeline value (confirmed + dispatched)
  const pipelineValue = rawOrders
    .filter((o: any) => o.status === "confirmed" || o.status === "dispatched")
    .reduce((sum: number, o: any) => sum + (o.total || 0), 0);

  const awaitingDispatchCount = pendingOrders + confirmedOrders;

  const hotline = siteContent?.whatsappNumber || "923719145871";
  const deliveryFee = siteContent?.deliveryFeePkr ?? 180;

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10 max-w-7xl">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-champagne-brass/20">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display text-porcelain tracking-tight">
              Operations Overview
            </h1>
            <span className="px-2 py-0.5 text-[9px] sm:text-[10px] uppercase font-mono tracking-widest bg-champagne-brass/10 border border-champagne-brass/30 text-champagne-brass">
              Production Registry
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-porcelain/60 uppercase tracking-widest font-sans mt-1">
            Real-time catalog metrics, genuine orders &amp; dispatch fulfillment
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0">
          <Link
            href="/admin/dispatch"
            className="inline-flex items-center justify-center px-4 py-2.5 bg-white/5 border border-champagne-brass/30 text-champagne-brass text-xs uppercase tracking-wider hover:bg-champagne-brass/10 transition-colors"
          >
            <span>Dispatch Desk</span>
            {awaitingDispatchCount > 0 && (
              <span className="ml-2 px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono">
                {awaitingDispatchCount} ready
              </span>
            )}
          </Link>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-champagne-brass text-obsidian text-xs font-medium uppercase tracking-widest hover:bg-champagne-brass/90 transition-all duration-200 shadow text-center"
          >
            + Add New Product
          </Link>
        </div>
      </div>

      {/* Database Diagnostic Notice */}
      {dbError && (
        <div className="p-4 bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-start space-x-3">
          <span className="text-red-400 text-base leading-none">⚠</span>
          <div>
            <p className="font-semibold">{dbError}</p>
            <p className="text-[11px] text-red-300/80 mt-1">
              Ensure <code className="bg-black/40 px-1 py-0.5 rounded font-mono">MONGODB_URI</code> is added in Vercel Project Settings &gt; Environment Variables, and that MongoDB Atlas Network Access has <code className="bg-black/40 px-1 py-0.5 rounded font-mono">0.0.0.0/0</code> whitelisted.
            </p>
          </div>
        </div>
      )}

      {/* 4 Key Performance Indicators (Zero demo stock / Zero synthetic asset value) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* KPI 1: Catalog Products & Designs */}
        <div className="bg-[#101217] border border-champagne-brass/20 p-5 sm:p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-widest text-champagne-brass font-sans">
              Catalog Products
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-display text-porcelain font-mono">{totalProducts}</span>
            <span className="text-xs text-porcelain/40">active designs</span>
          </div>
          <p className="text-[11px] text-porcelain/50 mt-2 truncate">
            {publishedProducts} Published • {draftProducts} Draft / Inactive
          </p>
          <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-porcelain/40 flex justify-between">
            <span>Tiers:</span>
            <span className="text-porcelain/70 font-mono">
              C:{classicalCount} • S:{signatureCount} • P:{premiumCount}
            </span>
          </div>
        </div>

        {/* KPI 2: Genuine Orders Registry */}
        <div className="bg-[#101217] border border-champagne-brass/20 p-5 sm:p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-widest text-champagne-brass font-sans">
              Orders Registry
            </span>
            <span className={`w-2 h-2 rounded-full ${pendingOrders > 0 ? "bg-amber-400" : "bg-champagne-brass/40"}`} />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-display text-porcelain font-mono">{totalOrders}</span>
            <span className="text-xs text-porcelain/40">orders recorded</span>
          </div>
          <p className="text-[11px] text-porcelain/50 mt-2">
            {pendingOrders > 0
              ? `${pendingOrders} awaiting customer confirmation`
              : "All customer inquiries handled"}
          </p>
          <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-porcelain/40 flex justify-between">
            <span>Completed Deliveries:</span>
            <span className="font-mono text-emerald-300">{deliveredOrders} delivered</span>
          </div>
        </div>

        {/* KPI 3: Dispatch & Fulfillment */}
        <div className="bg-[#101217] border border-champagne-brass/20 p-5 sm:p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-widest text-champagne-brass font-sans">
              Dispatch Desk
            </span>
            <span className="text-[11px] font-mono text-purple-300">
              {dispatchedOrders} in transit
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-display text-porcelain font-mono">
              {awaitingDispatchCount}
            </span>
            <span className="text-xs text-porcelain/40">ready for dispatch</span>
          </div>
          <p className="text-[11px] text-porcelain/50 mt-2">
            {dispatchedOrders > 0
              ? `${dispatchedOrders} consignments with couriers`
              : "Fulfillment queue clear"}
          </p>
          <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-porcelain/40 flex justify-between">
            <span>Express Courier SLA:</span>
            <span className="font-mono text-champagne-brass">2–4 Working Days</span>
          </div>
        </div>

        {/* KPI 4: Delivered Sales Revenue */}
        <div className="bg-[#101217] border border-champagne-brass/20 p-5 sm:p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-widest text-champagne-brass font-sans">
              Delivered Revenue
            </span>
            <span className="text-[11px] font-mono text-emerald-400">
              PKR
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-display text-porcelain tracking-tight font-mono">
            Rs. {deliveredRevenue.toLocaleString()}
          </div>
          <p className="text-[11px] text-porcelain/50 mt-2 font-mono truncate">
            Pipeline: Rs. {pipelineValue.toLocaleString()} ({pendingOrders + confirmedOrders + dispatchedOrders} active)
          </p>
          <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-porcelain/40 flex justify-between">
            <span>Accounting Verification:</span>
            <span className="text-emerald-300/80">Completed Orders Only</span>
          </div>
        </div>
      </div>

      {/* Operational Information Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 bg-[#0f1015] border border-champagne-brass/20 text-xs">
        <div>
          <span className="text-[10px] uppercase text-champagne-brass font-sans block">Client Hotline</span>
          <span className="font-mono text-porcelain mt-1 block">+{hotline}</span>
          <span className="text-[10px] text-emerald-400 mt-0.5 block">● WhatsApp Concierge Live</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-champagne-brass font-sans block">Nationwide Shipping</span>
          <span className="font-mono text-porcelain mt-1 block">Rs. {deliveryFee} Flat (COD)</span>
          <span className="text-[10px] text-porcelain/40 mt-0.5 block">All Pakistan Cities</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-champagne-brass font-sans block">Fulfillment SLA</span>
          <span className="text-porcelain mt-1 block">2–4 Working Days</span>
          <span className="text-[10px] text-porcelain/40 mt-0.5 block">TCS / Leopards / Trax</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-champagne-brass font-sans block">Fulfillment Center</span>
          <span className="text-porcelain mt-1 block">Peshawar Workshop</span>
          <span className="text-[10px] text-porcelain/40 mt-0.5 block">Direct Atelier Consignment</span>
        </div>
      </div>

      {/* Two-Column Operations Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Customer Orders & Fulfillment (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Recent Orders Queue */}
          <div className="bg-[#101217] border border-champagne-brass/20 p-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
              <div>
                <h2 className="text-lg font-display text-porcelain tracking-wide">
                  Recent Orders
                </h2>
                <p className="text-xs text-porcelain/50 mt-0.5">
                  Latest customer orders placed via the website
                </p>
              </div>

              <Link
                href="/admin/orders"
                className="text-xs text-champagne-brass hover:underline uppercase tracking-wider font-medium"
              >
                View All Orders ({rawOrders.length}) →
              </Link>
            </div>

            {rawOrders.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-white/10 text-porcelain/50 text-xs space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-champagne-brass text-sm">
                  ✓
                </div>
                <p className="font-medium text-porcelain/80 text-sm">No customer orders recorded yet.</p>
                <p className="text-[11px] text-porcelain/40 max-w-sm mx-auto">
                  When clients place orders via the storefront checkout, genuine records are saved to the database and will immediately appear here.
                </p>
                <div className="pt-2">
                  <Link
                    href="/"
                    target="_blank"
                    className="inline-block px-3 py-1.5 bg-champagne-brass/10 border border-champagne-brass/30 text-champagne-brass text-[11px] uppercase tracking-wider hover:bg-champagne-brass/20 transition-colors"
                  >
                    Open Storefront to Test Order ↗
                  </Link>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {rawOrders.slice(0, 6).map((order: any) => (
                  <div
                    key={order._id || order.orderId}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-champagne-brass font-medium">
                          #{order.orderId}
                        </span>
                        <span className="text-porcelain font-medium">{order.customerName}</span>
                        <span className="text-porcelain/40">•</span>
                        <span className="text-porcelain/60">{order.city}</span>
                      </div>
                      <p className="text-[11px] text-porcelain/50 mt-1 truncate max-w-md">
                        {order.items?.map((it: any) => `${it.quantity}x ${it.name}`).join(", ")}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <span className="font-mono text-porcelain font-medium">
                        Rs. {order.total?.toLocaleString()}
                      </span>
                      <span
                        className={`text-[10px] uppercase px-2 py-0.5 border font-mono ${
                          order.status === "dispatched"
                            ? "bg-purple-950/40 text-purple-300 border-purple-800/40"
                            : order.status === "confirmed"
                            ? "bg-blue-950/40 text-blue-300 border-blue-800/40"
                            : order.status === "delivered"
                            ? "bg-emerald-950/40 text-emerald-300 border-emerald-800/40"
                            : "bg-amber-950/40 text-amber-300 border-amber-800/40"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Live Dispatch & Courier Desk Snapshot */}
          <div className="bg-[#101217] border border-champagne-brass/20 p-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
              <div>
                <h2 className="text-lg font-display text-porcelain tracking-wide">
                  Dispatch &amp; Fulfillment Queue
                </h2>
                <p className="text-xs text-porcelain/50 mt-0.5">
                  Consignments ready for courier pickup &amp; active in transit
                </p>
              </div>

              <Link
                href="/admin/dispatch"
                className="text-xs text-champagne-brass hover:underline uppercase tracking-wider font-medium"
              >
                Go to Dispatch Desk →
              </Link>
            </div>

            {awaitingDispatchCount + dispatchedOrders === 0 ? (
              <div className="text-center py-8 border border-dashed border-white/10 text-porcelain/40 text-xs">
                All consignments fulfilled. Zero active packages in packing or transit queue.
              </div>
            ) : (
              <div className="space-y-3">
                {rawOrders
                  .filter((o: any) => o.status === "pending" || o.status === "confirmed" || o.status === "dispatched")
                  .slice(0, 4)
                  .map((order: any) => (
                    <div
                      key={order._id || order.orderId}
                      className="p-3 bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                    >
                      <div>
                        <span className="font-mono text-champagne-brass mr-2 font-medium">#{order.orderId}</span>
                        <span className="text-porcelain font-medium">{order.customerName}</span>
                        <span className="text-porcelain/40 mx-1.5">•</span>
                        <span className="text-porcelain/60">{order.city}</span>
                        {order.courierTrackingNumber && (
                          <span className="block text-[10px] text-purple-300 font-mono mt-0.5">
                            {order.courierProvider || "Courier"}: {order.courierTrackingNumber}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] uppercase px-2 py-0.5 border font-mono ${
                            order.status === "dispatched"
                              ? "bg-purple-950/40 text-purple-300 border-purple-800/40"
                              : "bg-amber-950/40 text-amber-300 border-amber-800/40"
                          }`}
                        >
                          {order.status === "dispatched" ? "In Transit" : "Ready to Pack"}
                        </span>
                        <Link
                          href="/admin/dispatch"
                          className="text-[11px] text-champagne-brass hover:underline uppercase tracking-wider"
                        >
                          Manage →
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Collection Tiers & Quick Management (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Collection Tiers Breakdown Card (Pure design counts, zero demo stock values) */}
          <div className="bg-[#101217] border border-champagne-brass/20 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div>
                <h2 className="text-lg font-display text-porcelain tracking-wide">
                  Collection Tiers
                </h2>
                <p className="text-[11px] text-porcelain/50">
                  Active cufflinks by tier
                </p>
              </div>
              <Link
                href="/admin/collections"
                className="text-[11px] text-champagne-brass hover:underline uppercase tracking-wider"
              >
                Configure Tiers →
              </Link>
            </div>

            {/* Classical */}
            <div className="p-4 bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-champagne-brass font-medium block">
                  Classical Tier
                </span>
                <span className="text-[11px] text-porcelain/50">Rs. 700 – 800 Band</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-display text-porcelain block">{classicalCount} Designs</span>
                <Link
                  href="/admin/products"
                  className="text-[10px] text-champagne-brass/70 hover:text-champagne-brass uppercase tracking-wider"
                >
                  View Pieces →
                </Link>
              </div>
            </div>

            {/* Signature */}
            <div className="p-4 bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-champagne-brass font-medium block">
                  Signature Tier
                </span>
                <span className="text-[11px] text-porcelain/50">Rs. 1,000 – 1,400 Band</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-display text-porcelain block">{signatureCount} Designs</span>
                <Link
                  href="/admin/products"
                  className="text-[10px] text-champagne-brass/70 hover:text-champagne-brass uppercase tracking-wider"
                >
                  View Pieces →
                </Link>
              </div>
            </div>

            {/* Premium */}
            <div className="p-4 bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-champagne-brass font-medium block">
                  Premium Tier
                </span>
                <span className="text-[11px] text-porcelain/50">Rs. 1,500 – 2,500 Band</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-display text-porcelain block">{premiumCount} Designs</span>
                <Link
                  href="/admin/products"
                  className="text-[10px] text-champagne-brass/70 hover:text-champagne-brass uppercase tracking-wider"
                >
                  View Pieces →
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Management Shortcuts */}
          <div className="bg-[#101217] border border-champagne-brass/20 p-6 space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-champagne-brass font-sans pb-2 border-b border-white/5">
              Quick Management Shortcuts
            </h3>

            <Link
              href="/admin/products"
              className="flex items-center justify-between p-3 bg-white/5 hover:bg-champagne-brass/10 border border-white/5 hover:border-champagne-brass/30 transition-all text-xs"
            >
              <div>
                <span className="font-medium text-porcelain block">Catalog Manager</span>
                <span className="text-[10px] text-porcelain/40">
                  Search, filter, edit prices, available stock, and publication status
                </span>
              </div>
              <span className="text-champagne-brass">→</span>
            </Link>

            <Link
              href="/admin/orders"
              className="flex items-center justify-between p-3 bg-white/5 hover:bg-champagne-brass/10 border border-white/5 hover:border-champagne-brass/30 transition-all text-xs"
            >
              <div>
                <span className="font-medium text-porcelain block">Orders Registry</span>
                <span className="text-[10px] text-porcelain/40">
                  Review customer details, order statuses, and direct WhatsApp contact
                </span>
              </div>
              <span className="text-champagne-brass">→</span>
            </Link>

            <Link
              href="/admin/dispatch"
              className="flex items-center justify-between p-3 bg-white/5 hover:bg-champagne-brass/10 border border-white/5 hover:border-champagne-brass/30 transition-all text-xs"
            >
              <div>
                <span className="font-medium text-porcelain block">Dispatch &amp; Courier Desk</span>
                <span className="text-[10px] text-porcelain/40">
                  Assign courier slips, manage tracking codes, and verify deliveries
                </span>
              </div>
              <span className="text-champagne-brass">→</span>
            </Link>

            <Link
              href="/admin/content"
              className="flex items-center justify-between p-3 bg-white/5 hover:bg-champagne-brass/10 border border-white/5 hover:border-champagne-brass/30 transition-all text-xs"
            >
              <div>
                <span className="font-medium text-porcelain block">Storefront Policies &amp; Delivery Fee</span>
                <span className="text-[10px] text-porcelain/40">
                  Delivery charges, WhatsApp concierge number, and FAQ policies
                </span>
              </div>
              <span className="text-champagne-brass">→</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between p-3 bg-white/5 hover:bg-champagne-brass/10 border border-white/5 hover:border-champagne-brass/30 transition-all text-xs"
            >
              <div>
                <span className="font-medium text-porcelain block">Live Customer Storefront</span>
                <span className="text-[10px] text-porcelain/40">
                  Experience customer catalog and test checkout flow
                </span>
              </div>
              <span className="text-champagne-brass">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
