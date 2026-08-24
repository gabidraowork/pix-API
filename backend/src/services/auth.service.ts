import prisma from "../lib/prisma.js";
import { ExistingUserError, ValidationError } from "../errors/error.classes.js";
import bcrypt from "bcrypt"
import { generateToken } from "../lib/jwt.js";

export async function createUserService(username: string, email: string, password: string){
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (existingUser) throw new ExistingUserError("user_already_exists");

    const hashPassword = await bcrypt.hash(password, 10)

    await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
            data: {
            username,
            email,
            hashPassword,
            role: "USER"
            },
            select: {
                id: true,
                username: true,
                email: true,
            }
        });

        const newAccount = await tx.account.create({
            data: {
            userId: newUser.id
            },
            select: {
                id: true,
                balance: true
            }
        });

        return {
            newUser,
            newAccount
        };
    });
}

export async function authenticateService(email: string, password: string){
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    
    if(!user) throw new ExistingUserError("invalid_data");

    const passwordMatch : boolean = await bcrypt.compare(password, user.hashPassword);
    
    if(!passwordMatch) {
        throw new ValidationError("invalid_data")
    }

    const token = generateToken(user.id, user.role);

    return {
        token
    }
}