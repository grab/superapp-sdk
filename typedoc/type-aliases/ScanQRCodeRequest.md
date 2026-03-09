[@grabjs/superapp-sdk](../README.md) / ScanQRCodeRequest

# Type Alias: ScanQRCodeRequest

> **ScanQRCodeRequest** = \{ `title?`: `string`; \}

Request parameters for scanning QR codes.

## Examples

**Request with custom title:**
```typescript
{ title: 'Scan Payment QR' }
```

**Minimal request (uses default title):**
```typescript
{}
```

## Properties

### title?

> `optional` **title**: `string`

Optional title shown in the camera view header.
