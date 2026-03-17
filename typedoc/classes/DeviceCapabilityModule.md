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
