/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { StorageModule } from '../storage';
import { IdentityModule } from './IdentityModule';
import { RawNativeAuthorizeResponse } from './types';

function stubSessionStorage(store: Record<string, string>) {
  vi.stubGlobal('sessionStorage', {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    length: 0,
    key: () => null,
    clear: () => {
      Object.keys(store).forEach((k) => delete store[k]);
    },
  });
}

/** Mirrors PKCE keys to native storage without invoking the real bridge. */
function stubIdentityNativeStringWrites() {
  vi.spyOn(StorageModule.prototype, 'setString').mockResolvedValue({ status_code: 204 });
}

/** Default native reads for artifact tests (no values unless a test overrides the spy). */
function stubStorageModuleGetStringEmpty() {
  vi.spyOn(StorageModule.prototype, 'getString').mockResolvedValue({ status_code: 204 });
}

describe('IdentityModule', () => {
  describe('getAuthorizationArtifacts', () => {
    let mockSessionStorage: Record<string, string>;

    beforeEach(() => {
      stubStorageModuleGetStringEmpty();
    });

    afterEach(() => {
      vi.unstubAllGlobals();
      vi.restoreAllMocks();
    });

    it('should return 204 when no artifacts exist', async () => {
      mockSessionStorage = {};
      stubSessionStorage(mockSessionStorage);

      const module = new IdentityModule();
      const response = await module.getAuthorizationArtifacts();

      expect(response.status_code).toBe(204);
    });

    it('should return 200 when all artifacts exist', async () => {
      mockSessionStorage = {
        'grabid:state': 'state-123',
        'grabid:code_verifier': 'verifier-456',
        'grabid:nonce': 'nonce-789',
        'grabid:redirect_uri': 'https://app.example.com/callback',
      };
      stubSessionStorage(mockSessionStorage);

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
      mockSessionStorage = {
        'grabid:state': 'state-123',
        'grabid:nonce': 'nonce-789',
      };
      stubSessionStorage(mockSessionStorage);

      const module = new IdentityModule();
      const response = await module.getAuthorizationArtifacts();

      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('Inconsistent authorization artifacts in storage');
      }
    });

    it('should fall back to native storage when session storage is empty', async () => {
      mockSessionStorage = {};
      stubSessionStorage(mockSessionStorage);

      vi.spyOn(StorageModule.prototype, 'getString').mockImplementation(async (key: string) => {
        const values: Record<string, string> = {
          'grabid:state': 'native-state',
          'grabid:code_verifier': 'native-verifier',
          'grabid:nonce': 'native-nonce',
          'grabid:redirect_uri': 'https://native.example/cb',
        };
        const value = values[key];
        if (value !== undefined) {
          return { status_code: 200, result: value };
        }
        return { status_code: 204 };
      });

      const module = new IdentityModule();
      const response = await module.getAuthorizationArtifacts();

      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.state).toBe('native-state');
        expect(response.result.codeVerifier).toBe('native-verifier');
        expect(response.result.nonce).toBe('native-nonce');
        expect(response.result.redirectUri).toBe('https://native.example/cb');
      }
    });

    it('should return 204 when session is empty and native returns no string values', async () => {
      mockSessionStorage = {};
      stubSessionStorage(mockSessionStorage);
      vi.spyOn(StorageModule.prototype, 'getString').mockResolvedValue({
        status_code: 501,
        error: 'Not implemented: This method requires the Grab app environment',
      });

      const module = new IdentityModule();
      const response = await module.getAuthorizationArtifacts();

      expect(response.status_code).toBe(204);
    });
  });

  describe('clearAuthorizationArtifacts', () => {
    let mockSessionStorage: Record<string, string>;

    beforeEach(() => {
      vi.spyOn(StorageModule.prototype, 'remove').mockResolvedValue({ status_code: 204 });
    });

    afterEach(() => {
      vi.unstubAllGlobals();
      vi.restoreAllMocks();
    });

    it('should return 204 and clear all artifacts', async () => {
      mockSessionStorage = {
        'grabid:state': 'state-123',
        'grabid:code_verifier': 'verifier-456',
        'grabid:nonce': 'nonce-789',
        'grabid:redirect_uri': 'https://app.example.com/callback',
        'grabid:login_return_uri': 'https://app.example.com/',
      };
      stubSessionStorage(mockSessionStorage);

      const module = new IdentityModule();
      const response = await module.clearAuthorizationArtifacts();

      expect(response.status_code).toBe(204);
      expect(mockSessionStorage['grabid:state']).toBeUndefined();
      expect(mockSessionStorage['grabid:code_verifier']).toBeUndefined();
      expect(mockSessionStorage['grabid:nonce']).toBeUndefined();
      expect(mockSessionStorage['grabid:redirect_uri']).toBeUndefined();
      expect(mockSessionStorage['grabid:login_return_uri']).toBeUndefined();
    });
  });

  describe('authorize', () => {
    let mockSessionStorage: Record<string, string>;

    beforeEach(() => {
      stubIdentityNativeStringWrites();
    });

    afterEach(() => {
      vi.unstubAllGlobals();
      vi.restoreAllMocks();
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
        expect(response.error).toBe('clientId: Invalid length: Expected >=1 but received 0');
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
        expect(response.error).toBe('redirectUri: Invalid URL: Received ""');
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
        expect(response.error).toBe('redirectUri: Invalid URL: Received "not-a-valid-url"');
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
        expect(response.error).toBe(
          'environment: Invalid type: Expected ("staging" | "production") but received "invalid"'
        );
      }
    });

    it('should use web consent when not in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      mockSessionStorage = {};
      stubSessionStorage(mockSessionStorage);

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
      expect(mockSessionStorage['grabid:redirect_uri']).toBe('https://app.example.com/callback');
    });

    it('should return 200 with native consent in Grab app (iOS)', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (iPhone; iOS 16.0)',
      });

      mockSessionStorage = {};
      stubSessionStorage(mockSessionStorage);

      vi.stubGlobal('location', {
        href: 'https://app.example.com/',
      });

      const mockResponse: RawNativeAuthorizeResponse = {
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
        expect(response.result.codeVerifier.length).toBeGreaterThan(0);
        expect(response.result.nonce.length).toBeGreaterThan(0);
        expect(response.result.redirectUri).toBe('https://app.example.com/');
      }

      const artifactsResponse = await module.getAuthorizationArtifacts();
      expect(artifactsResponse.status_code).toBe(200);
      if (artifactsResponse.status_code === 200 && response.status_code === 200) {
        expect(artifactsResponse.result.codeVerifier).toBe(response.result.codeVerifier);
        expect(artifactsResponse.result.nonce).toBe(response.result.nonce);
        expect(artifactsResponse.result.redirectUri).toBe(response.result.redirectUri);
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

      mockSessionStorage = {};
      stubSessionStorage(mockSessionStorage);

      vi.stubGlobal('location', {
        href: 'https://app.example.com/',
      });

      const mockResponse: RawNativeAuthorizeResponse = {
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

      mockSessionStorage = {};
      stubSessionStorage(mockSessionStorage);

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

      const mockNativeResponse: RawNativeAuthorizeResponse = {
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

      mockSessionStorage = {};
      stubSessionStorage(mockSessionStorage);

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

      mockSessionStorage = {};
      stubSessionStorage(mockSessionStorage);

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

      mockSessionStorage = {};
      stubSessionStorage(mockSessionStorage);

      vi.stubGlobal('location', {
        href: 'https://app.example.com/',
      });

      const mockResponse: RawNativeAuthorizeResponse = {
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
        expect(response.result.redirectUri).toBe('https://staging-app.example.com/callback');
        expect(response.result.codeVerifier.length).toBeGreaterThan(0);
        expect(response.result.nonce.length).toBeGreaterThan(0);
      }
    });
  });
});
