# Database access

Bootstraps Prisma client from `@assetsmarket/database`.

## Responsibilities

- Singleton `prisma` export
- Connection lifecycle (connect on boot, graceful shutdown)
- Transaction helper `withTransaction(fn)` for services

Schema and migrations live only in `packages/database/prisma/`.
