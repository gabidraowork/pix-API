import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt.js"

export function authMiddleware(
    req: Request,
    res: Response,
    next : NextFunction
){
    const authorization = req.headers.authorization;

    if(!authorization){
        return res.status(401).json({
            message: "token not provided"
        });
    }

    const [type, token] = authorization.split(" ");

    if(type !== "Bearer" || !token){
        return res.status(401).json({
            message: "Invalid token"
        });
    }

    try {
        const payload = verifyToken(token);

        req.user.id = payload.userId;
        req.user.role = payload.role;

        next();

    } catch {
        
        return res.status(401).json({
            message: "Token inválido ou expirado"
        });
    }
}
