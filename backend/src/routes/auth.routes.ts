import { Router } from "express";
import { authenticateController, createUserController } from "../controllers/auth.controller.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import { RegisterSchema } from "../schemas/auth.schema.js";
import { authenticationSchema } from "../schemas/auth.schema.js";
import { validate } from "../middlewares/validate.middleware.js";



const router = Router();

router.post("/register", validate(RegisterSchema), createUserController);

router.post("/login", validate(authenticationSchema), authenticateController);

export default router;