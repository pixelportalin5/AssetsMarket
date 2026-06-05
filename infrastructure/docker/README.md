# Docker (local)

## Services (planned)

| Service | Image | Port |
|---------|-------|------|
| postgres | postgres:17-alpine | 5432 |
| redis | redis:7-alpine | 6379 |
| mailhog | mailhog/mailhog | 1025, 8025 |

## Usage (planned)

```bash
docker compose -f infrastructure/docker/docker-compose.yml up -d
```

`docker-compose.yml` to be added in implementation phase.
