/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BridgeResponse } from '../response';

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
 * @typeParam T - The type of data emitted by the stream.
 *
 * @public
 */
export type DataStreamHandlers<T> = Readonly<{
  /** Called with each new value from the stream. */
  next?: (data: BridgeResponse<T>) => unknown;
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
 * @typeParam T - The type of data emitted by the stream.
 *
 * @public
 */
export type DataStream<T> = Readonly<{
  /**
   * Subscribe to receive stream data.
   *
   * @param handlers - Optional callbacks for data (`next`) and completion (`complete`).
   * @returns A `Subscription` to terminate the stream when needed.
   */
  subscribe: (handlers?: DataStreamHandlers<T>) => Subscription;
}> &
  PromiseLike<BridgeResponse<T>>;
