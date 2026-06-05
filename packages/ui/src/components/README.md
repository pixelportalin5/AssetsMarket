# UI components

## Categories

| Category | Examples |
|----------|----------|
| Primitives | Button, Input, Label, Select, Checkbox |
| Overlays | Dialog, Sheet, DropdownMenu, Popover, Tooltip |
| Layout | Card, Separator, ScrollArea, Tabs |
| Feedback | Toast, Alert, Skeleton, Badge |
| Glass | GlassCard, GlassPanel, GlassNavbar |
| Data | Table, DataTable (headless + styles) |

## Naming

- shadcn defaults: `button.tsx`, `card.tsx`
- Custom: `glass-card.tsx` — prefix `glass-` for theme-specific

## Variants

Use `class-variance-authority` for variants (`size`, `variant`). Glass variant adds:

```
backdrop-blur-xl bg-card/40 border border-white/10 shadow-lg
```
