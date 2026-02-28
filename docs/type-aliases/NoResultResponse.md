[@grabjs/superapp-sdk](../README.md) / NoResultResponse

# Type Alias: NoResultResponse

> **NoResultResponse** = \{ `status_code`: `204` \| `302`; `result?`: `undefined`; `error?`: `undefined`; \}

No result response from the bridge SDK.

## Remarks

Returned when an operation completes with no content (e.g., user cancelled a dialog, redirect occurred).
No `result` or `error` data is provided.

## Properties

### status\_code

> **status\_code**: `204` \| `302`

Status codes:
- `204`: No content (user cancelled or operation returned no data)
- `302`: Redirect occurred

***

### result?

> `optional` **result**: `undefined`

Always undefined for no-result responses

***

### error?

> `optional` **error**: `undefined`

Always undefined for no-result responses
