import mongoose from "mongoose";

let isConnected = false;

// Helper to sanitize connection URI for safe console logging
function sanitizeUri(uri: string): string {
  try {
    return uri.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@");
  } catch {
    return "mongodb://[credentials-hidden]";
  }
}

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn("\n⚠️  [MongoDB Atlas] MONGODB_URI is not set in backend/.env.");
    console.warn("👉  Please paste your MongoDB Atlas connection string in backend/.env: MONGODB_URI=mongodb+srv://...\n");
    return;
  }

  if (isConnected) {
    return;
  }

  const sanitized = sanitizeUri(uri);
  const isAtlas = uri.startsWith("mongodb+srv://");

  console.log(`[MongoDB] Connecting to ${isAtlas ? "MongoDB Atlas Cluster" : "MongoDB"} (${sanitized})...`);

  // Connection event listeners
  mongoose.connection.on("connected", () => {
    console.log(`✅ [MongoDB Atlas] Successfully connected to database: "${mongoose.connection.name}"`);
  });

  mongoose.connection.on("error", (err) => {
    console.error("❌ [MongoDB Atlas] Runtime connection error:", err.message || err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️  [MongoDB Atlas] Connection disconnected.");
  });

  try {
    const db = await mongoose.connect(uri, {
      dbName: "cuffkings",
      serverSelectionTimeoutMS: 10000, // Timeout after 10s if cannot connect
      autoIndex: true,
    });

    isConnected = db.connections[0].readyState === 1;
  } catch (error: any) {
    console.error("\n❌ [MongoDB Atlas] Connection Error:");
    console.error(`   Message: ${error.message}`);

    if (error.name === "MongoServerSelectionError") {
      console.error("\n💡 [Atlas Troubleshooting Tip - IP Whitelist]:");
      console.error("   1. Go to https://cloud.mongodb.com");
      console.error("   2. Navigate to 'Network Access' on the left menu");
      console.error("   3. Click 'Add IP Address'");
      console.error("   4. Select 'Allow Access from Anywhere' (0.0.0.0/0) or add your current IP address");
      console.error("   5. Click Confirm and wait 1 minute for it to apply.\n");
    } else if (error.message?.includes("bad auth") || error.message?.includes("Authentication failed")) {
      console.error("\n💡 [Atlas Troubleshooting Tip - Authentication]:");
      console.error("   1. Verify your Database Username and Password in 'Database Access' tab on Atlas.");
      console.error("   2. If your password has special characters like @, %, :, encode them or use an alphanumeric password.\n");
    }

    throw error;
  }
}

export default connectDB;
