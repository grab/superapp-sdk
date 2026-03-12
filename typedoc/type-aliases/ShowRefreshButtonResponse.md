[@grabjs/superapp-sdk](../README.md) / ShowRefreshButtonResponse

# Type Alias: ShowRefreshButtonResponse

> **ShowRefreshButtonResponse** = [`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`ShowRefreshButtonResult`](ShowRefreshButtonResult.md), `200` \| `501`\>

Response when showing the refresh button.

## Remarks

This response can have the following status codes:
- `200`: Refresh button shown successfully.
- `501`: Not implemented - this method requires the Grab app environment.

## Examples

**Success response (200):**
```typescript
{ status_code: 200 }
```

**Not implemented response (501) - outside Grab app:**
```typescript
{
  status_code: 501,
  error: 'Not implemented: This method requires the Grab app environment'
}
```
