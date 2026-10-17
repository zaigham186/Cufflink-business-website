import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { connectToDatabase } from "../lib/server/db";
import OrderModel from "../models/Order";

const DEMO_ORDER_IDS = ["CK-84192", "CK-84193", "CK-84194"];

async function cleanup() {
  await connectToDatabase();
  console.log("Searching for demo orders:", DEMO_ORDER_IDS);
  const found = await OrderModel.find({ orderId: { $in: DEMO_ORDER_IDS } }).lean();
  console.log(`Found ${found.length} demo orders to delete:`, found.map((o: any) => `${o.orderId} (${o.customerName})`));

  if (found.length > 0) {
    const res = await OrderModel.deleteMany({ orderId: { $in: DEMO_ORDER_IDS } });
    console.log(`Successfully removed ${res.deletedCount} demo order records from MongoDB Atlas.`);
  } else {
    console.log("No demo orders found in MongoDB.");
  }

  const remaining = await OrderModel.countDocuments({});
  console.log(`Total remaining genuine orders in MongoDB: ${remaining}`);

  process.exit(0);
}

cleanup().catch((err) => {
  console.error("Cleanup error:", err);
  process.exit(1);
});
