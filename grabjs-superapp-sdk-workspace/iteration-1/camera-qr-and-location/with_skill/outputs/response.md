# Scanning a QR code + getting a one-time location on page load

## Which modules to use

| Need                                     | Module           | Method                |
| :--------------------------------------- | :--------------- | :-------------------- |
| Scan a QR code with the camera           | `CameraModule`   | `scanQRCode(request)` |
| Get the user's current location **once** | `LocationModule` | `getCoordinate()`     |

Both live in `references/device-and-sensors.md` of the `@grabjs/superapp-sdk` skill.

The important distinction for your battery question is on the `LocationModule` side. It exposes **two** ways to get a position, and picking the wrong one is exactly what drains battery:

- `getCoordinate(): Promise<GetCoordinateResponse>` — a single one-shot read of the current coordinates. This is what you want for "get location once when the page loads."
- `observeLocationChange(): ObserveLocationChangeResponse` — a **stream** that keeps the GPS radio active and pushes continuous updates until you unsubscribe. This is for live tracking (e.g. a map that follows the user), not a one-time read.

Since you only need the location once on load, call `getCoordinate()` (a plain `Promise`) rather than subscribing to `observeLocationChange()`. If you did use the stream, the SDK's own guidance is: "Always unsubscribe when done to conserve battery and resources" — but the simplest way to avoid the problem entirely is to just not open a stream you don't need. Fetching once with `getCoordinate()` triggers a single native location request instead of continuously keeping GPS/location services active in the background.

Both `getCoordinate()` and `scanQRCode()` are gated:

- `LocationModule.getCoordinate()` requires the `mobile.geolocation` OAuth scope.
- `CameraModule.scanQRCode()` has no OAuth scope requirement listed, so it can be called directly (it will still fail with a `501` if you're outside the Grab SuperApp WebView, or `400`/`500` for other camera/scan errors).

## Handling the location permission

Because `getCoordinate()` needs `mobile.geolocation`, and users can revoke permissions at any time, check access proactively before calling it (recommended pattern from the skill), and fall back to the reactive `403` flow (request authorization → reload scopes → retry) if the proactive check isn't available or the scope hasn't been granted yet.

## Example: QR scan on button tap, one-time location on page load

```typescript
import {
  CameraModule,
  LocationModule,
  IdentityModule,
  ScopeModule,
  isSuccess,
  isError,
} from '@grabjs/superapp-sdk';

const camera = new CameraModule();
const location = new LocationModule();
const identity = new IdentityModule();
const scope = new ScopeModule();

// --- 1. Get the user's location ONCE when the page loads ---
async function fetchLocationOnce() {
  // Proactively check permission first (avoids an unnecessary 403 round-trip)
  const hasAccess = await scope.hasAccessTo('LocationModule', 'getCoordinate');

  if (isSuccess(hasAccess) && hasAccess.result) {
    const response = await location.getCoordinate(); // single one-shot read, no stream
    if (isSuccess(response)) {
      console.log('Current location:', response.result.latitude, response.result.longitude);
    } else if (isError(response)) {
      console.error(`Location error ${response.status_code}: ${response.error}`);
    }
    return;
  }

  // Not granted yet — request the scope, then retry once
  const auth = await identity.authorize({
    clientId: 'your-client-id',
    redirectUri: 'https://your-miniapp.example.com/callback',
    scope: 'mobile.geolocation',
    environment: 'production',
    responseMode: 'in_place',
  });

  if (isSuccess(auth)) {
    await scope.reloadScopes();
    const retry = await location.getCoordinate();
    if (isSuccess(retry)) {
      console.log('Current location:', retry.result.latitude, retry.result.longitude);
    }
  }
}

// --- 2. Scan a QR code (e.g. triggered by a "Scan" button) ---
async function scanQRCode() {
  const response = await camera.scanQRCode({ title: 'Scan QR Code' });

  if (isSuccess(response) && response.status_code === 200) {
    console.log('Scanned value:', response.result.qrCode);
  } else if (response.status_code === 204) {
    console.log('User cancelled the scan');
  } else if (isError(response)) {
    console.error(`Scan error ${response.status_code}: ${response.error}`);
  }
}

// Run location fetch once on load; wire scanQRCode() to your scan button.
window.addEventListener('load', () => {
  fetchLocationOnce();
});
```

## Battery takeaway

- Use `LocationModule.getCoordinate()` (a `Promise`, resolves once) for "get location on load" — do **not** use `observeLocationChange()` for this, since that opens a continuous stream that keeps location services running.
- If you ever do need continuous updates elsewhere in the app, subscribe to `observeLocationChange()` only while actively needed and call `subscription.unsubscribe()` as soon as you're done, per the SDK's Streams guidance ("Always unsubscribe when done to conserve battery and resources").
- `CameraModule.scanQRCode()` only opens the camera for the duration of the scan UI (it resolves/closes on scan or cancel), so there's no equivalent "stream vs. one-shot" battery concern there.
