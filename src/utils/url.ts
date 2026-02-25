/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Normalizes a URL by extracting only the origin and pathname
 * Removes query parameters and hash fragments
 * @param urlString - The URL string to normalize
 * @returns Normalized URL with only origin and pathname
 */
export function normalizeUrl(urlString: string): string {
  const parsedUrl = new URL(urlString);
  return `${parsedUrl.origin}${parsedUrl.pathname}`;
}

/**
 * Builds an authorization URL with query parameters
 * @param authorizationEndpoint - The base authorization endpoint URL
 * @param requestMap - Object containing query parameters
 * @returns Complete authorization URL with query string
 */
export function buildAuthorizeUrl(
  authorizationEndpoint: string,
  requestMap: Record<string, string>
): string {
  const query = Object.entries(requestMap)
    .filter((entry) => entry[1] !== undefined && entry[1] !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return `${authorizationEndpoint}?${query}`;
}
