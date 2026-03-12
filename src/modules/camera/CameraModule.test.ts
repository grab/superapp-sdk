/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { CameraModule } from './CameraModule';
import { ScanQRCodeResponse } from './types';

describe('CameraModule', () => {
  describe('scanQRCode', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedCameraModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new CameraModule();
      const response = await module.scanQRCode({ title: 'Test QR Scan' });

      expect(response.status_code).toBe(501);
      if (response.status_code === 501) {
        expect(response.error).toBe(
          'Not implemented: This method requires the Grab app environment'
        );
      }
    });

    it('should return 200 when scan succeeds in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: ScanQRCodeResponse = {
        status_code: 200,
        result: { qrCode: 'https://example.com/test' },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedCameraModule = {
        invoke: mockInvoke,
      };

      const module = new CameraModule();
      const response = await module.scanQRCode({ title: 'Scan Payment QR' });

      expect(mockInvoke).toHaveBeenCalledWith('scanQRCode', { title: 'Scan Payment QR' });
      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.qrCode).toBe('https://example.com/test');
      }
    });

    it('should return 204 when user cancels scan', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (Android 13; SM-G998B)',
      });

      const mockResponse: ScanQRCodeResponse = {
        status_code: 204,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedCameraModule = {
        invoke: mockInvoke,
      };

      const module = new CameraModule();
      const response = await module.scanQRCode({});

      expect(mockInvoke).toHaveBeenCalledWith('scanQRCode', {});
      expect(response.status_code).toBe(204);
      expect('result' in response).toBe(false);
    });

    it('should return 403 when camera permission is denied', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'GrabBeta/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: ScanQRCodeResponse = {
        status_code: 403,
        error: 'Camera permission is not enabled for the Grab app',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedCameraModule = {
        invoke: mockInvoke,
      };

      const module = new CameraModule();
      const response = await module.scanQRCode({ title: 'Scan' });

      expect(mockInvoke).toHaveBeenCalledWith('scanQRCode', { title: 'Scan' });
      expect(response.status_code).toBe(403);
      if (response.status_code === 403) {
        expect(response.error).toBe('Camera permission is not enabled for the Grab app');
      }
    });

    it('should return 400 when request parameters are invalid', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'GrabTaxi/5.256.0 (Android 12; Pixel 6)',
      });

      const mockResponse: ScanQRCodeResponse = {
        status_code: 400,
        error: 'Invalid request parameters',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedCameraModule = {
        invoke: mockInvoke,
      };

      const module = new CameraModule();
      const response = await module.scanQRCode({ title: 'Test' });

      expect(mockInvoke).toHaveBeenCalledWith('scanQRCode', { title: 'Test' });
      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('Invalid request parameters');
      }
    });

    it('should return 500 when an unexpected error occurs', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockInvoke = vi.fn().mockImplementation(() => {
        throw new Error('Unexpected bridge error');
      });

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedCameraModule = {
        invoke: mockInvoke,
      };

      const module = new CameraModule();
      const response = await module.scanQRCode({ title: 'Test' });

      expect(mockInvoke).toHaveBeenCalledWith('scanQRCode', { title: 'Test' });
      expect(response.status_code).toBe(500);
      if (response.status_code === 500) {
        expect(response.error).toBe('Failed to invoke method');
      }
    });
  });
});
