/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { ProfileModule } from './ProfileModule';
import { FetchEmailResponse, ShowAddressPickerResponse, VerifyEmailResponse } from './types';

describe('ProfileModule', () => {
  describe('fetchEmail', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedProfileModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new ProfileModule();
      const response = await module.fetchEmail();

      expect(response.status_code).toBe(501);
      if (response.status_code === 501) {
        expect(response.error).toBe(
          'Not implemented: This method requires the Grab app environment'
        );
      }
    });

    it('should return 426 when app version is below 5.399', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.398.0 (iPhone; iOS 16.0)',
      });

      const module = new ProfileModule();
      const response = await module.fetchEmail();

      expect(response.status_code).toBe(426);
      if (response.status_code === 426) {
        expect(response.error).toBe(
          'Upgrade Required: This method requires a newer version of the Grab app'
        );
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
        expect(response.error).toBe('Failed to invoke method: Unexpected bridge error');
      }
    });
  });

  describe('showAddressPicker', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedProfileModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new ProfileModule();
      const response = await module.showAddressPicker();

      expect(response.status_code).toBe(501);
      if (response.status_code === 501) {
        expect(response.error).toBe(
          'Not implemented: This method requires the Grab app environment'
        );
      }
    });

    it('should invoke native even when Grab app version is below existing profile minimum', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.398.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: ShowAddressPickerResponse = {
        status_code: 200,
        result: {
          address: '1 Example Road',
          full_address: '1 Example Road, Singapore',
          unit_detail: '#01-0123',
          latitude: 1.3,
          longitude: 103.8,
          country_code: 'SG',
          city: 'Singapore',
          postal_code: 123456,
        },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedProfileModule = {
        invoke: mockInvoke,
      };

      const module = new ProfileModule();
      const response = await module.showAddressPicker();

      expect(mockInvoke).toHaveBeenCalledWith('showAddressPicker', undefined);
      expect(response.status_code).toBe(200);
    });

    it('should return 200 with selected address when successful', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: ShowAddressPickerResponse = {
        status_code: 200,
        result: {
          address: '1 Example Road',
          full_address: '1 Example Road, Singapore',
          unit_detail: '#01-0123',
          latitude: 1.3,
          longitude: 103.8,
          country_code: 'SG',
          city: 'Singapore',
          postal_code: 123456,
        },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedProfileModule = {
        invoke: mockInvoke,
      };

      const module = new ProfileModule();
      const response = await module.showAddressPicker();

      expect(mockInvoke).toHaveBeenCalledWith('showAddressPicker', undefined);
      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result).toEqual({
          address: '1 Example Road',
          full_address: '1 Example Road, Singapore',
          unit_detail: '#01-0123',
          latitude: 1.3,
          longitude: 103.8,
          country_code: 'SG',
          city: 'Singapore',
          postal_code: 123456,
        });
      }
    });

    it('should return 204 when user dismisses the native address picker', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: ShowAddressPickerResponse = {
        status_code: 204,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedProfileModule = {
        invoke: mockInvoke,
      };

      const module = new ProfileModule();
      const response = await module.showAddressPicker();

      expect(response.status_code).toBe(204);
    });

    it.each([
      [400, 'Invalid request'],
      [403, 'Forbidden'],
      [424, 'Failed dependency'],
      [426, 'Upgrade required'],
    ] as const)('should pass through %i response from native', async (statusCode, error) => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: ShowAddressPickerResponse = {
        status_code: statusCode,
        error,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedProfileModule = {
        invoke: mockInvoke,
      };

      const module = new ProfileModule();
      const response = await module.showAddressPicker();

      expect(response.status_code).toBe(statusCode);
      if (response.status_code === statusCode) {
        expect(response.error).toBe(error);
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
      const response = await module.showAddressPicker();

      expect(mockInvoke).toHaveBeenCalledWith('showAddressPicker', undefined);
      expect(response.status_code).toBe(500);
      if (response.status_code === 500) {
        expect(response.error).toBe('Failed to invoke method: Unexpected bridge error');
      }
    });
  });

  describe('verifyEmail', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedProfileModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new ProfileModule();
      const response = await module.verifyEmail({
        email: 'user@example.com',
        skipUserInput: true,
      });

      expect(response.status_code).toBe(501);
      if (response.status_code === 501) {
        expect(response.error).toBe(
          'Not implemented: This method requires the Grab app environment'
        );
      }
    });

    it('should return 426 when app version is below 5.399', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.398.0 (iPhone; iOS 16.0)',
      });

      const module = new ProfileModule();
      const response = await module.verifyEmail({
        email: 'user@example.com',
        skipUserInput: true,
      });

      expect(response.status_code).toBe(426);
      if (response.status_code === 426) {
        expect(response.error).toBe(
          'Upgrade Required: This method requires a newer version of the Grab app'
        );
      }
    });

    it('should return 200 when email is verified successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: VerifyEmailResponse = {
        status_code: 200,
        result: { email: 'user@example.com' },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedProfileModule = {
        invoke: mockInvoke,
      };

      const module = new ProfileModule();
      const response = await module.verifyEmail({
        email: 'user@example.com',
        skipUserInput: true,
      });

      expect(mockInvoke).toHaveBeenCalledWith('verifyEmail', {
        email: 'user@example.com',
        skipUserInput: true,
      });
      expect(response.status_code).toBe(200);
    });

    it('should return 200 when email is verified successfully on Android', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.400.0 (Android 13; SM-G998B)',
      });

      const mockResponse: VerifyEmailResponse = {
        status_code: 200,
        result: { email: 'android@example.com' },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedProfileModule = {
        invoke: mockInvoke,
      };

      const module = new ProfileModule();
      const response = await module.verifyEmail({
        email: 'android@example.com',
        skipUserInput: true,
      });

      expect(response.status_code).toBe(200);
    });

    it('should return 400 when request is invalid', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: VerifyEmailResponse = {
        status_code: 400,
        error: 'Invalid request',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedProfileModule = {
        invoke: mockInvoke,
      };

      const module = new ProfileModule();
      const response = await module.verifyEmail({
        email: '',
        skipUserInput: true,
      });

      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('email: Invalid length: Expected >=1 but received 0');
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
        skipUserInput: true,
      });

      expect(mockInvoke).toHaveBeenCalledWith('verifyEmail', {
        email: 'user@example.com',
        skipUserInput: true,
      });
      expect(response.status_code).toBe(500);
      if (response.status_code === 500) {
        expect(response.error).toBe('Failed to invoke method: Unexpected bridge error');
      }
    });
  });
});
