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

Trigger `IdentityModule.authorize()` to request user permissions, then `IdentityModule.clearAuthorizationArtifacts()`
and `ScopeModule.reloadScopes()` once your backend has exchanged the result for a session. See
`references/IdentityModule.md` for the full request/response shapes (including the native `in_place` vs. web
`302` redirect flows) and `references/ScopeModule.md` for `reloadScopes()`.

## Container UI & Navigation

Configure the native container's title, background, and back/refresh buttons, and track analytics events, via
`ContainerModule` — see `references/ContainerModule.md` for every method and its parameters.

## Checkout

The checkout flow is a two-step process split across two systems: your **backend** first initializes a
transaction using your partner credentials against the
[GrabPay API](https://developer.grab.com/docs/partner-apps/pages/developer-resources/payment/), then your
**frontend** triggers the native payment interface with `CheckoutModule.triggerCheckout()`, passing the
response your backend returned. See `references/CheckoutModule.md` for the frontend call's exact signature.
