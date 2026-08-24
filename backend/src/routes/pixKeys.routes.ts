import { Router } from "express";
import { requireRole } from "../middlewares/role.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import { DeletePixKeySchema, RegisterPixKeySchema } from "../schemas/pixKey.schema.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createPixKeyController, deletePixKeyController } from "../controllers/pixKey.controller.js";



const router = Router();

router.post("/register", validate(RegisterPixKeySchema), authMiddleware, requireRole("USER","ADMIN"), createPixKeyController);
router.delete("/delete", validate(DeletePixKeySchema), authMiddleware, requireRole("USER","ADMIN"), deletePixKeyController);

export default router;