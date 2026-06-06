# @assetsmarket/backend

Express + TypeScript **modular monolith** — **completely separate** from `frontend/`.

## Stack

- Node.js 20+, Express
- TypeScript
- Prisma via `@assetsmarket/database`
- PostgreSQL 17
- Redis (cache, sessions, BullMQ)

## Layered module pattern

```
HTTP Request
  → middleware (auth, validate, rate limit)
  → controller (parse req, call service, map res)
  → service (business rules, emit events)
  → repository (Prisma queries)
  → PostgreSQL
```

## Directory guide

| Path | Responsibility |
|------|----------------|
| `src/modules/*` | Domain vertical slices (13 modules) |
| `src/middleware/` | Express middleware chain |
| `src/integrations/` | External systems (S3, SES, Stripe, Redis) |
| `src/events/` | In-process domain events + handlers |
| `src/jobs/` | BullMQ queue definitions & workers |
| `src/config/` | Zod env validation (`env.ts`) — loads `backend/.env` |
| `src/lib/` | Prisma client, logger, shared errors |
| `tests/unit/` | Service & validator tests (mocked repos) |
| `tests/integration/` | HTTP + real Postgres (Docker) |

## Modules

auth, users, assets, verification, advertising, campaigns, bookings, transactions, escrow, messaging, notifications, reviews, admin.

See [src/modules/README.md](src/modules/README.md).

## Deployment

- **API process** — serves HTTP
- **Worker process** — consumes `src/jobs/` (same repo, different entry)

No API endpoints beyond auth and health in the current phase.
