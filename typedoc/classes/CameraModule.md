[@grabjs/superapp-sdk](../README.md) / CameraModule

# Class: CameraModule

JSBridge module for accessing the device camera.

## Remarks

Provides access to native camera functionality including QR code scanning.
This code must run on the Grab SuperApp's webview to function correctly.

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

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new CameraModule**(): `CameraModule`

#### Returns

`CameraModule`

#### Overrides

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### scanQRCode()

> **scanQRCode**(`request`: [`ScanQRCodeRequest`](../type-aliases/ScanQRCodeRequest.md)): `Promise`\<[`ScanQRCodeResponse`](../type-aliases/ScanQRCodeResponse.md)\>

Opens the native camera to scan a QR code.

#### Parameters

##### request

[`ScanQRCodeRequest`](../type-aliases/ScanQRCodeRequest.md)

Configuration for the QR code scan.

#### Returns

`Promise`\<[`ScanQRCodeResponse`](../type-aliases/ScanQRCodeResponse.md)\>

A promise that resolves to a response with one of the following possible status codes:
- `200`: Successfully scanned QR code
- `204`: User cancelled the QR code scanning
- `400`: Bad request
- `403`: Camera permission is not enabled for the Grab app

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { CameraModule, isResponseOk, isResponseNoContent, isResponseError, isResponseForbidden, isResponseClientError } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { CameraModule, isResponseOk, isResponseNoContent, isResponseError, isResponseForbidden, isResponseClientError } = window.SuperAppSDK;

// Initialize the camera module
const cameraModule = new CameraModule();

// Scan the QR code
try {
  const response = await cameraModule.scanQRCode({ title: 'Scan Payment QR' });
  if (isResponseError(response)) {
    if (isResponseForbidden(response)) {
      console.log('User has not granted camera permission for the Grab app');
    } else if (isResponseClientError(response)) {
      console.log('Client error:', response.status_code, response.error);
    }
  } else {
    if (isResponseOk(response)) {
      console.log('QR Code scanned:', response.result.qrCode);
    } else if (isResponseNoContent(response)) {
      console.log('User cancelled QR code scanning');
    }
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```
