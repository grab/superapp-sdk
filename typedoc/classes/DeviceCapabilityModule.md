[@grabjs/superapp-sdk](../README.md) / DeviceCapabilityModule

# Class: DeviceCapabilityModule

JSBridge module for querying native device capability information.

## Remarks

Provides access to device capability checks exposed by the native Grab app bridge.
This code must run on the Grab SuperApp's webview to function correctly.

## Examples

**ES Module:**
```typescript
import { DeviceCapabilityModule } from '@grabjs/superapp-sdk';
const deviceCapabilityModule = new DeviceCapabilityModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const deviceCapabilityModule = new SuperAppSDK.DeviceCapabilityModule();
</script>
```

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new DeviceCapabilityModule**(): `DeviceCapabilityModule`

#### Returns

`DeviceCapabilityModule`

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

> **invokeStream**\<`T`\>(`options`: [`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>): [`BridgeStream`](../type-aliases/BridgeStream.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>

Invokes a JSBridge streaming method that returns a `BridgeStream`.

#### Type Parameters

##### T

`T`

#### Parameters

##### options

[`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>

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

### isEsimSupported()

> **isEsimSupported**(): `Promise`\<[`IsEsimSupportedResponse`](../type-aliases/IsEsimSupportedResponse.md)\>

Checks whether the current device supports eSIM.

#### Returns

`Promise`\<[`IsEsimSupportedResponse`](../type-aliases/IsEsimSupportedResponse.md)\>

Whether eSIM is supported on the current device.

#### Example

**Simple usage**
```typescript
// Initialize the device capability module
const deviceCapabilityModule = new DeviceCapabilityModule();

// Check eSIM support
const response = await deviceCapabilityModule.isEsimSupported();

switch (response.status_code) {
  case 200:
    console.log('eSIM supported:', response.result);
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
}
```
