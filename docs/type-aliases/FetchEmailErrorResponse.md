[@grabjs/superapp-sdk](../globals.md) / FetchEmailErrorResponse

# Type Alias: FetchEmailErrorResponse

> **FetchEmailErrorResponse** = [`ErrorResponse`](ErrorResponse.md) & \{ `status_code`: `400` \| `403` \| `500`; \}

Error response when email fetch fails

## Type Declaration

### status\_code

> **status\_code**: `400` \| `403` \| `500`

Error status codes:
- `400`: Client error (invalid request)
- `403`: Feature not supported (requires Grab app version 5.399 or above)
- `500`: Internal server error
