# Testing architecture

## Pyramid

```
        E2E (tests/e2e)           Playwright — full journeys
       Integration (backend/tests)  API + Postgres + Redis
      Unit (frontend/tests, backend/tests)  Vitest — fast
```

## Locations

| Type | Path |
|------|------|
| Frontend unit | `frontend/tests/unit/` |
| Backend unit | `backend/tests/unit/` |
| Backend integration | `backend/tests/integration/` |
| E2E | `tests/e2e/` |
| Fixtures | `tests/fixtures/` |

## CI (planned)

PR: lint, typecheck, unit, integration  
Main: + E2E on staging

See [e2e/README.md](e2e/README.md).
