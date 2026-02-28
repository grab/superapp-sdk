/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Generates a cryptographically random string of specified length using alphanumeric characters.
 *
 * @internal
 *
 * @param length - The desired length of the random string.
 *
 * @returns Random alphanumeric string.
 *
 * @remarks
 * Uses `crypto.getRandomValues` for secure randomness. Suitable for PKCE code verifiers and state parameters.
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
 * Encodes a string to Base64 URL-safe format per RFC 4648.
 *
 * @internal
 *
 * @param str - The string to encode.
 *
 * @returns Base64 URL-encoded string.
 *
 * @remarks
 * Replaces `+`, `/`, and `=` with URL-safe alternatives (`-`, `_`, omitted). Required for PKCE code verifier/challenge encoding.
 */
export function base64URLEncode(str: string): string {
  return btoa(str).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

/**
 * Generates a PKCE (Proof Key for Code Exchange) code verifier.
 *
 * @internal
 *
 * @param length - The desired length of the random string before Base64 URL encoding.
 *
 * @returns Base64 URL-encoded code verifier.
 *
 * @remarks
 * Used in OAuth 2.0 PKCE flows. The verifier is stored and later hashed to produce the code challenge.
 */
export function generateCodeVerifier(length: number): string {
  return base64URLEncode(generateRandomString(length));
}

/**
 * Encodes an ArrayBuffer to Base64 URL-safe format per RFC 4648.
 *
 * @internal
 *
 * @param buffer - The raw bytes to encode.
 *
 * @returns Base64 URL-encoded string.
 */
function base64URLEncodeBuffer(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

/**
 * Generates a PKCE code challenge from a code verifier using SHA-256.
 *
 * @internal
 *
 * @param codeVerifier - The code verifier to hash.
 *
 * @returns Promise resolving to Base64 URL-encoded code challenge.
 *
 * @remarks
 * Uses S256 method via Web Crypto API. The challenge is sent to the authorization server; the verifier is sent with the token request.
 */
export async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return base64URLEncodeBuffer(digest);
}

/**
 * Builds an OAuth authorization URL with query parameters.
 *
 * @internal
 *
 * @param authorizationEndpoint - The base authorization endpoint URL.
 * @param requestMap - Object containing query parameters (e.g., client_id, redirect_uri, response_type).
 *
 * @returns Complete authorization URL with query string.
 *
 * @remarks
 * Skips entries with `undefined` or `null` values. Keys and values are URI-encoded.
 */
export function buildAuthorizeUrl(
  authorizationEndpoint: string,
  requestMap: Record<string, string | undefined | null>
): string {
  const query = Object.entries(requestMap)
    .filter((entry): entry is [string, string] => entry[1] !== undefined && entry[1] !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return `${authorizationEndpoint}?${query}`;
}
