/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { LocaleModule } from './LocaleModule';
import { GetLanguageLocaleIdentifierResponse } from './types';

describe('LocaleModule', () => {
  describe('getLanguageLocaleIdentifier', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedLocaleModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new LocaleModule();
      const response = await module.getLanguageLocaleIdentifier();

      expect(response.status_code).toBe(501);
      if (response.status_code === 501) {
        expect(response.error).toBe(
          'Not implemented: This method requires the Grab app environment'
        );
      }
    });

    it('should return 200 with English locale', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: GetLanguageLocaleIdentifierResponse = {
        status_code: 200,
        result: 'en',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedLocaleModule = {
        invoke: mockInvoke,
      };

      const module = new LocaleModule();
      const response = await module.getLanguageLocaleIdentifier();

      expect(mockInvoke).toHaveBeenCalledWith('getLanguageLocaleIdentifier', undefined);
      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result).toBe('en');
      }
    });

    it('should return 200 with Indonesian locale', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (Android 13; SM-G998B)',
      });

      const mockResponse: GetLanguageLocaleIdentifierResponse = {
        status_code: 200,
        result: 'id',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedLocaleModule = {
        invoke: mockInvoke,
      };

      const module = new LocaleModule();
      const response = await module.getLanguageLocaleIdentifier();

      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result).toBe('id');
      }
    });

    it('should return 200 with Thai locale', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'GrabBeta/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: GetLanguageLocaleIdentifierResponse = {
        status_code: 200,
        result: 'th',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedLocaleModule = {
        invoke: mockInvoke,
      };

      const module = new LocaleModule();
      const response = await module.getLanguageLocaleIdentifier();

      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result).toBe('th');
      }
    });

    it('should return 500 when an unexpected error occurs', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockInvoke = vi.fn().mockImplementation(() => {
        throw new Error('Unexpected bridge error');
      });

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedLocaleModule = {
        invoke: mockInvoke,
      };

      const module = new LocaleModule();
      const response = await module.getLanguageLocaleIdentifier();

      expect(mockInvoke).toHaveBeenCalledWith('getLanguageLocaleIdentifier', undefined);
      expect(response.status_code).toBe(500);
      if (response.status_code === 500) {
        expect(response.error).toBe('Failed to invoke method');
      }
    });
  });
});
