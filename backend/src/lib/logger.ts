import { env } from "@/config/index.js";

type LogLevel = "debug" | "info" | "warn" | "error";

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

function shouldLog(level: LogLevel): boolean {
  return LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[env.LOG_LEVEL];
}

function write(level: LogLevel, message: string, meta?: Record<string, unknown>): void {
  if (!shouldLog(level)) return;

  const entry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...meta,
  };

  const output = JSON.stringify(entry);

  if (level === "error") {
    console.error(output);
    return;
  }

  console.log(output);
}

export const logger = {
  debug: (message: string, meta?: Record<string, unknown>) => write("debug", message, meta),
  info: (message: string, meta?: Record<string, unknown>) => write("info", message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => write("warn", message, meta),
  error: (message: string, meta?: Record<string, unknown>) => write("error", message, meta),
  child: (meta: Record<string, unknown>) => ({
    debug: (message: string, extra?: Record<string, unknown>) =>
      write("debug", message, { ...meta, ...extra }),
    info: (message: string, extra?: Record<string, unknown>) =>
      write("info", message, { ...meta, ...extra }),
    warn: (message: string, extra?: Record<string, unknown>) =>
      write("warn", message, { ...meta, ...extra }),
    error: (message: string, extra?: Record<string, unknown>) =>
      write("error", message, { ...meta, ...extra }),
  }),
};
