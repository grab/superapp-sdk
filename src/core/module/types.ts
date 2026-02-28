/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Success response from the bridge SDK.
 *
 * @remarks
 * Returned when a native operation completes successfully. The `result` field contains the operation data.
 * Use type narrowing on `status_code === 200` to safely access `result` in union types.
 */
export type SuccessResponse<T> = {
  /**
   * Status code: `200` - Operation completed successfully
   */
  status_code: 200;
  /**
   * The result data from the successful operation
   */
  result: T;
  /**
   * Always undefined for success responses
   */
  error?: undefined;
};

/**
 * No result response from the bridge SDK.
 *
 * @remarks
 * Returned when an operation completes with no content (e.g., user cancelled a dialog, redirect occurred).
 * No `result` or `error` data is provided.
 */
export type NoResultResponse = {
  /**
   * Status codes:
   * - `204`: No content (user cancelled or operation returned no data)
   * - `302`: Redirect occurred
   */
  status_code: 204 | 302;
  /**
   * Always undefined for no-result responses
   */
  result?: undefined;
  /**
   * Always undefined for no-result responses
   */
  error?: undefined;
};

/**
 * Error response from the bridge SDK.
 *
 * @remarks
 * Returned when a native operation fails. The `error` field contains a human-readable message.
 * Use type narrowing on `status_code` to distinguish between validation, permission, and server errors.
 */
export type ErrorResponse = {
  /**
   * Status codes:
   * - `400`: Bad request (invalid parameters)
   * - `403`: Forbidden (permission denied)
   * - `424`: Failed dependency
   * - `500`: Internal server error
   */
  status_code: 400 | 403 | 424 | 500;
  /**
   * Always undefined for error responses
   */
  result?: undefined;
  /**
   * Error message describing what went wrong
   */
  error: string;
};

/**
 * Universal response format for all native module operations.
 *
 * @remarks
 * All bridge SDK method calls resolve to this union type. Check `status_code` to determine the outcome:
 * - `200`: Success — use `result`
 * - `204` or `302`: No content or redirect
 * - `400`, `403`, `424`, `500`: Error — use `error`
 */
export type Response<T> = SuccessResponse<T> | NoResultResponse | ErrorResponse;

/**
 * Helper type to create a typed invoke function for native module method calls.
 *
 * @remarks
 * Infers `params` and `response` from the method map. Methods with `params: never` accept no arguments;
 * others require the corresponding params object.
 */
export type Invoke<T> = <K extends keyof T>(
  method: K,
  ...args: T[K] extends { params: never } ? [] : [T[K] extends { params: infer P } ? P : never]
) => T[K] extends { response: infer R } ? Promise<R> : never;

/**
 * Method map shape: each key is a method name; value is `{ params: P; response: R }` or `{ params: never; response: R }`.
 *
 * @remarks
 * Use this to type module method maps for consistency. Example:
 * `type CameraModuleMethods = MethodMap<{ scanQRCode: { params: ScanQRCodeRequest; response: ScanQRCodeResponse } }>`
 */
export type MethodMap = Record<
  string,
  { params: unknown; response: unknown } | { params: never; response: unknown }
>;

/**
 * Wrapped module interface for native bridge invocations.
 *
 * @remarks
 * Each module's global wrapper (e.g., WrappedContainerModule) conforms to this interface.
 * Use for consistent `declare global` Window augmentations.
 */
export type WrappedModule<T extends MethodMap> = {
  /**
   * Invokes a native module method.
   *
   * @param method - The method name to invoke
   * @param params - Optional parameters for the method
   * @returns Promise resolving to the native module response
   */
  invoke: Invoke<T>;
};
