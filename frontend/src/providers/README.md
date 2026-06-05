# Providers

React context providers at app root.

## Planned

| Provider | Purpose |
|----------|---------|
| `QueryProvider` | TanStack Query client + devtools |
| `ThemeProvider` | Dark mode (default dark) |
| `AuthProvider` | Session user + roles (from SDK/auth) |
| `ToastProvider` | Via `@assetsmarket/ui` |

Compose in `app/layout.tsx`. Server Components stay outside client providers where possible.
