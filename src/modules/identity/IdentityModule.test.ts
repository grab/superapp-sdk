/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { IdentityModule } from './IdentityModule';
import type { RawAuthorizeResponse } from './types';

const GRAB_USER_AGENT = 'Grab/5.397.0 (iPhone; iOS 16.0)';

describe('IdentityModule', () => {
  describe('authorize', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedIdentityModule;
    });

    it('should return 400 when request is null', async () => {
      const module = new IdentityModule();
      const response = await module.authorize(
        null as unknown as Parameters<typeof module.authorize>[0]
      );

      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('Invalid type: Expected Object but received null');
      }
    });

    it('should return 400 when scope is missing', async () => {
      const module = new IdentityModule();
      const response = await module.authorize({
        clientId: 'client-123',
        redirectUri: 'https://app.example.com/callback',
        scope: '',
        environment: 'production',
      });

      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('scope: Invalid length: Expected >=1 but received 0');
      }
    });

    it('should ignore deprecated legacy fields and invoke native with scope only', async () => {
      vi.stubGlobal('navigator', { userAgent: GRAB_USER_AGENT });

      const mockInvoke = vi.fn().mockResolvedValue({
        status_code: 200,
        result: {
          code: 'auth-code-abc123',
          state: 'state-xyz789',
          codeVerifier: 'code-verifier-123',
          nonce: 'nonce-123',
          redirectUri: 'https://native.example.com/callback',
        },
      } satisfies RawAuthorizeResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedIdentityModule = {
        invoke: mockInvoke,
      };

      const module = new IdentityModule();
      const response = await module.authorize({
        clientId: 'client-123',
        redirectUri: 'not-a-valid-url',
        scope: 'openid profile',
        environment: 'invalid' as 'staging' | 'production',
        responseMode: 'redirect' as 'redirect' | 'in_place',
      });

      expect(response.status_code).toBe(200);
      expect(mockInvoke).toHaveBeenCalledWith('authorize', {
        scope: 'openid profile',
      });

      if (response.status_code === 200) {
        expect(response.result.code).toBe('auth-code-abc123');
        expect(response.result.state).toBe('state-xyz789');
        expect(response.result.codeVerifier).toBe('code-verifier-123');
        expect(response.result.nonce).toBe('nonce-123');
        expect(response.result.redirectUri).toBe('https://native.example.com/callback');
      }
    });

    it('should return 200 with native response', async () => {
      vi.stubGlobal('navigator', { userAgent: GRAB_USER_AGENT });

      const mockInvoke = vi.fn().mockResolvedValue({
        status_code: 200,
        result: {
          code: 'auth-code-abc123',
          state: 'state-xyz789',
          codeVerifier: 'code-verifier-123',
          nonce: 'nonce-123',
          redirectUri: 'https://app.example.com/callback',
        },
      } satisfies RawAuthorizeResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedIdentityModule = {
        invoke: mockInvoke,
      };

      const module = new IdentityModule();
      const response = await module.authorize({
        scope: 'openid profile',
      });

      expect(response.status_code).toBe(200);
      expect(mockInvoke).toHaveBeenCalledWith('authorize', { scope: 'openid profile' });
      if (response.status_code === 200) {
        expect(response.result.code).toBe('auth-code-abc123');
        expect(response.result.state).toBe('state-xyz789');
        expect(response.result.codeVerifier).toBe('code-verifier-123');
        expect(response.result.nonce).toBe('nonce-123');
        expect(response.result.redirectUri).toBe('https://app.example.com/callback');
      }
    });

    it('should return 204 when user cancels native authorization', async () => {
      vi.stubGlobal('navigator', { userAgent: GRAB_USER_AGENT });

      const mockInvoke = vi.fn().mockResolvedValue({
        status_code: 204,
      } satisfies RawAuthorizeResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedIdentityModule = {
        invoke: mockInvoke,
      };

      const module = new IdentityModule();
      const response = await module.authorize({
        scope: 'openid',
      });

      expect(response.status_code).toBe(204);
      expect(mockInvoke).toHaveBeenCalledWith('authorize', { scope: 'openid' });
    });

    it('should return 400 when native returns 400', async () => {
      vi.stubGlobal('navigator', { userAgent: GRAB_USER_AGENT });

      const mockInvoke = vi.fn().mockResolvedValue({
        status_code: 400,
        error: 'Invalid scope',
      } satisfies RawAuthorizeResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedIdentityModule = {
        invoke: mockInvoke,
      };

      const module = new IdentityModule();
      const response = await module.authorize({
        scope: 'openid',
      });

      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('Invalid scope');
      }
    });

    it('should return 403 when native returns 403', async () => {
      vi.stubGlobal('navigator', { userAgent: GRAB_USER_AGENT });

      const mockInvoke = vi.fn().mockResolvedValue({
        status_code: 403,
        error: 'Client not authorized',
      } satisfies RawAuthorizeResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedIdentityModule = {
        invoke: mockInvoke,
      };

      const module = new IdentityModule();
      const response = await module.authorize({
        scope: 'openid',
      });

      expect(response.status_code).toBe(403);
    });

    it.each(['Grab/5.396.9 (iPhone; iOS 16.0)', 'Grab/5.396.9 (Android 13; SM-G998B)'])(
      'should return 426 below version 5.397.0 for %s',
      async (userAgent) => {
        vi.stubGlobal('navigator', { userAgent });

        const module = new IdentityModule();
        const response = await module.authorize({
          scope: 'openid',
        });

        expect(response.status_code).toBe(426);
        if (response.status_code === 426) {
          expect(response.error).toBe(
            'Upgrade Required: This method requires a newer version of the Grab app'
          );
        }
      }
    );

    it('should return 500 when native returns 500', async () => {
      vi.stubGlobal('navigator', { userAgent: GRAB_USER_AGENT });

      const mockInvoke = vi.fn().mockResolvedValue({
        status_code: 500,
        error: 'Internal server error',
      } satisfies RawAuthorizeResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedIdentityModule = {
        invoke: mockInvoke,
      };

      const module = new IdentityModule();
      const response = await module.authorize({
        scope: 'openid',
      });

      expect(response.status_code).toBe(500);
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new IdentityModule();
      const response = await module.authorize({
        scope: 'openid',
      });

      expect(response.status_code).toBe(501);
      if (response.status_code === 501) {
        expect(response.error).toBe(
          'Not implemented: This method requires the Grab app environment'
        );
      }
    });

    it('should not fallback to web when native throws an error', async () => {
      vi.stubGlobal('navigator', { userAgent: GRAB_USER_AGENT });

      const mockInvoke = vi.fn().mockImplementation(() => {
        throw new Error('Native bridge unavailable');
      });
      const mockFetch = vi.fn();
      vi.stubGlobal('fetch', mockFetch);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedIdentityModule = {
        invoke: mockInvoke,
      };

      const module = new IdentityModule();
      const response = await module.authorize({ scope: 'openid' });

      expect(response.status_code).toBe(500);
      expect(mockInvoke).toHaveBeenCalledWith('authorize', { scope: 'openid' });
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should log a warning when native response shape is unexpected', async () => {
      vi.stubGlobal('navigator', { userAgent: GRAB_USER_AGENT });
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

      const mockInvoke = vi.fn().mockResolvedValue({
        status_code: 200,
        result: {
          code: 'auth-code',
        },
      });

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedIdentityModule = {
        invoke: mockInvoke,
      };

      const module = new IdentityModule();
      const response = await module.authorize({
        scope: 'openid',
      });

      expect(response.status_code).toBe(200);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('[SuperAppSDK][IdentityModule.authorize] Unexpected response shape')
      );

      consoleWarnSpy.mockRestore();
    });
  });
});
