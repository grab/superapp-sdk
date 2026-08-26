# CameraModule

## API Reference

SDK module for accessing the device camera via `JSBridge`.

- `scanQRCode(request: ScanQRCodeRequest): Promise<ScanQRCodeResponse>` — Opens the native camera to scan a QR code.

This method can return the following `status_code` values:
- `200` (OK): Successfully scanned QR code. The `result` contains ScanQRCodeResult.
- `204` (No Content): User cancelled the QR code scanning.
- `400` (Bad Request): Invalid request parameters.
- `403` (Forbidden): Camera permission is not enabled for the Grab app.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { CameraModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the camera module
const camera = new CameraModule();

// Scan a QR code
const response = await camera.scanQRCode({ title: 'Scan Payment QR' });

// Handle the response
if (isSuccess(response)) {
  switch (response.status_code) {
    case 200:
      console.log('QR code scanned:', response.result.qrCode);
      break;
    case 204:
      console.log('User cancelled QR code scanning');
      break;
  }
} else if (isError(response)) {
  switch (response.status_code) {
    case 403:
      console.log('Camera permission not enabled');
      // Advise user to enable camera permission in device settings
      break;
    default:
      console.error(`Error ${response.status_code}: ${response.error}`);
  }
} else {
  console.error('Unhandled response');
}
```
