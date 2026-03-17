# DeviceCapabilityModule

## Description

The `DeviceCapabilityModule` provides functionality related to native device capability checks.

Current capability:

- Check whether the device supports eSIM.

## Methods

### 1. Is eSIM Supported

**Method name**: `isEsimSupported`

**Description**

Checks whether the current Android device supports eSIM.

**Arguments**

None.

**Return type**

| Name | Type | Description |
| --- | --- | --- |
| result | Boolean | `true` if eSIM is supported, otherwise `false` |
| error | String \| null | Error message if operation fails |
| status_code | Number | HTTP-like status code for the operation |

**Status Codes**

- **200**: Success, eSIM support result returned in `result`

## Code example

```javascript
import { DeviceCapabilityModule } from '@grabjs/superapp-sdk';

// Ideally, initialize this only once and reuse across app.
const deviceCapabilityModule = new DeviceCapabilityModule();

const { result, error, status_code } = await deviceCapabilityModule.isEsimSupported();

if (status_code === 200) {
  console.log('is eSIM supported:', result);
} else if (error) {
  console.error('isEsimSupported error:', error);
}
```
