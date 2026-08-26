# DeviceModule

## API Reference

SDK module for querying native device information via `JSBridge`.

- `isEsimSupported(): Promise<IsEsimSupportedResponse>` — Checks whether the current device supports eSIM. (**OAuth Scope:** mobile.device | **Minimum Grab App Version:** Android: 5.402.0, iOS: 5.402.0)

This method can return the following `status_code` values:
- `200` (OK): eSIM capability was checked successfully. The `result` contains IsEsimSupportedResult.
- `403` (Forbidden): Client is not authorized to query eSIM capability.
- `424` (Failed Dependency): Dependency error occurred while checking eSIM support.
- `426` (Upgrade Required): Feature requires Grab app version 5.402 or above.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { DeviceModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the device module
const device = new DeviceModule();

// Check eSIM support
const response = await device.isEsimSupported();

// Handle the response
if (isSuccess(response)) {
  console.log('eSIM supported:', response.result);
} else if (isError(response)) {
  switch (response.status_code) {
    case 403:
      console.log('No permission to query eSIM support');
      // Trigger IdentityModule.authorize() for scope 'mobile.device', then reload via ScopeModule.reloadScopes() and try again
      break;
    case 426:
      console.log('User needs to upgrade the app');
      // Advise user to upgrade app
      break;
    default:
      console.error(`Error ${response.status_code}: ${response.error}`);
  }
} else {
  console.error('Unhandled response');
}
```
