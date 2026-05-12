/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { describe, expect, it } from 'vitest';

import { buildAuthorizeUrl, buildStorageKey, normalizeUrl } from './helpers';

describe('identity/helpers', () => {
  describe('buildStorageKey', () => {
    it('prefixes each StorageKey with grabid namespace', () => {
      expect(buildStorageKey('nonce')).toBe('grabid:nonce');
      expect(buildStorageKey('state')).toBe('grabid:state');
      expect(buildStorageKey('code_verifier')).toBe('grabid:code_verifier');
      expect(buildStorageKey('redirect_uri')).toBe('grabid:redirect_uri');
      expect(buildStorageKey('login_return_uri')).toBe('grabid:login_return_uri');
    });
  });

  describe('normalizeUrl', () => {
    it('strips query string', () => {
      expect(normalizeUrl('https://a.example/cb?x=1')).toBe('https://a.example/cb');
    });

    it('strips hash', () => {
      expect(normalizeUrl('https://a.example/cb#frag')).toBe('https://a.example/cb');
    });

    it('strips query and hash and preserves pathname', () => {
      expect(normalizeUrl('https://a.example/cb/sub?x=1#h')).toBe('https://a.example/cb/sub');
    });

    it('preserves origin including port', () => {
      expect(normalizeUrl('https://a.example:8443/cb?x=1')).toBe('https://a.example:8443/cb');
    });
  });

  describe('buildAuthorizeUrl', () => {
    it('joins endpoint with URL-encoded query pairs', () => {
      expect(
        buildAuthorizeUrl('https://auth.example/oauth', {
          scope: 'openid profile',
          token: 'a+b',
        })
      ).toBe('https://auth.example/oauth?scope=openid%20profile&token=a%2Bb');
    });

    it('filters undefined and null entries', () => {
      expect(
        buildAuthorizeUrl('https://auth.example/oauth', {
          a: '1',
          b: undefined,
          c: null,
        })
      ).toBe('https://auth.example/oauth?a=1');
    });

    it('includes false and zero', () => {
      expect(
        buildAuthorizeUrl('https://auth.example/oauth', {
          flag: false,
          count: 0,
        })
      ).toBe('https://auth.example/oauth?flag=false&count=0');
    });

    it('returns endpoint without query when all entries are nullish', () => {
      expect(
        buildAuthorizeUrl('https://auth.example/oauth', {
          a: undefined,
          b: null,
        })
      ).toBe('https://auth.example/oauth');
    });
  });
});
