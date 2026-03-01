[@grabjs/superapp-sdk](../globals.md) / LocationModule

# Class: LocationModule

Provides functionality to access the user's current position.

## Remarks

**Required Scope:** `mobile.geolocation`

## Examples

**ES Module:**
```typescript
import { LocationModule } from '@grabjs/superapp-sdk';

const locationModule = new LocationModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const locationModule = new SuperAppSDK.LocationModule();
</script>
```

## Extends

- `BaseModule`

## Constructors

### Constructor

> **new LocationModule**(): `LocationModule`

#### Returns

`LocationModule`

#### Overrides

`BaseModule.constructor`

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

#### Examples

Basic usage:
```typescript
try {
  const response = await locationModule.getCoordinate();
  if (response.status_code === 200) {
    const { latitude, longitude } = response.result;
    console.log(`Location: ${latitude}, ${longitude}`);
  }
} catch (error) {
  console.error(error);
}
```

Handling the response:
```typescript
try {
  const response = await locationModule.getCoordinate();

  switch (response.status_code) {
    case 200:
      const { latitude, longitude } = response.result;
      console.log(`Location: ${latitude}, ${longitude}`);
      displayOnMap(latitude, longitude);
      break;
    case 403:
      console.error('Location access denied:', response.error);
      break;
    case 424:
      console.error('Location service unavailable:', response.error);
      break;
    case 500:
      console.error('Location error:', response.error);
      break;
  }
} catch (error) {
  console.error(error);
}
```

***

### observeLocationChange()

> **observeLocationChange**(): `Promise`\<[`GetCoordinateResponse`](../type-aliases/GetCoordinateResponse.md)\>

Get the current user's coordinates (location update).

#### Returns

`Promise`\<[`GetCoordinateResponse`](../type-aliases/GetCoordinateResponse.md)\>

Promise that resolves to [GetCoordinateResponse](../type-aliases/GetCoordinateResponse.md) with the current coordinates.

#### Remarks

**Required Scope:** `mobile.geolocation`

This method retrieves a location update from the native layer.

#### Examples

Basic usage:
```typescript
try {
  const response = await locationModule.observeLocationChange();
  if (response.status_code === 200) {
    const { latitude, longitude } = response.result;
    console.log(`Updated location: ${latitude}, ${longitude}`);
    updateMapMarker(latitude, longitude);
  }
} catch (error) {
  console.error(error);
}
```

Handling the response:
```typescript
try {
  const response = await locationModule.observeLocationChange();

  switch (response.status_code) {
    case 200:
      const { latitude, longitude } = response.result;
      console.log(`Updated location: ${latitude}, ${longitude}`);
      updateMapMarker(latitude, longitude);
      break;
    case 403:
      console.error('Location access denied:', response.error);
      break;
    case 424:
      console.error('Location service unavailable:', response.error);
      break;
    case 500:
      console.error('Location update error:', response.error);
      break;
  }
} catch (error) {
  console.error(error);
}
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

#### Examples

Basic usage:
```typescript
try {
  const response = await locationModule.getCountryCode();
  if (response.status_code === 200) {
    console.log('Country code:', response.result.countryCode);
  }
} catch (error) {
  console.error(error);
}
```

Handling the response:
```typescript
try {
  const response = await locationModule.getCountryCode();

  switch (response.status_code) {
    case 200:
      console.log('Country code:', response.result.countryCode);
      if (response.result.countryCode === 'SG') {
        showSingaporeContent();
      } else if (response.result.countryCode === 'ID') {
        showIndonesiaContent();
      }
      break;
    case 204:
      console.log('Location not available');
      showDefaultContent();
      break;
    case 403:
      console.error('Location access denied:', response.error);
      break;
    case 424:
      console.error('Location service unavailable:', response.error);
      break;
    case 500:
      console.error('Country code error:', response.error);
      break;
  }
} catch (error) {
  console.error(error);
}
```
