# @assetsmarket/shared

Single source of truth for **cross-boundary contracts**.

## Contents

| Folder | Purpose |
|--------|---------|
| `constants/` | Roles, asset categories, status enums, error codes |
| `types/` | DTO interfaces shared by backend + sdk |
| `validators/` | Zod schemas (create asset, create booking, …) |
| `utils/` | Pure helpers (`formatCurrency`, `slugify`) |

Backend validators re-export or wrap these schemas. Frontend forms use same schemas for identical validation rules.

No I/O, no framework imports.
