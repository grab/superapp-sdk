[@grabjs/superapp-sdk](../README.md) / CameraModule

# Class: CameraModule

JSBridge module for accessing the device camera.

## Remarks

Provides access to native camera functionality including QR code scanning.
Requires the MiniApp to be running within the Grab SuperApp's webview.

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

Configuration for the scan. See [ScanQRCodeRequest](../type-aliases/ScanQRCodeRequest.md).

#### Returns

`Promise`\<[`ScanQRCodeResponse`](../type-aliases/ScanQRCodeResponse.md)\>

Promise resolving to a [ScanQRCodeResponse](../type-aliases/ScanQRCodeResponse.md).

#### Examples

With title

```typescript
const response = await cameraModule.scanQRCode({ title: 'Scan Payment QR' });
```

Without title

```typescript
const response = await cameraModule.scanQRCode({});
```

Handling the response

```typescript
try {
  const { status_code, result, error } = await cameraModule.scanQRCode(params);
  switch (status_code) {
    case 200:
      console.log('QR Code scanned:', result.qrCode);
      break;
    case 204:
      console.log('User cancelled scanning');
      break;
    default:
      console.log(`Could not scan QR code ${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not scan QR code ${error ? `: ${error}` : ''}`);
}
```
