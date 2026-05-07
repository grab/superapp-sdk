---
title: Integration Guide
---

# Integration Guide

This guide covers the recommended setup for a MiniApp entry point — loading scopes, configuring the container UI, signalling readiness, and handling permissions.

## Demo App

The [demo](https://github.com/grab/superapp-sdk/tree/master/demo) folder contains complete MiniApps demonstrating these integration patterns in action. It showcases container UI configuration, incremental authorization, and core module usage.

See the [README](https://github.com/grab/superapp-sdk/tree/master/demo/README.md) for full flow diagrams and setup instructions.

## Entry Point Setup

Run these steps once when your MiniApp initialises, before rendering any content.

```typescript
import { ContainerModule, ScopeModule } from '@grabjs/superapp-sdk';

const container = new ContainerModule();
const scope = new ScopeModule();

async function init() {
  // 1. Load permission scopes — always do this first
  await scope.reloadScopes();

  // 2. Configure the container UI
  await container.setTitle('My MiniApp');
  await container.setBackgroundColor('#FFFFFF');
  await container.hideBackButton();

  // 3. Dismiss the native loader
  await container.hideLoader();
}

init();
```

### Why `reloadScopes()` first?

Scopes are not loaded automatically. Any module call that requires a permission will return `403` until scopes are loaded. Always call `reloadScopes()` before making any other module calls.

## Handling Permissions

When a module call returns `403`, your app needs to request the required permission via `IdentityModule.authorize()`, then reload scopes before retrying.

```typescript
import { IdentityModule, ScopeModule, isSuccess, isError } from '@grabjs/superapp-sdk';

const identity = new IdentityModule();
const scope = new ScopeModule();

async function requestPermission() {
  const response = await identity.authorize({
    clientId: 'your-client-id',
    redirectUri: 'https://your-miniapp.example.com/callback',
    scope: 'required_scope',
    environment: 'production',
  });

  if (isSuccess(response)) {
    // Reload scopes after authorization so the new permission is available
    await scope.reloadScopes();
  } else if (isError(response)) {
    console.error('Authorization failed:', response.error);
  }
}
```

## Navigation

### Controlling the back button

Hide the back button when your app manages its own navigation stack, and restore it when the user can safely go back:

```typescript
await container.hideBackButton();

// ... when the user can go back
await container.showBackButton();
```

### Closing the MiniApp

```typescript
await container.close();
```

### Opening external links

Use `openExternalLink` to open URLs in the system browser instead of navigating away from the WebView:

```typescript
const response = await container.openExternalLink('https://example.com');

if (isError(response)) {
  console.error('Failed to open link:', response.error);
}
```

## Analytics Event Tracking

Implement analytics events across your user journey to enable performance tracking and reporting. Events are sent via `ContainerModule.sendAnalyticsEvent()` and categorised by journey stage using `ContainerAnalyticsEventState`.

### Required Events

#### Entry Point

##### Initiate action

Send the initiate event when users click call-to-action buttons to proceed:

```typescript
import {
  ContainerModule,
  ContainerAnalyticsEventState,
  isSuccess,
  isError,
} from '@grabjs/superapp-sdk';

// Event names are plain strings — define your own constants
const EventName = {
  INITIATE: 'INITIATE',
  TRANSACT: 'TRANSACT',
};

const containerModule = new ContainerModule();

// Send when the user clicks a call-to-action button
const response = await containerModule.sendAnalyticsEvent({
  state: ContainerAnalyticsEventState.HOMEPAGE,
  name: EventName.INITIATE,
});

if (isSuccess(response)) {
  // Event sent successfully
} else if (isError(response)) {
  console.error(`Failed to send event: ${response.error}`);
}
```

##### Custom interactions

Send custom events for additional interactions like banner clicks, category selections, or search queries. Include the `page` parameter and a descriptive event name:

```typescript
import {
  ContainerModule,
  ContainerAnalyticsEventState,
  isSuccess,
  isError,
} from '@grabjs/superapp-sdk';

const containerModule = new ContainerModule();

// Send for custom interactions such as banner clicks or category selections
const response = await containerModule.sendAnalyticsEvent({
  state: ContainerAnalyticsEventState.CUSTOM,
  name: 'BANNER_CLICK',
  data: {
    page: 'homepage',
    banner_id: 'promo-summer-2024',
    banner_position: 'top',
  },
});

if (isSuccess(response)) {
  // Event sent successfully
} else if (isError(response)) {
  console.error(`Failed to send event: ${response.error}`);
}
```

#### Conversion Point

##### Transaction confirmation

Send the transaction confirmation event when users click the final confirmation button:

```typescript
import {
  ContainerModule,
  ContainerAnalyticsEventState,
  isSuccess,
  isError,
} from '@grabjs/superapp-sdk';

// Event names are plain strings — define your own constants
const EventName = {
  INITIATE: 'INITIATE',
  TRANSACT: 'TRANSACT',
};

const containerModule = new ContainerModule();

// Send when the user clicks the final confirmation button
const response = await containerModule.sendAnalyticsEvent({
  state: ContainerAnalyticsEventState.CHECKOUT_PAGE,
  name: EventName.TRANSACT,
  data: {
    transaction_amount: 49.99,
    transaction_currency: 'SGD',
    transaction_id: 'TXN-2024-001234',
    payment_method: 'grabpay',
    item_count: 2,
  },
});

if (isSuccess(response)) {
  // Event sent successfully
} else if (isError(response)) {
  console.error(`Failed to send event: ${response.error}`);
}
```

##### Custom interactions

Send custom events for checkout interactions like promo code applications or payment method selections:

```typescript
import {
  ContainerModule,
  ContainerAnalyticsEventState,
  isSuccess,
  isError,
} from '@grabjs/superapp-sdk';

const containerModule = new ContainerModule();

// Send for custom checkout interactions such as promo code applications
const response = await containerModule.sendAnalyticsEvent({
  state: ContainerAnalyticsEventState.CUSTOM,
  name: 'PROMO_CODE_APPLIED',
  data: {
    page: 'checkout',
    promo_code: 'SAVE20',
    discount_amount: 10.0,
    discount_type: 'percentage',
  },
});

if (isSuccess(response)) {
  // Event sent successfully
} else if (isError(response)) {
  console.error(`Failed to send event: ${response.error}`);
}
```

#### Completion Point

##### Follow-up actions

Send custom events for post-transaction actions like downloading receipts or tracking orders:

```typescript
import {
  ContainerModule,
  ContainerAnalyticsEventState,
  isSuccess,
  isError,
} from '@grabjs/superapp-sdk';

const containerModule = new ContainerModule();

// Send for post-transaction actions such as downloading a receipt
const response = await containerModule.sendAnalyticsEvent({
  state: ContainerAnalyticsEventState.CUSTOM,
  name: 'RECEIPT_DOWNLOAD',
  data: {
    page: 'completion',
    transaction_id: 'TXN-2024-001234',
    format: 'pdf',
  },
});

if (isSuccess(response)) {
  // Event sent successfully
} else if (isError(response)) {
  console.error(`Failed to send event: ${response.error}`);
}
```

### Best Practices

- Track system events automatically when users navigate to the corresponding pages.
- Always include required data fields for transaction events to enable accurate revenue tracking.
- Use descriptive names for custom events that clearly indicate the user action being tracked.
- Never include Personally Identifiable Information (PII) in event data.

## Checkout

The checkout flow is a two-step process: your backend first initializes a transaction using your partner credentials, then your frontend triggers the native payment interface using the response from your backend.

### Step 1 — Initialize transaction on your backend

Before calling `CheckoutModule.triggerCheckout()`, you must create a transaction on your server by calling the [GrabPay API](https://developer.grab.com/docs/partner-apps/pages/developer-resources/payment/#create-transaction). This requires your `partnerID` and `partnerSecret` to generate an HMAC-SHA256 signature.

The API returns a payload containing `partnerTxID`, `request`, and `sessionID` — all three fields are required by the frontend.

### Step 2 — Trigger checkout from your frontend

Pass the complete response from the Initialize Transaction API to `CheckoutModule.triggerCheckout()`:

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
  // 1. Ensure mobile.checkout scope is authorized
  const authResponse = await identity.authorize({
    clientId: 'your-client-id',
    redirectUri: 'https://your-miniapp.example.com/callback',
    scope: 'mobile.checkout',
    environment: 'production',
    responseMode: 'in_place',
  });

  if (isSuccess(authResponse)) {
    await scope.reloadScopes();
  } else if (isError(authResponse)) {
    console.error('Authorization failed:', authResponse.error);
    return;
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
    const { status, transactionID, errorCode, errorMessage } = checkoutResult.result;

    if (status === 'success') {
      console.log('Payment successful:', transactionID);
    } else if (status === 'failure') {
      console.error('Payment failed:', errorCode, errorMessage);
    } else if (status === 'pending') {
      console.log('Payment is processing:', transactionID);
    } else if (status === 'userInitiatedCancel') {
      console.log('User cancelled payment');
    }
  } else if (isError(checkoutResult)) {
    console.error('Checkout error:', checkoutResult.error);
  }
}
```

### Result status values

| Status                | Description                                                                    |
| :-------------------- | :----------------------------------------------------------------------------- |
| `success`             | Payment completed successfully. `transactionID` is provided.                   |
| `failure`             | Payment failed. `transactionID`, `errorCode`, and `errorMessage` are provided. |
| `pending`             | Payment is still being processed. `transactionID` is provided.                 |
| `userInitiatedCancel` | User cancelled the payment. No other fields are present.                       |

For the complete API reference, see [CheckoutModule](https://grab.github.io/superapp-sdk/classes/CheckoutModule.html).
