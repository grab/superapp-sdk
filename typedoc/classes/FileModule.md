[@grabjs/superapp-sdk](../README.md) / FileModule

# Class: FileModule

JSBridge module for downloading files to the user's device.

## Remarks

Initiates native file download handling in the Grab app using a file URL and file name.
This code must run on the Grab SuperApp's webview to function correctly.

## Examples

**ES Module:**
```typescript
import { FileModule } from '@grabjs/superapp-sdk';
const fileModule = new FileModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const fileModule = new SuperAppSDK.FileModule();
</script>
```

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new FileModule**(): `FileModule`

#### Returns

`FileModule`

#### Overrides

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### downloadFile()

> **downloadFile**(`request`: [`DownloadFileRequest`](../type-aliases/DownloadFileRequest.md)): `Promise`\<[`DownloadFileResponse`](../type-aliases/DownloadFileResponse.md)\>

Downloads a file via the native bridge.

#### Parameters

##### request

[`DownloadFileRequest`](../type-aliases/DownloadFileRequest.md)

File information, including URL and target file name.

#### Returns

`Promise`\<[`DownloadFileResponse`](../type-aliases/DownloadFileResponse.md)\>

Download operation result.

#### Example

**Simple usage**
```typescript
// Initialize the file module
const fileModule = new FileModule();

// Download the file
const response = await fileModule.downloadFile({
  fileUrl: 'https://example.com/report.pdf',
  fileName: 'report.pdf',
});

switch (response.status_code) {
  case 204:
    console.log('File downloaded successfully');
    break;
  case 400:
    console.log('Bad request:', response.error);
    break;
  case 500:
    console.log('Internal server error:', response.error);
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
}
```
