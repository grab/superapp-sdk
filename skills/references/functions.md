# Functions

## `isClientError`
Type guard to check if a JSBridge response is a client error (4xx status codes).
```ts
isClientError<T>(response: T): response is Extract<T, { status_code: 400 | 401 | 403 | 404 | 424 | 426 }>
```

## `isError`
Type guard to check if a JSBridge response is an error (4xx or 5xx status codes).
```ts
isError<T>(response: T): response is Extract<T, { error: string }>
```

## `isErrorWithMessage`
Type guard to check if an error has a message property.
Use this to safely narrow  errors in catch blocks.
```ts
isErrorWithMessage(error: unknown): error is { message: string }
```

## `isFound`
Type guard to check if a JSBridge response is a 302 Found redirect.
```ts
isFound<T>(response: T): response is Extract<T, { status_code: 302 }>
```

## `isNoContent`
Type guard to check if a JSBridge response is a 204 No Content (operation succeeded with no result).
```ts
isNoContent<T>(response: T): response is Extract<T, { status_code: 204 }>
```

## `isOk`
Type guard to check if a JSBridge response is a 200 OK (operation succeeded with a result).
```ts
isOk<T>(response: T): response is Extract<T, { status_code: 200 }>
```

## `isRedirection`
Type guard to check if a JSBridge response is a redirect (status code 302).
```ts
isRedirection<T>(response: T): response is Extract<T, { status_code: 302 }>
```

## `isServerError`
Type guard to check if a JSBridge response is a server error (5xx status codes).
```ts
isServerError<T>(response: T): response is Extract<T, { status_code: 500 | 501 }>
```

## `isSuccess`
Type guard to check if a JSBridge response is successful (status codes 200 or 204).
```ts
isSuccess<T>(response: T): response is Extract<T, { status_code: 200 | 204 }>
```