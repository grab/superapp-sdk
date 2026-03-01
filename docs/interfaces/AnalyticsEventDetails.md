[@grabjs/superapp-sdk](../globals.md) / AnalyticsEventDetails

# Interface: AnalyticsEventDetails

Details for analytics events sent to the container

## Properties

### state

> **state**: `string`

The state in which the event occurred.
Use [ContainerAnalyticsEventState](../variables/ContainerAnalyticsEventState.md) for predefined values.

***

### name

> **name**: `string`

The name of the event.
Use [ContainerAnalyticsEventName](../variables/ContainerAnalyticsEventName.md) for predefined values.

***

### data?

> `optional` **data**: `Record`\<`string`, `unknown`\> \| `null`

Optional metadata associated with the event.
Use [ContainerAnalyticsEventData](../variables/ContainerAnalyticsEventData.md) for standard keys.
