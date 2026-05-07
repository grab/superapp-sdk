# CDN demo

A zero-build MiniApp demonstration showcasing core Grab SuperApp SDK integration patterns. This sample loads the SDK via CDN and uses the global `SuperAppSDK` object to interact with native container, identity, and checkout modules.

**Note:** This MiniApp must be opened within the Grab SuperApp WebView environment to function correctly, as it relies on native bridge capabilities provided by the Grab app.

## Security

Token exchange and userinfo retrieval are performed **in the browser only for this demonstration**. In production, you must exchange the authorization code, validate tokens, and fetch user information **on your backend** to ensure security and prevent token exposure.

## Configure

1. Open `config.js`.
2. Set `ENVIRONMENT` to `'staging'` or `'production'`.
3. Replace placeholders with your `clientId` and `redirectUri` (must match your Grab partner registration).
4. If testing locally, ensure `redirectUri` points to your served `entry.html` URL.

## Testing

Developers who want to pull this code, update it, and test it out, should liaise with the Grab team to set up the environment.

## Integration Flow

```mermaid
sequenceDiagram
    participant User
    participant Entry as entry.html
    participant SDK as SuperAppSDK
    participant OIDC as GrabID_API
    participant Home as index.html
    participant Checkout as checkout.html
    participant Backend as Backend_API

    User->>Entry: Open MiniApp
    Entry->>SDK: Configure container via ContainerModule (setBackgroundColor, setTitle, hideBackButton, hideRefreshButton, hideLoader)
    Entry->>SDK: Authorize via IdentityModule.authorize with scope openid profile.read phone
    SDK-->>Entry: Authorization code
    Entry->>SDK: Get authorization artifacts via IdentityModule.getAuthorizationArtifacts
    Entry->>OIDC: OIDC Flow (Discovery, Token Exchange, UserInfo)
    OIDC-->>Entry: User profile data
    Entry->>SDK: Reload scopes via ScopeModule.reloadScopes
    Entry->>SDK: Clear authorization artifacts via IdentityModule.clearAuthorizationArtifacts
    Entry->>Home: Navigate to index.html

    Home->>SDK: Configure container via ContainerModule (setBackgroundColor, setTitle, hideBackButton, showRefreshButton)
    Home->>SDK: Track analytics event via ContainerModule.sendAnalyticsEvent for event HOMEPAGE DEFAULT
    Home->>SDK: Get locale via LocaleModule.getLanguageLocaleIdentifier
    User->>Home: Click "View Location on Map"
    Home->>SDK: Check access via ScopeModule.hasAccessTo for LocationModule.getCoordinate
    alt No access
        Note over Home,SDK: mobile.geolocation is a mobile scope (no token exchange needed)
        Home->>SDK: Authorize via IdentityModule.authorize with scope mobile.geolocation
        Home->>SDK: Reload scopes via ScopeModule.reloadScopes
        Home->>SDK: Clear authorization artifacts via IdentityModule.clearAuthorizationArtifacts
    end
    Home->>SDK: Track analytics event via ContainerModule.sendAnalyticsEvent for event HOMEPAGE INITIATE
    Home->>SDK: Get coordinates via LocationModule.getCoordinate
    Home->>SDK: Open external link via ContainerModule.openExternalLink

    User->>Checkout: Navigate to checkout.html
    Checkout->>SDK: Configure container via ContainerModule (setBackgroundColor, setTitle, showBackButton, hideRefreshButton)
    Checkout->>SDK: Track analytics event via ContainerModule.sendAnalyticsEvent for event CHECKOUT_PAGE DEFAULT
    User->>Checkout: Click "Trigger Checkout"
    Checkout->>SDK: Check access via ScopeModule.hasAccessTo for CheckoutModule.triggerCheckout
    alt No access
        Checkout->>SDK: Authorize via IdentityModule.authorize with scope mobile.checkout
        Checkout->>SDK: Reload scopes via ScopeModule.reloadScopes
        Checkout->>SDK: Clear authorization artifacts via IdentityModule.clearAuthorizationArtifacts
    end
    Checkout->>Backend: Create transaction via GrabPay API
    Backend-->>Checkout: { partnerTxID, request, sessionID }
    Checkout->>SDK: Track analytics event via ContainerModule.sendAnalyticsEvent for event CHECKOUT_PAGE TRANSACT
    Checkout->>SDK: Trigger checkout via CheckoutModule.triggerCheckout
```

## File Breakdown

| File | Responsibility |
|------|----------------|
| `entry.html` | Handles initial OAuth authorization and demo OIDC flow. |
| `index.html` | Displays user profile and demonstrates deferred location permissions. |
| `checkout.html` | Demonstrates the payment flow and checkout permission handling. |
| `config.js` | Centralized environment and OAuth client configuration. |
| `ui-helpers.js` | Shared UI utilities for error handling and HTML escaping. |
| `grabid-service.js` | Demo-only OIDC helpers (Discovery, Token Exchange, UserInfo). |

## Production Checklist

- **Backend Integration**: Move OAuth code exchange and UserInfo calls to your server.
- **Transaction Initialization**: Always initialize transactions on your backend via the GrabPay API before calling `CheckoutModule.triggerCheckout()`.
- **Token Validation**: Always validate `id_token` signatures and nonces server-side.
- **Secure Storage**: Use secure, HTTP-only cookies or server-side sessions instead of `sessionStorage` for sensitive identity data.
- **Client Secrets**: Never expose client secrets in frontend code.
