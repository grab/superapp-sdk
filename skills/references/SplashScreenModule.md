# SplashScreenModule

## API Reference

SDK module for controlling the native splash / Lottie loading screen via `JSBridge`.

- `dismiss(): Promise<DismissSplashScreenResponse>` — Dismisses the native splash (Lottie) loading view if it is presented.

This method can return the following `status_code` values:
- `204` (No Content): No splash screen shown, or it was closed successfully.
- `400` (Bad Request): Invalid request parameters.
- `403` (Forbidden): Missing consent for the required OAuth scope.
- `500` (Internal Server Error): Unexpected error while invoking `JSBridge`.
- `501` (Not Implemented): Not in the Grab app WebView environment.

```typescript
import { SplashScreenModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';

const splashScreen = new SplashScreenModule();
const response = await splashScreen.dismiss();

if (isSuccess(response)) {
  console.log('dismissed splash screen successfully');
} else if (isErrorResponse(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```
