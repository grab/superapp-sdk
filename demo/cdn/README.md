# CDN demo

A zero-build MiniApp demonstration showcasing core Grab SuperApp SDK integration patterns. This sample loads the SDK via CDN and uses the global `SuperAppSDK` object to interact with native container, identity, and checkout modules.

## Security

Token exchange and userinfo retrieval are performed **in the browser only for this demonstration**. In production, you must exchange the authorization code, validate tokens, and fetch user information **on your backend** to ensure security and prevent token exposure.

## Configure

1. Open `config.js`.
2. Set `ENVIRONMENT` to `'staging'` or `'production'`.
3. Replace placeholders with your `clientId` and `redirectUri` (must match your Grab partner registration).
4. If testing locally, ensure `redirectUri` points to your served `entry.html` URL.

## Run

Serve this directory over HTTP(S) and open **`entry.html`** as the start URL within the Grab SuperApp WebView environment.

## Integration Flow

```mermaid
sequenceDiagram
    participant User
    participant Entry as entry.html
    participant SDK as SuperAppSDK
    participant OIDC as GrabID_HTTP
    participant Home as index.html
    participant Checkout as checkout.html

    User->>Entry: Open MiniApp
    Entry->>SDK: Configure ContainerModule (UI, buttons, loader)
    Entry->>SDK: IdentityModule.authorize(openid profile.read phone)
    SDK-->>Entry: Authorization code
    Entry->>OIDC: OIDC Flow (Discovery, Token Exchange, UserInfo)
    OIDC-->>Entry: User profile data
    Entry->>SDK: ScopeModule.reloadScopes()
    Entry->>Home: Navigate to index.html

    Home->>SDK: Configure ContainerModule (UI, buttons)
    Home->>SDK: Setup Page & Track Analytics (HOMEPAGE DEFAULT)
    Home->>SDK: LocaleModule.getLanguageLocaleIdentifier()
    User->>Home: Click "View Location on Map"
    Home->>SDK: Check Location Access (hasAccessTo)
    alt No access
        Note over Home,SDK: mobile.geolocation is a mobile scope (no token exchange needed)
        Home->>SDK: IdentityModule.authorize(mobile.geolocation)
        Home->>SDK: ScopeModule.reloadScopes()
    end
    Home->>SDK: Track Analytics (HOMEPAGE INITIATE)
    Home->>SDK: LocationModule.getCoordinate()
    Home->>SDK: Open External Maps Link (openExternalLink)

    User->>Checkout: Navigate to checkout.html
    Checkout->>SDK: Configure ContainerModule (UI, buttons)
    Checkout->>SDK: Setup Page & Track Analytics (CHECKOUT_PAGE DEFAULT)
    User->>Checkout: Click "Trigger Checkout"
    Checkout->>SDK: Check Checkout Access (hasAccessTo)
    alt No access
        Checkout->>SDK: IdentityModule.authorize(mobile.checkout)
        Checkout->>SDK: ScopeModule.reloadScopes()
    end
    Checkout->>SDK: Track Analytics (CHECKOUT_PAGE TRANSACT)
    Checkout->>SDK: CheckoutModule.triggerCheckout(payload)
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
- **Token Validation**: Always validate `id_token` signatures and nonces server-side.
- **Secure Storage**: Use secure, HTTP-only cookies or server-side sessions instead of `sessionStorage` for sensitive identity data.
- **Client Secrets**: Never expose client secrets in frontend code.
