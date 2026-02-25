[@grabjs/superapp-sdk](../README.md) / SystemWebViewKitModule

# Class: SystemWebViewKitModule

The SystemWebViewKitModule provides functionality to open a URL in a system webview.

## Example

```javascript
import { SystemWebViewKitModule } from '@grabjs/superapp-sdk';

// Initialize once and reuse
const systemWebViewKitModule = new SystemWebViewKitModule();
```

## Extends

- `ModuleBase`

## Constructors

### Constructor

> **new SystemWebViewKitModule**(): `SystemWebViewKitModule`

#### Returns

`SystemWebViewKitModule`

#### Overrides

`ModuleBase.constructor`

## Methods

### redirectToSystemWebView()

> **redirectToSystemWebView**(`payload`: [`RedirectToSystemWebViewRequest`](../type-aliases/RedirectToSystemWebViewRequest.md)): `Promise`\<[`RedirectToSystemWebViewResponse`](../type-aliases/RedirectToSystemWebViewResponse.md)\>

Redirect to a system webview with the specified URL.

#### Parameters

##### payload

[`RedirectToSystemWebViewRequest`](../type-aliases/RedirectToSystemWebViewRequest.md)

Request parameters.
  - `url`: The URL to open in the system webview

#### Returns

`Promise`\<[`RedirectToSystemWebViewResponse`](../type-aliases/RedirectToSystemWebViewResponse.md)\>

Promise that resolves to [RedirectToSystemWebViewResponse](../type-aliases/RedirectToSystemWebViewResponse.md) when redirect is initiated.

#### Remarks

This method opens the specified URL in a native system webview, which is separate from
the Grab app's webview. This is useful for displaying external content or web pages
that need full browser capabilities.

#### Example

```javascript
// Example 1: Open an external website
systemWebViewKitModule.redirectToSystemWebView({
  url: 'https://www.example.com'
})
  .then(({ result, error, status_code }) => {
    if (status_code === 200) {
      console.log("System webview opened successfully");
    } else if (error) {
      console.error("Redirect error:", error);
    }
  });

// Example 2: Open terms and conditions
systemWebViewKitModule.redirectToSystemWebView({
  url: 'https://www.grab.com/terms'
});

// Example 3: Open help documentation
const openHelp = () => {
  systemWebViewKitModule.redirectToSystemWebView({
    url: 'https://help.grab.com'
  });
};
```
