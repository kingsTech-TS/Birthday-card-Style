import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://kingTech_db_user:19724212@cluster0.2rwinup.mongodb.net/"; // replace with your URI

// To avoid multiple connections in dev (especially with Next.js hot reload)
let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log("✅ MongoDB already connected");
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = !!db.connections[0].readyState;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}
