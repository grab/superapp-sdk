[@grabjs/superapp-sdk](../globals.md) / GetCoordinateErrorResponse

# Type Alias: GetCoordinateErrorResponse

> **GetCoordinateErrorResponse** = [`ErrorResponse`](ErrorResponse.md) & \{ `status_code`: `403` \| `424` \| `500`; \}

Error response when coordinate retrieval fails

## Type Declaration

### status\_code

> **status\_code**: `403` \| `424` \| `500`

Error status codes:
- `403`: Location access denied (mobile.geolocation scope not granted)
- `424`: Location service unavailable/unaccessible
- `500`: Internal error retrieving coordinates
