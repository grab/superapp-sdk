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

### redirectToSystemWebView()

> **redirectToSystemWebView**(`request`: [`RedirectToSystemWebViewRequest`](../type-aliases/RedirectToSystemWebViewRequest.md)): `Promise`\<[`RedirectToSystemWebViewResponse`](../type-aliases/RedirectToSystemWebViewResponse.md)\>

Opens a URL in the device's system web browser or web view.

#### Parameters

##### request

[`RedirectToSystemWebViewRequest`](../type-aliases/RedirectToSystemWebViewRequest.md)

The URL configuration.

#### Returns

`Promise`\<[`RedirectToSystemWebViewResponse`](../type-aliases/RedirectToSystemWebViewResponse.md)\>

A promise that resolves to a response with one of the following possible status codes:
- `200`: Redirect initiated successfully
- `400`: Invalid URL, domain not whitelisted, or missing callback URL
- `424`: ASWebAuthenticationSession error

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { SystemWebViewKitModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { SystemWebViewKitModule, isResponseOk, isResponseError } = window.SuperAppSDK;

// Initialize the system web view kit module
const systemWebViewKitModule = new SystemWebViewKitModule();

// Open a URL in system web view
try {
  const response = await systemWebViewKitModule.redirectToSystemWebView({
    url: 'https://www.example.com'
  });

  if (isResponseError(response)) {
    console.log('Could not redirect:', response.error);
  } else if (isResponseOk(response)) {
    console.log('Redirect initiated successfully');
  }
} catch (err) {
  console.log('Unexpected error:', err);
}
```
