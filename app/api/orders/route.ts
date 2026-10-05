import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/lib/db";
import OrderModel, { OrderStatus } from "@/backend/models/Order";
import { getAdminSession } from "@/backend/lib/auth";

export const dynamic = "force-dynamic";

// Sample authentic test orders if the store desk has no orders yet
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
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18), // 18 hrs ago
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
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hrs ago
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
    createdAt: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
  },
];

export async function GET(req: NextRequest) {
  try {
    const isAdmin = await getAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const q = searchParams.get("q")?.trim();
    const shouldSeed = searchParams.get("seed") === "true";

    // Auto-seed initial orders if collection is empty
    const count = await OrderModel.countDocuments({});
    if (count === 0 && (shouldSeed || true)) {
      await OrderModel.insertMany(INITIAL_ATELIER_ORDERS);
    }

    const query: Record<string, any> = {};

    if (status && status !== "all") {
      query.status = status;
    }

    if (q) {
      const regex = new RegExp(q, "i");
      query.$or = [
        { orderId: regex },
        { customerName: regex },
        { phone: regex },
        { city: regex },
        { "items.name": regex },
      ];
    }

    const orders = await OrderModel.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      orders: orders.map((o: any) => ({
        ...o,
        _id: o._id.toString(),
      })),
      total: orders.length,
    });
  } catch (error: any) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json(
      { error: "Failed to retrieve orders", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const {
      orderId,
      customerName,
      phone,
      address,
      city,
      paymentMethod = "Cash on Delivery (COD)",
      notes = "",
      items = [],
      subtotal,
      deliveryFee = 180,
      total,
    } = body;

    if (!customerName || !phone || !address || !city) {
      return NextResponse.json(
        { error: "Customer name, phone, address, and city are required" },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Order must contain at least one item" },
        { status: 400 }
      );
    }

    const finalOrderId = orderId || `CK-${Math.floor(10000 + Math.random() * 90000)}`;
    const calcSubtotal = typeof subtotal === "number" ? subtotal : items.reduce((sum: number, it: any) => sum + (it.price * (it.quantity || 1)), 0);
    const finalTotal = typeof total === "number" ? total : calcSubtotal + deliveryFee;

    const newOrder = await OrderModel.create({
      orderId: finalOrderId,
      customerName,
      phone,
      address,
      city,
      paymentMethod,
      notes,
      items,
      subtotal: calcSubtotal,
      deliveryFee,
      total: finalTotal,
      status: "pending",
      courierTrackingNumber: "",
    });

    return NextResponse.json(
      {
        message: "Order placed successfully",
        order: {
          ...newOrder.toObject(),
          _id: newOrder._id.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create order", details: error.message },
      { status: 500 }
    );
  }
}
