import { Router } from "express";
import { requireRole } from "../middlewares/role.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import { RegisterPixKeySchema } from "../schemas/pixKey.schema.js";
import { validate } from "../middlewares/validate.middleware.js";



const router = Router();

router.post("/register",validate(RegisterPixKeySchema), authMiddleware, requireRole("USER","ADMIN"), );



export default router;