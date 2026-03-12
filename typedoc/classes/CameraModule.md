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

Configuration for the QR code scanning, including the title to display.

#### Returns

`Promise`\<[`ScanQRCodeResponse`](../type-aliases/ScanQRCodeResponse.md)\>

The QR code scanning result, containing the scanned code on success or status information.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Initialize the camera module
const cameraModule = new CameraModule();

// Scan the QR code
try {
  const response = await cameraModule.scanQRCode({ title: 'Scan Payment QR' });
  switch (response.status_code) {
    case 200:
      console.log('QR Code scanned:', response.result.qrCode);
      break;
    case 204:
      console.log('User cancelled QR code scanning');
      break;
    case 400:
      console.log('Bad request:', response.error);
      break;
    case 403:
      console.log('Camera permission is not enabled for the Grab app');
      break;
    case 501:
      console.log('Not in Grab app:', response.error);
      break;
    default:
      console.log('Unexpected status code:', response);
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```
