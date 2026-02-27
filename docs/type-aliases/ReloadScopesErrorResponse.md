[@grabjs/superapp-sdk](../README.md) / ReloadScopesErrorResponse

# Type Alias: ReloadScopesErrorResponse

> **ReloadScopesErrorResponse** = [`ErrorResponse`](ErrorResponse.md) & \{ `status_code`: `400` \| `500`; \}

Error response when scope reload fails

## Type Declaration

### status\_code

> **status\_code**: `400` \| `500`

Error status codes:
- `400`: Invalid request
- `500`: Internal error during scope reload
