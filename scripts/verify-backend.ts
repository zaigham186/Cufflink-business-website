import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { connectToDatabase } from "../backend/lib/db";
import ProductModel from "../backend/models/Product";
import CollectionSettingsModel from "../backend/models/CollectionSettings";
import SiteContentModel from "../backend/models/SiteContent";
import { signAdminToken, verifyAdminToken } from "../backend/lib/auth";
import {
  getAllProducts,
  getFeaturedProducts,
  getProductBySlug,
  filterProducts,
} from "../shared/lib/products";
import { POST as createProduct, GET as getProducts } from "../app/api/products/route";
import {
  GET as getProductById,
  PUT as updateProductById,
  DELETE as deleteProductById,
} from "../app/api/products/[id]/route";
import { PUT as updateCollections } from "../app/api/collections/route";
import { PUT as updateContent } from "../app/api/content/route";
import { NextRequest } from "next/server";

async function runVerification() {
  console.log("==================================================");
  console.log("PHASE 7 AUTOMATED VERIFICATION & QUALITY AUDIT");
  console.log("==================================================\n");

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

  // 1. Database Connection
  console.log("--- 1. Database & Models ---");
  await connectToDatabase();
  const totalProducts = await ProductModel.countDocuments({});
  assert(totalProducts > 0, `MongoDB connection verified (${totalProducts} products found in Atlas)`);

  const collections = await CollectionSettingsModel.countDocuments({});
  assert(collections === 3, `Collection settings verified (3 tiers configured)`);

  const content = await SiteContentModel.findOne();
  assert(content !== null, `Site content document verified in Atlas`);

  // 2. Query functions in lib/products.ts
  console.log("\n--- 2. Storefront Query Functions (lib/products.ts) ---");
  const allProds = await getAllProducts();
  assert(allProds.length === totalProducts, `getAllProducts() returns ${allProds.length} products`);

  const featuredProds = await getFeaturedProducts(4);
  assert(featuredProds.length > 0 && featuredProds.every((p) => p.featured), `getFeaturedProducts() returns active featured items`);

  const sampleSlug = allProds[0].slug;
  const singleProd = await getProductBySlug(sampleSlug);
  assert(singleProd !== undefined && singleProd.slug === sampleSlug, `getProductBySlug('${sampleSlug}') retrieves product details`);

  const filtered = await filterProducts({ category: "classical" });
  assert(filtered.length > 0 && filtered.every((p) => p.categorySlug === "classical"), `filterProducts({ category: 'classical' }) returns correct tier`);

  // 3. Security & Token Verification
  console.log("\n--- 3. Security & Admin Authentication ---");
  const token = signAdminToken();
  const isValidToken = verifyAdminToken(token);
  assert(isValidToken === true, `signAdminToken() creates valid signed JWT token`);

  const isInvalidToken = verifyAdminToken("invalid-tampered-token");
  assert(isInvalidToken === false, `verifyAdminToken() rejects invalid/tampered tokens`);

  // 4. API Security: Unauthenticated mutations rejected with 401
  console.log("\n--- 4. Route Security (Unauthenticated 401 Checks) ---");
  const unauthReq = new NextRequest("http://localhost:3000/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Hacker Product" }),
  });
  const unauthPostRes = await createProduct(unauthReq);
  assert(unauthPostRes.status === 401, `POST /api/products without cookie rejected with 401 Unauthorized`);

  const unauthPutReq = new NextRequest("http://localhost:3000/api/products/123", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ price: 9999 }),
  });
  const unauthPutRes = await updateProductById(unauthPutReq, { params: Promise.resolve({ id: "123" }) });
  assert(unauthPutRes.status === 401, `PUT /api/products/[id] without cookie rejected with 401 Unauthorized`);

  const unauthDelReq = new NextRequest("http://localhost:3000/api/products/123", {
    method: "DELETE",
  });
  const unauthDelRes = await deleteProductById(unauthDelReq, { params: Promise.resolve({ id: "123" }) });
  assert(unauthDelRes.status === 401, `DELETE /api/products/[id] without cookie rejected with 401 Unauthorized`);

  const unauthCollReq = new NextRequest("http://localhost:3000/api/collections", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tier: "Classical", priceRangeLabel: "Free", description: "Test" }),
  });
  const unauthCollRes = await updateCollections(unauthCollReq);
  assert(unauthCollRes.status === 401, `PUT /api/collections without cookie rejected with 401 Unauthorized`);

  const unauthContReq = new NextRequest("http://localhost:3000/api/content", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ heroHeadline: "Hacked" }),
  });
  const unauthContRes = await updateContent(unauthContReq);
  assert(unauthContRes.status === 401, `PUT /api/content without cookie rejected with 401 Unauthorized`);

  // 5. Authenticated CRUD Cycle
  console.log("\n--- 5. End-to-End Authenticated Product Lifecycle ---");
  const testSku = `CK-TEST-${Date.now().toString().slice(-4)}`;
  const testSlug = `test-cufflinks-${Date.now()}`;

  const authHeaders = {
    "Content-Type": "application/json",
    cookie: `ck_admin_token=${token}`,
  };

  const createReq = new NextRequest("http://localhost:3000/api/products", {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({
      name: "Phase 7 Test Cufflinks",
      slug: testSlug,
      category: "Classical",
      categorySlug: "classical",
      description: "Automated test item for verifying the admin creation lifecycle.",
      price: 1250,
      images: ["/products/classic1.jpeg"],
      material: "Polished Brass",
      finish: "Mirror Polish",
      color: "Champagne Gold",
      sku: testSku,
      stock: "in-stock",
      stockCount: 15,
      featured: false,
    }),
  });

  const createRes = await createProduct(createReq);
  assert(createRes.status === 201, `POST /api/products with admin token created product (${testSku})`);
  const createData = await createRes.json();
  const createdId = createData.product?._id?.toString() || createData.product?.id;

  if (createdId) {
    // Verify it can be fetched via GET /api/products/[id]
    const getReq = new NextRequest(`http://localhost:3000/api/products/${createdId}`);
    const getRes = await getProductById(getReq, { params: Promise.resolve({ id: createdId }) });
    assert(getRes.status === 200, `GET /api/products/${createdId} returns the created product`);

    // Update product via PUT /api/products/[id]
    const updateReq = new NextRequest(`http://localhost:3000/api/products/${createdId}`, {
      method: "PUT",
      headers: authHeaders,
      body: JSON.stringify({
        price: 1350,
        stockCount: 8,
      }),
    });
    const updateRes = await updateProductById(updateReq, { params: Promise.resolve({ id: createdId }) });
    assert(updateRes.status === 200, `PUT /api/products/${createdId} successfully updated price to Rs. 1,350`);

    // Delete product via DELETE /api/products/[id]
    const deleteReq = new NextRequest(`http://localhost:3000/api/products/${createdId}`, {
      method: "DELETE",
      headers: authHeaders,
    });
    const deleteRes = await deleteProductById(deleteReq, { params: Promise.resolve({ id: createdId }) });
    assert(deleteRes.status === 200, `DELETE /api/products/${createdId} successfully cleaned up test product`);

    // Verify it is gone
    const verifyDeleted = await ProductModel.findById(createdId);
    assert(verifyDeleted === null, `Verified test product is permanently removed from MongoDB`);
  }

  console.log("\n==================================================");
  console.log(`VERIFICATION SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");

  process.exit(failed > 0 ? 1 : 0);
}

runVerification().catch((err) => {
  console.error("Test execution error:", err);
  process.exit(1);
});
