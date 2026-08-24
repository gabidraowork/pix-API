import jwt, {type JwtPayload} from "jsonwebtoken";
import "dotenv/config"
import { ValidationError } from "../errors/error.classes.js";
import type { Role } from "../generated/prisma/enums.js";

const JWT_SECRET = process.env.JWT_SECRET ?? "";

if(!JWT_SECRET) {
    throw new ValidationError("JWT_SECRET_nao_definida")
}

export interface AuthTokenPayload extends JwtPayload {
  userId: number;
  role: Role;
}

export function generateToken(userId : number, role: string){
    return jwt.sign(
        { userId, role },
        JWT_SECRET,
        {expiresIn : "1h"}
    );
}

export function verifyToken(token : string) : AuthTokenPayload{
    const decoded =  jwt.verify(token, JWT_SECRET);

    if(typeof decoded === "string") {
        throw new ValidationError("Token_invalido")
    }

    if(
        typeof decoded.userId !== "number" ||
        typeof decoded.role !== "string"
    ) {
        throw new ValidationError("Payload_do_token_invalido");
    }

    return decoded as AuthTokenPayload;
}