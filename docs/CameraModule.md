# CameraModule

The CameraModule provides functionality to open the device camera for QR code scanning and retrieve the scan results.

## Usage

```javascript
import { CameraModule, CameraResultCode } from '@grab/superapp-sdk';

const cameraModule = new CameraModule();
```

## Methods

### `scanQRCode(config)`

Opens the camera to scan QR codes with custom configuration options.

**Parameters:**
- `config` (Object, optional): Configuration object
  - `title` (string, optional): Title to display in camera view

**Returns:** `Thenable<Object>` (object with `then` method)

**Example:**
```javascript
// With custom title
cameraModule.scanQRCode({
  title: 'Scan Payment QR'
})
  .then(({ result, error }) => {
    if (result) {
      if (result.type === CameraResultCode.SUCCESS) {
        console.log('QR Code scanned:', result.data);
      } else if (result.type === CameraResultCode.CANCELLED) {
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

Enum for different camera result types:

- `SUCCESS`: Successfully scanned a QR code
- `ERROR`: An error occurred
- `CANCELLED`: User cancelled the camera operation

## Response Format

The camera method returns a thenable object (with a `then` method) that resolves with an object containing:

```javascript
{
  result: {
    type: CameraResultCode.SUCCESS, // Result type
    data: "scanned_qr_code_string",  // The QR code content (for SUCCESS type)
  },
  error: null // Error message if an error occurred
}
```

For validation errors, the response format is:
```javascript
{
  result: null,
  error: "validation error message"
}
```

## Error Handling

The camera method returns a thenable object that resolves with a result/error object:

```javascript
cameraModule.scanQRCode()
  .then(({ result, error }) => {
    if (result) {
      if (result.type === CameraResultCode.SUCCESS) {
        console.log('QR Code scanned:', result.data);
      } else if (result.type === CameraResultCode.CANCELLED) {
        console.log('User cancelled camera');
      } else if (result.type === CameraResultCode.ERROR) {
        console.error('Camera error:', result.error);
      }
    } else if (error) {
      // Some error happened.
    }
  });
```

## Validation

The method validates the configuration parameters:

- `config` must be undefined or an object
- `config.title` must be a string if provided

Invalid configurations will return an error response with `status_code: 400`.

## Platform Support

- iOS: ✅ Supported
- Android: ✅ Supported (when implemented)

## Notes

Camera permissions and lifecycle (opening/closing) are handled automatically by the native iOS app, so no additional management is required from the JavaScript side. 