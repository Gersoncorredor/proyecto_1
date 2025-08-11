import { Router } from "express";
import {getUserProfile, updateUserProfile} from "../controllers/profile.controller.ts"
const router = Router();
import { authMiddleware, requireTodos, } from "../middlewares/auth.middleware.ts";
router.get("/:numero_documento", authMiddleware,requireTodos,getUserProfile)
router.put("/:numero_documento", authMiddleware,requireTodos,updateUserProfile)

export default router;