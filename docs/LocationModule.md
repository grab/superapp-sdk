# LocationModule

## Description

Will return current user position

## Methods

### 1. Get current user coordinate

**Method name**: `getCoordinate`

**Scopes to be requested**: `mobile.geolocation`

**Arguments**: `None`

**Return type**

| Name      | Type   | Description                                                 |
| --------- | ------ | ----------------------------------------------------------- |
| latitude  | Double | Latitude is horizontal line described for earth coordinates |
| longitude | Double | Longitude is vertical line described for earth coordinates  |

**Code example**

```javascript
import { LocationModule } from '@grab/superapp-sdk';

// Ideally, initialize this only one and reuse across app.
const locationModule = new LocationModule()

locationModule.getCoordinate({})
  .then({ result, error }) => {
    if (!!result) {
      const { latitude, longitude } = result;
    } else if (!!error) {
      // Some error happened.
    }
  }
```

### 2. Stream current user coordinates

**Method name**: `observeLocationChange`

**Scopes to be requested**: `mobile.geolocation`

**Arguments**: `None`

**Return type**

| Name      | Type   | Description                                                 |
| --------- | ------ | ----------------------------------------------------------- |
| latitude  | Double | Latitude is horizontal line described for earth coordinates |
| longitude | Double | Longitude is vertical line described for earth coordinates  |

**Code example**

```javascript
import { LocationModule } from '@grab/superapp-sdk';

// Ideally, initialize this only one and reuse across app.
const locationModule = new LocationModule();

// Unsubscribe from this subscription to terminate the stream.
const subscription = locationModule.observeLocationChange({}).subscribe({
  next: ({ result, error }) => {
    if (!!result) {
      const { latitude, longitude } = result;
    } else if (!!error) {
      // Some error happened.
    }
  },
  complete: () => {
    // Completion logic for when the stream completes.
  }
});
```

### 3. Get current user country code

**Method name**: `getCountryCode`

**Scopes to be requested**: `mobile.geolocation`

**Arguments**: `None`

**Return type**

| Name        | Type   | Description                    |
| ----------- | ------ | ------------------------------ |
| countryCode | String | country code (e.g., "SG", "ID", "MY") |

**Code example**

```javascript
import { LocationModule } from '@grab/superapp-sdk';

// Ideally, initialize this only one and reuse across app.
const locationModule = new LocationModule()

locationModule.getCountryCode({})
  .then((response) => {
    switch (response.status_code) {
      case 200:
        // Success - country code retrieved
        console.log('Country code:', response.result);
        break;
      case 204:
        // No result - location is undefined or might be uncovered by location service data
        console.log('No result - location is undefined or uncovered by location service');
        break;
      case 403:
        // Permission denied - mobile.geolocation scope not granted
        console.log('Location access denied:', response.error);
        break;
      case 424:
        // Location service has issue/unaccessible
        console.log('Location service unavailable:', response.error);
        break;
      default:
        // Handle other potential status codes
        console.log('Error:', response.error);
    }
  });
```

## Response Format

The location methods return an object with different structures based on the result:

### Success Response (Status Code 200)
```javascript
{
  "status_code": 200,
  "result": "SG" // The country code (e.g., "SG", "ID", "MY")
}
```

### No Result Response (Status Code 204)
```javascript
{
  "status_code": 204
  // No result property
  // No error property
}
```

### Error Response (Status Code 403)
```javascript
{
  "status_code": 403,
  "error": "Location access denied"
  // No result property
}
```

### Error Response (Status Code 424)
```javascript
{
  "status_code": 424,
  "error": "Determining country code from coordinates fails"
  // No result property
}
```

## Status Codes

- `200`: Successfully retrieved country code
- `204`: No result (location is undefined or uncovered by location service or in ocean area)
- `403`: Location access denied (mobile.geolocation scope not granted)
- `424`: Location service unavailable/unaccessible
