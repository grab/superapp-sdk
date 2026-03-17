[@grabjs/superapp-sdk](../README.md) / UserAttributesModule

# Class: UserAttributesModule

JSBridge module for reading user-related attributes from native code.

## Remarks

Provides access to user and traveller attributes exposed by the native Grab app bridge.
This code must run on the Grab SuperApp's webview to function correctly.

## Examples

**ES Module:**
```typescript
import { UserAttributesModule } from '@grabjs/superapp-sdk';
const userAttributesModule = new UserAttributesModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const userAttributesModule = new SuperAppSDK.UserAttributesModule();
</script>
```

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new UserAttributesModule**(): `UserAttributesModule`

#### Returns

`UserAttributesModule`

#### Overrides

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### getSelectedTravelDestination()

> **getSelectedTravelDestination**(): `Promise`\<[`GetSelectedTravelDestinationResponse`](../type-aliases/GetSelectedTravelDestinationResponse.md)\>

Returns the currently selected travel destination as a lowercase ISO 3166-1 alpha-2 country code.

#### Returns

`Promise`\<[`GetSelectedTravelDestinationResponse`](../type-aliases/GetSelectedTravelDestinationResponse.md)\>

The selected travel destination lowercase ISO 3166-1 alpha-2 country code when available.

#### Example

**Simple usage**
```typescript
// Initialize the user attributes module
const userAttributesModule = new UserAttributesModule();

// Read the selected travel destination
const response = await userAttributesModule.getSelectedTravelDestination();

switch (response.status_code) {
  case 200:
    console.log('Selected travel destination code:', response.result);
    break;
  case 204:
    console.log('Selected travel destination is not available');
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
}
```
