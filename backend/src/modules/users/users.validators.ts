import { z } from "zod";

const nullableString = (max: number) =>
  z.union([z.string().trim().min(1).max(max), z.null()]).optional();

const nullableUrl = z
  .union([z.string().trim().url("Must be a valid URL").max(2048), z.null()])
  .optional();

export const updateProfileSchema = z
  .object({
    firstName: z.string().trim().min(1).max(60).optional(),
    lastName: z.string().trim().min(1).max(60).optional(),
    bio: nullableString(2000),
    avatar: nullableUrl,
    company: nullableString(200),
    website: nullableUrl,
    country: nullableString(100),
    timezone: z
      .union([
        z
          .string()
          .trim()
          .max(64)
          .regex(/^[A-Za-z0-9_+-]+(?:\/[A-Za-z0-9_+-]+)?$/, "Must be a valid timezone identifier"),
        z.null(),
      ])
      .optional(),
  })
  .refine((value) => Object.values(value).some((field) => field !== undefined), {
    message: "At least one field must be provided",
  });

export const userIdParamSchema = z.object({
  id: z.string().uuid(),
});

export type UpdateProfileBody = z.infer<typeof updateProfileSchema>;
export type UserIdParams = z.infer<typeof userIdParamSchema>;
