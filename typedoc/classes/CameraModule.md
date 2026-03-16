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

### invoke()

> **invoke**\<`T`\>(`options`: [`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>\>

Invokes a JSBridge method with optional app validation and response transformation.

#### Type Parameters

##### T

`T`

#### Parameters

##### options

[`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>

The invoke options including method name, params, validation, and transformation.

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>\>

A promise resolving to the JSBridge response.

#### Remarks

- Always checks if running in Grab app (returns 501 if not).
- When `isSupported` returns false, returns 426 (Upgrade Required).
- When `transformResponse` is provided, applies it to successful responses.
- All errors are reported via the `status_code` field; this method never rejects.
- For streaming methods, use `invokeStream` instead.

#### Inherited from

[`BaseModule`](BaseModule.md).[`invoke`](BaseModule.md#invoke)

***

### invokeStream()

> **invokeStream**\<`T`\>(`options`: `Omit`\<[`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>, `"transformResponse"`\>): [`BridgeStream`](../type-aliases/BridgeStream.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>

Invokes a JSBridge streaming method that returns a `BridgeStream`.

#### Type Parameters

##### T

`T`

#### Parameters

##### options

`Omit`\<[`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>, `"transformResponse"`\>

The invoke options including method name, params, and validation.

#### Returns

[`BridgeStream`](../type-aliases/BridgeStream.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>

A `BridgeStream` for receiving continuous data from the JSBridge.

#### Remarks

- Always checks if running in Grab app (returns 501 error response if not).
- When `isSupported` returns false, returns 426 error response.
- Returns a `BridgeStream` that can be subscribed to or awaited for the first value.
- All errors are reported via error responses in the stream; this method never rejects.

#### Inherited from

[`BaseModule`](BaseModule.md).[`invokeStream`](BaseModule.md#invokestream)

***

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

#### Example

**Simple usage**
```typescript
// Initialize the camera module
const cameraModule = new CameraModule();

// Scan the QR code
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
```
