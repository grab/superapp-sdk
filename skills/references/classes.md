# Classes

## `CameraModule`
JSBridge module for accessing the device camera.
- `scanQRCode(request: { title?: string }): Promise<{ result: { qrCode: string }; status_code: 200 } | { status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Opens the native camera to scan a QR code.

## `CheckoutModule`
JSBridge module for triggering native payment flows.
- `triggerCheckout(request: Record<string, unknown>): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: { errorCode?: string; errorMessage?: string; status: "success" | "failure" | "pending" | "userInitiatedCancel"; transactionID: string }; status_code: 200 }>` — Triggers the native checkout flow for payment processing.

## `ContainerModule`
JSBridge module for controlling the WebView container.
- `close(): Promise<{ error: string; status_code: 500 } | { error: string; status_code: 501 } | { status_code: 200 }>` — Close the container and return to the previous screen.
- `getSessionParams(): Promise<{ error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: { result: string }; status_code: 200 }>` — Get the session parameters from the container.
- `hideBackButton(): Promise<{ error: string; status_code: 500 } | { error: string; status_code: 501 } | { status_code: 200 }>` — Hide the back button on the container header.
- `hideLoader(): Promise<{ error: string; status_code: 500 } | { error: string; status_code: 501 } | { status_code: 200 }>` — Hide the full-screen loading indicator.
- `hideRefreshButton(): Promise<{ error: string; status_code: 500 } | { error: string; status_code: 501 } | { status_code: 200 }>` — Hide the refresh button on the container header.
- `isConnected(): Promise<{ result: { connected: boolean }; status_code: 200 } | { error: string; status_code: 404 }>` — Check if the web app is connected to the Grab SuperApp via JSBridge.
- `onContentLoaded(): Promise<{ error: string; status_code: 500 } | { error: string; status_code: 501 } | { status_code: 200 }>` — Notify the Grab SuperApp that the page content has loaded.
- `onCtaTap(request: string): Promise<{ error: string; status_code: 500 } | { error: string; status_code: 501 } | { status_code: 200 }>` — Notify the client that the user has tapped a call-to-action (CTA).
- `openExternalLink(request: string): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { status_code: 200 }>` — Open a link in the external browser.
- `sendAnalyticsEvent(request: { data?: Record<string, unknown>; name: string; state: string }): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { status_code: 200 }>` — Use this method to track user interactions and page transitions.
- `setBackgroundColor(request: string): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Set the background color of the container header.
- `setTitle(request: string): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { status_code: 200 }>` — Set the title of the container header.
- `showBackButton(): Promise<{ error: string; status_code: 500 } | { error: string; status_code: 501 } | { status_code: 200 }>` — Show the back button on the container header.
- `showLoader(): Promise<{ error: string; status_code: 500 } | { error: string; status_code: 501 } | { status_code: 200 }>` — Show the full-screen loading indicator.
- `showRefreshButton(): Promise<{ error: string; status_code: 500 } | { error: string; status_code: 501 } | { status_code: 200 }>` — Show the refresh button on the container header.

## `DeviceCapabilityModule`
JSBridge module for querying native device capability information.
- `isEsimSupported(): Promise<{ error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: boolean; status_code: 200 }>` — Checks whether the current device supports eSIM.

## `FileModule`
JSBridge module for downloading files to the user's device.
- `downloadFile(request: { fileName: string; fileUrl: string }): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Downloads a file via the native bridge.

## `IdentityModule`
JSBridge module for authenticating users via GrabID.
- `authorize(request: { clientId: string; environment: "staging" | "production"; redirectUri: string; responseMode?: "redirect" | "in_place"; scope: string }): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: { code: string; state: string }; status_code: 200 } | { status_code: 302 } | { error: string; status_code: 401 }>` — Initiates an OAuth2 authorization flow with PKCE (Proof Key for Code Exchange).
This method handles both native in-app consent and web-based fallback flows.
- `clearAuthorizationArtifacts(): Promise<{ status_code: 204 }>` — Clears all stored PKCE authorization artifacts from local storage.
This should be called after a successful token exchange or when you need to
reset the authorization state (e.g., on error or logout).
- `getAuthorizationArtifacts(): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { result: { codeVerifier: string; nonce: string; redirectUri: string; state: string }; status_code: 200 }>` — Retrieves stored PKCE authorization artifacts from local storage.
These artifacts are used to complete the OAuth2 authorization code exchange.

## `LocaleModule`
JSBridge module for accessing device locale settings.
- `getLanguageLocaleIdentifier(): Promise<{ error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: string; status_code: 200 }>` — Retrieves the current language locale identifier from the device.

## `LocationModule`
JSBridge module for accessing device location services.
- `getCoordinate(): Promise<{ error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: { lat: number; lng: number }; status_code: 200 } | { error: string; status_code: 424 }>` — Get the current geographic coordinates of the device.
- `getCountryCode(): Promise<{ error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 } | { result: { countryCode: string }; status_code: 200 }>` — Get the country code based on the device's current location.
- `observeLocationChange(): ObserveLocationChangeResponse` — Subscribe to location change updates from the device.

## `MediaModule`
JSBridge module for playing DRM-protected media content.
- `observePlayDRMContent(data: DRMContentConfig): ObserveDRMPlaybackResponse` — Observes DRM-protected media content playback events.
- `playDRMContent(data: DRMContentConfig): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { status_code: 200 }>` — Plays DRM-protected media content in the native media player.

## `PlatformModule`
JSBridge module for controlling platform navigation.
- `back(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Triggers the native platform back navigation.
This navigates back in the native navigation stack.

## `ProfileModule`
JSBridge module for accessing user profile information.
- `fetchEmail(): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: { email: string }; status_code: 200 } | { error: string; status_code: 426 }>` — Fetches the user's email address from their Grab profile.
- `verifyEmail(request: { email: string; otp: string }): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { status_code: 200 } | { error: string; status_code: 426 }>` — Verifies the user's email address using a one-time password (OTP).

## `ScopeModule`
JSBridge module for checking and refreshing API access permissions.
- `hasAccessTo(module: string, method: string): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 } | { result: { hasAccess: boolean }; status_code: 200 }>` — Checks if the current client has access to a specific JSBridge API method.
- `reloadScopes(): Promise<{ error: string; status_code: 500 } | { error: string; status_code: 501 } | { status_code: 200 } | { error: string; status_code: 424 }>` — Requests to reload the consented OAuth scopes for the current client.
This refreshes the permissions from the server.

## `SplashScreenModule`
JSBridge module for controlling the native splash / Lottie loading screen.
- `dismiss(): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Dismisses the native splash (Lottie) loading view if it is presented.

## `StorageModule`
JSBridge module for persisting key-value data to native storage.
- `getBoolean(key: string): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: { value: boolean | null }; status_code: 200 }>` — Retrieves a boolean value from the native storage.
- `getDouble(key: string): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: { value: number | null }; status_code: 200 }>` — Retrieves a double (floating point) value from the native storage.
- `getInt(key: string): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: { value: number | null }; status_code: 200 }>` — Retrieves an integer value from the native storage.
- `getString(key: string): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: { value: string | null }; status_code: 200 }>` — Retrieves a string value from the native storage.
- `remove(key: string): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Removes a single value from the native storage by key.
- `removeAll(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Removes all values from the native storage.
- `setBoolean(key: string, value: boolean): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Stores a boolean value in the native storage.
- `setDouble(key: string, value: number): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Stores a double (floating point) value in the native storage.
- `setInt(key: string, value: number): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Stores an integer value in the native storage.
- `setString(key: string, value: string): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Stores a string value in the native storage.

## `SystemWebViewKitModule`
JSBridge module for opening URLs in the device's system browser.
- `redirectToSystemWebView(request: { url: string }): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { status_code: 200 } | { error: string; status_code: 424 }>` — Opens a URL in the device's system web browser or web view.

## `UserAttributesModule`
JSBridge module for reading user-related attributes from native code.
- `getSelectedTravelDestination(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: string; status_code: 200 }>` — Returns the currently selected travel destination as a lowercase ISO 3166-1 alpha-2 country code.