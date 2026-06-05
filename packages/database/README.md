# @assetsmarket/database

Prisma ORM — **PostgreSQL 17** — schema and migrations.

## Responsibilities

- `prisma/schema/` or `prisma/schema.prisma` (when implemented)
- Migrations, seed (roles, categories)
- Export `prisma` client singleton

## Consumers

- `backend/src/database/` — wires client into app lifecycle
- `backend/tests/integration/` — test DB
- **Not** frontend or sdk

## Commands (planned)

- `db:generate`, `db:migrate`, `db:deploy`, `db:seed`, `db:studio`

Schema design documented in [docs/database/README.md](../../docs/database/README.md).

**No Prisma models in this scaffold.**
