/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { IdentityModule } from './IdentityModule';
import { AuthorizeResponse } from './types';

describe('IdentityModule', () => {
  describe('getAuthorizationArtifacts', () => {
    let mockLocalStorage: Record<string, string>;

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('should return 204 when no artifacts exist', async () => {
      mockLocalStorage = {};
      vi.stubGlobal('localStorage', {
        getItem: (key: string) => mockLocalStorage[key] ?? null,
        setItem: (key: string, value: string) => {
          mockLocalStorage[key] = value;
        },
        removeItem: (key: string) => {
          delete mockLocalStorage[key];
        },
      });

      const module = new IdentityModule();
      const response = await module.getAuthorizationArtifacts();

      expect(response.status_code).toBe(204);
    });

    it('should return 200 when all artifacts exist', async () => {
      mockLocalStorage = {
        'grabid:state': 'state-123',
        'grabid:code_verifier': 'verifier-456',
        'grabid:nonce': 'nonce-789',
        'grabid:redirect_uri': 'https://app.example.com/callback',
      };
      vi.stubGlobal('localStorage', {
        getItem: (key: string) => mockLocalStorage[key] ?? null,
        setItem: (key: string, value: string) => {
          mockLocalStorage[key] = value;
        },
        removeItem: (key: string) => {
          delete mockLocalStorage[key];
        },
      });

      const module = new IdentityModule();
      const response = await module.getAuthorizationArtifacts();

      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.state).toBe('state-123');
        expect(response.result.codeVerifier).toBe('verifier-456');
        expect(response.result.nonce).toBe('nonce-789');
        expect(response.result.redirectUri).toBe('https://app.example.com/callback');
      }
    });

    it('should return 400 when artifacts are inconsistent', async () => {
      mockLocalStorage = {
        'grabid:state': 'state-123',
        'grabid:nonce': 'nonce-789',
      };
      vi.stubGlobal('localStorage', {
        getItem: (key: string) => mockLocalStorage[key] ?? null,
        setItem: (key: string, value: string) => {
          mockLocalStorage[key] = value;
        },
        removeItem: (key: string) => {
          delete mockLocalStorage[key];
        },
      });

      const module = new IdentityModule();
      const response = await module.getAuthorizationArtifacts();

      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('Inconsistent authorization artifacts in storage');
      }
    });
  });

  describe('clearAuthorizationArtifacts', () => {
    let mockLocalStorage: Record<string, string>;

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('should return 204 and clear all artifacts', async () => {
      mockLocalStorage = {
        'grabid:state': 'state-123',
        'grabid:code_verifier': 'verifier-456',
        'grabid:nonce': 'nonce-789',
        'grabid:redirect_uri': 'https://app.example.com/callback',
        'grabid:login_return_uri': 'https://app.example.com/',
      };
      vi.stubGlobal('localStorage', {
        getItem: (key: string) => mockLocalStorage[key] ?? null,
        setItem: (key: string, value: string) => {
          mockLocalStorage[key] = value;
        },
        removeItem: (key: string) => {
          delete mockLocalStorage[key];
        },
      });

      const module = new IdentityModule();
      const response = await module.clearAuthorizationArtifacts();

      expect(response.status_code).toBe(204);
      expect(mockLocalStorage['grabid:state']).toBeUndefined();
      expect(mockLocalStorage['grabid:code_verifier']).toBeUndefined();
      expect(mockLocalStorage['grabid:nonce']).toBeUndefined();
      expect(mockLocalStorage['grabid:redirect_uri']).toBeUndefined();
      expect(mockLocalStorage['grabid:login_return_uri']).toBeUndefined();
    });
  });

  describe('authorize', () => {
    let mockLocalStorage: Record<string, string>;

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
        expect(response.error).toBe('request is required');
      }
    });

    it('should return 400 when clientId is missing', async () => {
      const module = new IdentityModule();
      const response = await module.authorize({
        clientId: '',
        redirectUri: 'https://app.example.com/callback',
        scope: 'openid profile',
        environment: 'production',
      });

      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('clientId is required and must be a non-empty string');
      }
    });

    it('should return 400 when redirectUri is missing', async () => {
      const module = new IdentityModule();
      const response = await module.authorize({
        clientId: 'client-123',
        redirectUri: '',
        scope: 'openid profile',
        environment: 'production',
      });

      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('redirectUri is required and must be a non-empty string');
      }
    });

    it('should return 400 when redirectUri is invalid URL', async () => {
      const module = new IdentityModule();
      const response = await module.authorize({
        clientId: 'client-123',
        redirectUri: 'not-a-valid-url',
        scope: 'openid profile',
        environment: 'production',
      });

      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('redirectUri must be a valid URL');
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
        expect(response.error).toBe('scope is required and must be a non-empty string');
      }
    });

    it('should return 400 when environment is invalid', async () => {
      const module = new IdentityModule();
      const response = await module.authorize({
        clientId: 'client-123',
        redirectUri: 'https://app.example.com/callback',
        scope: 'openid',
        environment: 'invalid' as 'staging' | 'production',
      });

      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe("environment must be either 'staging' or 'production'");
      }
    });

    it('should use web consent when not in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      mockLocalStorage = {};
      vi.stubGlobal('localStorage', {
        getItem: (key: string) => mockLocalStorage[key] ?? null,
        setItem: (key: string, value: string) => {
          mockLocalStorage[key] = value;
        },
        removeItem: (key: string) => {
          delete mockLocalStorage[key];
        },
      });

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          authorization_endpoint: 'https://auth.grab.com/authorize',
        }),
      });
      vi.stubGlobal('fetch', mockFetch);

      const mockAssign = vi.fn();
      vi.stubGlobal('location', {
        href: 'https://app.example.com/',
        assign: mockAssign,
      });

      const module = new IdentityModule();
      const response = await module.authorize({
        clientId: 'client-123',
        redirectUri: 'https://app.example.com/callback',
        scope: 'openid profile',
        environment: 'production',
      });

      expect(response.status_code).toBe(302);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://partner-api.grab.com/grabid/v1/oauth2/.well-known/openid-configuration'
      );
      expect(mockAssign).toHaveBeenCalled();
      expect(mockLocalStorage['grabid:redirect_uri']).toBe('https://app.example.com/callback');
    });

    it('should return 200 with native consent in Grab app (iOS)', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (iPhone; iOS 16.0)',
      });

      mockLocalStorage = {};
      vi.stubGlobal('localStorage', {
        getItem: (key: string) => mockLocalStorage[key] ?? null,
        setItem: (key: string, value: string) => {
          mockLocalStorage[key] = value;
        },
        removeItem: (key: string) => {
          delete mockLocalStorage[key];
        },
      });

      vi.stubGlobal('location', {
        href: 'https://app.example.com/',
      });

      const mockResponse: AuthorizeResponse = {
        status_code: 200,
        result: {
          code: 'auth-code-abc123',
          state: 'state-xyz789',
        },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedIdentityModule = {
        invoke: mockInvoke,
      };

      const module = new IdentityModule();
      const response = await module.authorize({
        clientId: 'client-123',
        redirectUri: 'https://app.example.com/callback',
        scope: 'openid profile',
        environment: 'production',
        responseMode: 'in_place',
      });

      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.code).toBe('auth-code-abc123');
        expect(response.result.state).toBe('state-xyz789');
      }
      expect(mockInvoke).toHaveBeenCalledWith(
        'authorize',
        expect.objectContaining({
          clientId: 'client-123',
          scope: 'openid profile',
          responseMode: 'in_place',
        })
      );
    });

    it('should return 204 when user cancels native authorization', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (Android 13; SM-G998B)',
      });

      mockLocalStorage = {};
      vi.stubGlobal('localStorage', {
        getItem: (key: string) => mockLocalStorage[key] ?? null,
        setItem: (key: string, value: string) => {
          mockLocalStorage[key] = value;
        },
        removeItem: (key: string) => {
          delete mockLocalStorage[key];
        },
      });

      vi.stubGlobal('location', {
        href: 'https://app.example.com/',
      });

      const mockResponse: AuthorizeResponse = {
        status_code: 204,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedIdentityModule = {
        invoke: mockInvoke,
      };

      const module = new IdentityModule();
      const response = await module.authorize({
        clientId: 'client-123',
        redirectUri: 'https://app.example.com/callback',
        scope: 'openid',
        environment: 'staging',
      });

      expect(response.status_code).toBe(204);
    });

    it('should fallback to web consent when native returns 400', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (iPhone; iOS 16.0)',
      });

      mockLocalStorage = {};
      vi.stubGlobal('localStorage', {
        getItem: (key: string) => mockLocalStorage[key] ?? null,
        setItem: (key: string, value: string) => {
          mockLocalStorage[key] = value;
        },
        removeItem: (key: string) => {
          delete mockLocalStorage[key];
        },
      });

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          authorization_endpoint: 'https://auth.grab.com/authorize',
        }),
      });
      vi.stubGlobal('fetch', mockFetch);

      const mockAssign = vi.fn();
      vi.stubGlobal('location', {
        href: 'https://app.example.com/',
        assign: mockAssign,
      });

      const mockNativeResponse: AuthorizeResponse = {
        status_code: 400,
        error: 'Native consent unavailable',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockNativeResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedIdentityModule = {
        invoke: mockInvoke,
      };

      const module = new IdentityModule();
      const response = await module.authorize({
        clientId: 'client-123',
        redirectUri: 'https://app.example.com/callback',
        scope: 'openid',
        environment: 'production',
      });

      expect(response.status_code).toBe(302);
      expect(mockFetch).toHaveBeenCalled();
      expect(mockAssign).toHaveBeenCalled();
    });

    it('should fallback to web consent when native throws error', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (iPhone; iOS 16.0)',
      });

      mockLocalStorage = {};
      vi.stubGlobal('localStorage', {
        getItem: (key: string) => mockLocalStorage[key] ?? null,
        setItem: (key: string, value: string) => {
          mockLocalStorage[key] = value;
        },
        removeItem: (key: string) => {
          delete mockLocalStorage[key];
        },
      });

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          authorization_endpoint: 'https://auth.grab.com/authorize',
        }),
      });
      vi.stubGlobal('fetch', mockFetch);

      const mockAssign = vi.fn();
      vi.stubGlobal('location', {
        href: 'https://app.example.com/',
        assign: mockAssign,
      });

      const mockInvoke = vi.fn().mockImplementation(() => {
        throw new Error('Native bridge unavailable');
      });

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedIdentityModule = {
        invoke: mockInvoke,
      };

      const module = new IdentityModule();
      const response = await module.authorize({
        clientId: 'client-123',
        redirectUri: 'https://app.example.com/callback',
        scope: 'openid',
        environment: 'production',
      });

      expect(response.status_code).toBe(302);
      expect(mockFetch).toHaveBeenCalled();
      expect(mockAssign).toHaveBeenCalled();
    });

    it('should return 400 when fetch fails in web consent', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      mockLocalStorage = {};
      vi.stubGlobal('localStorage', {
        getItem: (key: string) => mockLocalStorage[key] ?? null,
        setItem: (key: string, value: string) => {
          mockLocalStorage[key] = value;
        },
        removeItem: (key: string) => {
          delete mockLocalStorage[key];
        },
      });

      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });
      vi.stubGlobal('fetch', mockFetch);

      vi.stubGlobal('location', {
        href: 'https://app.example.com/',
      });

      const module = new IdentityModule();
      const response = await module.authorize({
        clientId: 'client-123',
        redirectUri: 'https://app.example.com/callback',
        scope: 'openid',
        environment: 'production',
      });

      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('Failed to fetch authorization configuration');
      }
    });

    it('should use staging environment correctly', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (iPhone; iOS 16.0)',
      });

      mockLocalStorage = {};
      vi.stubGlobal('localStorage', {
        getItem: (key: string) => mockLocalStorage[key] ?? null,
        setItem: (key: string, value: string) => {
          mockLocalStorage[key] = value;
        },
        removeItem: (key: string) => {
          delete mockLocalStorage[key];
        },
      });

      vi.stubGlobal('location', {
        href: 'https://app.example.com/',
      });

      const mockResponse: AuthorizeResponse = {
        status_code: 200,
        result: {
          code: 'staging-auth-code',
          state: 'staging-state',
        },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedIdentityModule = {
        invoke: mockInvoke,
      };

      const module = new IdentityModule();
      const response = await module.authorize({
        clientId: 'staging-client-123',
        redirectUri: 'https://staging-app.example.com/callback',
        scope: 'openid',
        environment: 'staging',
      });

      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.code).toBe('staging-auth-code');
      }
    });
  });
});
