[@grabjs/superapp-sdk](../globals.md) / VerifyEmailErrorResponse

# Type Alias: VerifyEmailErrorResponse

> **VerifyEmailErrorResponse** = [`ErrorResponse`](ErrorResponse.md) & \{ `status_code`: `400` \| `403` \| `500`; \}

Error response when email verification fails

## Type Declaration

### status\_code

> **status\_code**: `400` \| `403` \| `500`

Error status codes:
- `400`: Client error (invalid email format)
- `403`: Unauthorized or feature not supported (requires Grab app version 5.399 or above)
- `500`: Internal server error
