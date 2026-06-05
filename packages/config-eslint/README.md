# @assetsmarket/config-eslint

Shared [ESLint 9 flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new) exports.

| Export | Use in |
|--------|--------|
| `base` | Root tooling only |
| `node` | `backend/`, `packages/database`, `packages/shared`, `packages/sdk` |
| `next` | `frontend/`, `packages/ui` |

Includes `typescript-eslint`, `eslint-config-prettier`, and `eslint-plugin-turbo` (env var validation).
