[@grabjs/superapp-sdk](../globals.md) / CameraModule

# Class: CameraModule

Provides programmatic access to the device camera through the native host application.

## Remarks

All camera operations, including permission management and hardware lifecycle control,
are delegated to the native platform. This module serves as a bridge for invoking
camera-related functionality from the JavaScript execution context.

## Examples

**ES Module:**
```typescript
import { CameraModule } from '@grabjs/superapp-sdk';

const cameraModule = new CameraModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const cameraModule = new SuperAppSDK.CameraModule();
</script>
```

## Extends

- `BaseModule`

## Constructors

### Constructor

> **new CameraModule**(): `CameraModule`

#### Returns

`CameraModule`

#### Overrides

`BaseModule.constructor`

## Methods

### scanQRCode()

> **scanQRCode**(`request`: [`ScanQRCodeRequest`](../type-aliases/ScanQRCodeRequest.md)): `Promise`\<[`ScanQRCodeResponse`](../type-aliases/ScanQRCodeResponse.md)\>

Opens the camera to scan a QR code.

#### Parameters

##### request

[`ScanQRCodeRequest`](../type-aliases/ScanQRCodeRequest.md)

Request parameters for scanning a QR code.

#### Returns

`Promise`\<[`ScanQRCodeResponse`](../type-aliases/ScanQRCodeResponse.md)\>

Promise that resolves with the QR code scan response.

#### Examples

With title
```typescript
try {
  const response = await cameraModule.scanQRCode({ title: 'Scan Payment QR' });
  if (response.status_code === 200) {
    console.log('QR Code:', response.result.qrCode);
  }
} catch (error) {
  console.error(error);
}
```

Without title
```typescript
try {
  const response = await cameraModule.scanQRCode({});
  if (response.status_code === 200) {
    console.log('QR Code:', response.result.qrCode);
  }
} catch (error) {
  console.error(error);
}
```

Handling the response
```typescript
try {
  const response = await cameraModule.scanQRCode({ title: 'Scan Payment QR' });

  switch (response.status_code) {
    case 200:
      console.log('QR Code scanned:', response.result.qrCode);
      break;
    case 204:
      console.log('User cancelled scanning');
      break;
    case 400:
      console.error('Invalid request:', response.error);
      break;
    case 403:
      console.error('Camera access denied:', response.error);
      break;
    case 500:
      console.error('Scanning error:', response.error);
      break;
  }
} catch (error) {
  console.error(error);
}
```
