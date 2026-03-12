[@grabjs/superapp-sdk](../README.md) / SetBackgroundColorResponse

# Type Alias: SetBackgroundColorResponse

> **SetBackgroundColorResponse** = [`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`SetBackgroundColorResult`](SetBackgroundColorResult.md), `204` \| `400` \| `501`\>

Response when setting the background color.

## Remarks

This response can have the following status codes:
- `200`: Background color set successfully.
- `400`: Invalid background color format.
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
  error: 'Invalid background color format'
}
```

**Not implemented response (501) - outside Grab app:**
```typescript
{
  status_code: 501,
  error: 'Not implemented: This method requires the Grab app environment'
}
```
