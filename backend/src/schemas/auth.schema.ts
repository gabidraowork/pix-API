import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.email(),
  password: z.string().min(6)
}).strict();

export const authenticationSchema = z.object({
  email: z.email(),
  password: z.string().min(6)
}).strict();

export type AuthenticateParams = z.infer<typeof authenticationSchema>;
export type RegisterParams = z.infer<typeof RegisterSchema>;