# AssetsMarket

Production-grade monorepo for a digital asset marketplace and advertising platform.

## Repository layout

```
AssetsMarket/
├── frontend/           # Next.js 15 — UI (isolated)
├── backend/            # Express API — modular monolith (isolated)
├── packages/           # Shared libraries (ui, shared, sdk, database)
├── docs/               # Architecture, API, database, ADRs
├── infrastructure/     # Docker, Redis, AWS, Cloudflare, monitoring
├── tests/              # Cross-app E2E
└── .github/            # CI/CD workflows
```

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, TypeScript, Tailwind, shadcn/ui, TanStack Query |
| Backend | Node.js, Express, TypeScript, Prisma, PostgreSQL 17 |
| Cache / jobs | Redis, BullMQ |
| Infra | Docker (local), AWS + Cloudflare (production) |
| Monorepo | pnpm workspaces, Turborepo |

## Documentation

| Topic | Location |
|-------|----------|
| **Full architecture tree** | [docs/architecture/REPOSITORY_STRUCTURE.md](docs/architecture/REPOSITORY_STRUCTURE.md) |
| System overview | [docs/architecture/ARCHITECTURE.md](docs/architecture/ARCHITECTURE.md) |
| Frontend | [frontend/README.md](frontend/README.md) |
| Backend | [backend/README.md](backend/README.md) |
| Packages | [packages/README.md](packages/README.md) |
| Infrastructure | [infrastructure/README.md](infrastructure/README.md) |
| Testing | [tests/README.md](tests/README.md) |

## Principles

- **Modular monolith** — one API, vertical domain modules
- **Frontend / backend separation** — no `apps/` umbrella; top-level `frontend/` and `backend/`
- **Feature slices** — aligned modules on both sides
- **Solo-dev friendly** — predictable folders, README in every major path

## Getting started

```bash
pnpm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
pnpm docker:up                  # Postgres 17 + Redis + Mailhog (optional)
pnpm db:generate
pnpm dev:backend                # http://localhost:4000/health
pnpm dev:frontend               # http://localhost:3000
```

## License

Proprietary — PixelPortal / AssetsMarket.
