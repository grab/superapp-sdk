/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Native response from the bridge SDK
 * Universal response format for all native modules
 */
export type WrappedResponse<T> =
  | {
      /**
       * Error message if the operation failed
       */
      error?: undefined;
      /**
       * Result data if the operation succeeded
       */
      result: T;
      /**
       * HTTP status code indicating the result of the operation
       */
      status_code: 200;
    }
  | {
      /**
       * Error message if the operation failed
       */
      error?: undefined;
      /**
       * Result data if the operation succeeded
       */
      result?: undefined;
      /**
       * HTTP status code indicating the result of the operation
       */
      status_code: 204 | 302;
    }
  | {
      /**
       * Error message if the operation failed
       */
      error: string;
      /**
       * Result data if the operation succeeded
       */
      result?: undefined;
      /**
       * HTTP status code indicating the result of the operation
       */
      status_code: 400 | 403 | 424 | 500;
    };

/**
 * Helper type to create a typed invoke function
 */
export type InvokeFn<T> = <K extends keyof T>(
  method: K,
  ...args: T[K] extends { params: never } ? [] : [T[K] extends { params: infer P } ? P : never]
) => T[K] extends { response: infer R } ? Promise<R> : never;
