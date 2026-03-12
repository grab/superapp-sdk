/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { SystemWebViewKitModule } from './SystemWebViewKitModule';
import { RedirectToSystemWebViewResponse } from './types';

describe('SystemWebViewKitModule', () => {
  describe('redirectToSystemWebView', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedSystemWebViewKitModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new SystemWebViewKitModule();
      const response = await module.redirectToSystemWebView({
        url: 'https://www.example.com',
      });

      expect(response.status_code).toBe(501);
      if (response.status_code === 501) {
        expect(response.error).toBe(
          'Not implemented: This method requires the Grab app environment'
        );
      }
    });

    it('should return 200 when redirect is initiated successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: RedirectToSystemWebViewResponse = {
        status_code: 200,
        result: undefined,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (
        window as unknown as Record<string, { invoke: typeof mockInvoke }>
      ).WrappedSystemWebViewKitModule = {
        invoke: mockInvoke,
      };

      const module = new SystemWebViewKitModule();
      const response = await module.redirectToSystemWebView({
        url: 'https://www.example.com',
      });

      expect(mockInvoke).toHaveBeenCalledWith('redirectToSystemWebView', {
        url: 'https://www.example.com',
      });
      expect(response.status_code).toBe(200);
    });

    it('should return 200 when redirect is initiated on Android', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (Android 13; SM-G998B)',
      });

      const mockResponse: RedirectToSystemWebViewResponse = {
        status_code: 200,
        result: undefined,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (
        window as unknown as Record<string, { invoke: typeof mockInvoke }>
      ).WrappedSystemWebViewKitModule = {
        invoke: mockInvoke,
      };

      const module = new SystemWebViewKitModule();
      const response = await module.redirectToSystemWebView({
        url: 'https://www.grab.com',
      });

      expect(mockInvoke).toHaveBeenCalledWith('redirectToSystemWebView', {
        url: 'https://www.grab.com',
      });
      expect(response.status_code).toBe(200);
    });

    it('should return 400 when URL is invalid', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'GrabBeta/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: RedirectToSystemWebViewResponse = {
        status_code: 400,
        error: 'Invalid URL or domain not whitelisted',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (
        window as unknown as Record<string, { invoke: typeof mockInvoke }>
      ).WrappedSystemWebViewKitModule = {
        invoke: mockInvoke,
      };

      const module = new SystemWebViewKitModule();
      const response = await module.redirectToSystemWebView({
        url: 'not-a-valid-url',
      });

      expect(mockInvoke).toHaveBeenCalledWith('redirectToSystemWebView', {
        url: 'not-a-valid-url',
      });
      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('Invalid URL or domain not whitelisted');
      }
    });

    it('should return 400 when domain is not whitelisted', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'GrabTaxi/5.256.0 (Android 12; Pixel 6)',
      });

      const mockResponse: RedirectToSystemWebViewResponse = {
        status_code: 400,
        error: 'Invalid URL or domain not whitelisted',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (
        window as unknown as Record<string, { invoke: typeof mockInvoke }>
      ).WrappedSystemWebViewKitModule = {
        invoke: mockInvoke,
      };

      const module = new SystemWebViewKitModule();
      const response = await module.redirectToSystemWebView({
        url: 'https://malicious-site.com',
      });

      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('Invalid URL or domain not whitelisted');
      }
    });

    it('should return 424 when ASWebAuthenticationSession error occurs on iOS', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: RedirectToSystemWebViewResponse = {
        status_code: 424,
        error: 'ASWebAuthenticationSession error',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (
        window as unknown as Record<string, { invoke: typeof mockInvoke }>
      ).WrappedSystemWebViewKitModule = {
        invoke: mockInvoke,
      };

      const module = new SystemWebViewKitModule();
      const response = await module.redirectToSystemWebView({
        url: 'https://www.example.com',
      });

      expect(mockInvoke).toHaveBeenCalledWith('redirectToSystemWebView', {
        url: 'https://www.example.com',
      });
      expect(response.status_code).toBe(424);
      if (response.status_code === 424) {
        expect(response.error).toBe('ASWebAuthenticationSession error');
      }
    });

    it('should return 500 when an unexpected error occurs', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockInvoke = vi.fn().mockImplementation(() => {
        throw new Error('Unexpected bridge error');
      });

      (
        window as unknown as Record<string, { invoke: typeof mockInvoke }>
      ).WrappedSystemWebViewKitModule = {
        invoke: mockInvoke,
      };

      const module = new SystemWebViewKitModule();
      const response = await module.redirectToSystemWebView({
        url: 'https://www.example.com',
      });

      expect(mockInvoke).toHaveBeenCalledWith('redirectToSystemWebView', {
        url: 'https://www.example.com',
      });
      expect(response.status_code).toBe(500);
      if (response.status_code === 500) {
        expect(response.error).toBe('Failed to invoke method');
      }
    });
  });
});
