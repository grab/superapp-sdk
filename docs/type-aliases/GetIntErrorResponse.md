[@grabjs/superapp-sdk](../README.md) / GetIntErrorResponse

# Type Alias: GetIntErrorResponse

> **GetIntErrorResponse** = [`ErrorResponse`](ErrorResponse.md) & \{ `status_code`: `400` \| `500`; \}

Error response when integer retrieval fails

## Type Declaration

### status\_code

> **status\_code**: `400` \| `500`

Error status codes:
- `400`: Invalid key
- `500`: Internal error during storage operation
