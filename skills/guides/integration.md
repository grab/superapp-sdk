# Integration Guide

This guide covers the recommended setup for a MiniApp entry point — loading scopes, configuring the container UI, signalling readiness, and handling permissions.

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
