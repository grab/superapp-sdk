[@grabjs/superapp-sdk](../README.md) / BridgeNoResultResponse

# Type Alias: BridgeNoResultResponse

> **BridgeNoResultResponse** = \{ `error?`: `undefined`; `result?`: `undefined`; `status_code`: `204` \| `302`; \}

No result response from the JSBridge method.

## Remarks

Returned when a JSBridge method completes with no content (e.g., user cancelled a dialog, redirect occurred).
No `result` or `error` data is returned.

## Properties

### error?

> `optional` **error**: `undefined`

Always undefined for no-result JSBridge responses

---

### result?

> `optional` **result**: `undefined`

Always undefined for no-result JSBridge responses

---

### status_code

> **status_code**: `204` \| `302`

Status codes:

- `204`: No content (user cancelled or operation returned no data)
- `302`: Redirect occurred
