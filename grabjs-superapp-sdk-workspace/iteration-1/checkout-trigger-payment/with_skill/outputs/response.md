# Triggering a Payment from "Pay Now" (`CheckoutModule`)

Payments in a MiniApp go through the SDK's `CheckoutModule`, which talks to the native Grab payment UI via `JSBridge`. The flow is **two steps**: your **backend** initializes the transaction with your partner credentials, then your **frontend** (the "Pay Now" tap handler) hands that response to `CheckoutModule.triggerCheckout()` to open the native payment sheet.

## Step-by-step

1. **Check/request the `mobile.checkout` permission** before calling checkout, since `triggerCheckout` requires the `mobile.checkout` OAuth scope. `mobile.checkout` is a _mobile scope_, so authorization grants access immediately in-app — no backend token exchange needed.
2. **Ask your backend to initialize the transaction** (order, amount, partner tx ID, etc.) using your partner credentials. Never do this initialization on the client.
3. **Call `checkout.triggerCheckout()`** on the "Pay Now" click handler, passing through the payload your backend returned. This opens the native payment interface.
4. **Inspect the response** to determine success/failure (details below).

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

async function onPayNowClick() {
  // 1. Proactively check for checkout permission
  const hasAccess = await scope.hasAccessTo('CheckoutModule', 'triggerCheckout');

  if (!isSuccess(hasAccess) || !hasAccess.result) {
    // Request authorization for mobile.checkout (mobile scope — no backend exchange needed)
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
      // User declined or authorization failed — bail out of the payment flow
      return;
    }
  }

  // 2. Ask your backend to initialize the transaction with your partner credentials
  const response = await fetch('https://your-backend.example.com/init-transaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId: 'order-123' }),
  });
  const { partnerTxID, request, sessionID } = await response.json();

  // 3. Trigger the native checkout/payment UI with your backend's response
  const checkoutResult = await checkout.triggerCheckout({
    partnerTxID,
    request,
    sessionID,
  });

  // 4. Handle the outcome
  handlePaymentOutcome(checkoutResult);
}
```

## How to tell if the payment succeeded or failed

There are **two layers** to check, and it's important not to conflate them:

1. **`status_code`** — tells you whether the _SDK call itself_ completed (i.e. the request reached the native layer and got a response), not whether the _payment_ succeeded.
   - Use the SDK's type guards (`isSuccess`, `isError`) instead of try/catch — SDK methods never throw.
   - `200` (`isSuccess`/`isOk`): the native checkout UI ran and returned a result — inspect `result.status` next.
   - `400`: invalid request parameters (e.g. malformed payload from your backend).
   - `500`: unexpected SDK error.
   - `501`: called outside the Grab SuperApp WebView (not in the native app context).

2. **`result.status`** — the actual payment/transaction outcome, only present when `status_code` is `200`. `TriggerCheckoutResult` is a discriminated union with four possible shapes:
   - `{ status: 'Success', transactionID }` — payment completed.
   - `{ status: 'Failure', transactionID, errorMessage, errorCode }` — payment attempted but failed; use `errorCode`/`errorMessage` to show the user why or to log/report it.
   - `{ status: 'Pending', transactionID }' — payment is still processing (e.g. async payment methods); you'll typically need to poll your backend or wait for a webhook/callback to confirm the final state.
   - `{ status: 'Cancel' }` — the user backed out of the native payment sheet before completing it (no `transactionID`).

```typescript
import { isSuccess, isError } from '@grabjs/superapp-sdk';

function handlePaymentOutcome(checkoutResult: TriggerCheckoutResponse) {
  if (isSuccess(checkoutResult)) {
    // status_code === 200 → native flow completed, check the actual payment status
    switch (checkoutResult.result.status) {
      case 'Success':
        console.log('Payment succeeded:', checkoutResult.result.transactionID);
        // e.g. show a success screen, unlock the purchased content
        break;
      case 'Failure':
        console.error(
          `Payment failed [${checkoutResult.result.errorCode}]: ${checkoutResult.result.errorMessage}`
        );
        // e.g. show a retry button with the error message
        break;
      case 'Pending':
        console.log('Payment pending:', checkoutResult.result.transactionID);
        // e.g. poll your backend / show a "processing" state
        break;
      case 'Cancel':
        console.log('User cancelled the payment');
        // e.g. return to the cart / order review screen
        break;
    }
  } else if (isError(checkoutResult)) {
    // status_code is 400 / 500 / 501 — the checkout call itself failed
    console.error('Checkout error:', checkoutResult.error);
  }
}
```

**Key takeaway:** don't treat `isSuccess(checkoutResult)` alone as "payment succeeded" — it only means the SDK/native call returned normally. The real payment outcome (`Success` / `Failure` / `Pending` / `Cancel`) lives inside `checkoutResult.result.status` and must be switched on separately.

## Reference

- SDK reference used: `skills/references/checkout.md` (Checkout section + `CheckoutModule` API reference).
- Further reading: [GrabPay API docs](https://developer.grab.com/docs/partner-apps/pages/developer-resources/payment/) and [`CheckoutModule` class docs](https://grab.github.io/superapp-sdk/classes/CheckoutModule.html).
