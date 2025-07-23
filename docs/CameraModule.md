# CameraModule

The CameraModule provides functionality to open the device camera for QR code scanning and retrieve the scan results.

## Usage

```javascript
import { CameraModule } from '@grab/superapp-sdk';

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
  .then((response) => {
    if (response.status_code === 200) {
      console.log('QR Code scanned:', response.result.qrCode);
    } else if (response.status_code === 204) {
      console.log('No result - user cancelled or no QR code detected');
    } else if (response.status_code === 403) {
      console.log('Camera access denied:', response.error);
    }
  });

// With default settings
cameraModule.scanQRCode()
  .then((response) => {
    if (response.status_code === 200) {
      console.log('QR Code scanned:', response.result.qrCode);
    } else if (response.status_code === 204) {
      console.log('No result - user cancelled or no QR code detected');
    } else if (response.error) {
      console.log('Error occurred:', response.error);
    }
  });
```

## Response Format

The camera method returns an object with different structures based on the result:

### Success Response (Status Code 200)
```javascript
{
  "status_code": 200,
  "result": {
    "qrCode": "scanned_qr_code_string" // The QR code content
  }
}
```

### No Result Response (Status Code 204)
```javascript
{
  "status_code": 204
  // No result property
  // No error property
}
```

### Error Response (Status Code 403)
```javascript
{
  "status_code": 403,
  "error": "Camera access denied"
  // No result property
}
```

## Error Handling

Handle different response scenarios based on the status code:

```javascript
cameraModule.scanQRCode()
  .then((response) => {
    switch (response.status_code) {
      case 200:
        // Success - QR code scanned
        console.log('QR Code:', response.result.qrCode);
        break;
      case 204:
        // No result - user cancelled or no QR code detected
        console.log('Scanning cancelled or no QR code found');
        break;
      case 403:
        // Permission denied
        console.log('Camera access denied:', response.error);
        break;
      default:
        // Handle other potential status codes
        if (response.error) {
          console.log('Error:', response.error);
        }
    }
  });
```

## Status Codes

- `200`: Successfully scanned a QR code
- `204`: No result (user cancelled or no QR code detected)
- `403`: Camera access denied

## Notes

Camera permissions and lifecycle (opening/closing) are handled automatically by the native iOS app, so no additional management is required from the JavaScript side. 