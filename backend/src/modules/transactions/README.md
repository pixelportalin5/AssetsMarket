# Module: Transactions

Payments, refunds, platform fees, provider webhooks (idempotent).

## Layer structure

| Layer | Responsibility |
|-------|----------------|
| `controllers/` | HTTP handlers — parse request, invoke service, return DTO |
| `services/` | Business rules, transactions, emit domain events |
| `repositories/` | Prisma queries only |
| `dto/` | Request/response TypeScript types |
| `validators/` | Zod schemas (prefer `@assetsmarket/shared`) |

## Boundaries

- No cross-module Prisma access — call other modules via their **service** export
- No HTTP types in repositories

## Routes

Not defined in this scaffold. Register in module `index.ts` when implemented.

