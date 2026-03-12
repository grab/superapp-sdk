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

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Initialize the location module
const locationModule = new LocationModule();

// Get current coordinates
try {
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
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### getCountryCode()

> **getCountryCode**(): `Promise`\<[`GetCountryCodeResponse`](../type-aliases/GetCountryCodeResponse.md)\>

Get the country code based on the device's current location.

#### Returns

`Promise`\<[`GetCountryCodeResponse`](../type-aliases/GetCountryCodeResponse.md)\>

The ISO country code (e.g., 'SG', 'ID') based on the device's location.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Initialize the location module
const locationModule = new LocationModule();

// Get country code
try {
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
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### observeLocationChange()

> **observeLocationChange**(): [`ObserveLocationChangeResponse`](../type-aliases/ObserveLocationChangeResponse.md)

Subscribe to location change updates from the device.

#### Returns

[`ObserveLocationChangeResponse`](../type-aliases/ObserveLocationChangeResponse.md)

A `DataStream` that emits location updates as the device location changes.
Use `subscribe()` to listen for updates, or `await` to get the first value only.

#### Throws

Error when the JSBridge method fails unexpectedly.

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
