# Domain events

In-process event bus for decoupling side effects within the monolith.

## Pattern

```typescript
// services emit
eventBus.emit("booking.confirmed", { bookingId });

// handlers/
handlers/booking-confirmed.ts → notifications.enqueue(...)
```

## Planned events

- `asset.published`
- `booking.confirmed`
- `transaction.completed`
- `escrow.released`
- `dispute.opened`

## Future

Replace with SQS/SNS when extracting workers — handlers remain the migration unit.

Handlers live in [handlers/](handlers/README.md).
