import { Router } from "express";
import { validarCodigo, resetPassword} from "../controllers/passwordReset.controller.ts";
const router = Router();
router.post("/validar-codigo", validarCodigo);
router.post("/reset-password", resetPassword);

export default router;