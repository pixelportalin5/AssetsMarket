# Deployment scripts

Shell/Node scripts — not application logic.

## Planned

| Script | Purpose |
|--------|---------|
| `migrate.sh` | Run `prisma migrate deploy` against env |
| `seed.sh` | Seed dev/staging data |
| `deploy-staging.sh` | Build images, push ECR, update ECS |
| `health-check.sh` | Post-deploy smoke |

Invoke from CI ([.github/workflows/README.md](../../.github/workflows/README.md)) or locally with AWS profile.
