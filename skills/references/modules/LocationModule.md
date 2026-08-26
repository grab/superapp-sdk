# LocationModule

## API Reference

SDK module for accessing device location services via `JSBridge`.

- `getCoordinate(): Promise<GetCoordinateResponse>` — Get the current geographic coordinates of the device. (**OAuth Scope:** mobile.geolocation)

This method can return the following `status_code` values:
- `200` (OK): Coordinates retrieved successfully. The `result` contains GetCoordinateResult.
- `403` (Forbidden): Client is not authorized to access location data.
- `424` (Failed Dependency): Dependency error occurred while retrieving coordinates.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { LocationModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the location module
const location = new LocationModule();

// Get current coordinates
const response = await location.getCoordinate();

// Handle the response
if (isSuccess(response)) {
  console.log('Coordinates:', response.result.latitude, response.result.longitude);
} else if (isError(response)) {
  switch (response.status_code) {
    case 403:
      console.log('No permission to access location');
      // Trigger IdentityModule.authorize() for scope 'mobile.geolocation', then reload via ScopeModule.reloadScopes() and try again
      break;
    default:
      console.error(`Error ${response.status_code}: ${response.error}`);
  }
} else {
  console.error('Unhandled response');
}
```

- `getCountryCode(): Promise<GetCountryCodeResponse>` — Get the country code based on the device's current location. (**OAuth Scope:** mobile.geolocation)

This method can return the following `status_code` values:
- `200` (OK): Country code retrieved successfully. The `result` contains GetCountryCodeResult.
- `204` (No Content): Country code not available.
- `403` (Forbidden): Client is not authorized to access location data.
- `424` (Failed Dependency): Dependency error occurred while resolving country code.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { LocationModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the location module
const location = new LocationModule();

// Get country code
const response = await location.getCountryCode();

// Handle the response
if (isSuccess(response)) {
  console.log('Country code:', response.result);
} else if (isError(response)) {
  switch (response.status_code) {
    case 403:
      console.log('No permission to access location');
      // Trigger IdentityModule.authorize() for scope 'mobile.geolocation', then reload via ScopeModule.reloadScopes() and try again
      break;
    default:
      console.error(`Error ${response.status_code}: ${response.error}`);
  }
} else {
  console.error('Unhandled response');
}
```

- `observeLocationChange(): ObserveLocationChangeResponse` — Subscribe to location change updates from the device. (**OAuth Scope:** mobile.geolocation)

This stream can emit the following `status_code` values:
- `200` (OK): Stream emitted a location update. The `result` contains GetCoordinateResult.
- `400` (Bad Request): Stream emitted an invalid request error.
- `403` (Forbidden): Stream emitted an authorization error.
- `424` (Failed Dependency): Stream emitted a dependency error.
- `500` (Internal Server Error): Stream emitted an unexpected error.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { LocationModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the location module
const location = new LocationModule();

// Subscribe to location changes
const subscription = location.observeLocationChange().subscribe({
  next: (response) => {
    if (isSuccess(response)) {
      console.log('Location updated:', response.result.latitude, response.result.longitude);
    } else if (isError(response)) {
      switch (response.status_code) {
        case 403:
          console.log('No permission to access location');
          // Trigger IdentityModule.authorize() for scope 'mobile.geolocation', then reload via ScopeModule.reloadScopes() and try again
          break;
        default:
          console.error(`Error ${response.status_code}: ${response.error}`);
      }
    }
  },
  complete: () => console.log('Location stream completed')
});

// Later, to stop receiving updates:
subscription.unsubscribe();
```
