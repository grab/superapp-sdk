[@grabjs/superapp-sdk](../README.md) / SendAnalyticsEventRequest

# Type Alias: SendAnalyticsEventRequest

> **SendAnalyticsEventRequest** = \{ `data?`: `Record`\<`string`, `any`\>; `name`: `string`; `state`: `string`; \}

Request parameters for sending analytics events.

## Remarks

Use predefined constants to ensure consistency across the platform:
- **States:** [ContainerAnalyticsEventState](../variables/ContainerAnalyticsEventState.md)
- **Names:** [ContainerAnalyticsEventName](../variables/ContainerAnalyticsEventName.md)

## Properties

### data?

> `optional` **data**: `Record`\<`string`, `any`\>

Optional additional data for the analytics event as key-value pairs.

***

### name

> **name**: `string`

The analytics event name (e.g., "DEFAULT", "BOOK").

***

### state

> **state**: `string`

The analytics event state (e.g., "HOMEPAGE", "CHECKOUT_PAGE").
