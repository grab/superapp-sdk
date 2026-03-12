/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { PlatformModule } from './PlatformModule';
import { BackResponse } from './types';

describe('PlatformModule', () => {
  describe('back', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedPlatformModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new PlatformModule();
      const response = await module.back();

      expect(response.status_code).toBe(501);
      if (response.status_code === 501) {
        expect(response.error).toBe(
          'Not implemented: This method requires the Grab app environment'
        );
      }
    });

    it('should return 204 when back navigation is triggered successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: BackResponse = {
        status_code: 204,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedPlatformModule = {
        invoke: mockInvoke,
      };

      const module = new PlatformModule();
      const response = await module.back();

      expect(mockInvoke).toHaveBeenCalledWith('back', undefined);
      expect(response.status_code).toBe(204);
    });

    it('should return 204 when back navigation is triggered on Android', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (Android 13; SM-G998B)',
      });

      const mockResponse: BackResponse = {
        status_code: 204,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedPlatformModule = {
        invoke: mockInvoke,
      };

      const module = new PlatformModule();
      const response = await module.back();

      expect(mockInvoke).toHaveBeenCalledWith('back', undefined);
      expect(response.status_code).toBe(204);
    });

    it('should return 500 when an unexpected error occurs', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockInvoke = vi.fn().mockImplementation(() => {
        throw new Error('Unexpected bridge error');
      });

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedPlatformModule = {
        invoke: mockInvoke,
      };

      const module = new PlatformModule();
      const response = await module.back();

      expect(mockInvoke).toHaveBeenCalledWith('back', undefined);
      expect(response.status_code).toBe(500);
      if (response.status_code === 500) {
        expect(response.error).toBe('Failed to invoke method');
      }
    });
  });
});
