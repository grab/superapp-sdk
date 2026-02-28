[@grabjs/superapp-sdk](../README.md) / BackErrorResponse

# Type Alias: BackErrorResponse

> **BackErrorResponse** = [`ErrorResponse`](ErrorResponse.md) & \{ `status_code`: `400` \| `500`; \}

Error response when back navigation fails

## Type Declaration

### status\_code

> **status\_code**: `400` \| `500`

Error status codes:
- `400`: Invalid request
- `500`: Internal error during navigation
