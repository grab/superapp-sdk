/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { GrabAppInfo } from '../utils/platform';

/**
 * Success response from the bridge SDK.
 *
 * @remarks
 * Returned when a JSBridge method completes successfully.
 * The `result` field contains the JSBridge method's data.
 *
 * @public
 */
export type ResponseStatusCode200<T> = {
  /** HTTP-style status code indicating the outcome of the JSBridge method call */
  status_code: 200;
  /** The result data from the JSBridge method, or undefined if no result was returned */
  result: T;
};

/**
 * No result response with status code 204.
 *
 * @remarks
 * Returned when a JSBridge method completes with no content (e.g., user cancelled a dialog).
 * No `result` or `error` data is returned.
 *
 * @public
 */
export type ResponseStatusCode204 = {
  /** HTTP-style status code indicating the outcome of the JSBridge method call */
  status_code: 204;
};

/**
 * Union type representing all successful JSBridge responses.
 * Includes status codes 200 (with result data) and 204 (no content).
 *
 * @public
 */
export type BridgeSuccessResponse<T> = ResponseStatusCode200<T> | ResponseStatusCode204;

/**
 * Redirect response with status code 302.
 *
 * @remarks
 * Returned when a JSBridge method initiates a redirect (e.g., OAuth2 redirect flow).
 * No `result` or `error` data is returned as the page will navigate away.
 *
 * @public
 */
export type ResponseStatusCode302 = {
  /** HTTP-style status code indicating the outcome of the JSBridge method call */
  status_code: 302;
};

/**
 * Union type representing redirect JSBridge responses.
 * Currently only includes status code 302.
 *
 * @public
 */
export type BridgeRedirection = ResponseStatusCode302;

/**
 * Generic error response shape with a specific status code.
 * Used as the base for all error response types (4xx and 5xx).
 *
 * @typeParam Code - The HTTP status code (e.g., 400, 401, 500)
 *
 * @public
 */
export type ErrorResponse<Code extends number> = {
  /** HTTP-style status code indicating the outcome of the JSBridge method call */
  status_code: Code;
  /** Error message if the call failed */
  error: string;
};

/**
 * Error response with status code 400
 *
 * @public
 */
export type ResponseStatusCode400 = ErrorResponse<400>;

/**
 * Error response with status code 401
 *
 * @public
 */
export type ResponseStatusCode401 = ErrorResponse<401>;

/**
 * Error response with status code 403
 *
 * @public
 */
export type ResponseStatusCode403 = ErrorResponse<403>;

/**
 * Error response with status code 404
 *
 * @public
 */
export type ResponseStatusCode404 = ErrorResponse<404>;

/**
 * Error response with status code 424
 *
 * @public
 */
export type ResponseStatusCode424 = ErrorResponse<424>;

/**
 * Error response with status code 426
 *
 * @remarks
 * Returned when the JSBridge method requires a newer version of the Grab app.
 * This indicates the method is not supported in the current app version.
 *
 * @public
 */
export type ResponseStatusCode426 = ErrorResponse<426>;

/**
 * Union type representing all client error JSBridge responses (4xx status codes).
 * Includes: 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found),
 * 424 (Failed Dependency), and 426 (Upgrade Required).
 *
 * @public
 */
export type BridgeClientError =
  | ResponseStatusCode400
  | ResponseStatusCode401
  | ResponseStatusCode403
  | ResponseStatusCode404
  | ResponseStatusCode424
  | ResponseStatusCode426;

/**
 * Error response with status code 500
 *
 * @public
 */
export type ResponseStatusCode500 = ErrorResponse<500>;

/**
 * Error response with status code 501
 *
 * @remarks
 * Returned when a JSBridge method is called outside the Grab app environment.
 * This indicates the method is not implemented in the current environment.
 *
 * @public
 */
export type ResponseStatusCode501 = ErrorResponse<501>;

/**
 * Union type representing server error JSBridge responses (5xx status codes).
 * Includes status codes 500 (Internal Server Error) and 501 (Not Implemented).
 *
 * @public
 */
export type BridgeServerError = ResponseStatusCode500 | ResponseStatusCode501;

/**
 * Union type representing all error JSBridge responses (4xx and 5xx status codes).
 * Combines both client errors and server errors.
 *
 * @public
 */
export type BridgeError = BridgeClientError | BridgeServerError;

/**
 * Map of individual status codes to their JSBridge response types.
 * Used internally by BridgeResponse to select specific response types.
 *
 * @public
 */
export type StatusCodeMap<T> = {
  200: ResponseStatusCode200<T>;
  204: ResponseStatusCode204;
  302: ResponseStatusCode302;
  400: ResponseStatusCode400;
  401: ResponseStatusCode401;
  403: ResponseStatusCode403;
  404: ResponseStatusCode404;
  424: ResponseStatusCode424;
  426: ResponseStatusCode426;
  500: ResponseStatusCode500;
  501: ResponseStatusCode501;
};

/**
 * Helper type representing all possible JSBridge status codes.
 *
 * @public
 */
export type BridgeStatusCode = keyof StatusCodeMap<unknown>;

/**
 * Universal response type for JSBridge method callbacks.
 *
 * @remarks
 * Represents the response shape from a JSBridge method call. Use with specific status codes
 * to constrain which responses are possible, or use `BridgeStatusCode` for the full union.
 *
 * This type works for both single (non-streaming) responses and as the item type
 * emitted by {@link BridgeStream}.
 *
 * Status codes come first in the type parameters for better readability at module call sites.
 *
 * @example
 * ```typescript
 * // Constrained to specific status codes (common case)
 * type SuccessOrError = BridgeResponse<200 | 500, string>;
 *
 * // Only success
 * type OnlySuccess = BridgeResponse<200, string>;
 *
 * // Unconstrained - all status codes possible (internal use)
 * type AnyResponse = BridgeResponse<BridgeStatusCode, string>;
 * ```
 *
 * @public
 */
export type BridgeResponse<
  Codes extends BridgeStatusCode = BridgeStatusCode,
  T = void,
> = StatusCodeMap<T>[Codes];

/**
 * Controls an active stream subscription. Call `unsubscribe()` to stop receiving data.
 *
 * @remarks
 * Returned by `subscribe()`. Use `unsubscribe()` to terminate the stream early.
 * Use `isUnsubscribed()` to check if already terminated.
 *
 * @public
 */
export type Subscription = Readonly<{
  /** Returns true if this subscription has been terminated. */
  isUnsubscribed: () => boolean;
  /** Terminates the subscription. No further data will be received. */
  unsubscribe: () => unknown;
}>;

/**
 * Callbacks for handling stream events.
 *
 * @remarks
 * Pass these to `subscribe()` to receive data via `next` and completion via `complete`.
 *
 * @typeParam Codes - The status codes that can be emitted by the stream.
 * @typeParam T - The type of data emitted by the stream.
 *
 * @public
 */
export type BridgeStreamHandlers<
  Codes extends BridgeStatusCode = BridgeStatusCode,
  T = void,
> = Readonly<{
  /** Called with each new value from the stream. */
  next?: (data: BridgeResponse<Codes, T>) => unknown;
  /** Called when the stream ends and no more data will arrive. */
  complete?: () => unknown;
}>;

/**
 * A stream for receiving continuous data from JSBridge methods (e.g., location updates).
 *
 * @remarks
 * Provides both Observable-like and Promise-like interfaces:
 * - Use `subscribe()` to receive all values over time
 * - Use `then()` or `await` to receive only the first value
 *
 * Note: Each `subscribe()` call creates a fresh subscription, allowing multiple independent listeners.
 *
 * @typeParam Codes - The status codes that can be emitted by the stream.
 * @typeParam T - The type of data emitted by the stream.
 *
 * @public
 */
export type BridgeStream<Codes extends BridgeStatusCode = BridgeStatusCode, T = void> = Readonly<{
  /**
   * Subscribe to receive stream data.
   *
   * @param handlers - Optional callbacks for data (`next`) and completion (`complete`).
   * @returns A `Subscription` to terminate the stream when needed.
   */
  subscribe: (handlers?: BridgeStreamHandlers<Codes, T>) => Subscription;
}> &
  PromiseLike<BridgeResponse<Codes, T>>;

/**
 * Generic interface for all native JSBridge module wrappers.
 *
 * @remarks
 * This is the base interface that all Wrapped*Module interfaces implement.
 * Modules can use this directly for generic method invocation, or extend it
 * with method-specific overloads for stricter typing.
 *
 * @example
 * Using directly (CameraModule, ContainerModule):
 * ```typescript
 * invoke<ScanQRCodeResult>('scanQRCode', request)
 * ```
 *
 * @example
 * Extending with method overloads (ProfileModule, LocationModule):
 * ```typescript
 * export interface WrappedProfileModule extends WrappedModule {
 *   invoke(method: 'fetchEmail', params?: any): Promise<BridgeResponse<BridgeStatusCode, string>>;
 * }
 * ```
 *
 * @public
 */
export interface WrappedModule {
  invoke<T>(
    method: string,
    params?: unknown
  ): BridgeStream<BridgeStatusCode, T> | Promise<BridgeResponse<BridgeStatusCode, T>>;
}

/**
 * Options for invoking a JSBridge method.
 *
 * @public
 */
export interface InvokeOptions<T> {
  /** The name of the JSBridge method to invoke */
  method: string;
  /** The parameters to pass to the method */
  params?: unknown;
  /** Validator function - returns false = 426 with default error */
  isSupported?: (appInfo: GrabAppInfo) => boolean;
  /** Optional response transformation function */
  transformResponse?: (
    response: BridgeResponse<BridgeStatusCode, T>
  ) => BridgeResponse<BridgeStatusCode, T>;
}
