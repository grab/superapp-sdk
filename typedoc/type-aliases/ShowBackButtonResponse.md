[@grabjs/superapp-sdk](../README.md) / ShowBackButtonResponse

# Type Alias: ShowBackButtonResponse

> **ShowBackButtonResponse** = [`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`ShowBackButtonResult`](ShowBackButtonResult.md), `200` \| `500` \| `501`\>

Response when showing the back button.

## Remarks

This response can have the following status codes:
- `200`: Back button shown successfully.
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
