import mongoose from "mongoose"

export const connectDB = async () => {
  const uri = process.env.MONGO_URI
  if (!uri) {
    console.error("[DB] MONGO_URI missing")
    process.exit(1)
  }
  try {
    await mongoose.connect(uri, { dbName: "merch_app" })
    console.log("[DB] Connected")
  } catch (err) {
    console.error("[DB] Connection error:", err.message)
    process.exit(1)
  }
}
