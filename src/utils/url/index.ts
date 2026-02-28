/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Normalizes a URL by extracting only the origin and pathname.
 *
 * @internal
 *
 * @param urlString - The URL string to normalize.
 *
 * @returns Normalized URL with only origin and pathname.
 *
 * @remarks
 * Strips query parameters and hash fragments. Useful for canonical URL comparison or routing keys.
 */
export function normalizeUrl(urlString: string): string {
  const parsedUrl = new URL(urlString);
  return `${parsedUrl.origin}${parsedUrl.pathname}`;
}
