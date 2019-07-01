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
