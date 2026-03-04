[@grabjs/superapp-sdk](../README.md) / LocationModule

# Class: LocationModule

JSBridge module for accessing device location services.

## Remarks

Provides access to the device's geolocation data including coordinates and country code.
Requires the MiniApp to be running within the Grab SuperApp's webview.

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

Resolves with the device's latitude and longitude coordinates, or error information if the request fails.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Get current coordinates
```typescript
const response = await locationModule.getCoordinate();
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await locationModule.getCoordinate();
  switch (status_code) {
    case 200:
      console.log('Coordinates:', result.lat, result.lng);
      break;
    default:
      console.log(`Could not get coordinates${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not get coordinates${error ? `: ${error}` : ''}`);
}
```

***

### getCountryCode()

> **getCountryCode**(): `Promise`\<[`GetCountryCodeResponse`](../type-aliases/GetCountryCodeResponse.md)\>

Get the country code based on the device's current location.

#### Returns

`Promise`\<[`GetCountryCodeResponse`](../type-aliases/GetCountryCodeResponse.md)\>

Resolves with the ISO country code (e.g., "SG", "ID", "MY"), or error information if the request fails.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Get country code
```typescript
const response = await locationModule.getCountryCode();
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await locationModule.getCountryCode();
  switch (status_code) {
    case 200:
      console.log('Country code:', result.countryCode);
      break;
    default:
      console.log(`Could not get country code${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not get country code${error ? `: ${error}` : ''}`);
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

#### Examples

Subscribe to location changes
```typescript
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

Get only the first location update
```typescript
const response = await locationModule.observeLocationChange();
if (response.status_code === 200) {
  console.log('First location:', response.result.lat, response.result.lng);
}
```
