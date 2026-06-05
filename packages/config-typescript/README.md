# @assetsmarket/config-typescript

Shared `tsconfig` bases exported as JSON.

| File | Use in |
|------|--------|
| `base.json` | Strict defaults |
| `node.json` | `backend/` |
| `nextjs.json` | `frontend/` |
| `library.json` | `packages/*` |

Extend in each workspace:

```json
{ "extends": "@assetsmarket/config-typescript/node.json" }
```
