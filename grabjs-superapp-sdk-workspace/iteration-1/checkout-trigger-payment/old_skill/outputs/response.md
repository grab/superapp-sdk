# Triggering a payment on "Pay Now" with `@grabjs/superapp-sdk`

Payments in a Grab MiniApp go through `CheckoutModule`, which calls the native checkout UI via `JSBridge`. The flow is a **two-step process**:

1. **Backend step** — your server initializes the transaction with your partner credentials (this happens _before_ you touch the SDK) and returns a payload (`partnerTxID`, `request`, `sessionID`).
2. **Frontend step** — your "Pay Now" button handler passes that payload to `CheckoutModule.triggerCheckout()`, which opens Grab's native payment interface.

`triggerCheckout` requires the `mobile.checkout` OAuth scope, so you also need to make sure the user has granted that permission before (or in response to) the call.

## Step-by-step

### 1. Check (or request) the `mobile.checkout` permission

Use `ScopeModule.hasAccessTo()` to proactively check permission before calling a gated method — users can revoke permissions at any time from the Grab app settings, so don't assume a previous grant still holds.

If the check fails, call `IdentityModule.authorize()` with `scope: 'mobile.checkout'`. This is a **mobile scope**, so it grants in-app permission immediately — no backend token exchange is needed for it. After a successful authorize, call `ScopeModule.reloadScopes()` so the SDK's internal permission state picks up the new grant.

### 2. Ask your backend to initialize the transaction

Call your own backend endpoint (with the order details) and get back the `partnerTxID`, `request`, and `sessionID` values that Grab's checkout expects.

### 3. Call `CheckoutModule.triggerCheckout()`

Pass the backend payload straight through. This opens the native payment sheet/flow.

### 4. Tell success from failure

`triggerCheckout` returns a `TriggerCheckoutResponse` following the SDK's standard response pattern — it never throws, so don't wrap it in try/catch. Instead, use the type guards:

- `isSuccess(response)` → `status_code` is `200` or `204` — payment flow completed successfully; `response.result` (when present) has the details.
- `isError(response)` → `status_code` is one of `400/401/403/404/424/426/500/501` — payment failed or couldn't be started; `response.error` is guaranteed to be a string describing what went wrong.

Pay special attention to two error codes that are common for payments:

- `403 Forbidden` — the `mobile.checkout` scope is missing/revoked. Re-run the authorize → reloadScopes → retry sequence.
- `426 Upgrade Required` — the user's Grab app version is too old to support this API; prompt them to update.
- `424 Failed Dependency` — the underlying native payment request itself failed (e.g. declined, cancelled, provider error) — treat this as "payment failed," and surface `response.error` to the user or your logs.
- `501 Not Implemented` — you're not actually running inside the Grab SuperApp WebView (e.g. testing in a normal browser).

## Example: wiring up the "Pay Now" button

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

async function onPayNowTapped(orderId: string) {
  // 1. Proactively check for checkout permission
  const hasAccess = await scope.hasAccessTo('CheckoutModule', 'triggerCheckout');

  if (!isSuccess(hasAccess) || !hasAccess.result) {
    // Request authorization for mobile.checkout.
    // It's a mobile scope, so no backend token exchange is needed for it.
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
      showPaymentError('Payment permission was not granted.');
      return;
    }
  }

  // 2. Ask your backend to initialize the transaction
  const backendResponse = await fetch('https://your-backend.example.com/init-transaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId }),
  });
  const { partnerTxID, request, sessionID } = await backendResponse.json();

  // 3. Trigger the native checkout flow
  const checkoutResult = await checkout.triggerCheckout({
    partnerTxID,
    request,
    sessionID,
  });

  // 4. Handle success or failure
  if (isSuccess(checkoutResult)) {
    console.log('Payment succeeded:', checkoutResult.result);
    showPaymentSuccess();
  } else if (isError(checkoutResult)) {
    switch (checkoutResult.status_code) {
      case 403:
        showPaymentError('Checkout permission was revoked. Please try again.');
        break;
      case 426:
        showPaymentError('Please update your Grab app to make this payment.');
        break;
      case 424:
        showPaymentError(`Payment failed: ${checkoutResult.error}`);
        break;
      case 501:
        showPaymentError('Payments are only available inside the Grab app.');
        break;
      default:
        showPaymentError(`Payment error (${checkoutResult.status_code}): ${checkoutResult.error}`);
    }
  }
}

function showPaymentSuccess() {
  // Update UI to reflect a completed payment, e.g. navigate to a confirmation page.
}

function showPaymentError(message: string) {
  // Surface the error to the user, e.g. a toast or inline banner.
  console.error(message);
}
```

Bind `onPayNowTapped` to your button's click handler, e.g.:

```typescript
document
  .getElementById('pay-now-button')
  ?.addEventListener('click', () => onPayNowTapped('order-123'));
```

## Notes

- Make sure `ScopeModule.reloadScopes()` has been called at least once during app initialization (as part of your standard startup flow) before you rely on `hasAccessTo` checks — otherwise the SDK's permission cache may be stale.
- Consider tracking the payment attempt with `ContainerModule.sendAnalyticsEvent()` using `ContainerAnalyticsEventState.CHECKOUT_PAGE` (on tap) and `COMPLETION_POINT` (on success) for conversion tracking.
- For the full request/response shape of `triggerCheckout` and backend transaction initialization, see the [GrabPay API docs](https://developer.grab.com/docs/partner-apps/pages/developer-resources/payment/) and the [`CheckoutModule` reference](https://grab.github.io/superapp-sdk/classes/CheckoutModule.html).
