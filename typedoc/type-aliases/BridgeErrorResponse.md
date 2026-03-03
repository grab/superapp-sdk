[@grabjs/superapp-sdk](../README.md) / BridgeErrorResponse

# Type Alias: BridgeErrorResponse

> **BridgeErrorResponse** = \{ `error`: `string`; `result?`: `undefined`; `status_code`: `400` \| `403` \| `424` \| `500`; \}

Error response from the JSBridge method.

## Remarks

Returned when a JSBridge method fails.
The `error` field contains a human-readable message.

## Properties

### error

> **error**: `string`

Error message describing what went wrong

---

### result?

> `optional` **result**: `undefined`

Always undefined for error responses

---

### status_code

> **status_code**: `400` \| `403` \| `424` \| `500`

Status codes:

- `400`: Bad request (invalid parameters)
- `403`: Forbidden (permission denied)
- `424`: Failed dependency
- `500`: Internal server error
