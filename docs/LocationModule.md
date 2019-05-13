# What is LocationModule ?

`LocationModule` Will return current user position


## Methods

### 1. Get current user coordinate

#### Method name
```javascript
getCoordinate()
```

#### Return type
#### Coordinate
Name | Type | Description
 --- | --- | ---
latitude | Double | Latitude is horizontal line described for earth coordinates
longitude | Double | Longitude is vertical line described for earth coordinates

#### Code example
```javascript
import { LocationModule } from '@grabjs/superapp-sdk';

const locationModule = new LocationModule();

// This returns a Promise.
locationModule.getCoordinate()
  .then(({ result, error, status_code }) => {
    if (!!result) {
      const { latitude, longitude } = result;

      // Handle coordinates here.
    } else if (!!error) {
      // Handle error here.
    }
  })
```

#### Response example
```json
{
    "status_code": 200,
    "result" : {
        "latitude": 1.234523,
        "longitude": 1.4356345
    }
}
```
