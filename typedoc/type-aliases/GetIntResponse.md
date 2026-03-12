[@grabjs/superapp-sdk](../README.md) / GetIntResponse

# Type Alias: GetIntResponse

> **GetIntResponse** = [`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`GetIntResult`](GetIntResult.md), `200` \| `400` \| `501`\>

Response when getting an integer value.

## Remarks

This response can have the following status codes:
- `200`: Value retrieved successfully. The `result` contains the integer value or null if not found.
- `400`: Missing required parameters - key not provided.
- `501`: Not implemented - this method requires the Grab app environment.

## Examples

**Success response (200) - value exists:**
```typescript
{
  status_code: 200,
  result: { value: 42 }
}
```

**Success response (200) - value not found:**
```typescript
{
  status_code: 200,
  result: { value: null }
}
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
