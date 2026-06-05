# Validators

Zod schemas shared between API request validation and web forms.

## Organization

One file per domain aligned with API modules:

- `asset.schema.ts`
- `booking.schema.ts`
- etc.

Export inferred types: `type CreateAssetInput = z.infer<typeof createAssetSchema>`
