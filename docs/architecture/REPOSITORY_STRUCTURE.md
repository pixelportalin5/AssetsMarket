# AssetsMarket — Complete Repository Structure

Step 1 reference: full architecture tree (scaffold; no application code yet).

```
AssetsMarket/
├── README.md
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── .env.example
├── .gitignore
├── .nvmrc
│
├── frontend/                              # @assetsmarket/frontend
│   ├── README.md
│   ├── package.json                       # (planned)
│   ├── public/
│   ├── tests/
│   │   └── unit/
│   └── src/
│       ├── app/                           # Next.js 15 App Router
│       │   ├── layout.tsx                 # (planned)
│       │   ├── (marketing)/               # Public browse
│       │   ├── (auth)/                    # Login, register
│       │   └── (dashboard)/               # Authenticated shells
│       │       ├── seller/
│       │       ├── advertiser/
│       │       ├── admin/
│       │       └── buyer/
│       ├── features/                      # Vertical feature modules
│       │   ├── auth/
│       │   ├── marketplace/
│       │   ├── seller-dashboard/
│       │   ├── advertiser-dashboard/
│       │   ├── admin-dashboard/
│       │   ├── messaging/
│       │   ├── notifications/
│       │   └── transactions/
│       ├── components/                    # App-level composition
│       │   ├── layout/
│       │   ├── dashboard/
│       │   └── shared/
│       ├── hooks/
│       ├── services/                      # Thin wrappers → @assetsmarket/sdk
│       ├── providers/                     # TanStack Query, theme, auth context
│       ├── types/                         # Frontend-only view types
│       ├── state/                         # UI state (Zustand) — not server data
│       └── styles/                        # Globals, tokens, glass theme
│
├── backend/                               # @assetsmarket/backend
│   ├── README.md
│   ├── package.json                       # (planned)
│   ├── tests/
│   │   ├── unit/
│   │   └── integration/
│   └── src/
│       ├── modules/                       # Domain vertical slices
│       │   ├── auth/
│       │   ├── users/
│       │   ├── assets/
│       │   ├── verification/
│       │   ├── advertising/
│       │   ├── campaigns/
│       │   ├── bookings/
│       │   ├── transactions/
│       │   ├── escrow/
│       │   ├── messaging/
│       │   ├── notifications/
│       │   ├── reviews/
│       │   └── admin/
│       │       └── [each]/                # controllers, services, repositories,
│       │           ├── controllers/       # dto, validators, README.md
│       │           ├── services/
│       │           ├── repositories/
│       │           ├── dto/
│       │           └── validators/
│       ├── middleware/
│       ├── integrations/                  # Redis, S3, SES, payments
│       ├── events/                        # Domain events + handlers
│       │   └── handlers/
│       ├── jobs/                          # BullMQ workers
│       ├── config/
│       ├── logging/
│       └── database/                      # Prisma client re-export usage
│
├── packages/
│   ├── ui/                                # @assetsmarket/ui — shadcn + glass
│   ├── shared/                            # @assetsmarket/shared — types, constants
│   ├── sdk/                               # @assetsmarket/sdk — typed API client
│   ├── database/                            # @assetsmarket/database — Prisma
│   ├── config-eslint/                     # Shared lint (optional)
│   └── config-typescript/                 # Shared TSConfig (optional)
│
├── docs/
│   ├── README.md
│   ├── architecture/
│   ├── database/
│   ├── api/
│   ├── state-machines/
│   ├── decisions/
│   └── deployment/
│
├── infrastructure/
│   ├── README.md
│   ├── docker/
│   ├── redis/
│   ├── aws/
│   ├── cloudflare/
│   ├── monitoring/
│   └── scripts/
│
├── tests/                                 # Cross-cutting E2E
│   ├── e2e/
│   └── fixtures/
│
└── .github/
    └── workflows/
```

## Domain module alignment

| Business | Backend module | Frontend feature |
|----------|----------------|------------------|
| Authentication | `auth` | `auth` |
| User profiles | `users` | (profiles in dashboards) |
| Listings | `assets` | `seller-dashboard`, `marketplace` |
| Verification | `verification` | `seller-dashboard` |
| Ad inventory | `advertising` | `advertiser-dashboard`, `seller-dashboard` |
| Campaigns | `campaigns` | `advertiser-dashboard` |
| Bookings | `bookings` | `advertiser-dashboard` |
| Payments | `transactions` | `transactions` |
| Escrow | `escrow` | `transactions` |
| Messaging | `messaging` | `messaging` |
| Notifications | `notifications` | `notifications` |
| Reviews | `reviews` | marketplace / transactions |
| Moderation | `admin` | `admin-dashboard` |
