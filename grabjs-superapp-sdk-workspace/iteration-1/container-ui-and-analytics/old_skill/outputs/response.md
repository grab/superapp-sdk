## Hiding the back/refresh buttons, setting the title bar color, and firing a checkout analytics event

All three of these are handled by `ContainerModule` from `@grabjs/superapp-sdk`, which controls the native WebView container via `JSBridge`.

### 1. Hide the native back and refresh buttons

Use `hideBackButton()` and `hideRefreshButton()`. These are useful on a page like checkout where you want a focused, non-refreshable view and you're managing your own in-app navigation. You can restore them later with `showBackButton()` / `showRefreshButton()` if the user navigates to a page where they should reappear.

### 2. Set a custom title bar color

`ContainerModule` doesn't have a dedicated "title bar color" method by that name — the equivalent is `setBackgroundColor(request: string)`, which "sets the background color of the container header" (i.e. the native title bar). Pass a hex color string. You'll typically pair this with `setTitle()` if you also want to change the header text for the checkout page.

### 3. Fire an analytics event on page load

Use `sendAnalyticsEvent()` with `ContainerAnalyticsEventState`. Since this is a checkout page, use the `CHECKOUT_PAGE` journey stage with the `DEFAULT` name to signal a standard "user landed on this page" system event (the SDK also supports `INITIATE`/`TRANSACT` names for primary actions, and a `CUSTOM` state for arbitrary interactions with extra metadata — but a page-load event should use `DEFAULT`).

Per the SDK's best practices: always send these system/page-load events automatically when the user navigates to the corresponding page, and never include PII in the event `data`.

### Putting it together

```typescript
import { ContainerModule, ContainerAnalyticsEventState, isError } from '@grabjs/superapp-sdk';

const container = new ContainerModule();

async function onCheckoutPageLoad() {
  // 1. Hide native back and refresh buttons (checkout is a focused, self-managed view)
  await container.hideBackButton();
  await container.hideRefreshButton();

  // 2. Set a custom title bar color (and optionally the title text)
  await container.setTitle('Checkout');
  const bgResult = await container.setBackgroundColor('#0A0A0A'); // any hex color
  if (isError(bgResult)) {
    console.error('Failed to set title bar color:', bgResult.error);
  }

  // 3. Fire an analytics event for the checkout page load
  await container.sendAnalyticsEvent({
    state: ContainerAnalyticsEventState.CHECKOUT_PAGE,
    name: 'DEFAULT',
  });
}

onCheckoutPageLoad();
```

### Notes

- All `ContainerModule` calls only work inside the Grab SuperApp WebView. If you call them outside that environment they resolve with `status_code: 501`, so you may want to gate this behind `container.isConnected()` first (as recommended in the SDK's Initialization guide) rather than checking every single call.
- SDK methods never throw — use the `isError`/`isSuccess` type guards to check outcomes instead of try/catch.
- If you navigate away from checkout to a page where the user should be able to go back or refresh, remember to call `showBackButton()` / `showRefreshButton()` to restore the defaults — the SDK does not do this automatically.
- If you want the title bar changes and the analytics event to reflect "the page has finished loading" rather than just "navigation started," consider firing them after your own checkout page's content/data has rendered, and pair with `container.hideLoader()` if you previously showed the native full-screen loader during a transition into this page.
