[@grabjs/superapp-sdk](../README.md) / SendAnalyticsEventErrorResponse

# Type Alias: SendAnalyticsEventErrorResponse

> **SendAnalyticsEventErrorResponse** = [`ErrorResponse`](ErrorResponse.md) & \{ `status_code`: `400` \| `500`; \}

Error response for sendAnalyticsEvent

## Type Declaration

### status\_code

> **status\_code**: `400` \| `500`

Error status codes:
- `400`: Invalid event details
- `500`: Internal error
