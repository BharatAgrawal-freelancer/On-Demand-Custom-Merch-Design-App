import "dotenv/config"
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import { enforceAuthOnMutations, optionalAuth } from "./middlewares/authMiddleware.js"

import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import designRoutes from "./routes/designRoutes.js"
import communityRoutes from "./routes/communityRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import trendRoutes from "./routes/trendRoutes.js"
import aiRoutes from "./routes/aiRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import searchRoutes from "./routes/searchRoutes.js"

const app = express()
app.use(cors())
app.use(express.json({ limit: "5mb" }))
app.use("/api/auth", authRoutes)
app.use(optionalAuth)
app.use(enforceAuthOnMutations)

app.get("/api/health", (_req, res) => res.json({ ok: true }))


app.use("/api/user", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/designs", designRoutes)
app.use("/api/community", communityRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/trends", trendRoutes)
app.use("/api/ai", aiRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/search", searchRoutes)

// 404
app.use((req, res) => res.status(404).json({ message: "Not Found" }))

const PORT = process.env.PORT || 5000
connectDB().then(() => {
  app.listen(PORT, () => console.log(`[Server] Running on :${PORT}`))
})
