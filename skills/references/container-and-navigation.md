# Container UI & Navigation

Covers the native container's appearance, back/refresh buttons, closing the MiniApp, opening external links, analytics event tracking, and the `ContainerModule`/`PlatformModule`/`SplashScreenModule`/`SystemWebViewKitModule` API reference.

## Container UI & Navigation

Control the native container's appearance and behavior to match your MiniApp's branding and navigation flow.

### Title and Background

Set the title and background color for the native container.

```typescript
await container.setTitle('My MiniApp');
await container.setBackgroundColor('#FFFFFF');
```

### Back and Refresh Buttons

Hide these buttons when your MiniApp manages its own navigation or requires a focused, non-refreshable view. Restore them when appropriate.

```typescript
// Hide buttons
await container.hideBackButton();
await container.hideRefreshButton();

// Restore buttons
await container.showBackButton();
await container.showRefreshButton();
```

### Closing the MiniApp

Programmatically close the MiniApp and return the user to the Grab SuperApp.

```typescript
await container.close();
```

## Opening External Links

Use `ContainerModule.openExternalLink()` to open URLs in the system browser instead of navigating away from the MiniApp WebView.

```typescript
const response = await container.openExternalLink('https://example.com');

if (isError(response)) {
  console.error('Failed to open link:', response.error);
}
```

## Analytics Event Tracking

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

### Journey Stages

| State              | Description                                      |
| :----------------- | :----------------------------------------------- |
| `HOMEPAGE`         | Entry point or main landing page.                |
| `CHECKOUT_PAGE`    | Transaction confirmation or payment selection.   |
| `COMPLETION_POINT` | Post-transaction or success page.                |
| `CUSTOM`           | Any other interaction outside the standard flow. |

### Best Practices

- Track system events automatically when users navigate to the corresponding pages.
- Always include required data fields for transaction events to enable accurate revenue tracking.
- Use descriptive names for custom events that clearly indicate the user action being tracked.
- Never include Personally Identifiable Information (PII) in event data.

## API Reference

#### `ContainerModule`
SDK module for controlling the WebView container via `JSBridge`.
- `close(): Promise<CloseResponse>` — Close the container and return to the previous screen.
- `getSessionParams(): Promise<GetSessionParamsResponse>` — Get the session parameters from the container.
- `hideBackButton(): Promise<HideBackButtonResponse>` — Hide the back button on the container header.
- `hideLoader(): Promise<HideLoaderResponse>` — Hide the full-screen loading indicator.
- `hideRefreshButton(): Promise<HideRefreshButtonResponse>` — Hide the refresh button on the container header.
- `isConnected(): Promise<IsConnectedResponse>` — Check if the web app is connected to the Grab SuperApp via `JSBridge`.
- `onContentLoaded(): Promise<OnContentLoadedResponse>` — Notify the Grab SuperApp that the page content has loaded.
- `onCtaTap(request: string): Promise<OnCtaTapResponse>` — Notify the client that the user has tapped a call-to-action (CTA).
- `openExternalLink(request: string): Promise<OpenExternalLinkResponse>` — Open a link in the external browser.
- `sendAnalyticsEvent(request: SendAnalyticsEventRequest): Promise<SendAnalyticsEventResponse>` — Use this method to track user interactions and page transitions.
- `setBackgroundColor(request: string): Promise<SetBackgroundColorResponse>` — Set the background color of the container header.
- `setTitle(request: string): Promise<SetTitleResponse>` — Set the title of the container header.
- `showBackButton(): Promise<ShowBackButtonResponse>` — Show the back button on the container header.
- `showLoader(): Promise<ShowLoaderResponse>` — Show the full-screen loading indicator.
- `showRefreshButton(): Promise<ShowRefreshButtonResponse>` — Show the refresh button on the container header.

#### `PlatformModule`
SDK module for controlling platform navigation via `JSBridge`.
- `back(): Promise<BackResponse>` — Triggers the native platform back navigation.
This navigates back in the native navigation stack.

#### `SplashScreenModule`
SDK module for controlling the native splash / Lottie loading screen via `JSBridge`.
- `dismiss(): Promise<DismissSplashScreenResponse>` — Dismisses the native splash (Lottie) loading view if it is presented.

#### `SystemWebViewKitModule`
SDK module for opening URLs in the device's system browser via `JSBridge`.
- `redirectToSystemWebView(request: RedirectToSystemWebViewRequest): Promise<RedirectToSystemWebViewResponse>` — Opens a URL in the device's system web browser or web view.
