import { Router } from "express"
import { listTrends } from "../controllers/trendController.js"

const router = Router()
router.get("/", listTrends)

export default router
