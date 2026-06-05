# @assetsmarket/sdk

Typed API client for AssetsMarket backend.

## Responsibilities

- Base HTTP client (fetch/axios) with auth header injection
- Per-domain client modules mirroring backend modules (assets, bookings, …)
- Error parsing → `ApiError` typed with `@assetsmarket/shared` codes
- Request/response types aligned with backend DTOs

## Structure (planned)

```
src/
├── client.ts           # Base config: baseUrl, interceptors
├── modules/
│   ├── auth.ts
│   ├── assets.ts
│   └── ...
└── index.ts
```

## Usage (frontend)

```typescript
// frontend/src/services/assets.service.ts
import { sdk } from "@assetsmarket/sdk";
// wrap sdk.assets.list() for TanStack Query keys
```

## Generation strategy (future)

Option A: hand-maintained typed clients (solo-dev friendly early).  
Option B: OpenAPI codegen when API stabilizes.

No endpoint implementations in this scaffold.
