[@grabjs/superapp-sdk](../README.md) / SetBooleanResponse

# Type Alias: SetBooleanResponse

> **SetBooleanResponse** = [`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`SetBooleanResult`](SetBooleanResult.md), `204` \| `400` \| `500` \| `501`\>

Response when setting a boolean value.

## Remarks

This response can have the following status codes:
- `204`: Value stored successfully.
- `400`: Missing required parameters - key or value not provided.
- `501`: Not implemented - this method requires the Grab app environment.

## Examples

**Success response (204):**
```typescript
{ status_code: 204 }
```

**Bad request response (400):**
```typescript
{
  status_code: 400,
  error: 'Missing required parameters'
}
```

**Not implemented response (501) - outside Grab app:**
```typescript
{
  status_code: 501,
  error: 'Not implemented: This method requires the Grab app environment'
}
```
