[@grabjs/superapp-sdk](../README.md) / CloseResponse

# Type Alias: CloseResponse

> **CloseResponse** = [`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`CloseResult`](CloseResult.md), `200` \| `500` \| `501`\>

Response when closing the container.

## Remarks

This response can have the following status codes:
- `200`: Container closed successfully.
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
