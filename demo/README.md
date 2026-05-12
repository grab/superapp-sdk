# Demo MiniApps

Two complete MiniApp samples demonstrating core Grab SuperApp SDK integration patterns. Both implement the same user flow — OAuth authorization, user profile display, deferred location permissions, and checkout payment — in different technology stacks.

**Notes:**
- These MiniApps must be opened within the Grab SuperApp WebView environment to function correctly, as they rely on native bridge capabilities provided by the Grab app.
- These MiniApps run token exchange and userinfo in the browser for illustration only. In production, these operations **must** be performed on your backend to protect client secrets and access tokens.

## Variants

| Variant | Stack | Description |
|---------|-------|-------------|
| `cdn/` | Vanilla HTML/JS | Zero-build, loads SDK via CDN. Uses the global `SuperAppSDK` object. |
| `react/` | React + TypeScript + Vite | Build-based, imports SDK as an npm package. Hot-reload dev server. |

### CDN Variant

Zero-build: open the HTML files directly via a local server (e.g. `npx serve .`).

```
cdn/
├── entry.html        OAuth authorization and demo OIDC flow
├── index.html        User profile display and deferred location permissions
├── checkout.html     Payment flow and checkout permission handling
├── config.js         Centralized environment and OAuth client configuration
├── ui-helpers.js     Shared UI utilities for error handling and HTML escaping
└── grabid-service.js Demo-only OIDC helpers (Discovery, Token Exchange, UserInfo)
```

Run locally:
```bash
npx serve cdn
# Then open http://localhost:3000/entry.html
```

### React Variant

Build-based with TypeScript and Vite:

```
react/
├── src/
│   ├── App.tsx               Root component with routing
│   ├── config.ts             Environment and OAuth client configuration
│   ├── pages/
│   │   ├── EntryPage.tsx     OAuth authorization and OIDC flow
│   │   ├── IndexPage.tsx     User profile display and deferred location permissions
│   │   └── CheckoutPage.tsx  Payment flow and checkout permission handling
│   ├── services/
│   │   └── grabidService.ts  Demo-only OIDC helpers
│   └── context/
│       └── UserContext.tsx   User profile state management
└── dist/                     Pre-built output (ready to serve)
```

Install and run:
```bash
cd react
npm install
npm run dev
```

## Configure

1. Open `cdn/config.js` (or `react/src/config.ts`).
2. Set `ENVIRONMENT` to `'staging'` or `'production'`.
3. Replace placeholders with your `clientId` and `redirectUri` (must match your Grab partner registration).

## Testing

To run and test this code, please coordinate with the Grab team to provision your test environment.

## Integration Flow

```mermaid
sequenceDiagram
    participant User
    participant Entry as Entry page
    participant SDK as SuperAppSDK
    participant OIDC as GrabID_API
    participant Home as Home page
    participant Checkout as Checkout page
    participant Backend as Backend_API

    User->>Entry: Open MiniApp
    Entry->>SDK: Configure container via ContainerModule (setBackgroundColor, setTitle, hideBackButton, hideRefreshButton, hideLoader)
    Entry->>SDK: Authorize via IdentityModule.authorize with scope openid profile.read phone
    SDK-->>Entry: Authorization code and PKCE artifacts (code, state, codeVerifier, nonce, redirectUri)
    Entry->>OIDC: OIDC Flow (Discovery, Token Exchange, UserInfo)
    OIDC-->>Entry: User profile data
    Entry->>SDK: Reload scopes via ScopeModule.reloadScopes
    Entry->>SDK: Clear authorization artifacts via IdentityModule.clearAuthorizationArtifacts
    Entry->>Home: Navigate to home page

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

    User->>Checkout: Navigate to checkout page
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
