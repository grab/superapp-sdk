/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { ScopeModule } from './ScopeModule';
import { HasAccessToResponse, ReloadScopesResponse } from './types';

describe('ScopeModule', () => {
  describe('hasAccessTo', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedScopeModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new ScopeModule();
      const response = await module.hasAccessTo('CameraModule', 'scanQRCode');

      expect(response.status_code).toBe(501);
      if (response.status_code === 501) {
        expect(response.error).toBe(
          'Not implemented: This method requires the Grab app environment'
        );
      }
    });

    it('should return 200 with true when access is granted', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: HasAccessToResponse = {
        status_code: 200,
        result: { hasAccess: true },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedScopeModule = {
        invoke: mockInvoke,
      };

      const module = new ScopeModule();
      const response = await module.hasAccessTo('CameraModule', 'scanQRCode');

      expect(mockInvoke).toHaveBeenCalledWith('hasAccessTo', {
        module: 'CameraModule',
        method: 'scanQRCode',
      });
      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.hasAccess).toBe(true);
      }
    });

    it('should return 200 with false when access is denied', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (Android 13; SM-G998B)',
      });

      const mockResponse: HasAccessToResponse = {
        status_code: 200,
        result: { hasAccess: false },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedScopeModule = {
        invoke: mockInvoke,
      };

      const module = new ScopeModule();
      const response = await module.hasAccessTo('LocationModule', 'getCoordinate');

      expect(mockInvoke).toHaveBeenCalledWith('hasAccessTo', {
        module: 'LocationModule',
        method: 'getCoordinate',
      });
      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.hasAccess).toBe(false);
      }
    });

    it('should return 400 when module or method is missing', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'GrabBeta/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: HasAccessToResponse = {
        status_code: 400,
        error: 'Missing required parameters',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedScopeModule = {
        invoke: mockInvoke,
      };

      const module = new ScopeModule();
      const response = await module.hasAccessTo('', '');

      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('Missing required parameters');
      }
    });

    it('should return 424 when ScopeKit error occurs', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'GrabTaxi/5.256.0 (Android 12; Pixel 6)',
      });

      const mockResponse: HasAccessToResponse = {
        status_code: 424,
        error: 'ScopeKit error',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedScopeModule = {
        invoke: mockInvoke,
      };

      const module = new ScopeModule();
      const response = await module.hasAccessTo('CameraModule', 'scanQRCode');

      expect(mockInvoke).toHaveBeenCalledWith('hasAccessTo', {
        module: 'CameraModule',
        method: 'scanQRCode',
      });
      expect(response.status_code).toBe(424);
      if (response.status_code === 424) {
        expect(response.error).toBe('ScopeKit error');
      }
    });

    it('should return 500 when an unexpected error occurs', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockInvoke = vi.fn().mockImplementation(() => {
        throw new Error('Unexpected bridge error');
      });

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedScopeModule = {
        invoke: mockInvoke,
      };

      const module = new ScopeModule();
      const response = await module.hasAccessTo('CameraModule', 'scanQRCode');

      expect(mockInvoke).toHaveBeenCalledWith('hasAccessTo', {
        module: 'CameraModule',
        method: 'scanQRCode',
      });
      expect(response.status_code).toBe(500);
      if (response.status_code === 500) {
        expect(response.error).toBe('Failed to invoke method');
      }
    });
  });

  describe('reloadScopes', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedScopeModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new ScopeModule();
      const response = await module.reloadScopes();

      expect(response.status_code).toBe(501);
      if (response.status_code === 501) {
        expect(response.error).toBe(
          'Not implemented: This method requires the Grab app environment'
        );
      }
    });

    it('should return 200 when scopes are reloaded successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: ReloadScopesResponse = {
        status_code: 200,
        result: undefined,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedScopeModule = {
        invoke: mockInvoke,
      };

      const module = new ScopeModule();
      const response = await module.reloadScopes();

      expect(mockInvoke).toHaveBeenCalledWith('reloadScopes', undefined);
      expect(response.status_code).toBe(200);
    });

    it('should return 200 when scopes are reloaded on Android', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (Android 13; SM-G998B)',
      });

      const mockResponse: ReloadScopesResponse = {
        status_code: 200,
        result: undefined,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedScopeModule = {
        invoke: mockInvoke,
      };

      const module = new ScopeModule();
      const response = await module.reloadScopes();

      expect(mockInvoke).toHaveBeenCalledWith('reloadScopes', undefined);
      expect(response.status_code).toBe(200);
    });

    it('should return 424 when ScopeKit error occurs', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'GrabBeta/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: ReloadScopesResponse = {
        status_code: 424,
        error: 'ScopeKit error',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedScopeModule = {
        invoke: mockInvoke,
      };

      const module = new ScopeModule();
      const response = await module.reloadScopes();

      expect(mockInvoke).toHaveBeenCalledWith('reloadScopes', undefined);
      expect(response.status_code).toBe(424);
      if (response.status_code === 424) {
        expect(response.error).toBe('ScopeKit error');
      }
    });

    it('should return 500 when an unexpected error occurs', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockInvoke = vi.fn().mockImplementation(() => {
        throw new Error('Unexpected bridge error');
      });

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedScopeModule = {
        invoke: mockInvoke,
      };

      const module = new ScopeModule();
      const response = await module.reloadScopes();

      expect(mockInvoke).toHaveBeenCalledWith('reloadScopes', undefined);
      expect(response.status_code).toBe(500);
      if (response.status_code === 500) {
        expect(response.error).toBe('Failed to invoke method');
      }
    });
  });
});
