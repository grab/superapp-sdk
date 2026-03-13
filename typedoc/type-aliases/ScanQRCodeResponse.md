[@grabjs/superapp-sdk](../README.md) / ScanQRCodeResponse

# Type Alias: ScanQRCodeResponse

> **ScanQRCodeResponse** = [`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`ScanQRCodeResult`](ScanQRCodeResult.md), `200` \| `204` \| `400` \| `403` \| `500` \| `501`\>

Response when scanning a QR code.

## Remarks

This response can have the following status codes:
- `200`: Successfully scanned QR code. The `result` contains the scanned QR code data.
- `204`: User cancelled the QR code scanning. No result data is returned.
- `400`: Bad request - invalid request parameters.
- `403`: Camera permission is not enabled for the Grab app.
- `500`: Internal server error - an unexpected error occurred on the native side.
- `501`: Not implemented - this method requires the Grab app environment.

## Examples

**Success response (200):**
```typescript
{
  status_code: 200,
  result: { qrCode: 'https://example.com/payment/123' }
}
```

**Cancelled response (204):**
```typescript
{ status_code: 204 }
```

**Bad request response (400):**
```typescript
{
  status_code: 400,
  error: 'Invalid request parameters'
}
```

**Permission denied response (403):**
```typescript
{
  status_code: 403,
  error: 'Camera permission is not enabled for the Grab app'
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
