# @assetsmarket/frontend

Next.js 15 application — **completely separate** from `backend/`.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + `@assetsmarket/ui` (shadcn)
- TanStack Query (server/async state)
- Zustand (`src/state/` — UI-only state)

## UI direction

Dark theme, minimalist, futuristic **glassmorphism**, dashboard-centric, fully responsive.

## Directory guide

| Path | Responsibility |
|------|----------------|
| `src/app/` | Routes, layouts, metadata — thin pages only |
| `src/features/` | Vertical slices (marketplace, dashboards, auth, messaging) |
| `src/components/` | App shells: sidebar, dashboard widgets (not primitives) |
| `src/hooks/` | Cross-feature React hooks |
| `src/services/` | Feature API adapters calling `@assetsmarket/sdk` |
| `src/providers/` | QueryClient, Theme, Auth context |
| `src/types/` | View models & props not in `@assetsmarket/shared` |
| `src/state/` | Zustand stores (sidebar, modals, wizard steps) |
| `src/styles/` | CSS variables, Tailwind layers |
| `tests/unit/` | Vitest + React Testing Library |

## Data flow

```
Page → Feature component → useQuery (TanStack) → service → @assetsmarket/sdk → backend
```

**Never** import `@assetsmarket/database` or Prisma.

## Dashboards

| Route group | Feature module |
|-------------|----------------|
| `(dashboard)/seller` | `seller-dashboard` |
| `(dashboard)/advertiser` | `advertiser-dashboard` |
| `(dashboard)/admin` | `admin-dashboard` |
| `(marketing)` | `marketplace` |

See [src/features/README.md](src/features/README.md).
