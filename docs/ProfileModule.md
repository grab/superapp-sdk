# ProfileModule

## Description

The ProfileModule provides functionality related to user profile information.

## Methods

### 1. Fetch Email

**Method name**: `fetchEmail`

**Scopes to be requested**: `mobile.profile`

**Description**

This is used to fetch the verified email of the user. If the user does not have a verified email, the method will return a `status_code` of `204`.

**Arguments**

None

**Return type**

| Name | Type | Description |
| --- | --- | --- |
| result | Object \| null | Result of the fetch email operation. Returns `null` if no verified email is found (204). |
| error | String \| null | Error message if the operation fails |
| status_code | Number | HTTP status code for the operation |

**Result Object Properties**

When `status_code` is `200`, the result object contains:

| Property | Type | Description |
| --- | --- | --- |
| email | String | The verified email address of the user |

**Status Codes**

- **200**: Success, verified email found and returned in `result`
- **204**: No verified email found for the user
- **400**: Client error (e.g. invalid request)
- **500**: Internal server error

**Code example**

```javascript
import { ProfileModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only once and reuse across app.
const profileModule = new ProfileModule();

const { result, error, status_code } = await profileModule.fetchEmail();

if (status_code === 200 && result) {
  console.log("User email:", result.email);
} else if (status_code === 204) {
  console.log("User does not have a verified email.");
} else if (error) {
  console.error("Fetch email error:", error);
}
```

### 2. Verify Email

**Method name**: `verifyEmail`

**Scopes to be requested**: `mobile.profile`

**Description**

Trigger email capture bottom sheet and OTP verification. If the user closes the verify OTP bottom sheet, the method will return a `status_code` of `204`.

Successful verification will also update the email address for the user on Grab.

**Arguments**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| request | Object | Yes | Request parameters for email verification |

**Request Object Properties**

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| email | String | No | Email address for verification. Native bottom sheet will be displayed with this email address if not empty (User can edit before proceeding) |
| skipUserInput | Boolean | No | If set to `true`, and email is not empty, trigger the verify OTP bottom sheet directly. |

**Return type**

| Name | Type | Description |
| --- | --- | --- |
| result | Object \| null | Result of the verify email operation. Returns `null` if the user cancels (204). |
| error | String \| null | Error message if the operation fails |
| status_code | Number | HTTP status code for the operation |

**Result Object Properties**

When `status_code` is `200`, the result object contains:

| Property | Type | Description |
| --- | --- | --- |
| email | String | The verified email address of the user |

**Status Codes**

- **200**: Success, email verified and returned in `result`
- **204**: User closed the native bottom sheet
- **400**: Client error (e.g. invalid email format)
- **403**: Unauthorised
- **500**: Internal server error

**Code example**

```javascript
import { ProfileModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only once and reuse across app.
const profileModule = new ProfileModule();

const request = {
  email: "test@example.com",
  skipUserInput: false
};

const { result, error, status_code } = await profileModule.verifyEmail(request);

if (status_code === 200 && result) {
  console.log("Verified email:", result.email);
} else if (status_code === 204) {
  console.log("User closed the bottom sheet.");
} else if (error) {
  console.error("Verify email error:", error);
}
```
