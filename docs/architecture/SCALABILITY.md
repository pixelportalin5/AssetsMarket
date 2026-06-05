# Why this structure scales

## 1. Physical frontend/backend split

Solo developers navigate `frontend/` vs `backend/` instantly — no nested `apps/` ambiguity. Teams can later own one tree without monorepo cognitive overload.

## 2. Identical domain slices

Backend `modules/bookings` ↔ frontend `advertiser-dashboard` ↔ `sdk/modules/bookings` — changes stay localized. Reduces cross-repo grep and onboarding time.

## 3. Modular monolith (not microservices)

One Postgres, one API deployment until metrics prove otherwise. **Modules** become extraction boundaries (messaging worker, payment service) without rewrite.

## 4. Layered backend

Controllers → services → repositories prevents “god routes” and enables unit testing services at scale. Events decouple notifications from core writes.

## 5. TanStack Query + SDK

Frontend cache layer avoids duplicated fetch logic across dashboards — critical when listing/message queries grow with users.

## 6. Packages as contracts

`shared` + `sdk` + `database` enforce boundaries:

- Schema changes touch `database` + backend repositories
- API shape changes touch `shared` + `sdk` + frontend services
- UI changes stay in `ui` / `frontend`

## 7. High-volume domains isolated

`messaging` module and DB partitioning (documented in `docs/database/`) prepared without splitting deployables day one.

## 8. Infrastructure folders ready

Docker local parity, Terraform env separation, Cloudflare CDN — production path without restructuring repo.

## Solo-dev maintainability

- Every folder has README
- Every module same shape (controllers/services/repositories/dto/validators)
- No premature abstraction — 13 modules map 1:1 to product language
