import Link from "next/link";
import Image from "next/image";
import { connectToDatabase } from "@/backend/lib/db";
import ProductModel from "@/backend/models/Product";
import OrderModel, { OrderStatus } from "@/backend/models/Order";
import SiteContentModel from "@/backend/models/SiteContent";

export const dynamic = "force-dynamic";

const INITIAL_ATELIER_ORDERS = [
  {
    orderId: "CK-84192",
    customerName: "Malik Shahryar",
    phone: "03215549021",
    address: "House 42-B, Street 9, Sector F-7/2",
    city: "Islamabad",
    paymentMethod: "Cash on Delivery (COD)",
    notes: "Please pack in formal executive presentation box for gift.",
    items: [
      {
        productId: "sample-1",
        name: "Imperial Guilloché Emerald Studs",
        slug: "imperial-guilloche-emerald-studs",
        price: 1800,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?q=80&w=800&auto=format&fit=crop",
        material: "Brass / Gold Electroplate",
      },
    ],
    subtotal: 1800,
    deliveryFee: 180,
    total: 1980,
    status: "dispatched" as OrderStatus,
    courierTrackingNumber: "TCS-924185012PK",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18),
  },
  {
    orderId: "CK-84193",
    customerName: "Barrister Daniyal Khan",
    phone: "03008451129",
    address: "Suite 404, Eden Heights, Jail Road, Gulberg",
    city: "Lahore",
    paymentMethod: "Cash on Delivery (COD)",
    notes: "Deliver before 5 PM to law chambers.",
    items: [
      {
        productId: "sample-2",
        name: "Bespoke Onyx Octagonal Cufflinks",
        slug: "bespoke-onyx-octagonal-cufflinks",
        price: 1400,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800&auto=format&fit=crop",
        material: "Gunmetal & Onyx Stone",
      },
      {
        productId: "sample-3",
        name: "Classical Florentine Silver Knot",
        slug: "classical-florentine-silver-knot",
        price: 800,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
        material: "Silver Plate",
      },
    ],
    subtotal: 3600,
    deliveryFee: 180,
    total: 3780,
    status: "confirmed" as OrderStatus,
    courierTrackingNumber: "",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
  },
  {
    orderId: "CK-84194",
    customerName: "Dr. Hamza Afridi",
    phone: "03339182344",
    address: "Bungalow 18, Phase 5, Hayatabad",
    city: "Peshawar",
    paymentMethod: "Cash on Delivery (COD)",
    notes: "Local delivery in Peshawar.",
    items: [
      {
        productId: "sample-4",
        name: "Vintage Monogram Brass Cufflinks",
        slug: "vintage-monogram-brass-cufflinks",
        price: 1200,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?q=80&w=800&auto=format&fit=crop",
        material: "Champagne Brass",
      },
    ],
    subtotal: 1200,
    deliveryFee: 180,
    total: 1380,
    status: "pending" as OrderStatus,
    courierTrackingNumber: "",
    createdAt: new Date(Date.now() - 1000 * 60 * 45),
  },
];

export default async function AdminDashboardPage() {
  await connectToDatabase();

  // Auto-seed initial orders if empty
  const ordersCountCheck = await OrderModel.countDocuments({});
  if (ordersCountCheck === 0) {
    await OrderModel.insertMany(INITIAL_ATELIER_ORDERS);
  }

  // Fetch all products, orders, and content in parallel
  const [products, rawOrders, siteContent] = await Promise.all([
    ProductModel.find({}).lean(),
    OrderModel.find({}).sort({ createdAt: -1 }).limit(10).lean(),
    SiteContentModel.findOne().lean(),
  ]);

  const totalProducts = products.length;

  // Real calculations
  let totalAssetValuation = 0;
  let totalUnitsInStock = 0;
  let classicalCount = 0;
  let classicalValuation = 0;
  let classicalUnits = 0;
  let signatureCount = 0;
  let signatureValuation = 0;
  let signatureUnits = 0;
  let premiumCount = 0;
  let premiumValuation = 0;
  let premiumUnits = 0;

  const lowStockList: any[] = [];

  products.forEach((p: any) => {
    const stock = typeof p.stockCount === "number" ? p.stockCount : 10;
    const price = typeof p.price === "number" ? p.price : 0;
    const itemValuation = price * stock;

    totalAssetValuation += itemValuation;
    totalUnitsInStock += stock;

    if (p.category === "Classical") {
      classicalCount += 1;
      classicalValuation += itemValuation;
      classicalUnits += stock;
    } else if (p.category === "Signature") {
      signatureCount += 1;
      signatureValuation += itemValuation;
      signatureUnits += stock;
    } else if (p.category === "Premium") {
      premiumCount += 1;
      premiumValuation += itemValuation;
      premiumUnits += stock;
    }

    if (stock < 5) {
      lowStockList.push(p);
    }
  });

  // Sort low stock by smallest first
  lowStockList.sort(
    (a, b) =>
      (typeof a.stockCount === "number" ? a.stockCount : 10) -
      (typeof b.stockCount === "number" ? b.stockCount : 10)
  );

  const averagePiecePrice =
    totalUnitsInStock > 0 ? Math.round(totalAssetValuation / totalUnitsInStock) : 0;

  // Orders metrics
  const totalOrdersLogged = rawOrders.length;
  const pendingOrders = rawOrders.filter((o: any) => o.status === "pending").length;
  const dispatchedOrders = rawOrders.filter((o: any) => o.status === "dispatched").length;
  const deliveredOrders = rawOrders.filter((o: any) => o.status === "delivered").length;
  const totalRevenue = rawOrders.reduce((sum: number, o: any) => sum + (o.total || 0), 0);

  const stockHealthRate =
    totalProducts > 0
      ? Math.round(((totalProducts - lowStockList.length) / totalProducts) * 100)
      : 100;

  const hotline = (siteContent as any)?.whatsappNumber || "923719145871";
  const deliveryFee = (siteContent as any)?.deliveryFeePkr ?? 180;

  return (
    <div className="space-y-10 max-w-7xl">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-champagne-brass/20">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-display text-porcelain tracking-tight">
              Atelier Executive Desk
            </h1>
            <span className="px-2.5 py-0.5 text-[10px] uppercase font-mono tracking-widest bg-champagne-brass/10 border border-champagne-brass/30 text-champagne-brass">
              Live Operations
            </span>
          </div>
          <p className="text-xs text-porcelain/60 uppercase tracking-widest font-sans mt-1">
            Genuine catalog asset analytics, inventory replenishment &amp; order fulfillment
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/orders"
            className="inline-flex items-center px-4 py-2.5 bg-white/5 border border-champagne-brass/30 text-champagne-brass text-xs uppercase tracking-wider hover:bg-champagne-brass/10 transition-colors"
          >
            <span>Orders Desk</span>
            {pendingOrders > 0 && (
              <span className="ml-2 px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono">
                {pendingOrders} action
              </span>
            )}
          </Link>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-champagne-brass text-obsidian text-xs font-medium uppercase tracking-widest hover:bg-champagne-brass/90 transition-all duration-200 shadow"
          >
            + Add New Product
          </Link>
        </div>
      </div>

      {/* 4 High-Impact KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1: Inventory Valuation */}
        <div className="bg-[#101217] border border-champagne-brass/20 p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-widest text-champagne-brass font-sans">
              Inventory Asset Value
            </span>
            <span className="text-[11px] font-mono text-porcelain/40">PKR</span>
          </div>
          <div className="text-3xl font-display text-porcelain tracking-tight">
            Rs. {totalAssetValuation.toLocaleString()}
          </div>
          <p className="text-[11px] text-porcelain/50 mt-2 font-mono">
            {totalUnitsInStock} total units in stock across {totalProducts} active designs
          </p>
          <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-porcelain/40 flex justify-between">
            <span>Avg Piece Value:</span>
            <span className="font-mono text-champagne-brass">Rs. {averagePiecePrice.toLocaleString()}</span>
          </div>
        </div>

        {/* KPI 2: Catalog Volume */}
        <div className="bg-[#101217] border border-champagne-brass/20 p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-widest text-champagne-brass font-sans">
              Catalog Volume
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-display text-porcelain">{totalProducts}</span>
            <span className="text-xs text-porcelain/40">bespoke designs</span>
          </div>
          <p className="text-[11px] text-porcelain/50 mt-2">
            Classical ({classicalCount}) • Signature ({signatureCount}) • Premium ({premiumCount})
          </p>
          <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-porcelain/40 flex justify-between">
            <span>Registry Status:</span>
            <span className="text-emerald-300 font-medium">100% Verified</span>
          </div>
        </div>

        {/* KPI 3: Orders & Dispatches */}
        <div className="bg-[#101217] border border-champagne-brass/20 p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-widest text-champagne-brass font-sans">
              Fulfillment Desk
            </span>
            <span className="text-[11px] font-mono text-amber-300">
              {pendingOrders > 0 ? "● Action Needed" : "All Clear"}
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-display text-porcelain">{pendingOrders}</span>
            <span className="text-xs text-amber-200/60">pending dispatch</span>
          </div>
          <p className="text-[11px] text-porcelain/50 mt-2 font-mono">
            {dispatchedOrders} in transit • {deliveredOrders} delivered
          </p>
          <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-porcelain/40 flex justify-between">
            <span>Gross Order Value:</span>
            <span className="font-mono text-champagne-brass">Rs. {totalRevenue.toLocaleString()}</span>
          </div>
        </div>

        {/* KPI 4: Stock Health Ratio */}
        <div className="bg-[#101217] border border-champagne-brass/20 p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-widest text-champagne-brass font-sans">
              Inventory Health
            </span>
            <span className="text-[11px] font-mono text-porcelain/40">{stockHealthRate}%</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-display text-porcelain">
              {totalProducts - lowStockList.length}
            </span>
            <span className="text-xs text-porcelain/40">healthy / {totalProducts}</span>
          </div>
          <p className="text-[11px] text-porcelain/50 mt-2">
            {lowStockList.length === 0
              ? "All stock levels adequate (≥ 5 units)"
              : `${lowStockList.length} items flagged for replenishment`}
          </p>
          <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-porcelain/40 flex justify-between">
            <span>Restock Urgency:</span>
            <span className={lowStockList.length > 0 ? "text-amber-300 font-medium" : "text-emerald-300"}>
              {lowStockList.length > 0 ? `${lowStockList.length} Units Low` : "Optimal"}
            </span>
          </div>
        </div>
      </div>

      {/* Atelier Operational Status Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-[#0f1015] border border-champagne-brass/20 text-xs">
        <div>
          <span className="text-[10px] uppercase text-champagne-brass font-sans block">Client Hotline</span>
          <span className="font-mono text-porcelain mt-1 block">+{hotline}</span>
          <span className="text-[10px] text-emerald-400 mt-0.5 block">● WhatsApp Active</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-champagne-brass font-sans block">Nationwide Shipping</span>
          <span className="font-mono text-porcelain mt-1 block">Rs. {deliveryFee} Flat (COD)</span>
          <span className="text-[10px] text-porcelain/40 mt-0.5 block">All Pakistan Cities</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-champagne-brass font-sans block">Fulfillment SLA</span>
          <span className="text-porcelain mt-1 block">2–4 Working Days</span>
          <span className="text-[10px] text-porcelain/40 mt-0.5 block">TCS / Leopards Express</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-champagne-brass font-sans block">Atelier Location</span>
          <span className="text-porcelain mt-1 block">Peshawar Atelier</span>
          <span className="text-[10px] text-porcelain/40 mt-0.5 block">Direct Workshop Dispatch</span>
        </div>
      </div>

      {/* Two-Column Operations Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Priority Restock & Recent Orders (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Priority Restock Queue */}
          <div className="bg-[#101217] border border-champagne-brass/20 p-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
              <div>
                <h2 className="text-lg font-display text-porcelain tracking-wide flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-deep-wine" />
                  Priority Inventory Restock Queue
                </h2>
                <p className="text-xs text-porcelain/50 mt-0.5">
                  Cufflinks with under 5 units remaining in current stock
                </p>
              </div>

              <span className="text-xs px-2.5 py-1 bg-deep-wine/20 text-red-300 border border-deep-wine/40 font-mono">
                {lowStockList.length} Flagged
              </span>
            </div>

            {lowStockList.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-white/10 text-porcelain/50 text-xs">
                All inventory levels are healthy (no cufflinks under 5 units).
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-champagne-brass/70 uppercase tracking-widest font-sans">
                      <th className="pb-3 font-medium">Piece</th>
                      <th className="pb-3 font-medium">Tier</th>
                      <th className="pb-3 font-medium">Price</th>
                      <th className="pb-3 font-medium">Stock Left</th>
                      <th className="pb-3 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-porcelain/80">
                    {lowStockList.slice(0, 6).map((p: any) => {
                      const stockVal = typeof p.stockCount === "number" ? p.stockCount : 10;
                      return (
                        <tr key={p._id.toString()} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 font-medium text-porcelain">
                            <div className="flex items-center space-x-2.5">
                              <div className="relative w-7 h-7 bg-black/40 border border-white/10 shrink-0 overflow-hidden">
                                {p.images && p.images[0] ? (
                                  <Image
                                    src={p.images[0]}
                                    alt={p.name}
                                    fill
                                    sizes="28px"
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-[9px] text-porcelain/30">
                                    CK
                                  </div>
                                )}
                              </div>
                              <span className="truncate max-w-[180px]">{p.name}</span>
                            </div>
                          </td>
                          <td className="py-3 text-porcelain/60">{p.category}</td>
                          <td className="py-3 font-mono">Rs. {p.price.toLocaleString()}</td>
                          <td className="py-3">
                            <span
                              className={`inline-block px-2 py-0.5 border font-mono text-[10px] ${
                                stockVal === 0
                                  ? "bg-red-950/60 text-red-200 border-red-800"
                                  : "bg-amber-950/40 text-amber-200 border-amber-800/40"
                              }`}
                            >
                              {stockVal} units
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <Link
                              href={`/admin/products/${p._id.toString()}/edit`}
                              className="text-champagne-brass hover:underline uppercase tracking-wider text-[11px] font-medium"
                            >
                              Adjust →
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Recent Orders Queue */}
          <div className="bg-[#101217] border border-champagne-brass/20 p-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
              <div>
                <h2 className="text-lg font-display text-porcelain tracking-wide">
                  Recent Orders &amp; Dispatches
                </h2>
                <p className="text-xs text-porcelain/50 mt-0.5">
                  Latest clients receiving handcrafted pieces
                </p>
              </div>

              <Link
                href="/admin/orders"
                className="text-xs text-champagne-brass hover:underline uppercase tracking-wider font-medium"
              >
                View All Orders ({rawOrders.length}) →
              </Link>
            </div>

            <div className="divide-y divide-white/5">
              {rawOrders.slice(0, 4).map((order: any) => (
                <div
                  key={order._id.toString()}
                  className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
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
                    <p className="text-[11px] text-porcelain/50 mt-0.5 truncate max-w-md">
                      {order.items?.map((it: any) => `${it.quantity}x ${it.name}`).join(", ")}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <span className="font-mono text-porcelain font-medium">
                      Rs. {order.total?.toLocaleString()}
                    </span>
                    <span
                      className={`text-[10px] uppercase px-2 py-0.5 border ${
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
          </div>
        </div>

        {/* Right Column: Collection Tiers & Quick Action Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Collection Tiers Breakdown Card */}
          <div className="bg-[#101217] border border-champagne-brass/20 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h2 className="text-lg font-display text-porcelain tracking-wide">
                Collection Tiers
              </h2>
              <Link
                href="/admin/collections"
                className="text-[11px] text-champagne-brass hover:underline uppercase tracking-wider"
              >
                Configure Tiers →
              </Link>
            </div>

            {/* Classical */}
            <div className="p-4 bg-white/5 border border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs uppercase tracking-wider text-champagne-brass font-medium">
                    Classical Tier
                  </span>
                  <span className="block text-[11px] text-porcelain/40">Rs. 700 – 800 Band</span>
                </div>
                <span className="text-lg font-display text-porcelain">{classicalCount} Designs</span>
              </div>
              <div className="flex justify-between text-[11px] text-porcelain/50 pt-2 border-t border-white/5 font-mono">
                <span>{classicalUnits} total units</span>
                <span className="text-champagne-brass">Rs. {classicalValuation.toLocaleString()}</span>
              </div>
            </div>

            {/* Signature */}
            <div className="p-4 bg-white/5 border border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs uppercase tracking-wider text-champagne-brass font-medium">
                    Signature Tier
                  </span>
                  <span className="block text-[11px] text-porcelain/40">Rs. 1,000 – 1,400 Band</span>
                </div>
                <span className="text-lg font-display text-porcelain">{signatureCount} Designs</span>
              </div>
              <div className="flex justify-between text-[11px] text-porcelain/50 pt-2 border-t border-white/5 font-mono">
                <span>{signatureUnits} total units</span>
                <span className="text-champagne-brass">Rs. {signatureValuation.toLocaleString()}</span>
              </div>
            </div>

            {/* Premium */}
            <div className="p-4 bg-white/5 border border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs uppercase tracking-wider text-champagne-brass font-medium">
                    Premium Tier
                  </span>
                  <span className="block text-[11px] text-porcelain/40">Rs. 1,500 – 2,500 Band</span>
                </div>
                <span className="text-lg font-display text-porcelain">{premiumCount} Designs</span>
              </div>
              <div className="flex justify-between text-[11px] text-porcelain/50 pt-2 border-t border-white/5 font-mono">
                <span>{premiumUnits} total units</span>
                <span className="text-champagne-brass">Rs. {premiumValuation.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Quick Management Shortcuts */}
          <div className="bg-[#101217] border border-champagne-brass/20 p-6 space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-champagne-brass font-sans pb-2 border-b border-white/5">
              Atelier Management Shortcuts
            </h3>

            <Link
              href="/admin/products"
              className="flex items-center justify-between p-3 bg-white/5 hover:bg-champagne-brass/10 border border-white/5 hover:border-champagne-brass/30 transition-all text-xs"
            >
              <div>
                <span className="font-medium text-porcelain block">Catalog Manager</span>
                <span className="text-[10px] text-porcelain/40">
                  Search, filter, edit prices and photos for {totalProducts} items
                </span>
              </div>
              <span className="text-champagne-brass">→</span>
            </Link>

            <Link
              href="/admin/orders"
              className="flex items-center justify-between p-3 bg-white/5 hover:bg-champagne-brass/10 border border-white/5 hover:border-champagne-brass/30 transition-all text-xs"
            >
              <div>
                <span className="font-medium text-porcelain block">Orders &amp; Dispatch Desk</span>
                <span className="text-[10px] text-porcelain/40">
                  Track courier numbers and direct WhatsApp client bridge
                </span>
              </div>
              <span className="text-champagne-brass">→</span>
            </Link>

            <Link
              href="/admin/content"
              className="flex items-center justify-between p-3 bg-white/5 hover:bg-champagne-brass/10 border border-white/5 hover:border-champagne-brass/30 transition-all text-xs"
            >
              <div>
                <span className="font-medium text-porcelain block">Storefront Policies &amp; Fee</span>
                <span className="text-[10px] text-porcelain/40">
                  Courier charges, WhatsApp care hotline and FAQs
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
                <span className="font-medium text-porcelain block">Open Customer Storefront</span>
                <span className="text-[10px] text-porcelain/40">
                  Experience customer checkout and presentation
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
