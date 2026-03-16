# UserAttributesModule

## Description

The `UserAttributesModule` provides access to user-related attributes exposed from native code to MiniApp WebView.

Current attribute:

- Selected travel destination

## Methods

### 1. Get Selected Travel Destination

**Method name**: `getSelectedTravelDestination`

**Description**

Returns the user's selected travel destination from the Traveller Destination Picker screen as a lowercase ISO 3166-1 alpha-2 country code.

Current possible travel destination values: 

- `id` - Indonesia
- `sg` - Singapore
- `my` - Malaysia
- `th` - Thailand
- `vn` - Vietnam
- `ph` - Philippines
- `mm` - Myanmar
- `kh` - Cambodia

This value denotes user's actual location toward SEA:

- If `status_code` is `200` and `result` is present, the user has a `SelectedTravelDestination`. This generally means the user's actual current location is outside Southeast Asia (SEA) and they selected a SEA destination in the picker.
- If `status_code` is `204`, no `SelectedTravelDestination` is available. This generally means the user is currently in SEA.

**Arguments**

None.

**Return type**

| Name | Type | Description |
| --- | --- | --- |
| result | String \| null | Selected travel destination lowercase ISO 3166-1 alpha-2 country code when available |
| error | String \| null | Error message if operation fails |
| status_code | Number | HTTP-like status code for the operation |

**Status Codes**

- **200**: Success, selected travel destination lowercase ISO 3166-1 alpha-2 country code is returned in `result`
- **204**: No selected travel destination is available, so no `result` is returned

## Code example

```javascript
import { UserAttributesModule } from '@grabjs/superapp-sdk';

// Ideally, initialize this only once and reuse across app.
const userAttributesModule = new UserAttributesModule();

const { result, error, status_code } = await userAttributesModule.getSelectedTravelDestination();

if (status_code === 200) {
  console.log('selected travel destination code:', result);
  console.log('user is likely currently outside Southeast Asia');
} else if (status_code === 204) {
  console.log('selected travel destination is not available');
  console.log('user is likely currently in Southeast Asia');
} else if (error) {
  console.error('getSelectedTravelDestination error:', error);
}
```
