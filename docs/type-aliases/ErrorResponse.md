[@grabjs/superapp-sdk](../README.md) / ErrorResponse

# Type Alias: ErrorResponse

> **ErrorResponse** = \{ `status_code`: `400` \| `403` \| `424` \| `500`; `result?`: `undefined`; `error`: `string`; \}

Error response from the bridge SDK

## Properties

### status\_code

> **status\_code**: `400` \| `403` \| `424` \| `500`

Status codes:
- `400`: Bad request (invalid parameters)
- `403`: Forbidden (permission denied)
- `424`: Failed dependency
- `500`: Internal server error

***

### result?

> `optional` **result**: `undefined`

Always undefined for error responses

***

### error

> **error**: `string`

Error message describing what went wrong
