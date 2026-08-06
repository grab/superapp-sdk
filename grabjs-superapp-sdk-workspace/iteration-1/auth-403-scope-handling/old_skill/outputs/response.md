# Why `profile.fetchEmail()` returns `status_code: 403`

A `403` from the SDK means **Forbidden — insufficient permission**. Per the SDK's status code table, `403` is returned when a method tagged with `@requiredOAuthScope` is called without the required OAuth scope having been granted/consented by the user.

Looking at the API reference, `ProfileModule.fetchEmail()` is tagged:

> `fetchEmail(): Promise<FetchEmailResponse>` — Fetches the user's email address from their Grab profile. (**OAuth Scope:** `mobile.profile` | **Minimum Grab App Version:** Android: 5.399.0, iOS: 5.399.0)

So the `403` almost certainly means your MiniApp's current session hasn't been granted the `mobile.profile` scope — either it was never requested, or the user revoked it later via the Grab app's permission settings.

(Note: since the minimum Grab app version requirement is also attached to this method, a `426` — not `403` — is what you'd see instead if the issue were an outdated app version. Since you're seeing `403`, this is a scope/permission issue, not a version issue.)

## Should you check scopes proactively or handle the 403 reactively?

Both — the skill's guidance recommends doing **both**, and they serve different purposes:

- **Proactive check (`ScopeModule.hasAccessTo()`)** — Use this _before_ calling a gated method, especially in your main UI flow. This is the recommended default because users can revoke permissions at any time from the Grab app settings, so you shouldn't assume a previously-granted scope is still active. Checking first lets you decide whether to show a "grant permission" prompt/CTA _before_ attempting the call, which is a better UX than firing the request and reacting to a failure.
- **Reactive handling (catching the `403`)** — Still implement this as a safety net / fallback path. Even if you check proactively, race conditions exist (permission revoked between the check and the call), and it's also just good defensive practice since the SDK is designed around this pattern (methods never throw, so `403` is the expected signal to trigger the authorize → reload → retry sequence).

In short: **check proactively for the primary UX flow, but always keep the reactive 403 handler as well**, since it's the ultimate source of truth and the check-then-call sequence can still race against a permission revocation.

## How to fix it

When you get a `403`, the required remediation sequence (from the skill's "Reactive Checking" pattern) is:

1. Call `IdentityModule.authorize()` requesting the `mobile.profile` scope.
2. Call `ScopeModule.reloadScopes()` to refresh the SDK's internal permission state.
3. Retry the original `fetchEmail()` call.

### Example: proactive check + reactive fallback combined

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

async function requestScope(requiredScope: string) {
  const auth = await identity.authorize({
    clientId: 'your-client-id',
    redirectUri: 'https://your-app.com/callback',
    scope: requiredScope, // e.g. 'mobile.profile'
    environment: 'production',
    responseMode: 'in_place',
  });

  if (isSuccess(auth)) {
    // Refresh the SDK's internal permission state after granting the scope
    await scope.reloadScopes();
    return true;
  }
  return false;
}

async function getEmail() {
  // 1. Proactive check — verify access before calling the gated method.
  //    Recommended because scopes can be revoked at any time via Grab app settings.
  const hasAccess = await scope.hasAccessTo('ProfileModule', 'fetchEmail');

  if (!isSuccess(hasAccess) || !hasAccess.result) {
    const granted = await requestScope('mobile.profile');
    if (!granted) {
      console.warn('User did not grant mobile.profile scope.');
      return;
    }
  }

  // 2. Make the call
  const response = await profile.fetchEmail();

  // 3. Reactive fallback — handle 403 even after a proactive check,
  //    in case the permission was revoked in between (race condition)
  //    or the proactive check itself was skipped/failed.
  if (isError(response) && response.status_code === 403) {
    const granted = await requestScope('mobile.profile');
    if (granted) {
      const retry = await profile.fetchEmail();
      if (isSuccess(retry)) {
        console.log('Email:', retry.result);
      }
      return;
    }
  }

  if (isSuccess(response)) {
    console.log('Email:', response.result);
  } else if (isError(response)) {
    console.error(`Error ${response.status_code}: ${response.error}`);
  }
}
```

### A couple of things to double check

- Make sure `mobile.profile` was actually included in the `scope` string you passed to `IdentityModule.authorize()` during sign-in (e.g. `scope: 'openid profile.read phone mobile.profile'`). If it was never requested at all, you'll get `403` every time until you request it.
- Make sure `ScopeModule.reloadScopes()` was called after authorization completed — the SDK's internal permission state won't reflect a newly granted scope until you reload it. This is called out in both the Initialization guide (`await scope.reloadScopes()` at the end of app init) and the Authentication guide (after establishing the session).
- `mobile.profile` is a **mobile scope** (grants in-app permission immediately, no backend token exchange needed), so once `authorize()` succeeds and you `reloadScopes()`, the retry should work without any backend round-trip.
