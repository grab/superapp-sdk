[@grabjs/superapp-sdk](../README.md) / SendAnalyticsEventRequest

# Type Alias: SendAnalyticsEventRequest

> **SendAnalyticsEventRequest** = \{ `data?`: `Record`\<`string`, `any`\>; `name`: `string`; `state`: `string`; \}

Request parameters for sending analytics events.

## Properties

### data?

> `optional` **data**: `Record`\<`string`, `any`\>

Optional additional data for the analytics event.

***

### name

> **name**: `string`

Analytics event name (e.g., "DEFAULT", "BOOK").

***

### state

> **state**: `string`

Analytics event state (e.g., "HOMEPAGE", "CHECKOUT_PAGE").
