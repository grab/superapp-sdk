[@grabjs/superapp-sdk](../README.md) / HideBackButtonResponse

# Type Alias: HideBackButtonResponse

> **HideBackButtonResponse** = [`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`HideBackButtonResult`](HideBackButtonResult.md), `200` \| `500` \| `501`\>

Response when hiding the back button.

## Remarks

This response can have the following status codes:
- `200`: Back button hidden successfully.
- `500`: Internal server error - an unexpected error occurred on the native side.
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

**Internal server error response (500):**
```typescript
{
  status_code: 500,
  error: 'Internal server error'
}
```
