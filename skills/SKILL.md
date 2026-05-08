---
name: 'grabjs-superapp-sdk'
description: 'API reference for @grabjs/superapp-sdk. Use when building a MiniApp that runs in the Grab SuperApp WebView and needs to call native features (camera, payments, authorization, authentication, permission, location, device storage, container UI customization) via the Grab JSBridge. Keywords: miniapp, webview, android, ios, jsbridge, grab, superapp.'
license: 'MIT'
---

# @grabjs/superapp-sdk

Use this SDK to call native Grab SuperApp features from a MiniApp running in the WebView. Each module covers one domain (camera, payments, location, etc.) and communicates with the native layer via JSBridge.

## Setup

### Installation

#### NPM

```bash
npm install @grabjs/superapp-sdk
```

#### Yarn

```bash
yarn add @grabjs/superapp-sdk
```

### Importing

#### ES Modules (recommended)

Import only the modules you need:

```typescript
import { ContainerModule, ScopeModule } from '@grabjs/superapp-sdk';
```

Type guards and response types are also available as named exports:

```typescript
import { isSuccess, isError } from '@grabjs/superapp-sdk';
```

#### CDN (UMD Bundle)

If you are not using a bundler, load the SDK from a CDN and access it via the `SuperAppSDK` global.
**Always pin to a specific version** (e.g., `@x.y.z`) — omitting the version always fetches the latest release, which may contain breaking changes.

```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk@x.y.z/dist/index.js"></script>
<script>
  const { ContainerModule, ScopeModule, isSuccess, isError } = window.SuperAppSDK;
</script>
```


## Core Concepts

SDK methods communicate with the native Grab SuperApp via JSBridge. They only work when your page is running inside the **Grab SuperApp WebView**. Calling a method outside that environment returns `{ status_code: 501 }`.

### Response Pattern

Every SDK method returns a bridge response object with an HTTP-style `status_code`. SDK methods never throw — use type guards instead of try/catch.

```typescript
import { ProfileModule, isSuccess, isError } from '@grabjs/superapp-sdk';

const profile = new ProfileModule();
const response = await profile.fetchEmail();

if (isSuccess(response)) {
  console.log('Result:', response.result);
} else if (isError(response)) {
  switch (response.status_code) {
    case 403:
      // Missing OAuth scope - call IdentityModule.authorize() then ScopeModule.reloadScopes()
      break;
    case 426:
      // Grab app version too old - prompt user to update their app
      break;
    default:
      console.error(`Error ${response.status_code}: ${response.error}`);
  }
}
```

### Status Codes

The SDK uses HTTP-style status codes for all responses:

| Code  | Type              | Description                                                 |
| :---- | :---------------- | :---------------------------------------------------------- |
| `200` | OK                | Request successful, `result` contains response data         |
| `204` | No Content        | Request successful, no data returned                        |
| `302` | Redirect          | Redirect in progress                                        |
| `400` | Bad Request       | Invalid request parameters                                  |
| `401` | Unauthorized      | Authentication required                                     |
| `403` | Forbidden         | Insufficient permission (see `@requiredOAuthScope` tag)     |
| `404` | Not Found         | Resource not found                                          |
| `424` | Failed Dependency | Underlying native request failed                            |
| `426` | Upgrade Required  | Grab app version too old (see `@minimumGrabAppVersion` tag) |
| `500` | Internal Error    | Unexpected SDK error                                        |
| `501` | Not Implemented   | Outside Grab SuperApp environment                           |

### Type Guards

Type guards narrow the response type so TypeScript knows which fields are available:

| Guard                             | Matches                                  |
| --------------------------------- | ---------------------------------------- |
| `isSuccess(r)`                    | `200`, `204`                             |
| `isOk(r)`                         | `200`                                    |
| `isNoContent(r)`                  | `204`                                    |
| `isRedirection(r)` / `isFound(r)` | `302`                                    |
| `isClientError(r)`                | `400`, `401`, `403`, `404`, `424`, `426` |
| `isServerError(r)`                | `500`, `501`                             |
| `isError(r)`                      | any 4xx or 5xx                           |

```typescript
import { isSuccess, isOk, isNoContent, isError } from '@grabjs/superapp-sdk';

if (isSuccess(response)) {
  // narrow further if needed
  if (isOk(response)) console.log(response.result);
  if (isNoContent(response)) console.log('done, no data');
}

if (isError(response)) {
  // response.error: string is guaranteed here
  console.error(response.error);
}
```

### Streams

Some modules provide streaming methods for real-time data (location updates, media events). Subscribe to receive values over time:

```typescript
import { LocationModule, isSuccess } from '@grabjs/superapp-sdk';

const location = new LocationModule();

const subscription = location.observeLocationChange().subscribe({
  next: (response) => {
    if (isSuccess(response)) console.log(response.result);
  },
  complete: () => console.log('Stream ended'),
});

// Always unsubscribe when done to conserve battery and resources
subscription.unsubscribe();
```

You can also `await` a stream method directly to get its first value.

### Scopes and Permissions

The SDK categorizes permissions into two distinct types based on their execution context:

#### Permission Types

- **Backend Scopes** (`openid`, `profile.read`, `phone`)
  - **Purpose**: Access protected resources and user data via your server.
  - **Flow**: Requires a backend token exchange after authorization to retrieve data.
- **Mobile Scopes** (`mobile.geolocation`, `mobile.checkout`)
  - **Purpose**: Access native device capabilities directly within the MiniApp.
  - **Flow**: Grants in-app permission immediately; no backend exchange is necessary.

#### Authorization Patterns

When designing your MiniApp, you can choose between two common patterns for requesting scopes:

- **Upfront Authorization**
  - Request all required scopes during app initialisation, typically alongside backend sign-in.
  - _Best for_: Core permissions essential for the app to function.
- **Deferred Authorization**
  - Request scopes only when the user triggers a specific feature that requires them.
  - _Best for_: Optional permissions (e.g., location) to improve user experience and build trust.

#### Permission Verification Strategies

You can verify permissions either proactively before calling a method, or reactively by handling errors.

##### Proactive Checking

Proactively verify if the current session has the necessary permissions for a method using `ScopeModule.hasAccessTo()`. This is recommended before calling gated methods, as users can revoke permissions at any time via the Grab app settings.

```typescript
const scope = new ScopeModule();
const hasAccess = await scope.hasAccessTo('LocationModule', 'getCoordinate');

if (isSuccess(hasAccess) && hasAccess.result) {
  // Permission is available, safe to call the method
  const location = await location.getCoordinate();
}
```

##### Reactive Checking (Handling 403 Forbidden)

Methods tagged with `@requiredOAuthScope` require specific permissions. If the user hasn't granted the required scope, the method returns `403`. You must request authorization and reload scopes before retrying:

1. Call `IdentityModule.authorize()` to request the scope.
2. Call `ScopeModule.reloadScopes()` to refresh the SDK's internal permission state.
3. Retry the original method call.

```typescript
import {
  LocationModule,
  IdentityModule,
  ScopeModule,
  isSuccess,
  isError,
} from '@grabjs/superapp-sdk';

const location = new LocationModule();
const identity = new IdentityModule();
const scope = new ScopeModule();

const response = await location.getCoordinate();

if (isError(response) && response.status_code === 403) {
  // 1. Request authorization for the required scope
  const auth = await identity.authorize({
    clientId: 'your-client-id',
    redirectUri: 'https://your-app.com/callback',
    scope: 'mobile.geolocation', // The scope defined in @requiredOAuthScope
    environment: 'production',
    responseMode: 'in_place',
  });

  if (isSuccess(auth)) {
    // 2. Reload scopes so the new permission is available
    await scope.reloadScopes();

    // 3. Retry the original call
    const retry = await location.getCoordinate();
    if (isSuccess(retry)) {
      console.log('Result:', retry.result);
    }
  }
}
```


## Integration Guide

This guide covers the recommended setup for a MiniApp entry point — loading scopes, configuring the container UI, signalling readiness, and handling permissions.

> **Note:** The [demo](https://github.com/grab/superapp-sdk/tree/master/demo) folder contains two complete MiniApp samples demonstrating these integration patterns in action — one using CDN (vanilla HTML/JS) and one using React. Both implement the same user flow: OAuth authorization, user profile display, deferred location permissions, and checkout payment.

### Initialization

Follow these steps when your MiniApp launches to configure the container, authenticate the user, and track the entry event.

```typescript
import {
  ContainerModule,
  ScopeModule,
  ContainerAnalyticsEventState,
  isSuccess,
} from '@grabjs/superapp-sdk';

const container = new ContainerModule();
const scope = new ScopeModule();

async function init() {
  // 1. Verify the environment
  const connection = await container.isConnected();
  if (!isSuccess(connection) || !connection.result?.connected) {
    // Handle case where app is opened outside Grab SuperApp
    return;
  }

  // 2. Configure the container UI
  await container.setTitle('My MiniApp');
  await container.setBackgroundColor('#FFFFFF');
  await container.hideBackButton();
  await container.hideRefreshButton();

  // 3. Dismiss the native loader
  await container.hideLoader();

  // 4. Track app launch
  await container.sendAnalyticsEvent({
    state: ContainerAnalyticsEventState.HOMEPAGE,
    name: 'DEFAULT',
  });

  // 5. Authenticate the user
  // (Implementation detailed in the Authentication section below)
  await signIn();

  // 6. Load permission scopes — always do this before making module calls
  await scope.reloadScopes();
}

init();
```

### Authentication

Trigger `IdentityModule.authorize()` to start the authorization process and request user permissions.

Once the user consents, retrieve the authorization artifacts (which include the `code`, `state`, `nonce`, and PKCE `codeVerifier`) via `IdentityModule.getAuthorizationArtifacts()`.

Forward these artifacts to your backend to exchange the token, validate the `id_token`, fetch user info, and establish the user's session.

After the session is established, call `IdentityModule.clearAuthorizationArtifacts()` and `ScopeModule.reloadScopes()` so your MiniApp can begin using the newly granted permissions.

```typescript
import { IdentityModule, ScopeModule, isSuccess, isError } from '@grabjs/superapp-sdk';

const identity = new IdentityModule();
const scope = new ScopeModule();

async function signIn() {
  const response = await identity.authorize({
    clientId: 'your-client-id',
    redirectUri: 'https://your-miniapp.example.com/callback',
    scope: 'openid profile.read phone mobile.storage',
    environment: 'production',
    responseMode: 'in_place',
  });

  if (isSuccess(response)) {
    if (response.status_code === 200) {
      // 1. Retrieve authorization artifacts
      const artifacts = await identity.getAuthorizationArtifacts();
      if (isSuccess(artifacts)) {
        const { codeVerifier, nonce, redirectUri } = artifacts.result;
        const { code } = response.result;

        // 2. Send the artifacts to your backend for token exchange (see Backend Token Exchange section below)
        // await myBackend.exchangeTokens({ code, codeVerifier, nonce, redirectUri });

        // 3. Clear artifacts and reload scopes
        await identity.clearAuthorizationArtifacts();
        await scope.reloadScopes();
      }
    } else if (response.status_code === 204) {
      // User cancelled the authorization flow
      await identity.clearAuthorizationArtifacts();
    }
  } else if (isError(response)) {
    console.error('Authorization failed:', response.error);
    await identity.clearAuthorizationArtifacts();
  }
}
```

### Container UI & Navigation

Control the native container's appearance and behavior to match your MiniApp's branding and navigation flow.

#### Title and Background

Set the title and background color for the native container.

```typescript
await container.setTitle('My MiniApp');
await container.setBackgroundColor('#FFFFFF');
```

#### Back and Refresh Buttons

Hide these buttons when your MiniApp manages its own navigation or requires a focused, non-refreshable view. Restore them when appropriate.

```typescript
// Hide buttons
await container.hideBackButton();
await container.hideRefreshButton();

// Restore buttons
await container.showBackButton();
await container.showRefreshButton();
```

#### Closing the MiniApp

Programmatically close the MiniApp and return the user to the Grab SuperApp.

```typescript
await container.close();
```

### Opening External Links

Use `ContainerModule.openExternalLink()` to open URLs in the system browser instead of navigating away from the MiniApp WebView.

```typescript
const response = await container.openExternalLink('https://example.com');

if (isError(response)) {
  console.error('Failed to open link:', response.error);
}
```

### Analytics Event Tracking

Track user interactions to monitor performance and conversion. Events are categorised by journey stage using `ContainerAnalyticsEventState`.

```typescript
import { ContainerModule, ContainerAnalyticsEventState, isSuccess } from '@grabjs/superapp-sdk';

const container = new ContainerModule();

// 1. System Event (DEFAULT)
// Send when a user lands on a key page
await container.sendAnalyticsEvent({
  state: ContainerAnalyticsEventState.HOMEPAGE,
  name: 'DEFAULT',
});

// 2. Named Action (INITIATE / TRANSACT)
// Send when a user performs a primary action
await container.sendAnalyticsEvent({
  state: ContainerAnalyticsEventState.HOMEPAGE,
  name: 'INITIATE',
});

// 3. Custom Interaction
// Send for specific interactions with additional metadata
await container.sendAnalyticsEvent({
  state: ContainerAnalyticsEventState.CUSTOM,
  name: 'BANNER_CLICK',
  data: {
    page: 'homepage',
    banner_id: 'promo-summer-2024',
  },
});
```

#### Journey Stages

| State              | Description                                      |
| :----------------- | :----------------------------------------------- |
| `HOMEPAGE`         | Entry point or main landing page.                |
| `CHECKOUT_PAGE`    | Transaction confirmation or payment selection.   |
| `COMPLETION_POINT` | Post-transaction or success page.                |
| `CUSTOM`           | Any other interaction outside the standard flow. |

#### Best Practices

- Track system events automatically when users navigate to the corresponding pages.
- Always include required data fields for transaction events to enable accurate revenue tracking.
- Use descriptive names for custom events that clearly indicate the user action being tracked.
- Never include Personally Identifiable Information (PII) in event data.

### Checkout

The checkout flow is a two-step process: your backend first initializes a transaction using your partner credentials, then your frontend triggers the native payment interface using the response from your backend.

```typescript
import {
  CheckoutModule,
  IdentityModule,
  ScopeModule,
  isSuccess,
  isError,
} from '@grabjs/superapp-sdk';

const checkout = new CheckoutModule();
const identity = new IdentityModule();
const scope = new ScopeModule();

async function processPayment() {
  // 1. Proactively check for checkout permission
  const hasAccess = await scope.hasAccessTo('CheckoutModule', 'triggerCheckout');

  if (!isSuccess(hasAccess) || !hasAccess.result) {
    // Request authorization for mobile.checkout
    // Note: mobile.checkout is a mobile scope; no backend exchange is needed for auth.
    const authResponse = await identity.authorize({
      clientId: 'your-client-id',
      redirectUri: window.location.href,
      scope: 'mobile.checkout',
      environment: 'production',
      responseMode: 'in_place',
    });

    if (isSuccess(authResponse) && authResponse.status_code === 200) {
      await scope.reloadScopes();
    } else {
      return;
    }
  }

  // 2. Fetch the initialized transaction payload from your backend
  const response = await fetch('https://your-backend.example.com/init-transaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId: 'order-123' }),
  });
  const { partnerTxID, request, sessionID } = await response.json();

  // 3. Trigger checkout with the backend response
  const checkoutResult = await checkout.triggerCheckout({
    partnerTxID,
    request,
    sessionID,
  });

  if (isSuccess(checkoutResult)) {
    console.log(checkoutResult.result);
  } else if (isError(checkoutResult)) {
    console.error('Checkout error:', checkoutResult.error);
  }
}
```

For the complete API reference, see [GrabPay API](https://developer.grab.com/docs/partner-apps/pages/developer-resources/payment/) and [CheckoutModule](https://grab.github.io/superapp-sdk/classes/CheckoutModule.html).


## API Reference

### Classes

#### `CameraModule`
JSBridge module for accessing the device camera.
- `scanQRCode(request: { title?: string }): Promise<{ result: { qrCode: string }; status_code: 200 } | { status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Opens the native camera to scan a QR code.

#### `CheckoutModule`
JSBridge module for triggering native payment flows.
- `triggerCheckout(request: Record<string, unknown>): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: { status: "success"; transactionID: string } | { errorCode: string; errorMessage: string; status: "failure"; transactionID: string } | { status: "pending"; transactionID: string } | { status: "userInitiatedCancel" }; status_code: 200 }>` — Triggers the native checkout flow for payment processing. (**OAuth Scope:** mobile.checkout)

#### `ContainerModule`
JSBridge module for controlling the WebView container.
- `close(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Close the container and return to the previous screen.
- `getSessionParams(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: string; status_code: 200 }>` — Get the session parameters from the container.
- `hideBackButton(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Hide the back button on the container header.
- `hideLoader(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Hide the full-screen loading indicator.
- `hideRefreshButton(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Hide the refresh button on the container header.
- `isConnected(): Promise<{ result: { connected: boolean }; status_code: 200 } | { error: string; status_code: 404 }>` — Check if the web app is connected to the Grab SuperApp via JSBridge.
- `onContentLoaded(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: boolean; status_code: 200 }>` — Notify the Grab SuperApp that the page content has loaded.
- `onCtaTap(request: string): Promise<{ error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: boolean; status_code: 200 }>` — Notify the client that the user has tapped a call-to-action (CTA).
- `openExternalLink(request: string): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Open a link in the external browser.
- `sendAnalyticsEvent(request: { data?: Record<string, unknown>; name: string; state: string }): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Use this method to track user interactions and page transitions.
- `setBackgroundColor(request: string): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Set the background color of the container header.
- `setTitle(request: string): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Set the title of the container header.
- `showBackButton(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Show the back button on the container header.
- `showLoader(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Show the full-screen loading indicator.
- `showRefreshButton(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Show the refresh button on the container header.

#### `DeviceModule`
JSBridge module for querying native device information.
- `isEsimSupported(): Promise<{ error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: boolean; status_code: 200 }>` — Checks whether the current device supports eSIM.

#### `FileModule`
JSBridge module for downloading files to the user's device.
- `downloadFile(request: { fileName: string; fileUrl: string }): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Downloads a file via the native bridge.

#### `IdentityModule`
JSBridge module for authenticating users via GrabID.
- `authorize(request: { clientId: string; environment: "staging" | "production"; redirectUri: string; responseMode?: "redirect" | "in_place"; scope: string }): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: { code: string; state: string }; status_code: 200 } | { status_code: 302 }>` — Initiates an OAuth2 authorization flow with PKCE (Proof Key for Code Exchange).
This method handles both native in-app consent and web-based fallback flows.
- `clearAuthorizationArtifacts(): Promise<{ status_code: 204 }>` — Clears all stored PKCE authorization artifacts from local storage.
This should be called after a successful token exchange or when you need to
reset the authorization state (e.g., on error or logout).
- `getAuthorizationArtifacts(): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { result: { codeVerifier: string; nonce: string; redirectUri: string; state: string }; status_code: 200 }>` — Retrieves stored PKCE authorization artifacts from local storage.
These artifacts are used to complete the OAuth2 authorization code exchange.

#### `LocaleModule`
JSBridge module for accessing device locale settings.
- `getLanguageLocaleIdentifier(): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: string; status_code: 200 }>` — Retrieves the current language locale identifier from the device.

#### `LocationModule`
JSBridge module for accessing device location services.
- `getCoordinate(): Promise<{ error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: { latitude: number; longitude: number }; status_code: 200 } | { error: string; status_code: 424 }>` — Get the current geographic coordinates of the device. (**OAuth Scope:** mobile.geolocation)
- `getCountryCode(): Promise<{ status_code: 204 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: string; status_code: 200 } | { error: string; status_code: 424 }>` — Get the country code based on the device's current location. (**OAuth Scope:** mobile.geolocation)
- `observeLocationChange(): ObserveLocationChangeResponse` — Subscribe to location change updates from the device. (**OAuth Scope:** mobile.geolocation)

#### `Logger`
Provides scoped logging for SDK modules.

#### `MediaModule`
JSBridge module for playing DRM-protected media content.
- `observePlayDRMContent(data: DRMContentConfig): ObserveDRMPlaybackResponse` — Observes DRM-protected media content playback events. (**OAuth Scope:** mobile.media)
- `playDRMContent(data: DRMContentConfig): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 } | { result: { length: number; position: number; titleId: string; type: "START_PLAYBACK" | "PROGRESS_PLAYBACK" | "START_SEEK" | "STOP_SEEK" | "STOP_PLAYBACK" | "CLOSE_PLAYBACK" | "PAUSE_PLAYBACK" | "RESUME_PLAYBACK" | "FAST_FORWARD_PLAYBACK" | "REWIND_PLAYBACK" | "ERROR_PLAYBACK" | "CHANGE_VOLUME" }; status_code: 200 }>` — Plays DRM-protected media content in the native media player. (**OAuth Scope:** mobile.media)

#### `NetworkModule`
JSBridge module for making network requests via the native bridge.
- `send(request: { body?: unknown; endpoint: string; headers?: Record<string, string>; method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS"; query?: Record<string, string>; timeout?: number }): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 404 } | { error: string; status_code: 424 } | { result: Record<string, unknown>; status_code: 200 } | { error: string; status_code: 401 } | { error: string; status_code: 426 }>` — Sends a network request via the native bridge.

#### `PlatformModule`
JSBridge module for controlling platform navigation.
- `back(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Triggers the native platform back navigation.
This navigates back in the native navigation stack.

#### `ProfileModule`
JSBridge module for accessing user profile information.
- `fetchEmail(): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 426 } | { result: { email: string }; status_code: 200 }>` — Fetches the user's email address from their Grab profile. (**OAuth Scope:** mobile.profile | **Minimum Grab App Version:** Android: 5.399.0, iOS: 5.399.0)
- `verifyEmail(request?: { email?: string; skipUserInput?: boolean }): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 426 } | { result: { email: string }; status_code: 200 }>` — Verifies the user's email address by triggering email capture bottom sheet and OTP verification. (**OAuth Scope:** mobile.profile | **Minimum Grab App Version:** Android: 5.399.0, iOS: 5.399.0)

#### `ScopeModule`
JSBridge module for checking and refreshing API access permissions.
- `hasAccessTo(module: string, method: string): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: boolean; status_code: 200 } | { error: string; status_code: 424 }>` — Checks if the current client has access to a specific JSBridge API method.
- `reloadScopes(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 }>` — Requests to reload the consented OAuth scopes for the current client.
This refreshes the permissions from the server.

#### `SplashScreenModule`
JSBridge module for controlling the native splash / Lottie loading screen.
- `dismiss(): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Dismisses the native splash (Lottie) loading view if it is presented.

#### `StorageModule`
JSBridge module for persisting key-value data to native storage.
- `getBoolean(key: string): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 } | { result: { value: boolean | null }; status_code: 200 }>` — Retrieves a boolean value from the native storage. (**OAuth Scope:** mobile.storage)
- `getDouble(key: string): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 } | { result: { value: number | null }; status_code: 200 }>` — Retrieves a double (floating point) value from the native storage. (**OAuth Scope:** mobile.storage)
- `getInt(key: string): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 } | { result: { value: number | null }; status_code: 200 }>` — Retrieves an integer value from the native storage. (**OAuth Scope:** mobile.storage)
- `getString(key: string): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 } | { result: { value: string | null }; status_code: 200 }>` — Retrieves a string value from the native storage. (**OAuth Scope:** mobile.storage)
- `remove(key: string): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 }>` — Removes a single value from the native storage by key. (**OAuth Scope:** mobile.storage)
- `removeAll(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 }>` — Removes all values from the native storage. (**OAuth Scope:** mobile.storage)
- `setBoolean(key: string, value: boolean): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 }>` — Stores a boolean value in the native storage. (**OAuth Scope:** mobile.storage)
- `setDouble(key: string, value: number): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 }>` — Stores a double (floating point) value in the native storage. (**OAuth Scope:** mobile.storage)
- `setInt(key: string, value: number): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 }>` — Stores an integer value in the native storage. (**OAuth Scope:** mobile.storage)
- `setString(key: string, value: string): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 }>` — Stores a string value in the native storage. (**OAuth Scope:** mobile.storage)

#### `SystemWebViewKitModule`
JSBridge module for opening URLs in the device's system browser.
- `redirectToSystemWebView(request: { url: string }): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: string; status_code: 200 } | { error: string; status_code: 424 }>` — Opens a URL in the device's system web browser or web view.

#### `UserAttributesModule`
JSBridge module for reading user-related attributes from native code.
- `getSelectedTravelDestination(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: string; status_code: 200 }>` — Returns the currently selected travel destination as a lowercase ISO 3166-1 alpha-2 country code.

### Functions

#### `hasResult`
Type guard to check if a JSBridge response has a defined result (not null or undefined).
```ts
hasResult<T>(response: T): response is Extract<T, { result: {} }>
```

#### `isClientError`
Type guard to check if a JSBridge response is a client error (4xx status codes).
```ts
isClientError<T>(response: T): response is Extract<T, { status_code: 400 | 401 | 403 | 404 | 424 | 426 }>
```

#### `isError`
Type guard to check if a JSBridge response is an error (4xx or 5xx status codes).
```ts
isError<T>(response: T): response is Extract<T, { error: string }>
```

#### `isFound`
Type guard to check if a JSBridge response is a 302 Found redirect.
```ts
isFound<T>(response: T): response is Extract<T, { status_code: 302 }>
```

#### `isNoContent`
Type guard to check if a JSBridge response is a 204 No Content (operation succeeded with no result).
```ts
isNoContent<T>(response: T): response is Extract<T, { status_code: 204 }>
```

#### `isOk`
Type guard to check if a JSBridge response is a 200 OK (operation succeeded with a result).
```ts
isOk<T>(response: T): response is Extract<T, { status_code: 200 }>
```

#### `isRedirection`
Type guard to check if a JSBridge response is a redirect (status code 302).
```ts
isRedirection<T>(response: T): response is Extract<T, { status_code: 302 }>
```

#### `isServerError`
Type guard to check if a JSBridge response is a server error (5xx status codes).
```ts
isServerError<T>(response: T): response is Extract<T, { status_code: 500 | 501 }>
```

#### `isSuccess`
Type guard to check if a JSBridge response is successful (2xx status codes).
```ts
isSuccess<T>(response: T): response is Extract<T, { status_code: 200 | 204 }>
```