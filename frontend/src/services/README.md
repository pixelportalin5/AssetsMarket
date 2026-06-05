# Services

Thin adapters over `@assetsmarket/sdk` — one file per domain aligned with backend modules.

## Pattern

```typescript
// assets.service.ts — used by TanStack Query hooks
export const assetsService = {
  list: (params) => sdk.assets.list(params),
  getById: (id) => sdk.assets.getById(id),
};
```

No React imports. Enables mocking in unit tests without mocking fetch globally.
