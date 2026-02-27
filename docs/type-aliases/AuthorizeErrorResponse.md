[@grabjs/superapp-sdk](../README.md) / AuthorizeErrorResponse

# Type Alias: AuthorizeErrorResponse

> **AuthorizeErrorResponse** = [`ErrorResponse`](ErrorResponse.md) & \{ `status_code`: `400` \| `401` \| `403`; \}

Error response when authorization fails

## Type Declaration

### status\_code

> **status\_code**: `400` \| `401` \| `403`

Error status codes:
- `400`: Invalid request or configuration error
- `401`: Authentication failed
- `403`: Forbidden (permission denied)
