# Scanning a QR code + getting a one-time location fix

## Which modules

- **`CameraModule`** — `scanQRCode(request)` opens the native camera UI to scan a QR code.
- **`LocationModule`** — `getCoordinate()` returns the device's current coordinates as a single `Promise`, one value and done.

## Avoiding battery drain on the location call

`LocationModule` actually exposes two different ways to get a position, and picking the right one is what matters for battery life:

- `getCoordinate()` — a plain `Promise`-based call. It asks the native layer for one fix and resolves once. This is exactly what you want for a "get location once on page load" use case.
- `observeLocationChange()` — a **stream** that keeps emitting updates over time (continuous tracking). This is meant for real-time tracking use cases (e.g. live map following), and keeps the GPS/location provider active until you unsubscribe. Using this for a single read would keep location services running unnecessarily and drain battery.

So: **use `getCoordinate()`, not `observeLocationChange()`**, for a one-shot location read. If you ever do need the streaming variant elsewhere in your app, the skill is explicit that you must always call `subscription.unsubscribe()` once you're done, specifically to conserve battery/resources — but for your case, avoid the stream API entirely since you only need one value.

Also, only request the location scope/permission when you actually need it (deferred authorization), rather than upfront — this is the pattern the SDK recommends for optional permissions like location, and it avoids unnecessary permission prompts and requests.

## Permissions

Both calls are gated:

- `LocationModule.getCoordinate()` requires the `mobile.geolocation` OAuth scope.
- `CameraModule.scanQRCode()` doesn't have a scope annotation in the reference, so it's not gated behind an OAuth scope.

For the location call, you have two options to handle permissions:

1. **Proactive check** — call `ScopeModule.hasAccessTo('LocationModule', 'getCoordinate')` before calling `getCoordinate()`, since users can revoke permissions any time from the Grab app settings.
2. **Reactive check** — just call `getCoordinate()` and handle a `403` by calling `IdentityModule.authorize({ scope: 'mobile.geolocation', ... })`, then `ScopeModule.reloadScopes()`, then retrying the call.

## Example

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

// --- 1. Scan a QR code (e.g. on a button tap) ---
async function scanQRCode() {
  const response = await camera.scanQRCode({});

  if (isSuccess(response)) {
    console.log('Scanned value:', response.result);
  } else if (isError(response)) {
    console.error('QR scan failed:', response.error);
  }
}

// --- 2. Get the user's location ONCE, when the page loads ---
async function getLocationOnce() {
  // Proactively check permission first — avoids an unnecessary round trip
  // and lets you decide whether to prompt for authorization.
  const hasAccess = await scope.hasAccessTo('LocationModule', 'getCoordinate');

  if (isSuccess(hasAccess) && hasAccess.result) {
    // Single one-shot read — NOT a subscription, so nothing keeps running
    // in the background after this resolves.
    const response = await location.getCoordinate();
    if (isSuccess(response)) {
      console.log('Current coordinate:', response.result);
    }
    return;
  }

  // Deferred authorization: only ask for mobile.geolocation now, at the
  // point where the app actually needs it (better UX/trust than upfront).
  const auth = await identity.authorize({
    clientId: 'your-client-id',
    redirectUri: 'https://your-app.com/callback',
    scope: 'mobile.geolocation',
    environment: 'production',
    responseMode: 'in_place',
  });

  if (isSuccess(auth)) {
    await scope.reloadScopes();

    const retry = await location.getCoordinate();
    if (isSuccess(retry)) {
      console.log('Current coordinate:', retry.result);
    } else if (isError(retry)) {
      console.error('Location fetch failed:', retry.error);
    }
  }
}

// Run once when the page loads
window.addEventListener('load', () => {
  getLocationOnce();
});
```

## Key takeaway on battery

The important decision is **`getCoordinate()` (one-shot Promise) vs. `observeLocationChange()` (continuous stream)**. For a "just once, on page load" requirement, `getCoordinate()` is the correct — and only — call you need; you never open a subscription, so there's nothing to leave running and nothing to remember to unsubscribe from. Reach for `observeLocationChange()` only if you have an actual live-tracking use case, and if you do, always `unsubscribe()` as soon as you no longer need updates.
