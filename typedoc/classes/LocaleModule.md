[@grabjs/superapp-sdk](../README.md) / LocaleModule

# Class: LocaleModule

JSBridge module for accessing device locale settings.

## Remarks

Provides the user's preferred language and region settings from the native device.
Requires the MiniApp to be running within the Grab SuperApp's webview.

## Examples

**ES Module:**
```typescript
import { LocaleModule } from '@grabjs/superapp-sdk';
const locale = new LocaleModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const locale = new SuperAppSDK.LocaleModule();
</script>
```

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new LocaleModule**(): `LocaleModule`

#### Returns

`LocaleModule`

#### Overrides

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### getLanguageLocaleIdentifier()

> **getLanguageLocaleIdentifier**(): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\>

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\>
