[@grabjs/superapp-sdk](../README.md) / PlatformModule

# Class: PlatformModule

JSBridge module for controlling platform navigation.

## Remarks

Provides methods to interact with the native platform navigation stack, such as triggering the back action.
This code must run on the Grab SuperApp's webview to function correctly.

## Examples

**ES Module:**
```typescript
import { PlatformModule } from '@grabjs/superapp-sdk';
const platform = new PlatformModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const platform = new SuperAppSDK.PlatformModule();
</script>
```

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new PlatformModule**(): `PlatformModule`

#### Returns

`PlatformModule`

#### Overrides

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### back()

> **back**(): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\>

Triggers the native platform back navigation.
This navigates back in the native navigation stack.

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\>

A promise that resolves to a `204` status code when back navigation is triggered.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { PlatformModule, isResponseNoContent } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { PlatformModule, isResponseNoContent } = window.SuperAppSDK;

// Initialize the platform module
const platformModule = new PlatformModule();

// Trigger back navigation
try {
  const response = await platformModule.back();

  if (isResponseNoContent(response)) {
    console.log('Back navigation triggered');
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```
