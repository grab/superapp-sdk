[@grabjs/superapp-sdk](../README.md) / ScopeModule

# Class: ScopeModule

JSBridge module for checking and refreshing API access permissions.

## Remarks

Manages OAuth scope permissions to determine which JSBridge modules and methods the MiniApp has access to.
Requires the MiniApp to be running within the Grab SuperApp's webview.

## Examples

**ES Module:**
```typescript
import { ScopeModule } from '@grabjs/superapp-sdk';
const scope = new ScopeModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const scope = new SuperAppSDK.ScopeModule();
</script>
```

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new ScopeModule**(): `ScopeModule`

#### Returns

`ScopeModule`

#### Overrides

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### hasAccessTo()

> **hasAccessTo**(`module`: `any`, `method`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\>

#### Parameters

##### module

`any`

##### method

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\>

***

### reloadScopes()

> **reloadScopes**(): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\>

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\>
