[@grabjs/superapp-sdk](../README.md) / AuthorizeResult

# Type Alias: AuthorizeResult

> **AuthorizeResult** = \{ `code`: `string`; `state`: `string`; \}

Result object for the authorization flow.
Contains the authorization code and state when native in_place flow completes successfully.

## Example

```typescript
{
  code: 'auth-code-abc123',
  state: 'csrf-state-xyz789'
}
```

## Properties

### code

> **code**: `string`

The authorization code returned from the server.

***

### state

> **state**: `string`

The state parameter returned from the server for CSRF protection.
