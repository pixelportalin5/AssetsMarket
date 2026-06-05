# Redis

## Use cases

| Use case | Client |
|----------|--------|
| BullMQ job queues | API worker |
| Rate limiting | API middleware |
| Session / refresh tokens | Auth module |
| Analytics cache | Analytics module |

## Local

Provided by Docker Compose — `REDIS_URL=redis://localhost:6379`

## Production (AWS ElastiCache)

- Redis 7 cluster mode disabled initially (single node) — scale to cluster when QPS requires
- VPC security group: only ECS tasks can connect
- `maxmemory-policy`: `volatile-lru` for cache keys with TTL

## Key naming convention

```
assetsmarket:{env}:{domain}:{id}
```

Examples: `assetsmarket:prod:ratelimit:ip:1.2.3.4`
