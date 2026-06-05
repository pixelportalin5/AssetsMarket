# Integrations

Adapters to external systems — interfaces + production implementations.

| Folder | System |
|--------|--------|
| [cache](cache/README.md) | Redis (ioredis) |
| [email](email/README.md) | AWS SES / Mailhog |
| [storage](storage/README.md) | S3 presigned uploads |
| [payments](payments/README.md) | Stripe (or provider TBD) |

Modules receive integrations via constructor injection at startup — no global singletons in services (except documented cache client).
