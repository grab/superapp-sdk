[@grabjs/superapp-sdk](../README.md) / BackResponse

# Type Alias: BackResponse

> **BackResponse** = [`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`BackResult`](BackResult.md), `204` \| `500` \| `501`\>

Response when triggering platform back navigation.

## Remarks

This response can have the following status codes:
- `204`: Back navigation triggered successfully.
- `500`: Internal server error - an unexpected error occurred on the native side.
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

**Internal server error response (500):**
```typescript
{
  status_code: 500,
  error: 'Internal server error'
}
```
