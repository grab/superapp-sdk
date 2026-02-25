[@grabjs/superapp-sdk](../README.md) / LocationModule

# Class: LocationModule

The LocationModule provides functionality to access the user's current position.

**Required Scope:** `mobile.geolocation`

## Example

```javascript
import { LocationModule } from '@grabjs/superapp-sdk';

// Ideally, initialize this only once and reuse across app.
const locationModule = new LocationModule();
```

## Extends

- `ModuleBase`

## Constructors

### Constructor

> **new LocationModule**(): `LocationModule`

#### Returns

`LocationModule`

#### Overrides

`ModuleBase.constructor`

## Methods

### getCoordinate()

> **getCoordinate**(): `Promise`\<[`GetCoordinateResponse`](../type-aliases/GetCoordinateResponse.md)\>

Get the current user's coordinate (latitude and longitude).

#### Returns

`Promise`\<[`GetCoordinateResponse`](../type-aliases/GetCoordinateResponse.md)\>

Promise that resolves to [GetCoordinateResponse](../type-aliases/GetCoordinateResponse.md) with latitude and longitude.

#### Remarks

**Required Scope:** `mobile.geolocation`

This method retrieves the user's current position as latitude and longitude coordinates.

#### Example

```javascript
locationModule.getCoordinate()
  .then(({ result, error, status_code }) => {
    if (result) {
      const { latitude, longitude } = result;
      console.log(`Location: ${latitude}, ${longitude}`);
      
      // Use coordinates for map display or location-based features
      displayOnMap(latitude, longitude);
    } else if (error) {
      console.error("Location error:", error);
    }
  });
```

***

### observeLocationChange()

> **observeLocationChange**(): `Promise`\<[`GetCoordinateResponse`](../type-aliases/GetCoordinateResponse.md)\>

Stream the current user's coordinates with continuous updates.

#### Returns

`Promise`\<[`GetCoordinateResponse`](../type-aliases/GetCoordinateResponse.md)\>

Promise that resolves to a stream of [GetCoordinateResponse](../type-aliases/GetCoordinateResponse.md) with continuous location updates.

#### Remarks

**Required Scope:** `mobile.geolocation`

This method returns a stream that emits location updates as the user moves.
Unsubscribe from the subscription to terminate the stream.

#### Example

```javascript
// Subscribe to location changes
const subscription = locationModule.observeLocationChange().subscribe({
  next: ({ result, error, status_code }) => {
    if (result) {
      const { latitude, longitude } = result;
      console.log(`Updated location: ${latitude}, ${longitude}`);
      updateMapMarker(latitude, longitude);
    } else if (error) {
      console.error("Location update error:", error);
    }
  },
  complete: () => {
    console.log("Location stream completed");
  }
});

// Later, unsubscribe to stop receiving updates
// subscription.unsubscribe();
```

***

### getCountryCode()

> **getCountryCode**(): `Promise`\<[`GetCountryCodeResponse`](../type-aliases/GetCountryCodeResponse.md)\>

Get the current user's country code based on their location.

#### Returns

`Promise`\<[`GetCountryCodeResponse`](../type-aliases/GetCountryCodeResponse.md)\>

Promise that resolves to [GetCountryCodeResponse](../type-aliases/GetCountryCodeResponse.md) with the country code.

#### Remarks

**Required Scope:** `mobile.geolocation`

This method determines the user's country code (e.g., "SG", "ID", "MY") based on their GPS coordinates.

**Status Codes:**
- `200`: Successfully retrieved country code
- `204`: No result (location is undefined, uncovered by location service, or in ocean area)
- `403`: Location access denied (mobile.geolocation scope not granted)
- `424`: Location service unavailable/unaccessible

#### Example

```javascript
locationModule.getCountryCode()
  .then((response) => {
    switch (response.status_code) {
      case 200:
        // Success - country code retrieved
        console.log('Country code:', response.result);
        
        // Use country code for localization or region-specific features
        if (response.result === 'SG') {
          showSingaporeContent();
        } else if (response.result === 'ID') {
          showIndonesiaContent();
        }
        break;
      case 204:
        // No result - location is undefined or uncovered by location service
        console.log('Location not available');
        showDefaultContent();
        break;
      case 403:
        // Permission denied - mobile.geolocation scope not granted
        console.error('Location access denied:', response.error);
        break;
      case 424:
        // Location service has issue/unaccessible
        console.error('Location service unavailable:', response.error);
        break;
    }
  });
```
