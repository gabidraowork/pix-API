import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { transactionSchema } from "../schemas/transaction.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { transactionController } from "../controllers/transactions.controller.js";

const router = Router();


router.post("/transaction", validate(transactionSchema), authMiddleware, requireRole("ADMIN","USER"), transactionController);

export default router;