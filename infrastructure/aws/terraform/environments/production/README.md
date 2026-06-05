# Terraform: production

High availability configuration.

## Expected resources

- RDS Multi-AZ with automated backups (7–35 day retention)
- ElastiCache with replica
- ECS autoscaling on CPU / request count
- CloudFront + WAF
- S3 with versioning + lifecycle to IA
- CloudWatch alarms → SNS on-call

## Deploy

Manual approval via GitHub Environment; blue/green or rolling ECS deploy.

## RTO / RPO targets (define in ADR)

- RPO: ≤ 5 minutes (point-in-time recovery)
- RTO: ≤ 30 minutes for API
