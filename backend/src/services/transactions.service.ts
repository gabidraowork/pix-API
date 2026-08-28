import prisma from "../lib/prisma.js";
import { ExistingTransactionError,
    ExistingUserError, ExistingAccountError,
    ExistingPixKeyError,
    BalanceError
 } from "../errors/error.classes.js";
import { transactionQueue } from "../queues/transaction.queue.js";

export async function transactionService(payerId: number, payeeKey: string, amount: number, idempotencyKey: string){
    
    await transactionQueue.add("transactions",{
        payerId,
        payeeKey,
        amount,
        idempotencyKey
    })
    return transactionQueue.on("error", (err) => err);
}