# @assetsmarket/ui

Shared design system — shadcn/ui on Radix, customized for **dark glassmorphism**.

## Organization

```
src/
├── components/     # button, card, glass-panel, dialog, table, …
├── styles/         # globals.css, tailwind.preset.ts
└── hooks/          # useToast, etc.
```

## Rules

- Dark-first; glass = `backdrop-blur` + semi-transparent `bg-card/40`
- Export via package.json `exports` field
- Add components with shadcn CLI targeting this package

Frontend imports: `import { Button } from "@assetsmarket/ui"`.

No marketplace domain logic.
