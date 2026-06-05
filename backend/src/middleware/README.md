# Middleware

Express middleware — order is fixed at app bootstrap.

## Planned chain

1. `requestId` — correlation ID
2. `requestLogger` — access log
3. `helmet` — security headers
4. `cors` — frontend origin
5. `jsonParser` — body size limits
6. `rateLimiter` — Redis-backed
7. `authenticate` — optional JWT
8. `authorize(roles)` — RBAC per route
9. **routes**
10. `notFound`
11. `errorHandler` — maps `AppError` → JSON

See [../logging/README.md](../logging/README.md) for structured logs.
