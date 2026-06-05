# Future additions

Extensions that fit the current structure without rewrites.

## Product

| Addition | Location |
|----------|----------|
| Organizations / teams | `backend/modules/organizations`, `frontend/features/...` |
| Offers / negotiations | `backend/modules/offers` |
| Auctions | `backend/modules/auctions` |
| Audit log viewer | extend `admin` module |
| Analytics event pipeline | `backend/src/integrations/analytics`, SQS consumer in `jobs/` |

## Technical

| Addition | Location |
|----------|----------|
| WebSocket / SSE | `backend/modules/messaging/realtime`, `frontend/providers/RealtimeProvider` |
| OpenAPI codegen | `packages/sdk` generation from `docs/api/openapi.yaml` |
| Search service | Meilisearch adapter in `integrations/`, optional `packages/search` |
| Mobile app | New `mobile/` app consuming `sdk` |
| Feature flags | `packages/shared/constants/flags`, LaunchDarkly in `integrations/` |
| i18n | `frontend/src/i18n/`, `packages/shared/locales/` |

## Infrastructure

| Addition | Location |
|----------|----------|
| Kubernetes | `infrastructure/k8s/` if outgrowing ECS |
| Staging preview envs | Cloudflare Pages previews for frontend |
| Read replicas | RDS replica + read-only Prisma extension in `database` |

## Extraction candidates (when scale demands)

1. **Worker service** — already split entry for `jobs/`
2. **Messaging service** — highest row volume
3. **Webhook ingestion** — `transactions` + `integrations/payments`

Extract by moving module folder + adding HTTP/gRPC — folder names already match service boundaries.
