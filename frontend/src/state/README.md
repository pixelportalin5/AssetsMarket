# State management

## Server/async state

**TanStack Query** — all API data, caching, mutations, invalidation.

Query keys convention: `['assets', 'list', filters]`.

## Client/UI state

**Zustand** — sidebar collapsed, modal open, multi-step wizard step index.

Do not duplicate server entities in Zustand.

## Forms

React Hook Form + Zod (`@assetsmarket/shared` validators).
