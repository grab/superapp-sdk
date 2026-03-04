[@grabjs/superapp-sdk](../README.md) / CheckoutModule

# Class: CheckoutModule

JSBridge module for triggering native payment flows.

## Remarks

Invokes the native Grab checkout/pay component to process payments.
Requires the MiniApp to be running within the Grab SuperApp's webview.

## Examples

**ES Module:**
```typescript
import { CheckoutModule } from '@grabjs/superapp-sdk';
const checkoutModule = new CheckoutModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const checkoutModule = new SuperAppSDK.CheckoutModule();
</script>
```

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new CheckoutModule**(): `CheckoutModule`

#### Returns

`CheckoutModule`

#### Overrides

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### triggerCheckout()

> **triggerCheckout**(`checkoutDetails`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\>

#### Parameters

##### checkoutDetails

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\>
