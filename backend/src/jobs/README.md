# Background jobs

BullMQ + Redis. Separate worker entrypoint in production.

## Queues (planned)

| Queue | Work |
|-------|------|
| `notifications` | Email/push send |
| `webhooks` | Payment provider retries |
| `analytics` | Rollup refresh |
| `cleanup` | TTL notifications, stale drafts |

Jobs receive IDs only — reload entities in worker via services.
