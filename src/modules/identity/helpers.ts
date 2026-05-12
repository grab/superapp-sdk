/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { NAMESPACE, type StorageKey } from './constants';

/**
 * Builds the fully qualified storage key with namespace prefix.
 *
 * @param key - The storage key (without namespace prefix).
 * @returns The namespaced key string.
 *
 * @internal
 */
export function buildStorageKey(key: StorageKey): string {
  return `${NAMESPACE}:${key}`;
}

/**
 * Normalizes a URL string to its origin and pathname (without query params or hash).
 *
 * @param urlString - The URL string to normalize.
 * @returns The normalized URL containing only origin and pathname.
 *
 * @internal
 */
export function normalizeUrl(urlString: string): string {
  const parsedUrl = new URL(urlString);
  return `${parsedUrl.origin}${parsedUrl.pathname}`;
}

/**
 * Builds the authorization URL with query parameters.
 *
 * @param authorizationEndpoint - The authorization endpoint URL.
 * @param requestMap - An object containing the request parameters.
 * @returns The complete authorization URL with query string.
 *
 * @internal
 */
export function buildAuthorizeUrl(
  authorizationEndpoint: string,
  requestMap: Record<string, string | number | boolean | undefined | null>
): string {
  const query = Object.entries(requestMap)
    .filter(
      (entry): entry is [string, string | number | boolean] =>
        entry[1] !== undefined && entry[1] !== null
    )
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return query.length > 0 ? `${authorizationEndpoint}?${query}` : authorizationEndpoint;
}
