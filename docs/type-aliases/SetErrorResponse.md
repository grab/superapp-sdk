[@grabjs/superapp-sdk](../globals.md) / SetErrorResponse

# Type Alias: SetErrorResponse

> **SetErrorResponse** = [`ErrorResponse`](ErrorResponse.md) & \{ `status_code`: `400` \| `500`; \}

Error response when storage set fails

## Type Declaration

### status\_code

> **status\_code**: `400` \| `500`

Error status codes:
- `400`: Invalid key or value
- `500`: Internal error during storage operation
