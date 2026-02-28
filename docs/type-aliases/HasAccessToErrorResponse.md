[@grabjs/superapp-sdk](../README.md) / HasAccessToErrorResponse

# Type Alias: HasAccessToErrorResponse

> **HasAccessToErrorResponse** = [`ErrorResponse`](ErrorResponse.md) & \{ `status_code`: `400` \| `500`; \}

Error response when access check fails

## Type Declaration

### status\_code

> **status\_code**: `400` \| `500`

Error status codes:
- `400`: Invalid module or method name
- `500`: Internal error during access check
