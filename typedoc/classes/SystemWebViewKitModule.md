[@grabjs/superapp-sdk](../README.md) / SystemWebViewKitModule

# Class: SystemWebViewKitModule

JSBridge module for opening URLs in the device's system browser.

## Remarks

Allows MiniApps to redirect users to external content using the native system webview.
This code must run on the Grab SuperApp's webview to function correctly.

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

> **invokeStream**\<`T`\>(`options`: [`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>): [`BridgeStream`](../type-aliases/BridgeStream.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>

Invokes a JSBridge streaming method that returns a `BridgeStream`.

#### Type Parameters

##### T

`T`

#### Parameters

##### options

[`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>

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

***

### redirectToSystemWebView()

> **redirectToSystemWebView**(`request`: [`RedirectToSystemWebViewRequest`](../type-aliases/RedirectToSystemWebViewRequest.md)): `Promise`\<[`RedirectToSystemWebViewResponse`](../type-aliases/RedirectToSystemWebViewResponse.md)\>

Opens a URL in the device's system web browser or web view.

#### Parameters

##### request

[`RedirectToSystemWebViewRequest`](../type-aliases/RedirectToSystemWebViewRequest.md)

The URL to open in the system web view.

#### Returns

`Promise`\<[`RedirectToSystemWebViewResponse`](../type-aliases/RedirectToSystemWebViewResponse.md)\>

Confirmation of whether the redirect to system web view was successful.

#### Example

**Simple usage**
```typescript
// Initialize the system web view kit module
const systemWebViewKitModule = new SystemWebViewKitModule();

// Open a URL in system web view
const response = await systemWebViewKitModule.redirectToSystemWebView({
  url: 'https://www.example.com'
});

switch (response.status_code) {
  case 200:
    console.log('Redirect initiated successfully');
    break;
  case 400:
    console.log('Could not redirect:', response.error);
    break;
  case 424:
    console.log('Dependency error:', response.error);
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
}
```
