# ContainerModule

## API Reference

SDK module for controlling the WebView container via `JSBridge`.

- `close(): Promise<CloseResponse>` — Close the container and return to the previous screen.

This method can return the following `status_code` values:
- `204` (No Content): Container closed successfully.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the container module
const container = new ContainerModule();

// Close the container
const response = await container.close();

// Handle the response
if (isSuccess(response)) {
  console.log('Container closed successfully');
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `getSessionParams(): Promise<GetSessionParamsResponse>` — Get the session parameters from the container.

This method can return the following `status_code` values:
- `200` (OK): Session parameters retrieved successfully.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the container module
const container = new ContainerModule();

// Get session parameters
const response = await container.getSessionParams();

// Handle the response
if (isSuccess(response)) {
  if (response.status_code === 200) {
    const sessionParams = JSON.parse(response.result);
    console.log('Session params retrieved:', sessionParams);
  } else if (response.status_code === 204) {
    console.log('No session parameters found');
  }
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `hideBackButton(): Promise<HideBackButtonResponse>` — Hide the back button on the container header.

This method can return the following `status_code` values:
- `204` (No Content): Back button hidden successfully.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the container module
const container = new ContainerModule();

// Hide back button
const response = await container.hideBackButton();

// Handle the response
if (isSuccess(response)) {
  console.log('Back button hidden successfully');
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `hideLoader(): Promise<HideLoaderResponse>` — Hide the full-screen loading indicator.

This method can return the following `status_code` values:
- `204` (No Content): Loader hidden successfully.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the container module
const container = new ContainerModule();

// Hide loader
const response = await container.hideLoader();

// Handle the response
if (isSuccess(response)) {
  console.log('Loader hidden successfully');
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `hideRefreshButton(): Promise<HideRefreshButtonResponse>` — Hide the refresh button on the container header.

This method can return the following `status_code` values:
- `204` (No Content): Refresh button hidden successfully.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the container module
const container = new ContainerModule();

// Hide refresh button
const response = await container.hideRefreshButton();

// Handle the response
if (isSuccess(response)) {
  console.log('Refresh button hidden successfully');
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `isConnected(): Promise<IsConnectedResponse>` — Check if the web app is connected to the Grab SuperApp via `JSBridge`.

This method can return the following `status_code` values:
- `200` (OK): Connected to Grab SuperApp. The `result` contains IsConnectedResult.
- `404` (Not Found): Not connected to Grab SuperApp.

```typescript
import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the container module
const container = new ContainerModule();

// Check connection status
const response = await container.isConnected();

// Handle the response
if (isSuccess(response)) {
  console.log('Connected to Grab SuperApp:', response.result.connected);
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `onContentLoaded(): Promise<OnContentLoadedResponse>` — Notify the Grab SuperApp that the page content has loaded.

This method can return the following `status_code` values:
- `200` (OK): Notification sent successfully.
- `204` (No Content): Operation completed successfully.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the container module
const container = new ContainerModule();

// Notify content loaded
const response = await container.onContentLoaded();

// Handle the response
if (isSuccess(response)) {
  console.log('Content loaded notification sent successfully');
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `onCtaTap(request: string): Promise<OnCtaTapResponse>` — Notify the client that the user has tapped a call-to-action (CTA).

This method can return the following `status_code` values:
- `200` (OK): CTA tap notification sent successfully.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the container module
const container = new ContainerModule();

// Notify CTA tap
const response = await container.onCtaTap('AV_LANDING_PAGE_CONTINUE');

// Handle the response
if (isSuccess(response)) {
  console.log('CTA tap notified successfully');
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `openExternalLink(request: string): Promise<OpenExternalLinkResponse>` — Open a link in the external browser.

This method can return the following `status_code` values:
- `204` (No Content): External link opened successfully.
- `400` (Bad Request): Invalid request parameters.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the container module
const container = new ContainerModule();

// Open external link
const response = await container.openExternalLink('https://grab.com');

// Handle the response
if (isSuccess(response)) {
  console.log('External link opened successfully');
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `sendAnalyticsEvent(request: SendAnalyticsEventRequest): Promise<SendAnalyticsEventResponse>` — Use this method to track user interactions and page transitions.

This method can return the following `status_code` values:
- `204` (No Content): Analytics event sent successfully.
- `400` (Bad Request): Invalid request parameters.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import {
  ContainerModule,
  isSuccess,
  isError,
  ContainerAnalyticsEventState,
  ContainerAnalyticsEventName,
} from '@grabjs/superapp-sdk';

// Initialize the container module
const container = new ContainerModule();

// Send analytics event
const response = await container.sendAnalyticsEvent({
  state: ContainerAnalyticsEventState.HOMEPAGE,
  name: ContainerAnalyticsEventName.DEFAULT,
});

// Handle the response
if (isSuccess(response)) {
  console.log('Analytics event sent successfully');
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `setBackgroundColor(request: string): Promise<SetBackgroundColorResponse>` — Set the background color of the container header.

This method can return the following `status_code` values:
- `204` (No Content): Background color set successfully.
- `400` (Bad Request): Invalid request parameters.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the container module
const container = new ContainerModule();

// Set background color
const response = await container.setBackgroundColor('#ffffff');

// Handle the response
if (isSuccess(response)) {
  console.log('Background color set successfully');
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `setTitle(request: string): Promise<SetTitleResponse>` — Set the title of the container header.

This method can return the following `status_code` values:
- `204` (No Content): Title set successfully.
- `400` (Bad Request): Invalid request parameters.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the container module
const container = new ContainerModule();

// Set title
const response = await container.setTitle('Home');

// Handle the response
if (isSuccess(response)) {
  console.log('Title set successfully');
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `showBackButton(): Promise<ShowBackButtonResponse>` — Show the back button on the container header.

This method can return the following `status_code` values:
- `204` (No Content): Back button shown successfully.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the container module
const container = new ContainerModule();

// Show back button
const response = await container.showBackButton();

// Handle the response
if (isSuccess(response)) {
  console.log('Back button shown successfully');
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `showLoader(): Promise<ShowLoaderResponse>` — Show the full-screen loading indicator.

This method can return the following `status_code` values:
- `204` (No Content): Loader shown successfully.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the container module
const container = new ContainerModule();

// Show loader
const response = await container.showLoader();

// Handle the response
if (isSuccess(response)) {
  console.log('Loader shown successfully');
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `showRefreshButton(): Promise<ShowRefreshButtonResponse>` — Show the refresh button on the container header.

This method can return the following `status_code` values:
- `204` (No Content): Refresh button shown successfully.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the container module
const container = new ContainerModule();

// Show refresh button
const response = await container.showRefreshButton();

// Handle the response
if (isSuccess(response)) {
  console.log('Refresh button shown successfully');
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```
