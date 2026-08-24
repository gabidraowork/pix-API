import { z } from "zod";
import { PixKeyType } from "../generated/prisma/enums.js";

export const RegisterPixKeySchema = z.object({
  value: z.string().min(3).max(50),
  type: z.enum(PixKeyType)
}).strict();

export const DeletePixKeySchema = z.object({
  value: z.string().min(3).max(50),
}).strict();


