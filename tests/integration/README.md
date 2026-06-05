# Integration tests

API-level tests with real PostgreSQL and Redis (Testcontainers or Docker Compose).

## Planned structure

```
integration/
├── setup.ts            # DB migrate, seed minimal data
├── teardown.ts
└── api/
    ├── auth.test.ts
    ├── assets.test.ts
    └── bookings.test.ts
```

## Principles

- Test **modules** through HTTP supertest or fetch — black box
- One transaction rollback per test OR truncate tables in setup
- Never hit production AWS — localstack optional for S3 later

## When to add

After first API routes and Prisma schema exist — scaffold holds structure only.
