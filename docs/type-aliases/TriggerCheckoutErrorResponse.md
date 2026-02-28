[@grabjs/superapp-sdk](../README.md) / TriggerCheckoutErrorResponse

# Type Alias: TriggerCheckoutErrorResponse

> **TriggerCheckoutErrorResponse** = [`ErrorResponse`](ErrorResponse.md) & \{ `status_code`: `400` \| `403` \| `500`; \}

Error response when checkout fails

## Type Declaration

### status\_code

> **status\_code**: `400` \| `403` \| `500`

Error status codes:
- `400`: Invalid request parameters
- `403`: Forbidden (permission denied)
- `500`: Internal error during checkout
