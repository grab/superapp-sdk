[@grabjs/superapp-sdk](../README.md) / SystemWebViewKitModule

# Class: SystemWebViewKitModule

JSBridge module for opening URLs in the device's system browser.

## Remarks

Allows MiniApps to redirect users to external content using the native system webview.
Requires the MiniApp to be running within the Grab SuperApp's webview.

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

The URL to open in the system web view.

#### Returns

`Promise`\<[`RedirectToSystemWebViewResponse`](../type-aliases/RedirectToSystemWebViewResponse.md)\>

Resolves when the redirect is initiated successfully, or error information on failure.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Open a URL in system web view
```typescript
const response = await systemWebViewKitModule.redirectToSystemWebView({
  url: 'https://www.example.com'
});
```

Handling the response
```typescript
try {
  const { status_code, error } = await systemWebViewKitModule.redirectToSystemWebView({
    url: 'https://www.example.com'
  });
  switch (status_code) {
    case 204:
      console.log('Redirect initiated successfully');
      break;
    default:
      console.log(`Could not redirect${error ? `: ${error}` : ''}`);
      break;
  }
} catch (err) {
  console.log(`Could not redirect${err ? `: ${err}` : ''}`);
}
```
