[@grabjs/superapp-sdk](../README.md) / SystemWebViewKitModule

# Class: SystemWebViewKitModule

JSBridge module for opening URLs in the device's system browser.

## Remarks

Allows MiniApps to redirect users to external content using the native system webview.
Requires the MiniApp to be running within the Grab SuperApp's webview.

## Examples

**ES Module:**

```typescript
import { SystemWebViewKitModule } from '@grabjs/superapp-sdk';
const webViewKit = new SystemWebViewKitModule();
```

**CDN (UMD):**

```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const webViewKit = new SuperAppSDK.SystemWebViewKitModule();
</script>
```

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new SystemWebViewKitModule**(): `SystemWebViewKitModule`

#### Returns

`SystemWebViewKitModule`

#### Overrides

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### redirectToSystemWebView()

> **redirectToSystemWebView**(`payload`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Parameters

##### payload

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>
