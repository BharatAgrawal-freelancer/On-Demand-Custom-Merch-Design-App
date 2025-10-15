import { Router } from "express"
import { feed, getPost, createPost } from "../controllers/communityController.js"
import { requireAuth } from "../middlewares/authMiddleware.js"

const router = Router()
router.get("/feed", feed)
router.get("/:postId", getPost)
router.post("/create", requireAuth, createPost)

export default router
