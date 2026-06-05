# Event handlers

One file per event type (or per domain). Handlers must be **idempotent** where they touch external systems.

No business logic duplication — call module services from handlers.
