# Logging

Structured JSON logs via **pino**.

- Child logger per request with `requestId`
- Redact `password`, `authorization` fields
- Production: stdout → CloudWatch via ECS agent

Log levels controlled by `LOG_LEVEL` env.
