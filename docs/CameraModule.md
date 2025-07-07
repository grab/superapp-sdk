# CameraModule

The CameraModule provides functionality to open the device camera for QR code scanning and retrieve the scan results.

## Usage

```javascript
import { CameraModule, CameraResultType } from '@grab/superapp-sdk';

const cameraModule = new CameraModule();
```

## Methods

### `openCameraWithConfig(config)`

Opens the camera with custom configuration options.

**Parameters:**
- `config` (Object, optional): Configuration object
  - `title` (string, optional): Title to display in camera view (default: "Scan QR Code")

**Returns:** `Promise<Object>`

**Example:**
```javascript
// With custom title
cameraModule.openCameraWithConfig({
  title: 'Scan Payment QR'
})
  .then(result => {
    if (result.type === CameraResultType.QR_CODE) {
      console.log('QR Code scanned:', result.data);
    } else if (result.type === CameraResultType.CANCELLED) {
      console.log('User cancelled camera');
    }
  })
  .catch(error => {
    console.error('Camera error:', error);
  });

// With default settings
cameraModule.openCameraWithConfig()
  .then(result => {
    // Handle result
  });
```

## Constants

### `CameraResultType`

Enum for different camera result types:

- `QR_CODE`: Successfully scanned a QR code
- `SUCCESS`: General success status
- `ERROR`: An error occurred
- `CANCELLED`: User cancelled the camera operation

## Response Format

The camera method returns a Promise that resolves with an object containing:

```javascript
{
  type: CameraResultType.QR_CODE, // Result type
  data: "scanned_qr_code_string",  // The QR code content (for QR_CODE type)
  error: null                      // Error message (for ERROR type)
}
```

For validation errors, the response format is:
```javascript
{
  status_code: 400,
  error: "validation error message"
}
```

## Error Handling

The camera method returns a promise that can be caught for error handling:

```javascript
cameraModule.openCameraWithConfig()
  .then(result => {
    if (result.status_code === 400) {
      console.error('Validation error:', result.error);
      return;
    }
    // Handle successful result
  })
  .catch(error => {
    console.error('Camera operation failed:', error);
  });
```

## Validation

The method validates the configuration parameters:

- `config` must be undefined or an object
- `title` must be a string if provided

Invalid configurations will return an error response with `status_code: 400`.

## Platform Support

- iOS: ✅ Supported
- Android: ✅ Supported (when implemented)

## Notes

Camera permissions and lifecycle (opening/closing) are handled automatically by the native iOS app, so no additional management is required from the JavaScript side. 