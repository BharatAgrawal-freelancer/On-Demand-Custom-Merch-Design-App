import { Router } from "express"
import { requireAuth } from "../middlewares/authMiddleware.js"
import { uploadImage } from "../controllers/uploadController.js"

const router = Router()
router.post("/", requireAuth, uploadImage)

export default router
