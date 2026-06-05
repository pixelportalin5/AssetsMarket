# App Router

Next.js 15 route groups — layouts only; logic in `features/`.

```
app/
├── (marketing)/     # Public marketplace
├── (auth)/          # Login / register
└── (dashboard)/
    ├── seller/
    ├── advertiser/
    ├── admin/
    └── buyer/
```

Route groups do not affect URLs. Middleware enforces auth on `(dashboard)`.
