[@grabjs/superapp-sdk](../README.md) / SendAnalyticsEventRequest

# Type Alias: SendAnalyticsEventRequest

> **SendAnalyticsEventRequest** = \{ `data?`: `Record`\<`string`, `unknown`\>; `name`: `string`; `state`: `string`; \}

Request parameters for sending analytics events.

## Remarks

Use predefined constants to ensure consistency across the platform:
- **States:** [ContainerAnalyticsEventState](../variables/ContainerAnalyticsEventState.md)
- **Names:** [ContainerAnalyticsEventName](../variables/ContainerAnalyticsEventName.md)

## Examples

**Analytics event with state and name:**
```typescript
{
  state: 'HOMEPAGE',
  name: 'DEFAULT'
}
```

**Analytics event with additional data:**
```typescript
{
  state: 'CHECKOUT_PAGE',
  name: 'BOOK',
  data: { itemId: '123', quantity: 2 }
}
```

## Properties

### data?

> `optional` **data**: `Record`\<`string`, `unknown`\>

Optional additional data for the analytics event as key-value pairs.

***

### name

> **name**: `string`

The analytics event name (e.g., "DEFAULT", "BOOK").

***

### state

> **state**: `string`

The analytics event state (e.g., "HOMEPAGE", "CHECKOUT_PAGE").
