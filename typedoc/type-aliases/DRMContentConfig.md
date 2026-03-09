[@grabjs/superapp-sdk](../README.md) / DRMContentConfig

# Type Alias: DRMContentConfig

> **DRMContentConfig** = `Record`\<`string`, `unknown`\>

DRM content configuration for playback.

## Remarks

Configuration object containing DRM license information, content URLs, and playback settings.
The exact structure depends on the DRM provider (e.g., FairPlay, Widevine).

## Examples

**Widevine DRM configuration:**
```typescript
{
  contentId: 'movie-123',
  licenseUrl: 'https://license.example.com/widevine',
  contentUrl: 'https://cdn.example.com/video.mp4',
  headers: { 'Authorization': 'Bearer token123' }
}
```

**FairPlay DRM configuration:**
```typescript
{
  assetId: 'content-456',
  certificateUrl: 'https://fairplay.example.com/cert',
  licenseUrl: 'https://fairplay.example.com/license',
  contentUrl: 'https://cdn.example.com/video.m3u8'
}
```
