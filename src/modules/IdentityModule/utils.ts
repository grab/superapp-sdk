/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import sha256 from 'crypto-js/sha256';

/**
 * Generates a random string of specified length using alphanumeric characters
 * @param length - The desired length of the random string
 * @returns Random alphanumeric string
 */
export function generateRandomString(length: number): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  let result = '';
  for (let i = 0; i < length; i += 1) {
    result += charset.charAt(randomValues[i] % charset.length);
  }
  return result;
}

/**
 * Encodes a string to Base64 URL-safe format
 * Replaces +, /, and = characters with URL-safe alternatives
 * @param str - The string to encode
 * @returns Base64 URL-encoded string
 */
export function base64URLEncode(str: string): string {
  return btoa(str).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

/**
 * Generates a PKCE code verifier
 * @param length - The desired length of the random string before encoding
 * @returns Base64 URL-encoded code verifier
 */
export function generateCodeVerifier(length: number): string {
  return base64URLEncode(generateRandomString(length));
}

/**
 * Generates a PKCE code challenge from a code verifier using SHA-256
 * @param codeVerifier - The code verifier to hash
 * @returns Base64 URL-encoded code challenge
 */
export function generateCodeChallenge(codeVerifier: string): string {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  return base64URLEncode(sha256(codeVerifier).toString());
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
