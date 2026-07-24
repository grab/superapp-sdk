# SystemWebViewKitModule

## API Reference

SDK module for opening URLs in the device's system browser via `JSBridge`.

- `redirectToSystemWebView(request: RedirectToSystemWebViewRequest): Promise<RedirectToSystemWebViewResponse>` — Opens a URL in the device's system web browser or web view.

This method can return the following `status_code` values:
- `200` (OK): Redirect initiated successfully.
- `400` (Bad Request): Invalid request parameters.
- `424` (Failed Dependency): Dependency error occurred while processing the request.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { SystemWebViewKitModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the system web view kit module
const webViewKit = new SystemWebViewKitModule();

// Open a URL in system web view
const response = await webViewKit.redirectToSystemWebView({
  url: 'https://www.example.com'
});

// Handle the response
if (isSuccess(response)) {
  console.log('Redirect initiated successfully');
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```
