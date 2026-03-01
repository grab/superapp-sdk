[@grabjs/superapp-sdk](../globals.md) / AuthorizeRequest

# Type Alias: AuthorizeRequest

> **AuthorizeRequest** = \{ `clientId`: `string`; `scope`: `string`; `redirectUri`: `string`; `environment`: [`Environment`](Environment.md); `responseMode?`: [`ResponseMode`](ResponseMode.md); \}

Authorization request parameters

## Properties

### clientId

> **clientId**: `string`

OAuth 2.0 client ID

***

### scope

> **scope**: `string`

Space-separated list of OAuth scopes

***

### redirectUri

> **redirectUri**: `string`

Redirect URI for OAuth callback

***

### environment

> **environment**: [`Environment`](Environment.md)

Environment to use (staging or production)

***

### responseMode?

> `optional` **responseMode**: [`ResponseMode`](ResponseMode.md)

Response mode - redirect (default) or in_place
