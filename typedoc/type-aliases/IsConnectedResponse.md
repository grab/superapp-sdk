[@grabjs/superapp-sdk](../README.md) / IsConnectedResponse

# Type Alias: IsConnectedResponse

> **IsConnectedResponse** = `Promise`\<[`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`IsConnectedResult`](IsConnectedResult.md), `200` \| `404`\>\>

Response when checking connection status.

## Remarks

This response can have the following status codes:
- `200`: Connected to Grab SuperApp. The `result` contains the connection status.
- `404`: Not connected to Grab SuperApp.

## Examples

**Connected response (200):**
```typescript
{
  status_code: 200,
  result: { connected: true }
}
```

**Not connected response (404):**
```typescript
{
  status_code: 404,
  error: 'Not connected to Grab app'
}
```
