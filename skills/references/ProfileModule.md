# ProfileModule

## API Reference

SDK module for accessing user profile information via `JSBridge`.

- `fetchEmail(): Promise<FetchEmailResponse>` — Fetches the user's email address from their Grab profile. (**OAuth Scope:** mobile.profile | **Minimum Grab App Version:** Android: 5.399.0, iOS: 5.399.0)

This method can return the following `status_code` values:
- `200` (OK): Email fetched successfully. The `result` contains FetchEmailResult.
- `204` (No Content): Email not available.
- `400` (Bad Request): Invalid request parameters.
- `403` (Forbidden): Client is not authorized to access user profile data.
- `426` (Upgrade Required): Feature requires Grab app version 5.399 or above.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { ProfileModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the profile module
const profile = new ProfileModule();

// Fetch the user's email
const response = await profile.fetchEmail();

// Handle the response
if (isSuccess(response)) {
  console.log('User email:', response.result.email);
} else if (isError(response)) {
  switch (response.status_code) {
    case 403:
      console.log('No permission to access user profile');
      // Trigger IdentityModule.authorize() for scope 'profile email', then reload via ScopeModule.reloadScopes() and try again
      break;
    case 426:
      console.log('User needs to upgrade the app');
      // Advise user to upgrade app
      break;
    default:
      console.error(`Error ${response.status_code}: ${response.error}`);
  }
} else {
  console.error('Unhandled response');
}
```

- `verifyEmail(request?: VerifyEmailRequest): Promise<VerifyEmailResponse>` — Verifies the user's email address by triggering email capture bottom sheet and OTP verification. (**OAuth Scope:** mobile.profile | **Minimum Grab App Version:** Android: 5.399.0, iOS: 5.399.0)

This method can return the following `status_code` values:
- `200` (OK): Success, email verified and returned in `result` as VerifyEmailResult.
- `204` (No Content): User closed the native bottom sheet.
- `400` (Bad Request): Invalid request parameters.
- `403` (Forbidden): Client is not authorized to access user profile data.
- `426` (Upgrade Required): Feature requires Grab app version 5.399 or above.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

**Simple usage with email provided**
```typescript
import { ProfileModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the profile module
const profile = new ProfileModule();

// Verify email with pre-filled email address
const response = await profile.verifyEmail({
  email: 'user@example.com',
  skipUserInput: true
});

// Handle the response
if (isSuccess(response)) {
  if (response.status_code === 200) {
    console.log('Verified email:', response.result.email);
  } else if (response.status_code === 204) {
    console.log('User closed the bottom sheet');
  }
} else if (isError(response)) {
  switch (response.status_code) {
    case 403:
      console.log('No permission to access user profile');
      // Trigger IdentityModule.authorize() for scope 'profile email', then reload via ScopeModule.reloadScopes() and try again
      break;
    case 426:
      console.log('User needs to upgrade the app');
      // Advise user to upgrade app
      break;
    default:
      console.error(`Error ${response.status_code}: ${response.error}`);
  }
} else {
  console.error('Unhandled response');
}
```

**Usage without parameters**
```typescript
import { ProfileModule } from '@grabjs/superapp-sdk';

const profile = new ProfileModule();

// Let user enter email in the native bottom sheet
const response = await profile.verifyEmail();
```
