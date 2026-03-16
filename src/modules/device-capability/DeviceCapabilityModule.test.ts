/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { DeviceCapabilityModule } from './DeviceCapabilityModule';
import { IsEsimSupportedResponse } from './types';

describe('DeviceCapabilityModule', () => {
  describe('isEsimSupported', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedDeviceCapabilityModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new DeviceCapabilityModule();
      const response = await module.isEsimSupported();

      expect(response.status_code).toBe(501);
      if (response.status_code === 501) {
        expect(response.error).toBe(
          'Not implemented: This method requires the Grab app environment'
        );
      }
    });

    it('should return 200 with true when eSIM is supported', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (Android 13; SM-G998B)',
      });

      const mockResponse: IsEsimSupportedResponse = {
        status_code: 200,
        result: true,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (
        window as unknown as Record<string, { invoke: typeof mockInvoke }>
      ).WrappedDeviceCapabilityModule = {
        invoke: mockInvoke,
      };

      const module = new DeviceCapabilityModule();
      const response = await module.isEsimSupported();

      expect(mockInvoke).toHaveBeenCalledWith('isEsimSupported', undefined);
      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result).toBe(true);
      }
    });

    it('should return 200 with false when eSIM is not supported', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: IsEsimSupportedResponse = {
        status_code: 200,
        result: false,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (
        window as unknown as Record<string, { invoke: typeof mockInvoke }>
      ).WrappedDeviceCapabilityModule = {
        invoke: mockInvoke,
      };

      const module = new DeviceCapabilityModule();
      const response = await module.isEsimSupported();

      expect(mockInvoke).toHaveBeenCalledWith('isEsimSupported', undefined);
      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result).toBe(false);
      }
    });

    it('should return 500 when an unexpected error occurs', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (Android 13; SM-G998B)',
      });

      const mockInvoke = vi.fn().mockImplementation(() => {
        throw new Error('Unexpected bridge error');
      });

      (
        window as unknown as Record<string, { invoke: typeof mockInvoke }>
      ).WrappedDeviceCapabilityModule = {
        invoke: mockInvoke,
      };

      const module = new DeviceCapabilityModule();
      const response = await module.isEsimSupported();

      expect(mockInvoke).toHaveBeenCalledWith('isEsimSupported', undefined);
      expect(response.status_code).toBe(500);
      if (response.status_code === 500) {
        expect(response.error).toBe('Failed to invoke method');
      }
    });
  });
});
