import type { Request, Response, NextFunction } from "express";
import type { Role } from "../generated/prisma/enums.js";

export function requireRole(...allowedRoles: Role[]) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Acess denied"
      });
    }

    next();
  };
}