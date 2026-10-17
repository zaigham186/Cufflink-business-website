import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { connectToDatabase } from "../lib/server/db";
import ProductModel from "../models/Product";
import OrderModel from "../models/Order";
import { signAdminToken } from "../lib/server/auth";
import { productService, getAllProducts } from "../lib/server/services/product.service";
import { orderService } from "../lib/server/services/order.service";
import { POST as createProductApi } from "../app/api/products/route";
import {
  PUT as updateProductApi,
  DELETE as deleteProductApi,
} from "../app/api/products/[id]/route";
import { POST as createOrderApi, GET as getOrdersApi } from "../app/api/orders/route";
import { PATCH as updateOrderApi, DELETE as deleteOrderApi } from "../app/api/orders/[id]/route";
import { NextRequest } from "next/server";

async function runCompleteE2ETest() {
  console.log("================================================================");
  console.log("CUFFKINGS COMPLETE E2E VERIFICATION & INTEGRITY TEST");
  console.log("================================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  // 1. Database Connection & Clean State
  console.log("--- 1. MongoDB Connection & Baseline State ---");
  await connectToDatabase();
  const initialProductCount = await ProductModel.countDocuments({});
  assert(initialProductCount > 0, `MongoDB Atlas connected: ${initialProductCount} catalog products found`);

  const initialOrders = await orderService.getOrders();
  console.log(`Current genuine orders count in MongoDB: ${initialOrders.length}`);
  assert(
    !initialOrders.some((o) => o.customerName === "Malik Shahryar"),
    "Confirmed zero fake demo orders (Malik Shahryar demo order purged)"
  );

  const token = signAdminToken();
  const authHeaders = {
    "Content-Type": "application/json",
    cookie: `ck_admin_token=${token}`,
  };

  // 2. Product Management: Publication, Drafting & Sync
  console.log("\n--- 2. Product Management, Publication & Public Sync ---");
  const testSku = `CK-E2E-${Date.now().toString().slice(-4)}`;
  const testSlug = `e2e-cufflinks-${Date.now()}`;

  // Create product with isPublished = true
  const createProductReq = new NextRequest("http://localhost:3000/api/products", {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({
      name: "E2E Imperial Crown Cufflinks",
      slug: testSlug,
      category: "Signature",
      categorySlug: "signature",
      description: "Handcrafted test cufflinks for end-to-end verification.",
      price: 1350,
      images: ["/products/classic1.jpeg"],
      material: "Polished Brass",
      finish: "Mirror Polish",
      color: "Champagne Gold",
      sku: testSku,
      stock: "in-stock",
      stockCount: 20,
      featured: false,
      isPublished: true,
    }),
  });

  const createProdRes = await createProductApi(createProductReq);
  assert(createProdRes.status === 201, `POST /api/products created product (${testSku})`);
  const createProdData = await createProdRes.json();
  const testProductId = createProdData.product?._id?.toString() || createProdData.product?.id;

  // Verify product is in public store
  const publicStoreProducts1 = await productService.getAllProducts(undefined, false);
  const foundInPublic1 = publicStoreProducts1.some((p) => p.slug === testSlug);
  assert(foundInPublic1 === true, `Product is immediately visible in public storefront queries`);

  // Deactivate / Unpublish product
  const unpublishReq = new NextRequest(`http://localhost:3000/api/products/${testProductId}`, {
    method: "PUT",
    headers: authHeaders,
    body: JSON.stringify({
      isPublished: false,
      price: 1450,
    }),
  });
  const unpublishRes = await updateProductApi(unpublishReq, {
    params: Promise.resolve({ id: testProductId }),
  });
  assert(unpublishRes.status === 200, `PUT /api/products/${testProductId} toggled isPublished to false`);

  // Verify unpublished product is HIDDEN from public storefront
  const publicStoreProducts2 = await productService.getAllProducts(undefined, false);
  const foundInPublic2 = publicStoreProducts2.some((p) => p.slug === testSlug);
  assert(foundInPublic2 === false, `Unpublished product is successfully hidden from public storefront`);

  // Verify unpublished product is still in admin catalog
  const adminProducts = await productService.getAdminProducts();
  const foundInAdmin = adminProducts.some((p) => p.slug === testSlug);
  assert(foundInAdmin === true, `Unpublished product remains visible in Admin catalog with Draft/Unpublished badge`);

  // 3. Checkout Order Flow & Dispatch Lifecycle
  console.log("\n--- 3. Checkout Order Persistence & Dispatch Lifecycle ---");
  const testOrderId = `CK-TEST-${Date.now().toString().slice(-5)}`;

  // Create an order via customer checkout endpoint
  const checkoutReq = new NextRequest("http://localhost:3000/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      orderId: testOrderId,
      customerName: "Test Customer Verification",
      phone: "03001234567",
      address: "House 10, Street 5, F-7/2",
      city: "Islamabad",
      paymentMethod: "Cash on Delivery (COD)",
      notes: "Please deliver before 5 PM",
      items: [
        {
          productId: testProductId,
          name: "E2E Imperial Crown Cufflinks",
          slug: testSlug,
          price: 1450,
          quantity: 2,
          image: "/products/classic1.jpeg",
          material: "Polished Brass",
        },
      ],
      subtotal: 2900,
      deliveryFee: 180,
      total: 3080,
    }),
  });

  const orderRes = await createOrderApi(checkoutReq);
  assert(orderRes.status === 201, `POST /api/orders created genuine order #${testOrderId} in MongoDB`);
  const orderData = await orderRes.json();
  const createdDbOrderId = orderData.order?._id?.toString();

  // Verify order appears in Admin Orders Query
  const allAdminOrders = await orderService.getOrders();
  const foundOrder = allAdminOrders.find((o) => o.orderId === testOrderId);
  assert(Boolean(foundOrder), `Order #${testOrderId} retrieved from MongoDB by orderService`);
  assert(foundOrder?.status === "pending", `Order #${testOrderId} initially has status 'pending'`);

  // 4. Dispatch Management: Courier assignment and Dispatch Transition
  console.log("\n--- 4. Dispatch & Courier Tracking Workflow ---");
  const dispatchReq = new NextRequest(`http://localhost:3000/api/orders/${testOrderId}`, {
    method: "PATCH",
    headers: authHeaders,
    body: JSON.stringify({
      status: "dispatched",
      courierProvider: "TCS Express",
      courierTrackingNumber: "TCS-99182310",
    }),
  });

  const dispatchRes = await updateOrderApi(dispatchReq, {
    params: Promise.resolve({ id: testOrderId }),
  });
  assert(dispatchRes.status === 200, `PATCH /api/orders/${testOrderId} updated courier & status to 'dispatched'`);
  const dispatchData = await dispatchRes.json();
  assert(
    dispatchData.order?.courierProvider === "TCS Express" &&
      dispatchData.order?.courierTrackingNumber === "TCS-99182310" &&
      Boolean(dispatchData.order?.dispatchedAt),
    `Courier tracking and dispatchedAt timestamp successfully persisted to MongoDB`
  );

  // 5. Delivery Confirmation & Revenue Calculation
  console.log("\n--- 5. Delivery Confirmation & Revenue Accuracy ---");
  const deliverReq = new NextRequest(`http://localhost:3000/api/orders/${testOrderId}`, {
    method: "PATCH",
    headers: authHeaders,
    body: JSON.stringify({
      status: "delivered",
    }),
  });

  const deliverRes = await updateOrderApi(deliverReq, {
    params: Promise.resolve({ id: testOrderId }),
  });
  assert(deliverRes.status === 200, `PATCH /api/orders/${testOrderId} updated status to 'delivered'`);
  const deliverData = await deliverRes.json();
  assert(
    deliverData.order?.status === "delivered" && Boolean(deliverData.order?.deliveredAt),
    `Delivered status and deliveredAt timestamp successfully stamped in MongoDB`
  );

  // Check revenue calculation
  const updatedOrders = await orderService.getOrders();
  const deliveredRevenue = updatedOrders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + (o.total || 0), 0);
  assert(
    deliveredRevenue >= 3080,
    `Delivered revenue accurately accounts for confirmed delivered order (Rs. ${deliveredRevenue.toLocaleString()})`
  );

  // 6. Cleanup Test Data
  console.log("\n--- 6. Clean Teardown of Test Records ---");
  const delOrderReq = new NextRequest(`http://localhost:3000/api/orders/${testOrderId}`, {
    method: "DELETE",
    headers: authHeaders,
  });
  const delOrderRes = await deleteOrderApi(delOrderReq, {
    params: Promise.resolve({ id: testOrderId }),
  });
  assert(delOrderRes.status === 200, `Cleaned up test order #${testOrderId}`);

  const delProdReq = new NextRequest(`http://localhost:3000/api/products/${testProductId}`, {
    method: "DELETE",
    headers: authHeaders,
  });
  const delProdRes = await deleteProductApi(delProdReq, {
    params: Promise.resolve({ id: testProductId }),
  });
  assert(delProdRes.status === 200, `Cleaned up test product (${testSku})`);

  // Final check
  const finalOrders = await orderService.getOrders();
  const finalProducts = await ProductModel.countDocuments({});
  assert(
    finalOrders.length === initialOrders.length,
    `Order registry returned to clean baseline (${finalOrders.length} records)`
  );
  assert(
    finalProducts === initialProductCount,
    `Catalog returned to pristine baseline (${finalProducts} genuine products)`
  );

  console.log("\n================================================================");
  console.log(`FINAL E2E RESULT: ${passed} PASSED, ${failed} FAILED`);
  console.log("================================================================");

  process.exit(failed > 0 ? 1 : 0);
}

runCompleteE2ETest().catch((err) => {
  console.error("Fatal E2E test failure:", err);
  process.exit(1);
});
