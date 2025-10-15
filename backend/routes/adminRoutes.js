import { Router } from "express"
import { requireAuth, requireAdmin } from "../middlewares/authMiddleware.js"
import {
  adminDashboard,
  adminUsers,
  adminProducts,
  adminOrders,
  adminTrends,
  adminComplaints,
} from "../controllers/adminControllers.js"

const router = Router()
router.use(requireAuth, requireAdmin)
router.get("/dashboard", adminDashboard)
router.get("/users", adminUsers)
router.get("/products", adminProducts)
router.get("/orders", adminOrders)
router.get("/trends", adminTrends)
router.get("/complaints", adminComplaints)

export default router
