# @assetsmarket/database

Prisma ORM — **PostgreSQL 17** — schema and migrations.

## Environment

All Prisma commands load **`backend/.env`** (single source of truth). Do not create `packages/database/.env`.

Required in `backend/.env`: `DATABASE_URL`, `DIRECT_URL`.

## Commands

```bash
pnpm db:generate    # from repo root
pnpm db:migrate
pnpm db:studio
```

## Consumers

- `backend/src/lib/prisma.ts` — runtime client singleton
- **Not** frontend or sdk

Schema: `prisma/schema.prisma`. Raw SQL notes: `prisma/MIGRATION_NOTES.sql`.
