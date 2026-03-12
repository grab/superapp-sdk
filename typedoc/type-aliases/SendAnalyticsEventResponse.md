[@grabjs/superapp-sdk](../README.md) / SendAnalyticsEventResponse

# Type Alias: SendAnalyticsEventResponse

> **SendAnalyticsEventResponse** = [`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`SendAnalyticsEventResult`](SendAnalyticsEventResult.md), `200` \| `400` \| `501`\>

Response when sending analytics events.

## Remarks

This response can have the following status codes:
- `200`: Analytics event sent successfully.
- `400`: Invalid analytics event parameters.
- `501`: Not implemented - this method requires the Grab app environment.

## Examples

**Success response (200):**
```typescript
{ status_code: 200 }
```

**Bad request response (400):**
```typescript
{
  status_code: 400,
  error: 'Invalid analytics event parameters'
}
```

**Not implemented response (501) - outside Grab app:**
```typescript
{
  status_code: 501,
  error: 'Not implemented: This method requires the Grab app environment'
}
```
