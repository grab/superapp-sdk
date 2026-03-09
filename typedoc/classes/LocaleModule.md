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

> **getLanguageLocaleIdentifier**(): [`GetLanguageLocaleIdentifierResponse`](../type-aliases/GetLanguageLocaleIdentifierResponse.md)

Retrieves the current language locale identifier from the device.

#### Returns

[`GetLanguageLocaleIdentifierResponse`](../type-aliases/GetLanguageLocaleIdentifierResponse.md)

The user's preferred language locale string (e.g., 'en-SG', 'id-ID').

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { LocaleModule } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { LocaleModule } = window.SuperAppSDK;

// Initialize the locale module
const localeModule = new LocaleModule();

// Get the current locale
try {
  const response = await localeModule.getLanguageLocaleIdentifier();

  switch (response.status_code) {
    case 200:
      console.log('Current locale:', response.result);
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
