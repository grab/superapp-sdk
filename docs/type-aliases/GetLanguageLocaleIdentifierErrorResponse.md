[@grabjs/superapp-sdk](../globals.md) / GetLanguageLocaleIdentifierErrorResponse

# Type Alias: GetLanguageLocaleIdentifierErrorResponse

> **GetLanguageLocaleIdentifierErrorResponse** = [`ErrorResponse`](ErrorResponse.md) & \{ `status_code`: `400` \| `500`; \}

Error response when language locale identifier retrieval fails

## Type Declaration

### status\_code

> **status\_code**: `400` \| `500`

Error status codes:
- `400`: Invalid request
- `500`: Internal error retrieving locale
