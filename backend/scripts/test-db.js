const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load backend/.env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

function sanitizeUri(uri) {
  try {
    return uri.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@");
  } catch {
    return "mongodb://[credentials-hidden]";
  }
}

async function testConnection() {
  console.log("\n==================================================");
  console.log("🔍  Testing MongoDB Atlas Connection for CuffKings");
  console.log("==================================================\n");

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("❌  Error: MONGODB_URI is not set in backend/.env!");
    console.error("👉  Please open backend/.env and paste your MongoDB Atlas connection string:\n");
    console.error("    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/cuffkings?retryWrites=true&w=majority\n");
    process.exit(1);
  }

  const isAtlas = uri.startsWith("mongodb+srv://");
  console.log(`[MongoDB] Connecting to ${isAtlas ? "MongoDB Atlas Cluster" : "MongoDB"} (${sanitizeUri(uri)})...`);

  try {
    const db = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`✅  Successfully connected to database: "${db.connection.name}"`);

    // Ping test
    const pingResult = await db.connection.db.admin().ping();
    console.log("📡  Database Ping Response:", pingResult);

    // List collections
    const collections = await db.connection.db.listCollections().toArray();
    console.log(`📁  Collections in "${db.connection.name}":`, collections.length > 0 ? collections.map((c) => c.name) : "(none yet - ready to seed)");

    console.log("\n🎉  Atlas Connection Verified! MongoDB is ready for CuffKings.\n");
  } catch (error) {
    console.error("\n❌  Connection Error:");
    console.error(`   Message: ${error.message}`);

    if (error.name === "MongoServerSelectionError") {
      console.error("\n💡  [Atlas Troubleshooting Tip - IP Whitelist]:");
      console.error("   1. Go to https://cloud.mongodb.com");
      console.error("   2. Navigate to 'Network Access' on the left menu");
      console.error("   3. Click 'Add IP Address'");
      console.error("   4. Select 'Allow Access from Anywhere' (0.0.0.0/0) or add your current IP address");
      console.error("   5. Click Confirm and wait 1 minute for it to apply.\n");
    } else if (error.message && (error.message.includes("bad auth") || error.message.includes("Authentication failed"))) {
      console.error("\n💡  [Atlas Troubleshooting Tip - Authentication]:");
      console.error("   1. Verify your Database Username and Password in 'Database Access' tab on Atlas.");
      console.error("   2. If your password has special characters like @, %, :, encode them or use an alphanumeric password.\n");
    }
  } finally {
    await mongoose.disconnect();
    console.log("🔌  Connection closed.\n");
    process.exit(0);
  }
}

testConnection();
