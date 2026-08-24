import prisma from "../lib/prisma.js";
import { PixKeyType } from "../generated/prisma/enums.js";
import { ExistingPixKeyError, ExistingUserError } from "../errors/error.classes.js";
import { dmmfToRuntimeDataModel } from "@prisma/client/runtime/client";

export async function createPixKeyService(
value : string, 
type: PixKeyType,
userId: number  ){
    const existingPixKey = await prisma.pixKey.findUnique({
        where: {
            value
        }
    })

    if(existingPixKey) throw new ExistingPixKeyError("PIX_KEY_already_exists");
    
    const account = await prisma.account.findUnique({
        where: {
            userId
        }
    })

    if(!account) throw new ExistingUserError("account_dont_exists");

    const newPixKey = await prisma.pixKey.create({
        data: {
            value,
            type,
            accountId: account.id
        },
        select: {
            value: true,
            type: true,
            accountId: true
        }
    })

    return newPixKey;
}

export async function deletePixKeyService(
    value: string,
    userId: number
) {
    const existingPixKey = await prisma.pixKey.findUnique({
        where: {
            value
        },
        include: {
            account: true
        }
    });

    if(!existingPixKey ||
        existingPixKey.account.userId !== userId ) 
        throw new ExistingPixKeyError("PIX_KEY_DO_NOT_EXIST");

    const deletedPixKey = await prisma.pixKey.delete({
        where: {
            id: existingPixKey.id
        },
        select: {
            value: true,
        }
    })

    return deletedPixKey;
}