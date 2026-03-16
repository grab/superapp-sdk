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

> **getLanguageLocaleIdentifier**(): `Promise`\<[`GetLanguageLocaleIdentifierResponse`](../type-aliases/GetLanguageLocaleIdentifierResponse.md)\>

Retrieves the current language locale identifier from the device.

#### Returns

`Promise`\<[`GetLanguageLocaleIdentifierResponse`](../type-aliases/GetLanguageLocaleIdentifierResponse.md)\>

The user's preferred language locale string (e.g., 'en-SG', 'id-ID').

#### Example

**Simple usage**
```typescript
// Initialize the locale module
const localeModule = new LocaleModule();

// Get the current locale
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
```

***

### invoke()

> **invoke**\<`T`\>(`options`: [`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>\>

Invokes a JSBridge method with optional app validation and response transformation.

#### Type Parameters

##### T

`T`

#### Parameters

##### options

[`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>

The invoke options including method name, params, validation, and transformation.

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>\>

A promise resolving to the JSBridge response.

#### Remarks

- Always checks if running in Grab app (returns 501 if not).
- When `isSupported` returns false, returns 426 (Upgrade Required).
- When `transformResponse` is provided, applies it to successful responses.
- All errors are reported via the `status_code` field; this method never rejects.
- For streaming methods, use `invokeStream` instead.

#### Inherited from

[`BaseModule`](BaseModule.md).[`invoke`](BaseModule.md#invoke)

***

### invokeStream()

> **invokeStream**\<`T`\>(`options`: `Omit`\<[`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>, `"transformResponse"`\>): [`BridgeStream`](../type-aliases/BridgeStream.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>

Invokes a JSBridge streaming method that returns a `BridgeStream`.

#### Type Parameters

##### T

`T`

#### Parameters

##### options

`Omit`\<[`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>, `"transformResponse"`\>

The invoke options including method name, params, and validation.

#### Returns

[`BridgeStream`](../type-aliases/BridgeStream.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>

A `BridgeStream` for receiving continuous data from the JSBridge.

#### Remarks

- Always checks if running in Grab app (returns 501 error response if not).
- When `isSupported` returns false, returns 426 error response.
- Returns a `BridgeStream` that can be subscribed to or awaited for the first value.
- All errors are reported via error responses in the stream; this method never rejects.

#### Inherited from

[`BaseModule`](BaseModule.md).[`invokeStream`](BaseModule.md#invokestream)
