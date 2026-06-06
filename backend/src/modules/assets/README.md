# Module: Assets

Marketplace Core — asset listings CRUD, publish lifecycle, marketplace browse.

## Routes

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/assets` | Public | Browse published assets |
| `GET` | `/assets/my` | Seller | List own assets |
| `GET` | `/assets/:id` | Optional | Public detail or owner manage view |
| `POST` | `/assets` | Seller | Create draft |
| `PATCH` | `/assets/:id` | Seller | Update owned asset |
| `DELETE` | `/assets/:id` | Seller | Soft delete |
| `POST` | `/assets/:id/publish` | Seller | Publish draft |
| `POST` | `/assets/:id/archive` | Seller | Archive asset |

## Layer structure

| Layer | Responsibility |
|-------|----------------|
| `assets.controller.ts` | HTTP handlers |
| `assets.service.ts` | Business rules, state transitions |
| `assets.repository.ts` | Asset Prisma queries |
| `categories.repository.ts` | Category seed + validation |
| `assets.dto.ts` / `assets.validators.ts` | Types + Zod |

Shared mapping/includes: `backend/src/lib/assets/`
