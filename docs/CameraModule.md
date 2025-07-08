# CameraModule

The CameraModule provides functionality to open the device camera for QR code scanning and retrieve the scan results.

## Usage

```javascript
import { CameraModule, CameraResultCode } from '@grab/superapp-sdk';

const cameraModule = new CameraModule();
```

## Methods

### `scanQRCode(config)`

Opens the camera to scan QR codes with optional configuration.

**Parameters:**
- `config` (Object, optional): Configuration object for QR code scanning
  - `title` (string, optional): Title to display in camera view

**Returns:** `Object` (QR code result object)

**Example:**
```javascript
// With custom title
cameraModule.scanQRCode({ title: 'Scan Payment QR' })
  .then(({ result, error }) => {
    if (result) {
      if (result.code === CameraResultCode.SUCCESS) {
        console.log('QR Code scanned:', result.data);
      } else if (result.code === CameraResultCode.CANCELLED) {
        console.log('User cancelled camera');
      }
    } else if (error) {
      // Some error happened.
    }
  });

// With default settings
cameraModule.scanQRCode()
  .then(({ result, error }) => {
    if (result) {
      // Handle successful result
    } else if (error) {
      // Some error happened.
    }
  });
```

## Constants

### `CameraResultCode`

Enum for different camera result codes:

- `SUCCESS`: Successfully scanned a QR code
- `ERROR`: An error occurred
- `CANCELLED`: User cancelled the camera operation

## Response Format

The camera method returns an object containing:

```javascript
{
  result: {
    code: CameraResultCode.SUCCESS, // Result code
    data: "scanned_qr_code_string",  // The QR code content (for SUCCESS code)
  },
  error: null // Error message if an error occurred
}
```

## Error Handling

The camera method returns a result/error object:

```javascript
cameraModule.scanQRCode()
  .then(({ result, error }) => {
    if (result) {
      if (result.code === CameraResultCode.SUCCESS) {
        console.log('QR Code scanned:', result.data);
      } else if (result.code === CameraResultCode.CANCELLED) {
        console.log('User cancelled camera');
      } else if (result.code === CameraResultCode.ERROR) {
        console.error('Camera error:', result.error);
      }
    } else if (error) {
      // Some error happened.
    }
  });
```

## Notes

Camera permissions and lifecycle (opening/closing) are handled automatically by the native iOS app, so no additional management is required from the JavaScript side. 