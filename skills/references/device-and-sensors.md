# Device & Sensors

API reference for hardware/sensor capability modules: camera, location, media playback, and device info.

`LocationModule` is also used as the running example for the Streams pattern (see `SKILL.md` Core Concepts → Streams) and the reactive 403-handling flow (see `references/auth-and-permissions.md` → Reactive Checking).

## API Reference

#### `CameraModule`
SDK module for accessing the device camera via `JSBridge`.
- `scanQRCode(request: ScanQRCodeRequest): Promise<ScanQRCodeResponse>` — Opens the native camera to scan a QR code.

#### `DeviceModule`
SDK module for querying native device information via `JSBridge`.
- `isEsimSupported(): Promise<IsEsimSupportedResponse>` — Checks whether the current device supports eSIM. (**OAuth Scope:** mobile.device | **Minimum Grab App Version:** Android: 5.402.0, iOS: 5.402.0)

#### `LocationModule`
SDK module for accessing device location services via `JSBridge`.
- `getCoordinate(): Promise<GetCoordinateResponse>` — Get the current geographic coordinates of the device. (**OAuth Scope:** mobile.geolocation)
- `getCountryCode(): Promise<GetCountryCodeResponse>` — Get the country code based on the device's current location. (**OAuth Scope:** mobile.geolocation)
- `observeLocationChange(): ObserveLocationChangeResponse` — Subscribe to location change updates from the device. (**OAuth Scope:** mobile.geolocation)

#### `MediaModule`
SDK module for playing DRM-protected media content via `JSBridge`.
- `observePlayDRMContent(data: DRMContentConfig): ObserveDRMPlaybackResponse` — Observes DRM-protected media content playback events. (**OAuth Scope:** mobile.media)
- `playDRMContent(data: DRMContentConfig): Promise<PlayDRMContentResponse>` — Plays DRM-protected media content in the native media player. (**OAuth Scope:** mobile.media)
