[@grabjs/superapp-sdk](../README.md) / HasAccessToResult

# Type Alias: HasAccessToResult

> **HasAccessToResult** = \{ `hasAccess`: `boolean`; \}

Result object containing the access check result.

## Examples

**Has access:**
```typescript
{ hasAccess: true }
```

**No access:**
```typescript
{ hasAccess: false }
```

## Properties

### hasAccess

> **hasAccess**: `boolean`

True if the current client has access to the specified API, false otherwise.
