# Major folder guide

Step 2 reference — what each top-level area owns.

## `frontend/`

Next.js 15 UI. **App Router** in `src/app/` for URLs and layouts. **Features** in `src/features/` hold screens and TanStack Query hooks. **Services** call `@assetsmarket/sdk`. **Providers** wire Query, theme, auth. **State** is Zustand for UI-only. **Components** are dashboard shells, not shadcn primitives (those live in `packages/ui`).

## `backend/`

Express modular monolith. **`src/modules/`** = 13 domains, each with controllers → services → repositories → dto → validators. **`middleware/`** = HTTP pipeline. **`integrations/`** = Redis, S3, email, payments. **`events/`** = decouple side effects. **`jobs/`** = async workers. **`config/`** + **`logging/`** + **`database/`** = boot plumbing.

## `packages/ui`

Design system — shadcn, Tailwind preset, glass components. Frontend-only consumer.

## `packages/shared`

Enums, Zod validators, DTO types shared by backend, sdk, and forms.

## `packages/sdk`

Typed HTTP client; the only way frontend talks to backend.

## `packages/database`

Prisma schema, migrations, client. Backend-only.

## `docs/`

Human-readable specs: architecture, database, API, state machines, ADRs, deployment.

## `infrastructure/`

Docker Compose (local), Terraform (AWS), Cloudflare notes, monitoring, deploy scripts.

## `tests/`

Cross-app E2E (Playwright). Unit/integration live inside `frontend/` and `backend/`.

## `.github/`

CI/CD workflows — lint, test, build, deploy.
