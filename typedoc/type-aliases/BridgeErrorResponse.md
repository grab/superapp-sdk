[@grabjs/superapp-sdk](../README.md) / BridgeErrorResponse

# Type Alias: BridgeErrorResponse

> **BridgeErrorResponse** = \{ `error`: `string`; `result?`: `undefined`; `status_code`: `400` \| `403` \| `404` \| `424` \| `500`; \}

Error response from the JSBridge method.

## Remarks

Returned when a JSBridge method fails.
The `error` field contains a human-readable message.

## Properties

### error

> **error**: `string`

Error message describing what went wrong

***

### result?

> `optional` **result**: `undefined`

Always undefined for error responses

***

### status\_code

> **status\_code**: `400` \| `403` \| `404` \| `424` \| `500`

Status codes:

- `400`: Bad request (invalid parameters)
- `403`: Forbidden (permission denied)
- `404`: Not found (resource not found)
- `424`: Failed dependency
- `500`: Internal server error
