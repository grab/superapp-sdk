[@grabjs/superapp-sdk](../globals.md) / ScanQRCodeErrorResponse

# Type Alias: ScanQRCodeErrorResponse

> **ScanQRCodeErrorResponse** = [`ErrorResponse`](ErrorResponse.md) & \{ `status_code`: `400` \| `403` \| `500`; \}

Error response when QR code scanning fails

## Type Declaration

### status\_code

> **status\_code**: `400` \| `403` \| `500`

Error status codes:
- `400`: Invalid request parameters
- `403`: Camera permission denied or not available
- `500`: Internal error during QR code scanning
