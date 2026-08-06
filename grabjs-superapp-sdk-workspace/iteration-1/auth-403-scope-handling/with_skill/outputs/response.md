# `profile.fetchEmail()` returns `status_code: 403` — what it means and how to fix it

## What `403` means

`403 Forbidden` from `@grabjs/superapp-sdk` means **insufficient permission** — specifically, the current session hasn't granted the OAuth scope that method requires. It is not a network or app error; it's the SDK telling you the user hasn't (yet) consented to the scope tagged on that method.

`ProfileModule.fetchEmail()` is annotated with:

- **Required OAuth Scope:** `mobile.profile`
- **Minimum Grab App Version:** Android 5.399.0, iOS 5.399.0

So a `403` here almost always means the session is missing the `mobile.profile` scope — either it was never requested, or the user revoked it later via the Grab app's permission settings (this can happen at any time, independent of your app's code).

Note: if the Grab app itself were too old for this method, you'd get `426 Upgrade Required` instead, not `403` — so `403` specifically points to a scope problem, not a version problem.

## Should you check scopes proactively, or handle the 403 reactively?

**Do both, but for different purposes** — they aren't mutually exclusive:

- **Proactively check** with `ScopeModule.hasAccessTo()` before calling a gated method. This is the recommended default because users can revoke permissions at any time from the Grab app's settings, so you can't assume a scope you got once is still valid. Checking first lets you skip straight to a good UX (e.g., show a "connect your email" prompt) instead of firing a call you already suspect will fail.
- **Reactively handle `403`** as a safety net regardless. Even if you checked proactively, there's a race — the user could revoke the permission in the split second between your check and the actual call — so your code should still be able to recover from a `403` it wasn't expecting.

In short: check proactively to drive UX decisions, but always keep the reactive `403` handler in place as the real recovery mechanism.

## How to fix it — reactive recovery flow

When you get a `403`, the fix is:

1. Call `IdentityModule.authorize()` requesting the missing scope (`mobile.profile`).
2. Call `ScopeModule.reloadScopes()` to refresh the SDK's internal permission state.
3. Retry the original call (`fetchEmail()`).

```typescript
import {
  ProfileModule,
  IdentityModule,
  ScopeModule,
  isSuccess,
  isError,
} from '@grabjs/superapp-sdk';

const profile = new ProfileModule();
const identity = new IdentityModule();
const scope = new ScopeModule();

async function getEmail() {
  const response = await profile.fetchEmail();

  if (isSuccess(response)) {
    return response.result;
  }

  if (isError(response) && response.status_code === 403) {
    // 1. Request authorization for the required scope
    const auth = await identity.authorize({
      clientId: 'your-client-id',
      redirectUri: 'https://your-app.com/callback',
      scope: 'mobile.profile', // the scope required by fetchEmail()
      environment: 'production',
      responseMode: 'in_place',
    });

    if (isSuccess(auth)) {
      // 2. Reload scopes so the newly granted permission takes effect
      await scope.reloadScopes();

      // 3. Retry the original call
      const retry = await profile.fetchEmail();
      if (isSuccess(retry)) {
        return retry.result;
      }
    }
    // auth was cancelled (204) or failed — handle accordingly
    return null;
  }

  // Other error codes (426 app too old, 500/501, etc.)
  console.error(`Error ${response.status_code}: ${response.error}`);
  return null;
}
```

## Recommended: pair it with a proactive check

To avoid firing a call you can predict will fail, check access first and only call `fetchEmail()` (or kick off the authorize flow) based on the result:

```typescript
import { ProfileModule, ScopeModule, isSuccess } from '@grabjs/superapp-sdk';

const profile = new ProfileModule();
const scope = new ScopeModule();

async function getEmailProactively() {
  const hasAccess = await scope.hasAccessTo('ProfileModule', 'fetchEmail');

  if (isSuccess(hasAccess) && hasAccess.result) {
    // Permission already granted — safe to call directly
    const response = await profile.fetchEmail();
    if (isSuccess(response)) return response.result;
  } else {
    // No access yet — show your own "why we need this" UI, then
    // kick off IdentityModule.authorize({ scope: 'mobile.profile', ... })
    // followed by ScopeModule.reloadScopes() before retrying fetchEmail().
  }
}
```

## Bottom line

- `403` = missing/revoked `mobile.profile` scope for `fetchEmail()`, not a bug.
- Use the proactive `hasAccessTo()` check to drive your UI/UX (e.g., prompt before calling).
- Always keep the reactive `authorize()` → `reloadScopes()` → retry flow in place, since permissions can be revoked at any moment and the proactive check alone can't guarantee the call will succeed.
