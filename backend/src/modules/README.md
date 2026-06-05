# Backend modules

Thirteen vertical domain modules. Each follows the same internal layout.

## Module index

| Module | Domain |
|--------|--------|
| [auth](auth/README.md) | Login, tokens, RBAC |
| [users](users/README.md) | Profiles, settings |
| [assets](assets/README.md) | Listings, metrics, search |
| [verification](verification/README.md) | Trust & evidence |
| [advertising](advertising/README.md) | Ad product inventory |
| [campaigns](campaigns/README.md) | Advertiser campaigns |
| [bookings](bookings/README.md) | Slot reservations |
| [transactions](transactions/README.md) | Payments & ledger |
| [escrow](escrow/README.md) | Held funds lifecycle |
| [messaging](messaging/README.md) | Conversations |
| [notifications](notifications/README.md) | Delivery |
| [reviews](reviews/README.md) | Ratings |
| [admin](admin/README.md) | Moderation |

## Standard module layout

```
modules/<name>/
├── controllers/
├── services/
├── repositories/
├── dto/
├── validators/
├── README.md
└── index.ts          # (planned) registerRoutes()
```

## Inter-module rules

1. **Repository never imported** outside its module
2. **Service-to-service** calls allowed for orchestration (document in README)
3. **Events** for side effects (e.g. `booking.confirmed` → notifications)

## Related

- Domain events: [../events/README.md](../events/README.md)
- Audit logs: persisted via admin module + DB (schema TBD)
