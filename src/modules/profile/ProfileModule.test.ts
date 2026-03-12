/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { ProfileModule } from './ProfileModule';
import { FetchEmailResponse, VerifyEmailResponse } from './types';

describe('ProfileModule', () => {
  describe('fetchEmail', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedProfileModule;
    });

    it('should return 403 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new ProfileModule();
      const response = await module.fetchEmail();

      expect(response.status_code).toBe(403);
      if (response.status_code === 403) {
        expect(response.error).toBe('This feature requires Grab app version 5.399 or above.');
      }
    });

    it('should return 403 when app version is below 5.399', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.398.0 (iPhone; iOS 16.0)',
      });

      const module = new ProfileModule();
      const response = await module.fetchEmail();

      expect(response.status_code).toBe(403);
      if (response.status_code === 403) {
        expect(response.error).toBe('This feature requires Grab app version 5.399 or above.');
      }
    });

    it('should return 200 with user email when successful', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: FetchEmailResponse = {
        status_code: 200,
        result: { email: 'user@example.com' },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedProfileModule = {
        invoke: mockInvoke,
      };

      const module = new ProfileModule();
      const response = await module.fetchEmail();

      expect(mockInvoke).toHaveBeenCalledWith('fetchEmail', undefined);
      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.email).toBe('user@example.com');
      }
    });

    it('should return 200 with user email on Android version 5.400', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.400.0 (Android 13; SM-G998B)',
      });

      const mockResponse: FetchEmailResponse = {
        status_code: 200,
        result: { email: 'android.user@example.com' },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedProfileModule = {
        invoke: mockInvoke,
      };

      const module = new ProfileModule();
      const response = await module.fetchEmail();

      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.email).toBe('android.user@example.com');
      }
    });

    it('should return 400 when request is invalid', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: FetchEmailResponse = {
        status_code: 400,
        error: 'Invalid request',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedProfileModule = {
        invoke: mockInvoke,
      };

      const module = new ProfileModule();
      const response = await module.fetchEmail();

      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('Invalid request');
      }
    });

    it('should return 500 when an unexpected error occurs', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (iPhone; iOS 16.0)',
      });

      const mockInvoke = vi.fn().mockImplementation(() => {
        throw new Error('Unexpected bridge error');
      });

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedProfileModule = {
        invoke: mockInvoke,
      };

      const module = new ProfileModule();
      const response = await module.fetchEmail();

      expect(mockInvoke).toHaveBeenCalledWith('fetchEmail', undefined);
      expect(response.status_code).toBe(500);
      if (response.status_code === 500) {
        expect(response.error).toBe('Failed to invoke method');
      }
    });
  });

  describe('verifyEmail', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedProfileModule;
    });

    it('should return 403 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new ProfileModule();
      const response = await module.verifyEmail({
        email: 'user@example.com',
        otp: '123456',
      });

      expect(response.status_code).toBe(403);
      if (response.status_code === 403) {
        expect(response.error).toBe('This feature requires Grab app version 5.399 or above.');
      }
    });

    it('should return 403 when app version is below 5.399', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.398.0 (iPhone; iOS 16.0)',
      });

      const module = new ProfileModule();
      const response = await module.verifyEmail({
        email: 'user@example.com',
        otp: '123456',
      });

      expect(response.status_code).toBe(403);
      if (response.status_code === 403) {
        expect(response.error).toBe('This feature requires Grab app version 5.399 or above.');
      }
    });

    it('should return 200 when email is verified successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: VerifyEmailResponse = {
        status_code: 200,
        result: undefined,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedProfileModule = {
        invoke: mockInvoke,
      };

      const module = new ProfileModule();
      const response = await module.verifyEmail({
        email: 'user@example.com',
        otp: '123456',
      });

      expect(mockInvoke).toHaveBeenCalledWith('verifyEmail', {
        email: 'user@example.com',
        otp: '123456',
      });
      expect(response.status_code).toBe(200);
    });

    it('should return 200 when email is verified successfully on Android', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.400.0 (Android 13; SM-G998B)',
      });

      const mockResponse: VerifyEmailResponse = {
        status_code: 200,
        result: undefined,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedProfileModule = {
        invoke: mockInvoke,
      };

      const module = new ProfileModule();
      const response = await module.verifyEmail({
        email: 'android@example.com',
        otp: '654321',
      });

      expect(response.status_code).toBe(200);
    });

    it('should return 400 when OTP is invalid', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: VerifyEmailResponse = {
        status_code: 400,
        error: 'Invalid OTP',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedProfileModule = {
        invoke: mockInvoke,
      };

      const module = new ProfileModule();
      const response = await module.verifyEmail({
        email: 'user@example.com',
        otp: 'wrong',
      });

      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('Invalid OTP');
      }
    });

    it('should return 500 when an unexpected error occurs', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (iPhone; iOS 16.0)',
      });

      const mockInvoke = vi.fn().mockImplementation(() => {
        throw new Error('Unexpected bridge error');
      });

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedProfileModule = {
        invoke: mockInvoke,
      };

      const module = new ProfileModule();
      const response = await module.verifyEmail({
        email: 'user@example.com',
        otp: '123456',
      });

      expect(mockInvoke).toHaveBeenCalledWith('verifyEmail', {
        email: 'user@example.com',
        otp: '123456',
      });
      expect(response.status_code).toBe(500);
      if (response.status_code === 500) {
        expect(response.error).toBe('Failed to invoke method');
      }
    });
  });
});
