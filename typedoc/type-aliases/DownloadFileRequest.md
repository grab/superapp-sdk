[@grabjs/superapp-sdk](../README.md) / DownloadFileRequest

# Type Alias: DownloadFileRequest

> **DownloadFileRequest** = \{ `fileName`: `string`; `fileUrl`: `string`; \}

Request parameters for downloading a file via native bridge.

## Example

```typescript
{
  fileUrl: 'https://example.com/report.pdf',
  fileName: 'report.pdf'
}
```

## Properties

### fileName

> **fileName**: `string`

The desired name for the downloaded file.

***

### fileUrl

> **fileUrl**: `string`

The URL of the file to download.
