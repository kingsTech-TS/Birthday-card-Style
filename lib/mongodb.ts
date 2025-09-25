import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error("❌ Please add your MongoDB URI to .env.local")
}

// Global cache across hot reloads
let cached = (global as any).mongoose || { conn: null, promise: null }

export async function connectDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "birthday_app", // optional: set your db name
      })
      .then((mongoose) => mongoose)
  }

  try {
    cached.conn = await cached.promise
    console.log("✅ MongoDB connected")
    return cached.conn
  } catch (err) {
    cached.promise = null
    console.error("❌ MongoDB connection error:", err)
    throw err
  }
}

if (process.env.NODE_ENV !== "production") {
  (global as any).mongoose = cached
}
