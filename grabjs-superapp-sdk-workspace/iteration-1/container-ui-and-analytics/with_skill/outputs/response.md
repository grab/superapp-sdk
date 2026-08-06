# Hiding the back/refresh buttons, styling the title bar, and firing a checkout-load analytics event

All three of these are handled by the `ContainerModule` from `@grabjs/superapp-sdk`. Run this setup once when your checkout page mounts.

## 1. Hide the native back and refresh buttons

```typescript
await container.hideBackButton();
await container.hideRefreshButton();
```

Use this when your checkout page manages its own in-app navigation or should be a focused, non-refreshable view. If you navigate away from checkout to a page that should allow normal navigation again, restore them with the counterpart methods:

```typescript
await container.showBackButton();
await container.showRefreshButton();
```

## 2. Set a custom title bar color

`ContainerModule` exposes `setTitle` and `setBackgroundColor` for the container header. `setBackgroundColor` is what controls the title bar's color:

```typescript
await container.setTitle('Checkout');
await container.setBackgroundColor('#0A0A0A'); // any hex color
```

## 3. Fire an analytics event when the checkout page loads

Use `sendAnalyticsEvent` with `ContainerAnalyticsEventState.CHECKOUT_PAGE` — this is the journey stage reserved for the transaction confirmation / payment selection page. Sending a `DEFAULT` named event on page load is the standard "system event" pattern for tracking page landings.

```typescript
await container.sendAnalyticsEvent({
  state: ContainerAnalyticsEventState.CHECKOUT_PAGE,
  name: 'DEFAULT',
});
```

## Putting it together

```typescript
import { ContainerModule, ContainerAnalyticsEventState, isError } from '@grabjs/superapp-sdk';

const container = new ContainerModule();

async function onCheckoutPageLoad() {
  // Confirm we're actually running inside the Grab SuperApp WebView
  const connection = await container.isConnected();
  if (isError(connection) || !connection.result?.connected) {
    return;
  }

  // Container UI: title bar color + hide back/refresh buttons
  await container.setTitle('Checkout');
  await container.setBackgroundColor('#0A0A0A');
  await container.hideBackButton();
  await container.hideRefreshButton();

  // Analytics: track that the user landed on the checkout page
  await container.sendAnalyticsEvent({
    state: ContainerAnalyticsEventState.CHECKOUT_PAGE,
    name: 'DEFAULT',
  });
}

onCheckoutPageLoad();
```

### Notes

- All `ContainerModule` methods return a response object with a `status_code` instead of throwing — check with `isError()`/`isSuccess()` if you need to react to failures (e.g. `501` means the code is running outside the Grab SuperApp WebView).
- If you later need to hand navigation back to the platform (e.g. an in-app "Back" button that should trigger native back behavior instead of browser history), use `PlatformModule.back()`.
- For custom, non-page-load interactions (e.g. a "Place Order" button tap), use `ContainerAnalyticsEventState.CUSTOM` with a descriptive `name` and optional `data` payload — just avoid including any PII in that data.
