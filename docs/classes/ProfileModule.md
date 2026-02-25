[@grabjs/superapp-sdk](../README.md) / ProfileModule

# Class: ProfileModule

The ProfileModule provides functionality related to user profile information.

**Required Scope:** `mobile.profile`

**Version Requirements:** This module requires Grab app version 5.399 or above.

## Example

```javascript
import { ProfileModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only once and reuse across app.
const profileModule = new ProfileModule();
```

## Extends

- `ModuleBase`

## Constructors

### Constructor

> **new ProfileModule**(): `ProfileModule`

#### Returns

`ProfileModule`

#### Overrides

`ModuleBase.constructor`

## Methods

### fetchEmail()

> **fetchEmail**(): `Promise`\<[`FetchEmailResponse`](../type-aliases/FetchEmailResponse.md)\>

Fetch the user's verified email address.

#### Returns

`Promise`\<[`FetchEmailResponse`](../type-aliases/FetchEmailResponse.md)\>

Promise that resolves to [FetchEmailResponse](../type-aliases/FetchEmailResponse.md) with the user's email.

#### Remarks

**Required Scope:** `mobile.profile`

**Version Requirements:** This method requires Grab app version 5.399 or above.

If the user does not have a verified email, the method will return a `status_code` of `204`.

**Status Codes:**
- `200`: Success, verified email found and returned in `result`
- `204`: No verified email found for the user
- `400`: Client error (e.g. invalid request)
- `403`: Feature not supported (requires Grab app version 5.399 or above)
- `500`: Internal server error

#### Example

```javascript
const { result, error, status_code } = await profileModule.fetchEmail();

if (status_code === 200 && result) {
  console.log("User email:", result.email);
  // Use email for pre-filling forms or verification
  document.getElementById('email').value = result.email;
} else if (status_code === 204) {
  console.log("User does not have a verified email.");
  // Prompt user to add email
  showEmailCaptureForm();
} else if (status_code === 403) {
  console.error("Feature not supported:", error);
} else if (error) {
  console.error("Fetch email error:", error);
}
```

***

### verifyEmail()

> **verifyEmail**(`verifyEmailDetails`: [`VerifyEmailRequest`](../type-aliases/VerifyEmailRequest.md)): `Promise`\<[`VerifyEmailResponse`](../type-aliases/VerifyEmailResponse.md)\>

Trigger email capture bottom sheet and OTP verification.

#### Parameters

##### verifyEmailDetails

[`VerifyEmailRequest`](../type-aliases/VerifyEmailRequest.md)

Email verification details.
  - `email`: Email address for verification. Native bottom sheet will be displayed with this email address if not empty (User can edit before proceeding) (optional)
  - `skipUserInput`: If set to `true`, and email is not empty, trigger the verify OTP bottom sheet directly (optional)

#### Returns

`Promise`\<[`VerifyEmailResponse`](../type-aliases/VerifyEmailResponse.md)\>

Promise that resolves to [VerifyEmailResponse](../type-aliases/VerifyEmailResponse.md) with the verified email.

#### Remarks

**Required Scope:** `mobile.profile`

**Version Requirements:** This method requires Grab app version 5.399 or above.

If the user closes the verify OTP bottom sheet, the method will return a `status_code` of `204`.
Successful verification will also update the email address for the user on Grab.

**Status Codes:**
- `200`: Success, email verified and returned in `result`
- `204`: User closed the native bottom sheet
- `400`: Client error (e.g. invalid email format)
- `403`: Unauthorised or feature not supported (requires Grab app version 5.399 or above)
- `500`: Internal server error

#### Example

```javascript
// Example 1: Let user enter email
const response1 = await profileModule.verifyEmail({});
if (response1.status_code === 200 && response1.result) {
  console.log("Verified email:", response1.result.email);
}

// Example 2: Pre-fill email and let user edit
const response2 = await profileModule.verifyEmail({
  email: "test@example.com",
  skipUserInput: false
});

// Example 3: Skip user input and verify directly
const response3 = await profileModule.verifyEmail({
  email: "test@example.com",
  skipUserInput: true
});

if (response3.status_code === 200 && response3.result) {
  console.log("Email verified successfully:", response3.result.email);
  saveEmailToDatabase(response3.result.email);
} else if (response3.status_code === 204) {
  console.log("User closed the bottom sheet.");
} else if (response3.status_code === 403) {
  console.error("Feature not supported:", response3.error);
} else if (response3.error) {
  console.error("Verify email error:", response3.error);
}
```
