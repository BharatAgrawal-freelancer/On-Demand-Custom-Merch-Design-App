import { Router } from "express"
import { requireAuth } from "../middlewares/authMiddleware.js"
import {
  createDesign,
  getDesigns,
  getDesignById,
  updateDesign,
  addOverlay,
  createVersion,
  getVersions,
  setCollaborators,
} from "../controllers/designController.js"

const router = Router()

router.get("/", requireAuth, getDesigns)
router.post("/", requireAuth, createDesign)
router.get("/:designId", requireAuth, getDesignById)
router.patch("/:designId", requireAuth, updateDesign)
router.post("/:designId/overlays", requireAuth, addOverlay)
router.post("/:designId/versions", requireAuth, createVersion)
router.get("/:designId/versions", requireAuth, getVersions)
router.post("/:designId/collaborators", requireAuth, setCollaborators)

export default router
