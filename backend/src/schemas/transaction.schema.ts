import { z } from "zod";

export const transactionSchema = z.object({
    payeeKey: z.string().min(3).max(100),
    amount : z.number().positive(),
    idempotencyKey: z.string().min(3).max(300)
}).strict()