/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

/**
 * Generates a random string of specified length using the browser's crypto API.
 *
 * @param length - The length of the random string to generate.
 * @returns A random string containing alphanumeric characters.
 *
 * @internal
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
 * Encodes a string to base64url format (RFC 4648).
 *
 * @param str - The string to encode.
 * @returns The base64url-encoded string.
 *
 * @internal
 */
export function base64URLEncodeString(str: string): string {
  return btoa(str).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

/**
 * Encodes an ArrayBuffer to base64url format (RFC 4648).
 *
 * @param buffer - The ArrayBuffer to encode.
 * @returns The base64url-encoded string.
 *
 * @internal
 */
export function base64URLEncodeFromBytes(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

/**
 * Generates a PKCE code verifier of the specified length.
 *
 * @param length - The length of the code verifier to generate.
 * @returns The base64url-encoded code verifier string.
 *
 * @internal
 */
export function generateCodeVerifier(length: number): string {
  return base64URLEncodeString(generateRandomString(length));
}

/**
 * Generates a PKCE code challenge from a code verifier using SHA256.
 *
 * @param codeVerifier - The code verifier to hash.
 * @returns A promise resolving to the base64url-encoded code challenge.
 *
 * @internal
 */
export async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return base64URLEncodeFromBytes(hashBuffer);
}
