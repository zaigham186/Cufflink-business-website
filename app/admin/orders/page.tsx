import { connectToDatabase } from "@/backend/lib/db";
import OrderModel, { OrderStatus } from "@/backend/models/Order";
import OrderTable from "@/backend/admin-components/OrderTable";
import Link from "next/link";

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

export default async function AdminOrdersPage() {
  await connectToDatabase();

  const count = await OrderModel.countDocuments({});
  if (count === 0) {
    await OrderModel.insertMany(INITIAL_ATELIER_ORDERS);
  }

  const rawOrders = await OrderModel.find({}).sort({ createdAt: -1 }).lean();

  const formattedOrders = rawOrders.map((o: any) => ({
    ...o,
    _id: o._id.toString(),
    createdAt: o.createdAt ? o.createdAt.toISOString() : new Date().toISOString(),
    updatedAt: o.updatedAt ? o.updatedAt.toISOString() : new Date().toISOString(),
  }));

  // Calculate real revenue & status metrics
  const totalRevenue = formattedOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = formattedOrders.filter((o) => o.status === "pending").length;
  const dispatchedOrders = formattedOrders.filter((o) => o.status === "dispatched").length;
  const deliveredOrders = formattedOrders.filter((o) => o.status === "delivered").length;

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-champagne-brass/20">
        <div>
          <h1 className="text-3xl font-display text-porcelain tracking-tight">
            Orders &amp; Dispatch Desk
          </h1>
          <p className="text-xs text-porcelain/60 uppercase tracking-widest font-sans mt-1">
            Nationwide fulfillment, courier tracking &amp; client communication
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin"
            className="px-4 py-2 border border-champagne-brass/30 text-champagne-brass text-xs uppercase tracking-wider hover:bg-champagne-brass/10 transition-colors"
          >
            ← Overview
          </Link>
          <Link
            href="/shop"
            target="_blank"
            className="px-4 py-2 bg-champagne-brass text-obsidian text-xs font-medium uppercase tracking-wider hover:bg-champagne-brass/90 transition-colors"
          >
            Live Store ↗
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
      <OrderTable initialOrders={formattedOrders} />
    </div>
  );
}
