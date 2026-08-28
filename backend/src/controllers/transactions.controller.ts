import type { Request, Response } from "express";
import { transactionService } from "../services/transactions.service.js";

export async function transactionController(req : Request, res: Response) {
    const { id } = req.user;
    const { payeeKey, amount, idempotencyKey} = req.body;

    try {
        const job = await transactionService(id, payeeKey, amount, idempotencyKey);
        return res.status(202).json({
            message: "transaction completed",
        })
    } catch (err : any) {
        return res.status(500).json({
            message: "Internal server error",
            error: err
        })
    }
}