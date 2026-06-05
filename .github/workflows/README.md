# GitHub Actions

## Planned workflows

| Workflow | Trigger |
|----------|---------|
| `ci.yml` | PR — lint, typecheck, test (frontend unit, backend unit+integration) |
| `deploy-staging.yml` | merge main |
| `deploy-production.yml` | release tag |
| `e2e.yml` | nightly / pre-release |

Uses Turborepo: `--filter=@assetsmarket/frontend` etc.

AWS OIDC for deploy — no long-lived keys.
