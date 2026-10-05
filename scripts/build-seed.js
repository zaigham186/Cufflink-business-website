const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '..', 'lib', 'products.ts');
const content = fs.readFileSync(productsFilePath, 'utf8');

// Extract the products array text between "const products: Product[] = [" and "];\n\n// Data access functions"
const startIndex = content.indexOf('const products: Product[] = [');
const endIndex = content.indexOf('];\n\n// Data access functions');

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find array boundaries in lib/products.ts");
  process.exit(1);
}

const rawArrayText = content.substring(startIndex + 'const products: Product[] = ['.length, endIndex).trim();

// Write scripts/seed-products.ts
const seedScriptContent = `import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { connectToDatabase } from "../lib/db";
import ProductModel from "../models/Product";

const RAW_PRODUCTS = [
  ${rawArrayText}
];

const PRODUCTS_DATA = RAW_PRODUCTS.map((p) => {
  const stockCount = typeof p.stock === "number" ? p.stock : 10;
  const stockStatus = stockCount === 0 ? "out-of-stock" : stockCount <= 5 ? "low-stock" : "in-stock";
  
  return {
    name: p.name,
    slug: p.slug,
    category: p.category,
    categorySlug: p.categorySlug || p.category.toLowerCase(),
    description: p.description,
    longDescription: p.longDescription || p.description,
    price: p.price,
    salePrice: p.salePrice || (p.compareAtPrice && p.compareAtPrice > p.price ? p.price : undefined),
    compareAtPrice: p.compareAtPrice,
    images: p.images || [],
    material: p.material || "Metal",
    finish: p.finish || "Polished",
    color: p.color || "Gold",
    shape: p.shape,
    pattern: p.pattern,
    isSet: Boolean(p.isSet),
    pairsCount: p.pairsCount || 1,
    stock: stockStatus,
    stockCount: stockCount,
    sku: p.sku,
    featured: Boolean(p.featured),
    isFeatured: Boolean(p.featured),
    isNew: false,
    isLimited: false,
    details: {
      dimensions: p.details?.dimensions || "16mm x 16mm",
      weight: p.details?.weight || "14g",
      fastening: p.details?.fastening || "Swivel toggle",
      care: p.details?.care || "Wipe with a soft dry cloth.",
    },
    hasPhotography: Boolean(p.hasPhotography),
    video: p.video,
    heroVideo: p.heroVideo,
  };
});

async function seed() {
  console.log("Connecting to database...");
  await connectToDatabase();
  console.log("Deleting existing products in MongoDB...");
  await ProductModel.deleteMany({});
  console.log("Inserting " + PRODUCTS_DATA.length + " products into MongoDB Atlas...");
  const inserted = await ProductModel.insertMany(PRODUCTS_DATA);
  console.log(\`Successfully seeded \${inserted.length} products to MongoDB Atlas!\`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
`;

const scriptsDir = path.join(__dirname);
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir, { recursive: true });
}

fs.writeFileSync(path.join(scriptsDir, 'seed-products.ts'), seedScriptContent, 'utf8');
console.log("Generated scripts/seed-products.ts successfully!");
