[@grabjs/superapp-sdk](../README.md) / SystemWebViewKitModule

# Class: SystemWebViewKitModule

Provides functionality to open a URL in a system webview.

## Remarks

The SystemWebViewKitModule enables miniapps to open external URLs in a native system webview,
which is separate from the Grab app's webview. This is useful for displaying external content
or web pages that need full browser capabilities.

## Examples

**ES Module:**
```typescript
import { SystemWebViewKitModule } from '@grabjs/superapp-sdk';

const systemWebViewKitModule = new SystemWebViewKitModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const systemWebViewKitModule = new SuperAppSDK.SystemWebViewKitModule();
</script>
```

## Extends

- `BaseModule`

## Constructors

### Constructor

> **new SystemWebViewKitModule**(): `SystemWebViewKitModule`

#### Returns

`SystemWebViewKitModule`

#### Overrides

`BaseModule.constructor`

## Methods

### redirectToSystemWebView()

> **redirectToSystemWebView**(`payload`: [`RedirectToSystemWebViewRequest`](../type-aliases/RedirectToSystemWebViewRequest.md)): `Promise`\<[`RedirectToSystemWebViewResponse`](../type-aliases/RedirectToSystemWebViewResponse.md)\>

Redirect to a system webview with the specified URL.

#### Parameters

##### payload

[`RedirectToSystemWebViewRequest`](../type-aliases/RedirectToSystemWebViewRequest.md)

Request parameters for redirecting to system webview.

#### Returns

`Promise`\<[`RedirectToSystemWebViewResponse`](../type-aliases/RedirectToSystemWebViewResponse.md)\>

Promise that resolves to [RedirectToSystemWebViewResponse](../type-aliases/RedirectToSystemWebViewResponse.md) when redirect is initiated.

#### Remarks

This method opens the specified URL in a native system webview, which is separate from
the Grab app's webview. This is useful for displaying external content or web pages
that need full browser capabilities.

#### Examples

Open an external website:
```typescript
try {
  await systemWebViewKitModule.redirectToSystemWebView({
    url: 'https://www.example.com'
  });
} catch (error) {
  console.error(error);
}
```

Open terms and conditions:
```typescript
try {
  await systemWebViewKitModule.redirectToSystemWebView({
    url: 'https://www.grab.com/terms'
  });
} catch (error) {
  console.error(error);
}
```

Handling the response:
```typescript
try {
  const response = await systemWebViewKitModule.redirectToSystemWebView({
    url: 'https://help.grab.com'
  });

  switch (response.status_code) {
    case 200:
      console.log('System webview opened successfully');
      break;
    case 400:
      console.error('Invalid URL:', response.error);
      break;
    case 500:
      console.error('Redirect error:', response.error);
      break;
  }
} catch (error) {
  console.error(error);
}
```
