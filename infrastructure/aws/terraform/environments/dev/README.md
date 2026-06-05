# Terraform: dev

Minimal AWS footprint for developer integration testing.

## Expected resources

- Small RDS instance (or shared with staging)
- Single-node ElastiCache
- ECS dev cluster (optional — may use local Docker only)

## State

`s3://assetsmarket-terraform-state/dev/terraform.tfstate`
