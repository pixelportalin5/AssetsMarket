# State machines

Document lifecycle transitions enforced in backend **services** (not controllers).

## Planned documents

| Machine | Entities |
|---------|----------|
| `asset-lifecycle.md` | draft → pending_review → published → under_contract → sold |
| `verification.md` | pending → in_review → approved / rejected |
| `booking.md` | pending_payment → confirmed → active → completed |
| `escrow.md` | pending_funding → funded → released / refunded |
| `dispute.md` | open → under_review → resolved |
| `transaction.md` | pending → processing → completed / failed |

Sync enum values with `@assetsmarket/shared/constants` when schema exists.

No implementation in scaffold.
