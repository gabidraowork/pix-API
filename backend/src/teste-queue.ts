import { transactionQueue } from "./queues/transaction.queue.js";
import crypto from "node:crypto"

for (let i = 1; i <= 1001; i++){
    const random = crypto.randomUUID()
    const job = await transactionQueue.add("process-pix",{
     payerId : 2,
     payeeKey : "stelinha",
     amount : 40,
     idempotencyKey: random
     
    });
    console.log(`Job criado: ${job.id}`)
}

process.exit(0)