[@grabjs/superapp-sdk](../README.md) / HideRefreshButtonResponse

# Type Alias: HideRefreshButtonResponse

> **HideRefreshButtonResponse** = [`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`HideRefreshButtonResult`](HideRefreshButtonResult.md), `200` \| `500` \| `501`\>

Response when hiding the refresh button.

## Remarks

This response can have the following status codes:
- `200`: Refresh button hidden successfully.
- `500`: Internal server error - an unexpected error occurred on the native side.
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

**Internal server error response (500):**
```typescript
{
  status_code: 500,
  error: 'Internal server error'
}
```
