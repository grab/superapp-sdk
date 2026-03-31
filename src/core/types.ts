/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { GenericSchema } from 'valibot';

import { GrabAppInfo } from '../utils/platform';

/**
 * Base response type for all JSBridge calls.
 *
 * @remarks
 * Every response has a numeric `status_code`. Success responses (200) carry `result`;
 * error responses (4xx/5xx) carry `error`. Use the type guards ({@link isSuccess},
 * {@link isError}, etc.) to narrow to a specific shape.
 *
 * Per-module response types (e.g., `ScanQRCodeResponse`) are derived from their valibot
 * schemas via `v.InferOutput` and form proper discriminated unions — enabling precise
 * TypeScript narrowing while this base type serves as the internal contract.
 *
 * @public
 */
export type BridgeResponse = {
  /** HTTP-style status code indicating the outcome of the JSBridge method call */
  status_code: number;
  /** The result data from the JSBridge method, present on 200 responses */
  result?: unknown;
  /** Error message, present on 4xx/5xx responses */
  error?: string;
};

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
 * @typeParam T - The response type emitted by the stream.
 *
 * @public
 */
export type BridgeStreamHandlers<T extends BridgeResponse = BridgeResponse> = Readonly<{
  /** Called with each new value from the stream. */
  next?: (data: T) => unknown;
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
 * @typeParam T - The response type emitted by the stream.
 *
 * @public
 */
export type BridgeStream<T extends BridgeResponse = BridgeResponse> = Readonly<{
  /**
   * Subscribe to receive stream data.
   *
   * @param handlers - Optional callbacks for data (`next`) and completion (`complete`).
   * @returns A `Subscription` to terminate the stream when needed.
   */
  subscribe: (handlers?: BridgeStreamHandlers<T>) => Subscription;
}> &
  PromiseLike<T>;

/**
 * Generic interface for all native JSBridge module wrappers.
 *
 * @public
 */
export interface WrappedModule {
  invoke(method: string, params?: unknown): BridgeStream | Promise<BridgeResponse>;
}

/**
 * Options for invoking a JSBridge method.
 *
 * @public
 */
export interface InvokeOptions {
  /** The name of the JSBridge method to invoke */
  method: string;
  /** The parameters to pass to the method */
  params?: unknown;
  /** Validator function - returns false = 426 with default error */
  isSupported?: (appInfo: GrabAppInfo) => boolean;
  /** Optional response transformation function */
  transformResponse?: (response: BridgeResponse) => BridgeResponse;
  /** Schema to validate params before the bridge call — returns 400 on failure */
  requestSchema?: GenericSchema;
  /** Schema to validate the bridge response — logs a warning on mismatch */
  responseSchema?: GenericSchema;
}
