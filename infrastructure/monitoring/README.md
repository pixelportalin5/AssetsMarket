# Monitoring

## AWS (production)

- **CloudWatch** — ECS logs, RDS metrics, ElastiCache
- **Alarms** — API 5xx rate, RDS CPU, Redis memory, queue depth
- **Dashboards** — API latency p50/p95, error rate, active users

## App instrumentation (planned)

- OpenTelemetry traces from backend → X-Ray optional
- Structured pino logs with `requestId`
- Health: `GET /health` (liveness), `GET /ready` (DB + Redis)

## Frontend

- Vercel Analytics or Cloudflare Web Analytics (TBD in ADR)
- Error boundary reporting (Sentry optional → `integrations/` doc)
