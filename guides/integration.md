---
title: Integration Guide
---

# Integration Guide

This guide covers the recommended setup for a MiniApp entry point — loading scopes, configuring the container UI, signalling readiness, and handling permissions.

> **Note:** The [`demo`](https://github.com/grab/superapp-sdk/tree/master/demo) folder contains two complete MiniApp samples demonstrating these integration patterns in action — one using CDN (vanilla HTML/JS) and one using React. Both implement the same user flow: OAuth authorization, user profile display, deferred location permissions, and checkout payment.

## Initialization

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

## Authentication

Trigger `IdentityModule.authorize()` to start the authorization process and request user permissions.

When authorization completes with `status_code: 200` (native `in_place` flow), `response.result` already includes `code`, `state`, and the PKCE values (`codeVerifier`, `nonce`, `redirectUri`), so you do not need `getAuthorizationArtifacts()`.

If the flow uses the web redirect instead (`status_code: 302`), the page navigates away; after the redirect lands on your callback URL, read the `code` from the query string and retrieve the stored PKCE artifacts with `IdentityModule.getAuthorizationArtifacts()`.

In either case, send those values to your backend so it can exchange the authorization code for tokens, validate the `id_token`, fetch user info, and establish the user's session.

After the session is established, call `IdentityModule.clearAuthorizationArtifacts()` and `ScopeModule.reloadScopes()` so your MiniApp can begin using the newly granted permissions.

Use `isRedirection` for `302`: that branch is separate from `isSuccess`, which only matches `200` and `204` for `authorize()`.

```typescript
import {
  IdentityModule,
  ScopeModule,
  isSuccess,
  isError,
  isRedirection,
} from '@grabjs/superapp-sdk';

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
      const { code, state, codeVerifier, nonce, redirectUri } = response.result;

      // 1. Send the values to your backend for token exchange (see Backend Token Exchange section below)
      // await myBackend.exchangeTokens({ code, codeVerifier, nonce, redirectUri, state });

      // 2. Clear artifacts and reload scopes
      await identity.clearAuthorizationArtifacts();
      await scope.reloadScopes();
    } else if (response.status_code === 204) {
      // User cancelled the authorization flow
      await identity.clearAuthorizationArtifacts();
    }
  } else if (isRedirection(response)) {
    // `302`: web consent — the SDK redirected the browser to GrabID. After the user returns to
    // `redirectUri` with `?code=...&state=...`, read the code from the URL and call
    // `getAuthorizationArtifacts()` for PKCE values, then exchange tokens (see paragraphs above).
    return;
  } else if (isError(response)) {
    console.error('Authorization failed:', response.error);
    await identity.clearAuthorizationArtifacts();
  }
}
```

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

| State                | Description                                      |
| :------------------- | :----------------------------------------------- |
| `HOMEPAGE`           | Entry point or main landing page.                |
| `CHECKOUT_PAGE`      | Transaction confirmation or payment selection.   |
| `BOOKING_COMPLETION` | Post-transaction or success page.                |
| `CUSTOM`             | Any other interaction outside the standard flow. |

### Best Practices

- Track system events automatically when users navigate to the corresponding pages.
- Always include required data fields for transaction events to enable accurate revenue tracking.
- Use descriptive names for custom events that clearly indicate the user action being tracked.
- Never include Personally Identifiable Information (PII) in event data.

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
