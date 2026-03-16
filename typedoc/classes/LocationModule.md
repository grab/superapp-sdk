[@grabjs/superapp-sdk](../README.md) / LocationModule

# Class: LocationModule

JSBridge module for accessing device location services.

## Remarks

Provides access to the device's geolocation data including coordinates and country code.
This code must run on the Grab SuperApp's webview to function correctly.

## Examples

**ES Module:**
```typescript
import { LocationModule } from '@grabjs/superapp-sdk';
const location = new LocationModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const location = new SuperAppSDK.LocationModule();
</script>
```

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new LocationModule**(): `LocationModule`

#### Returns

`LocationModule`

#### Overrides

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### getCoordinate()

> **getCoordinate**(): `Promise`\<[`GetCoordinateResponse`](../type-aliases/GetCoordinateResponse.md)\>

Get the current geographic coordinates of the device.

#### Returns

`Promise`\<[`GetCoordinateResponse`](../type-aliases/GetCoordinateResponse.md)\>

The device's current latitude and longitude coordinates.

#### Example

**Simple usage**
```typescript
// Initialize the location module
const locationModule = new LocationModule();

// Get current coordinates
const response = await locationModule.getCoordinate();

switch (response.status_code) {
  case 200:
    console.log('Coordinates:', response.result.lat, response.result.lng);
    break;
  case 424:
    console.log('Could not get coordinates:', response.error);
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
}
```

***

### getCountryCode()

> **getCountryCode**(): `Promise`\<[`GetCountryCodeResponse`](../type-aliases/GetCountryCodeResponse.md)\>

Get the country code based on the device's current location.

#### Returns

`Promise`\<[`GetCountryCodeResponse`](../type-aliases/GetCountryCodeResponse.md)\>

The ISO country code (e.g., 'SG', 'ID') based on the device's location.

#### Example

**Simple usage**
```typescript
// Initialize the location module
const locationModule = new LocationModule();

// Get country code
const response = await locationModule.getCountryCode();

switch (response.status_code) {
  case 200:
    console.log('Country code:', response.result.countryCode);
    break;
  case 424:
    console.log('Could not get country code:', response.error);
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
}
```

***

### invoke()

> **invoke**\<`T`\>(`options`: [`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>\>

Invokes a JSBridge method with optional app validation and response transformation.

#### Type Parameters

##### T

`T`

#### Parameters

##### options

[`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>

The invoke options including method name, params, validation, and transformation.

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>\>

A promise resolving to the JSBridge response.

#### Remarks

- Always checks if running in Grab app (returns 501 if not).
- When `isSupported` returns false, returns 426 (Upgrade Required).
- When `transformResponse` is provided, applies it to successful responses.
- All errors are reported via the `status_code` field; this method never rejects.
- For streaming methods, use `invokeStream` instead.

#### Inherited from

[`BaseModule`](BaseModule.md).[`invoke`](BaseModule.md#invoke)

***

### invokeStream()

> **invokeStream**\<`T`\>(`options`: [`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>): [`BridgeStream`](../type-aliases/BridgeStream.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>

Invokes a JSBridge streaming method that returns a `BridgeStream`.

#### Type Parameters

##### T

`T`

#### Parameters

##### options

[`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>

The invoke options including method name, params, and validation.

#### Returns

[`BridgeStream`](../type-aliases/BridgeStream.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>

A `BridgeStream` for receiving continuous data from the JSBridge.

#### Remarks

- Always checks if running in Grab app (returns 501 error response if not).
- When `isSupported` returns false, returns 426 error response.
- Returns a `BridgeStream` that can be subscribed to or awaited for the first value.
- All errors are reported via error responses in the stream; this method never rejects.

#### Inherited from

[`BaseModule`](BaseModule.md).[`invokeStream`](BaseModule.md#invokestream)

***

### observeLocationChange()

> **observeLocationChange**(): [`ObserveLocationChangeResponse`](../type-aliases/ObserveLocationChangeResponse.md)

Subscribe to location change updates from the device.

#### Returns

[`ObserveLocationChangeResponse`](../type-aliases/ObserveLocationChangeResponse.md)

A `BridgeStream` that emits location updates as the device location changes.
Use `subscribe()` to listen for updates, or `await` to get the first value only.

#### Example

**Simple usage**
```typescript
// Initialize the location module
const locationModule = new LocationModule();

// Subscribe to location changes
const subscription = locationModule.observeLocationChange().subscribe({
  next: (response) => {
    if (response.status_code === 200) {
      console.log('Location updated:', response.result.lat, response.result.lng);
    }
  },
  complete: () => console.log('Location stream completed')
});

// Later, to stop receiving updates:
subscription.unsubscribe();
```
