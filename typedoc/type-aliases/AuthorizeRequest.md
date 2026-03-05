[@grabjs/superapp-sdk](../README.md) / AuthorizeRequest

# Type Alias: AuthorizeRequest

> **AuthorizeRequest** = \{ `clientId`: `string`; `environment`: `"staging"` \| `"production"`; `redirectUri`: `string`; `responseMode?`: `"redirect"` \| `"in_place"`; `scope`: `string`; \}

Request parameters for initiating an OAuth2 authorization flow with PKCE.

## Properties

### clientId

> **clientId**: `string`

The OAuth2 client ID for your MiniApp.

***

### environment

> **environment**: `"staging"` \| `"production"`

The environment to use for authorization ('staging' or 'production').

***

### redirectUri

> **redirectUri**: `string`

The redirect URI registered for your MiniApp.

***

### responseMode?

> `optional` **responseMode**: `"redirect"` \| `"in_place"`

The response mode for the authorization flow.
- 'redirect': User is redirected to the redirect URI after authorization
- 'in_place': Authorization happens within the current page context

#### Default Value

```ts
'redirect'
```

***

### scope

> **scope**: `string`

The OAuth2 scopes to request (space-separated string).
