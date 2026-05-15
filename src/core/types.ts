/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

/**
 * Client error status codes for SDK error responses.
 *
 * @group Core
 *
 * @public
 */
export type SDKClientErrorStatusCode = 400 | 401 | 403 | 404 | 424 | 426;

/**
 * Server error status codes for SDK error responses.
 *
 * @group Core
 *
 * @public
 */
export type SDKServerErrorStatusCode = 500 | 501;

/**
 * Error status codes for SDK error responses.
 *
 * @group Core
 *
 * @public
 */
export type SDKErrorStatusCode = SDKClientErrorStatusCode | SDKServerErrorStatusCode;

/**
 * SDK `200` status code response with a typed `result` payload.
 *
 * @group Core
 *
 * @public
 */
export interface SDKOkResponse<T> {
  readonly status_code: 200;
  readonly result: T;
}

/**
 * SDK `204` status code response.
 *
 * @group Core
 *
 * @public
 */
export interface SDKNoContentResponse {
  readonly status_code: 204;
}

/**
 * SDK `302` status code response.
 *
 * @group Core
 *
 * @public
 */
export interface SDKRedirectResponse {
  readonly status_code: 302;
}

/**
 * SDK error status code response with a `error` message.
 *
 * @group Core
 *
 * @public
 */
export interface SDKErrorResponse<C extends SDKErrorStatusCode> {
  readonly status_code: C;
  readonly error: string;
}

/**
 * Base SDK response shape.
 *
 * @group Core
 *
 * @remarks
 * Use the type guards to narrow to a specific shape.
 *
 * @public
 */
export type SDKResponse = {
  /** HTTP-style status code indicating the outcome of the SDK method call */
  status_code: number;
  /** The result data from the SDK method, present on 200 status code responses */
  result?: unknown;
  /** Error message, present on error status code responses */
  error?: string;
};

/**
 * Controls an active stream subscription.
 *
 * @group Core
 *
 * @remarks
 * Returned by `subscribe()`. Use `unsubscribe()` to terminate the stream early.
 * Use `isUnsubscribed()` to check if already terminated.
 *
 * @public
 */
export type Subscription = Readonly<{
  /** Returns `true` if this subscription has been terminated. */
  isUnsubscribed: () => boolean;
  /** Terminates the subscription. No further data will be received. */
  unsubscribe: () => unknown;
}>;

/**
 * Callbacks for handling stream events.
 *
 * @group Core
 *
 * @remarks
 * Pass these to `subscribe()` to receive data via `next` and completion via `complete`.
 *
 * @typeParam T - The response type emitted by the stream.
 *
 * @public
 */
export type SDKStreamHandlers<T extends SDKResponse = SDKResponse> = Readonly<{
  /** Called with each new value from the stream. */
  next?: (data: T) => unknown;
  /** Called when the stream ends and no more data will arrive. */
  complete?: () => unknown;
}>;

/**
 * A stream for receiving continuous data from SDK methods (e.g., location updates).
 *
 * @group Core
 *
 * @remarks
 * Provides both Observable-like and Promise-like interfaces:
 * - Use `subscribe()` to receive all values over time
 * - Use `then()` or `await` to receive only the first value
 *
 * Note: Each `subscribe()` call creates a fresh subscription, allowing multiple independent listeners.
 *
 * @typeParam T - The response type emitted by the stream.
 *
 * @public
 */
export type SDKStream<T extends SDKResponse = SDKResponse> = Readonly<{
  /**
   * Subscribe to receive stream data.
   *
   * @param handlers - Optional callbacks for data (`next`) and completion (`complete`).
   * @returns A `Subscription` to terminate the stream when needed.
   */
  subscribe: (handlers?: SDKStreamHandlers<T>) => Subscription;
}> &
  PromiseLike<T>;

/**
 * Generic interface for all SDK module wrappers exposed through `JSBridge`.
 *
 * @group Core
 *
 * @public
 */
export interface WrappedModule {
  invoke(method: string, params?: unknown): SDKStream | Promise<SDKResponse>;
}

/**
 * Options for invoking an SDK method.
 *
 * @group Core
 *
 * @public
 */
export interface ModuleInvokeOptions {
  /** The name of the SDK method to invoke */
  method: string;
  /** The parameters to pass to the method */
  params?: unknown;
}
