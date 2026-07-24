# FileModule

## API Reference

SDK module for downloading files to the user's device via `JSBridge`.

- `downloadFile(request: DownloadFileRequest): Promise<DownloadFileResponse>` — Downloads a file through `JSBridge`.

This method can return the following `status_code` values:
- `204` (No Content): File downloaded successfully.
- `400` (Bad Request): Invalid request parameters.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { FileModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the file module
const file = new FileModule();

// Download the file
const response = await file.downloadFile({
  fileUrl: 'https://example.com/report.pdf',
  fileName: 'report.pdf',
});

// Handle the response
if (isSuccess(response)) {
  console.log('File downloaded successfully');
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```
