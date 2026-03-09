[@grabjs/superapp-sdk](../README.md) / BackResponse

# Type Alias: BackResponse

> **BackResponse** = `Promise`\<[`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`BackResult`](BackResult.md), `204` \| `501`\>\>

Response when triggering platform back navigation.

## Remarks

This response can have the following status codes:
- `204`: Back navigation triggered successfully.
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
