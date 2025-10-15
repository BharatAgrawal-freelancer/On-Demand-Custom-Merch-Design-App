import { Router } from "express"
import { requireAuth } from "../middlewares/authMiddleware.js"
import { getCart, addToCart, checkout, getOrder, getUserOrders, batchStatus } from "../controllers/orderController.js"

const router = Router()
router.get("/cart", requireAuth, getCart)
router.post("/cart", requireAuth, addToCart)
router.post("/checkout", requireAuth, checkout)
router.get("/user", requireAuth, getUserOrders)
router.get("/:orderId", requireAuth, getOrder)
router.get("/batch/:batchId", requireAuth, batchStatus)

export default router
