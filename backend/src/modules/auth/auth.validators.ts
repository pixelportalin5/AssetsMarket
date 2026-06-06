import { z } from "zod";

import { REGISTERABLE_ROLE_SLUGS } from "./auth.constants.js";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be at most 128 characters")
  .regex(/[a-z]/, "Password must contain a lowercase letter")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/[0-9]/, "Password must contain a number")
  .regex(/[^A-Za-z0-9]/, "Password must contain a special character");

export const registerSchema = z.object({
  email: z.string().email().max(320).transform((v) => v.trim().toLowerCase()),
  password: passwordSchema,
  displayName: z.string().trim().min(2).max(120),
  role: z.enum(REGISTERABLE_ROLE_SLUGS),
});

export const loginSchema = z.object({
  email: z.string().email().max(320).transform((v) => v.trim().toLowerCase()),
  password: z.string().min(1).max(128),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

export const logoutSchema = refreshSchema;

export type RegisterBody = z.infer<typeof registerSchema>;
export type LoginBody = z.infer<typeof loginSchema>;
export type RefreshBody = z.infer<typeof refreshSchema>;
export type LogoutBody = z.infer<typeof logoutSchema>;
