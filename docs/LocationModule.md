## What is LocationModule ?

`LocationModule` Will return current user position


### Methods


#### 1. Get current user coordinate

```javascript
LocationModule.getCoordinate()
```

##### Return type
##### Coordinate
Name | Type | Description
 --- | --- | ---
latitude | Double | Latitude is horizontal line described for earth coordinates
longitude | Double | Longitude is vertical line described for earth coordinates


##### Response example
```json
{
    status_code: 200
    result : {
        "latitude": 1.234523,
        "longitude": 1.4356345
    }
}
```

