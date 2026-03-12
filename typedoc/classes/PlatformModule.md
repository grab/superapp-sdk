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

> **back**(): `Promise`\<[`BackResponse`](../type-aliases/BackResponse.md)\>

Triggers the native platform back navigation.
This navigates back in the native navigation stack.

#### Returns

`Promise`\<[`BackResponse`](../type-aliases/BackResponse.md)\>

Confirmation that the back navigation was triggered.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Initialize the platform module
const platformModule = new PlatformModule();

// Trigger back navigation
try {
  const response = await platformModule.back();

  switch (response.status_code) {
    case 204:
      console.log('Back navigation triggered');
      break;
    case 501:
      console.log('Not in Grab app:', response.error);
      break;
    default:
      console.log('Unexpected status code:', response);
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```
