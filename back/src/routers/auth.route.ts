import {Router} from "express";
import { Login,register } from "../controllers/auth.controller.ts";
const router = Router()

router.post("/login",Login);
router.post("/register", register);

export default router
