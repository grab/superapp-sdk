[@grabjs/superapp-sdk](../README.md) / IsEsimSupportedResponse

# Type Alias: IsEsimSupportedResponse

> **IsEsimSupportedResponse** = [`BridgeResponse`](BridgeResponse.md)\<`200` \| `500` \| `501`, [`IsEsimSupportedResult`](IsEsimSupportedResult.md)\>

Response when checking whether the current device supports eSIM.

## Remarks

This response can have the following status codes:
- `200`: eSIM capability was checked successfully. The `result` contains `true` or `false`.
- `500`: Internal server error - an unexpected error occurred on the native side.
- `501`: Not implemented - this method requires the Grab app environment.

## Examples

**Success response (200) - eSIM supported:**
```typescript
{
  status_code: 200,
  result: true
}
```

**Success response (200) - eSIM not supported:**
```typescript
{
  status_code: 200,
  result: false
}
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
