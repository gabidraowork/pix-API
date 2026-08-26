import { Worker } from "bullmq";
import { redis } from "../config/redis.js";
import prisma from "../lib/prisma.js";
import crypyo from "node:crypto";
import { ExistingTransactionError,
    ExistingUserError, ExistingAccountError,
    ExistingPixKeyError,
    BalanceError
} from "../errors/error.classes.js"


const worker = new Worker("transactions",
    async (job) => {
        const {payerId, payeeKey, idempotencyKey, amount} = job.data;
        const existingTransaction = await prisma.transaction.findUnique({
        where: {
            idempotencyKey 
        }
    })

    if (existingTransaction) throw new ExistingTransactionError("transacao_ja_foi_realizada_antes");

    

    const payer = await prisma.user.findUnique({
        where: {
            id: payerId
        }
    })

    if(!payer) throw new ExistingUserError("usuario_nao_encontrado");

    const payerAccount = await prisma.account.findUnique({
        where: {
            userId: payer.id
        }
    });

    if(!payerAccount) throw new ExistingAccountError("conta_do_pagador_nao_encontrada");

    const payeePixKey = await prisma.pixKey.findUnique({
        where: {
            value: payeeKey
        }
    })

    if (!payeePixKey) throw new ExistingPixKeyError("chave_pix_nao_encontrada");

    const payeeAccount = await prisma.account.findUnique({
        where: {
            id: payeePixKey.accountId
        }
    })

    if(!payeeAccount) throw new ExistingAccountError("conta_do_credor_nao_encontrada");

    await prisma.$transaction(async (tx) =>{
        const newPayerBalance = Number(payerAccount.balance) - amount;
        if(newPayerBalance < 0) throw new BalanceError("saldo_insuficiente");

        console.log("==========================");
        console.log(`Processando job ${job.id}`)
        console.log(`dados ${JSON.stringify(job.data)}`)
        console.log("==========================");

        await tx.account.update({
            where: {
                id : payerAccount.id
            },
            data: {
                balance: newPayerBalance
            }
        });

        const newPayeeBalance = Number(payeeAccount.balance) + amount; 
        await tx.account.update({
            where: {
                id: payeeAccount.id
            },
            data: {
                balance: newPayeeBalance
            }
        });
        
        const endToEndId = crypyo.randomUUID();
        await tx.transaction.create({
            data: {
                endToEndId,
                idempotencyKey,
                payeeAccountId: payerAccount.id,
                payerAccountId: payeeAccount.id,
                pixKeyId: payeePixKey.id,
                amount 
            }
        })
    });
    
    },
    {
        connection: redis
    }
);

worker.on("completed", (job) => {
    console.log(`Job ${job.id} concluido`)
})

worker.on("failed", (job : any, err) => {
    console.error(`Job ${job.id} falhou`)
    console.error(err)
})