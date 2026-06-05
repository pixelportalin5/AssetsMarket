# Infrastructure

```
infrastructure/
├── docker/         # Local Postgres 17, Redis, Mailhog
├── redis/          # Production tuning notes
├── aws/            # Terraform environments + modules
├── cloudflare/     # CDN, DNS, WAF (future)
├── monitoring/     # CloudWatch, alarms, dashboards
└── scripts/        # Deploy, migrate, seed helpers
```

## Production target

```mermaid
flowchart LR
    users[Users] --> cf[Cloudflare]
    cf --> fe[Frontend]
    cf --> alb[AWS ALB]
    alb --> api[ECS API]
    alb --> worker[ECS Worker]
    api --> rds[(RDS PG17)]
    api --> redis[(ElastiCache)]
    api --> s3[S3]
```

Local dev uses Docker only — see [docker/README.md](docker/README.md).
