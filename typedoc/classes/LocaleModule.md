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

> **getLanguageLocaleIdentifier**(): `Promise`\<[`GetLanguageLocaleIdentifierResponse`](../type-aliases/GetLanguageLocaleIdentifierResponse.md)\>

Retrieves the current language locale identifier from the device.

#### Returns

`Promise`\<[`GetLanguageLocaleIdentifierResponse`](../type-aliases/GetLanguageLocaleIdentifierResponse.md)\>

Resolves with the locale identifier on success, or error information on failure.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Get the current locale
```typescript
const response = await localeModule.getLanguageLocaleIdentifier();
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await localeModule.getLanguageLocaleIdentifier({});
  switch (status_code) {
    case 200:
      console.log('Current locale:', result.locale);
      break;
    default:
      console.log(`Could not get locale${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not get locale${error ? `: ${error}` : ''}`);
}
```
