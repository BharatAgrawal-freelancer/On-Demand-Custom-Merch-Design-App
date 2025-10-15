import { Router } from "express"
import {
  getDashboard,
  getProfile,
  updateProfile,
  getFollowers,
  getFollowing,
  getLikedPosts,
  getComplaints,
} from "../controllers/userController.js"
import { requireAuth } from "../middlewares/authMiddleware.js"

const router = Router()

router.get("/dashboard", requireAuth, getDashboard)
router.get("/profile/:userId", getProfile)
router.put("/updateProfile", requireAuth, updateProfile)
router.get("/followers", requireAuth, getFollowers)
router.get("/following", requireAuth, getFollowing)
router.get("/likedPosts", requireAuth, getLikedPosts)
router.get("/complaints", requireAuth, getComplaints)

export default router
