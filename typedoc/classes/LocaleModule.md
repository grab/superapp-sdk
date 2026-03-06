[@grabjs/superapp-sdk](../README.md) / LocaleModule

# Class: LocaleModule

JSBridge module for accessing device locale settings.

## Remarks

Provides the user's preferred language and region settings from the native device.
This code must run on the Grab SuperApp's webview to function correctly.

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

> **getLanguageLocaleIdentifier**(): `Promise`\<[`BridgeStatusCode200Response`](../type-aliases/BridgeStatusCode200Response.md)\<`string`\>\>

Retrieves the current language locale identifier from the device.

#### Returns

`Promise`\<[`BridgeStatusCode200Response`](../type-aliases/BridgeStatusCode200Response.md)\<`string`\>\>

A promise that resolves to a `200` status code with the locale identifier.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { LocaleModule, isResponseOk } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { LocaleModule, isResponseOk } = window.SuperAppSDK;

// Initialize the locale module
const localeModule = new LocaleModule();

// Get the current locale
try {
  const response = await localeModule.getLanguageLocaleIdentifier();

  if (isResponseOk(response)) {
    console.log('Current locale:', response.result);
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```
