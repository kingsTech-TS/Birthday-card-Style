import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://kingTech_db_user:19724212@cluster0.2rwinup.mongodb.net/"

if (!MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in .env.local");
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = !!db.connections[0].readyState;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
