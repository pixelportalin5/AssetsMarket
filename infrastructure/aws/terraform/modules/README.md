# Terraform modules

Reusable modules consumed by `environments/*/main.tf`.

## Module list (planned)

| Module | Inputs | Outputs |
|--------|--------|---------|
| `vpc` | cidr, azs | subnet_ids, sg_ids |
| `rds` | instance_class, db_name | endpoint, secret_arn |
| `elasticache` | node_type | redis_endpoint |
| `ecs-service` | image, cpu, env | service_arn |
| `s3-bucket` | name, cors | bucket_arn |
| `alb` | certificate_arn | dns_name |

## Conventions

- Tag all resources: `Project=AssetsMarket`, `Environment={env}`
- No hardcoded secrets — use `aws_secretsmanager_secret_version`
- Version pin provider `hashicorp/aws ~> 5.0`
