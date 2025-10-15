import { Router } from "express"
import {
  generateTextOverlay,
  generateImageOverlay,
  trendAiSuggestions,
  suggestTags,
} from "../controllers/aiController.js"
import { requireAuth } from "../middlewares/authMiddleware.js"

const router = Router()
router.post("/generateTextOverlay", requireAuth, generateTextOverlay)
router.post("/generateImageOverlay", requireAuth, generateImageOverlay)
router.get("/trends", trendAiSuggestions)
router.post("/suggestTags", requireAuth, suggestTags)

export default router
