[@grabjs/superapp-sdk](../README.md) / GetSessionParamsResponse

# Type Alias: GetSessionParamsResponse

> **GetSessionParamsResponse** = [`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`GetSessionParamsResult`](GetSessionParamsResult.md), `200` \| `501`\>

Response when getting session parameters.

## Remarks

This response can have the following status codes:
- `200`: Session parameters retrieved successfully.
- `501`: Not implemented - this method requires the Grab app environment.

## Examples

**Success response (200):**
```typescript
{
  status_code: 200,
  result: { result: '{"userId": "123", "sessionToken": "abc"}' }
}
```

**Not implemented response (501) - outside Grab app:**
```typescript
{
  status_code: 501,
  error: 'Not implemented: This method requires the Grab app environment'
}
```
