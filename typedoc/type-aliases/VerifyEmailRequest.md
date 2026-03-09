[@grabjs/superapp-sdk](../README.md) / VerifyEmailRequest

# Type Alias: VerifyEmailRequest

> **VerifyEmailRequest** = \{ `email`: `string`; `otp`: `string`; \}

Request parameters for verifying the user's email with an OTP.

## Example

```typescript
{
  email: 'user@example.com',
  otp: '123456'
}
```

## Properties

### email

> **email**: `string`

The email address to verify.

***

### otp

> **otp**: `string`

The one-time password (OTP) entered by the user.
