# UserAttributesModule

## API Reference

SDK module for reading user-related attributes from native code via `JSBridge`.

- `getSelectedTravelDestination(): Promise<GetSelectedTravelDestinationResponse>` — Returns the currently selected travel destination as a lowercase ISO 3166-1 alpha-2 country code.

This method can return the following `status_code` values:
- `200` (OK): The selected travel destination code was returned in `result` as GetSelectedTravelDestinationResult.
- `204` (No Content): No selected travel destination is currently available.
- `500` (Internal Server Error): Unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { UserAttributesModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the user attributes module
const userAttributes = new UserAttributesModule();

// Read the selected travel destination
const response = await userAttributes.getSelectedTravelDestination();

// Handle the response
if (isSuccess(response)) {
  switch (response.status_code) {
    case 200:
      console.log('Selected travel destination code:', response.result);
      break;
    case 204:
      console.log('Selected travel destination is not available');
      break;
  }
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```
