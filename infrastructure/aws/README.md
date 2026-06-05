# AWS infrastructure

Terraform-managed resources. **No `.tf` files in scaffold** — structure only.

## Directory layout

```
aws/
└── terraform/
    ├── modules/          # Reusable: vpc, rds, ecs, s3, ses
    └── environments/
        ├── dev/
        ├── staging/
        └── production/
```

## Planned modules

| Module | Resources |
|--------|-----------|
| `vpc` | VPC, subnets, NAT, security groups |
| `rds` | PostgreSQL Multi-AZ (staging/prod) |
| `elasticache` | Redis cluster |
| `ecs` | Fargate services: api, worker |
| `alb` | Load balancer + target groups |
| `s3` | Upload buckets + lifecycle rules |
| `cloudfront` | CDN for static assets / Next.js |
| `ses` | Domain verification, sending identity |
| `secrets` | Secrets Manager references |
| `iam` | Task roles — least privilege |

## State backend (planned)

- S3 bucket `assetsmarket-terraform-state`
- DynamoDB lock table
- Key: `{environment}/terraform.tfstate`

## CI/CD integration

GitHub Actions deploy staging on `main` merge; production on tagged release — see [.github/workflows/README.md](../../.github/workflows/README.md).
