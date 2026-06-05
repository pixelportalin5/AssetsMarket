# Feature modules

Vertical UI slices — primary development location.

| Feature | Purpose |
|---------|---------|
| [auth](auth/README.md) | Authentication flows |
| [marketplace](marketplace/README.md) | Browse, search, public asset detail |
| [seller-dashboard](seller-dashboard/README.md) | Listings, verification, ad products |
| [advertiser-dashboard](advertiser-dashboard/README.md) | Campaigns, bookings |
| [admin-dashboard](admin-dashboard/README.md) | Moderation, users, disputes |
| [messaging](messaging/README.md) | Messaging center |
| [notifications](notifications/README.md) | Notification center |
| [transactions](transactions/README.md) | Purchases, escrow UI |

## Standard layout

```
features/<name>/
├── components/
├── hooks/          # useX + TanStack Query
├── services/       # calls @assetsmarket/sdk
├── types.ts
└── index.ts
```
