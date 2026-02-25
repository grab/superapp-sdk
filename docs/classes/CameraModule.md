[@grabjs/superapp-sdk](../README.md) / CameraModule

# Class: CameraModule

The CameraModule provides functionality to open the device camera for QR code scanning and retrieve the scan results.

Camera permissions and lifecycle (opening/closing) are handled automatically by the native iOS app,
so no additional management is required from the JavaScript side.

## Example

```javascript
import { CameraModule } from '@grabjs/superapp-sdk';

const cameraModule = new CameraModule();
```

## Extends

- `ModuleBase`

## Constructors

### Constructor

> **new CameraModule**(): `CameraModule`

#### Returns

`CameraModule`

#### Overrides

`ModuleBase.constructor`

## Methods

### scanQRCode()

> **scanQRCode**(`request`: [`ScanQRCodeRequest`](../type-aliases/ScanQRCodeRequest.md)): `Promise`\<[`ScanQRCodeResponse`](../type-aliases/ScanQRCodeResponse.md)\>

Opens the camera to scan QR codes with optional configuration.

#### Parameters

##### request

[`ScanQRCodeRequest`](../type-aliases/ScanQRCodeRequest.md)

Configuration object for QR code scanning.
  - `title`: Title to display in camera view (optional)

#### Returns

`Promise`\<[`ScanQRCodeResponse`](../type-aliases/ScanQRCodeResponse.md)\>

Promise that resolves to [ScanQRCodeResponse](../type-aliases/ScanQRCodeResponse.md) with the scanned QR code data.

#### Remarks

Camera permissions and lifecycle are handled automatically by the native app.

**Status Codes:**
- `200`: Successfully scanned a QR code
- `204`: No result (user cancelled or no QR code detected)
- `403`: Camera access denied

#### Example

```javascript
// Basic usage with custom title
cameraModule.scanQRCode({ title: 'Scan Payment QR' })
  .then((response) => {
    switch (response.status_code) {
      case 200:
        // Success - QR code scanned
        console.log('QR Code scanned:', response.result.qrCode);
        break;
      case 204:
        // No result - user cancelled
        console.log('User cancelled scanning');
        break;
      case 403:
        // Permission denied
        console.error('Camera access denied:', response.error);
        break;
    }
  });

// Without title
cameraModule.scanQRCode({})
  .then(({ result, error, status_code }) => {
    if (status_code === 200 && result) {
      console.log('Scanned QR code:', result.qrCode);
    }
  });
```
