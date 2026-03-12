[@grabjs/superapp-sdk](../README.md) / RemoveAllResponse

# Type Alias: RemoveAllResponse

> **RemoveAllResponse** = [`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`RemoveAllResult`](RemoveAllResult.md), `204` \| `501`\>

Response when removing all values.

## Remarks

This response can have the following status codes:
- `204`: All values removed successfully.
- `501`: Not implemented - this method requires the Grab app environment.

## Examples

**Success response (204):**
```typescript
{ status_code: 204 }
```

**Not implemented response (501) - outside Grab app:**
```typescript
{
  status_code: 501,
  error: 'Not implemented: This method requires the Grab app environment'
}
```
