# Terraform: staging

Production-parity at reduced scale — used for E2E and QA.

## Expected resources

- RDS PostgreSQL (single-AZ acceptable)
- ElastiCache Redis
- ECS Fargate: api + worker
- ALB + ACM certificate
- S3 uploads bucket
- SES sandbox or verified domain

## Deploy

Auto-deploy from `main` branch after CI passes.
