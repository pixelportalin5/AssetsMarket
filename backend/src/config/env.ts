import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  API_PREFIX: z.string().min(1).default("/api/v1"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  DATABASE_URL: z.string().url().startsWith("postgresql://"),
  CORS_ORIGIN: z.string().url().default("http://localhost:3000"),
  API_VERSION: z.string().default("1.0.0"),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const formatted = result.error.flatten().fieldErrors;
    console.error("Invalid environment configuration:", formatted);
    process.exit(1);
  }

  return result.data;
}

export const env = loadEnv();
