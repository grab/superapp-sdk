# Checkout

The two-step payment/checkout flow and the `CheckoutModule` API reference.

## Checkout

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

#### `CheckoutModule`
SDK module for triggering native payment flows via `JSBridge`.
- `triggerCheckout(request: TriggerCheckoutRequest): Promise<TriggerCheckoutResponse>` — Triggers the native checkout flow for payment processing. (**OAuth Scope:** mobile.checkout)
