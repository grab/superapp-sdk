/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { StorageModule } from './StorageModule';
import {
  GetBooleanResponse,
  GetDoubleResponse,
  GetIntResponse,
  GetStringResponse,
  RemoveAllResponse,
  RemoveResponse,
  SetBooleanResponse,
  SetDoubleResponse,
  SetIntResponse,
  SetStringResponse,
} from './types';

describe('StorageModule', () => {
  describe('setBoolean', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedStorageModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new StorageModule();
      const response = await module.setBoolean('isDarkMode', true);

      expect(response.status_code).toBe(501);
      if (response.status_code === 501) {
        expect(response.error).toBe(
          'Not implemented: This method requires the Grab app environment'
        );
      }
    });

    it('should return 204 when boolean value is set successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: SetBooleanResponse = {
        status_code: 204,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedStorageModule = {
        invoke: mockInvoke,
      };

      const module = new StorageModule();
      const response = await module.setBoolean('isDarkMode', true);

      expect(mockInvoke).toHaveBeenCalledWith('setBoolean', { key: 'isDarkMode', value: true });
      expect(response.status_code).toBe(204);
    });

    it('should return 400 when parameters are missing', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: SetBooleanResponse = {
        status_code: 400,
        error: 'Missing required parameters',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedStorageModule = {
        invoke: mockInvoke,
      };

      const module = new StorageModule();
      const response = await module.setBoolean('', true);

      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('Missing required parameters');
      }
    });
  });

  describe('getBoolean', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedStorageModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new StorageModule();
      const response = await module.getBoolean('isDarkMode');

      expect(response.status_code).toBe(501);
    });

    it('should return 200 with boolean value when key exists', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: GetBooleanResponse = {
        status_code: 200,
        result: { value: true },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedStorageModule = {
        invoke: mockInvoke,
      };

      const module = new StorageModule();
      const response = await module.getBoolean('isDarkMode');

      expect(mockInvoke).toHaveBeenCalledWith('getBoolean', { key: 'isDarkMode' });
      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.value).toBe(true);
      }
    });

    it('should return 200 with null when key does not exist', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (Android 13; SM-G998B)',
      });

      const mockResponse: GetBooleanResponse = {
        status_code: 200,
        result: { value: null },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedStorageModule = {
        invoke: mockInvoke,
      };

      const module = new StorageModule();
      const response = await module.getBoolean('nonExistentKey');

      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.value).toBe(null);
      }
    });

    it('should return 400 when key is missing', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: GetBooleanResponse = {
        status_code: 400,
        error: 'Missing required parameters',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedStorageModule = {
        invoke: mockInvoke,
      };

      const module = new StorageModule();
      const response = await module.getBoolean('');

      expect(response.status_code).toBe(400);
    });
  });

  describe('setInt', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedStorageModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new StorageModule();
      const response = await module.setInt('userCount', 42);

      expect(response.status_code).toBe(501);
    });

    it('should return 204 when integer value is set successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: SetIntResponse = {
        status_code: 204,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedStorageModule = {
        invoke: mockInvoke,
      };

      const module = new StorageModule();
      const response = await module.setInt('userCount', 42);

      expect(mockInvoke).toHaveBeenCalledWith('setInt', { key: 'userCount', value: 42 });
      expect(response.status_code).toBe(204);
    });

    it('should return 400 when parameters are missing', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: SetIntResponse = {
        status_code: 400,
        error: 'Missing required parameters',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedStorageModule = {
        invoke: mockInvoke,
      };

      const module = new StorageModule();
      const response = await module.setInt('', 42);

      expect(response.status_code).toBe(400);
    });
  });

  describe('getInt', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedStorageModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new StorageModule();
      const response = await module.getInt('userCount');

      expect(response.status_code).toBe(501);
    });

    it('should return 200 with integer value when key exists', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: GetIntResponse = {
        status_code: 200,
        result: { value: 42 },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedStorageModule = {
        invoke: mockInvoke,
      };

      const module = new StorageModule();
      const response = await module.getInt('userCount');

      expect(mockInvoke).toHaveBeenCalledWith('getInt', { key: 'userCount' });
      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.value).toBe(42);
      }
    });

    it('should return 200 with null when key does not exist', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (Android 13; SM-G998B)',
      });

      const mockResponse: GetIntResponse = {
        status_code: 200,
        result: { value: null },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedStorageModule = {
        invoke: mockInvoke,
      };

      const module = new StorageModule();
      const response = await module.getInt('nonExistentKey');

      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.value).toBe(null);
      }
    });
  });

  describe('setString', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedStorageModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new StorageModule();
      const response = await module.setString('username', 'john_doe');

      expect(response.status_code).toBe(501);
    });

    it('should return 204 when string value is set successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: SetStringResponse = {
        status_code: 204,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedStorageModule = {
        invoke: mockInvoke,
      };

      const module = new StorageModule();
      const response = await module.setString('username', 'john_doe');

      expect(mockInvoke).toHaveBeenCalledWith('setString', { key: 'username', value: 'john_doe' });
      expect(response.status_code).toBe(204);
    });

    it('should return 400 when parameters are missing', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: SetStringResponse = {
        status_code: 400,
        error: 'Missing required parameters',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedStorageModule = {
        invoke: mockInvoke,
      };

      const module = new StorageModule();
      const response = await module.setString('', 'value');

      expect(response.status_code).toBe(400);
    });
  });

  describe('getString', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedStorageModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new StorageModule();
      const response = await module.getString('username');

      expect(response.status_code).toBe(501);
    });

    it('should return 200 with string value when key exists', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: GetStringResponse = {
        status_code: 200,
        result: { value: 'john_doe' },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedStorageModule = {
        invoke: mockInvoke,
      };

      const module = new StorageModule();
      const response = await module.getString('username');

      expect(mockInvoke).toHaveBeenCalledWith('getString', { key: 'username' });
      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.value).toBe('john_doe');
      }
    });

    it('should return 200 with null when key does not exist', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (Android 13; SM-G998B)',
      });

      const mockResponse: GetStringResponse = {
        status_code: 200,
        result: { value: null },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedStorageModule = {
        invoke: mockInvoke,
      };

      const module = new StorageModule();
      const response = await module.getString('nonExistentKey');

      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.value).toBe(null);
      }
    });
  });

  describe('setDouble', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedStorageModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new StorageModule();
      const response = await module.setDouble('price', 19.99);

      expect(response.status_code).toBe(501);
    });

    it('should return 204 when double value is set successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: SetDoubleResponse = {
        status_code: 204,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedStorageModule = {
        invoke: mockInvoke,
      };

      const module = new StorageModule();
      const response = await module.setDouble('price', 19.99);

      expect(mockInvoke).toHaveBeenCalledWith('setDouble', { key: 'price', value: 19.99 });
      expect(response.status_code).toBe(204);
    });

    it('should return 400 when parameters are missing', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: SetDoubleResponse = {
        status_code: 400,
        error: 'Missing required parameters',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedStorageModule = {
        invoke: mockInvoke,
      };

      const module = new StorageModule();
      const response = await module.setDouble('', 19.99);

      expect(response.status_code).toBe(400);
    });
  });

  describe('getDouble', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedStorageModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new StorageModule();
      const response = await module.getDouble('price');

      expect(response.status_code).toBe(501);
    });

    it('should return 200 with double value when key exists', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: GetDoubleResponse = {
        status_code: 200,
        result: { value: 19.99 },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedStorageModule = {
        invoke: mockInvoke,
      };

      const module = new StorageModule();
      const response = await module.getDouble('price');

      expect(mockInvoke).toHaveBeenCalledWith('getDouble', { key: 'price' });
      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.value).toBe(19.99);
      }
    });

    it('should return 200 with null when key does not exist', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (Android 13; SM-G998B)',
      });

      const mockResponse: GetDoubleResponse = {
        status_code: 200,
        result: { value: null },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedStorageModule = {
        invoke: mockInvoke,
      };

      const module = new StorageModule();
      const response = await module.getDouble('nonExistentKey');

      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.value).toBe(null);
      }
    });
  });

  describe('remove', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedStorageModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new StorageModule();
      const response = await module.remove('username');

      expect(response.status_code).toBe(501);
    });

    it('should return 204 when value is removed successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: RemoveResponse = {
        status_code: 204,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedStorageModule = {
        invoke: mockInvoke,
      };

      const module = new StorageModule();
      const response = await module.remove('username');

      expect(mockInvoke).toHaveBeenCalledWith('remove', { key: 'username' });
      expect(response.status_code).toBe(204);
    });

    it('should return 400 when key is missing', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: RemoveResponse = {
        status_code: 400,
        error: 'Missing required parameters',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedStorageModule = {
        invoke: mockInvoke,
      };

      const module = new StorageModule();
      const response = await module.remove('');

      expect(response.status_code).toBe(400);
    });
  });

  describe('removeAll', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedStorageModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new StorageModule();
      const response = await module.removeAll();

      expect(response.status_code).toBe(501);
    });

    it('should return 204 when all values are removed successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: RemoveAllResponse = {
        status_code: 204,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedStorageModule = {
        invoke: mockInvoke,
      };

      const module = new StorageModule();
      const response = await module.removeAll();

      expect(mockInvoke).toHaveBeenCalledWith('removeAll', undefined);
      expect(response.status_code).toBe(204);
    });

    it('should return 204 when all values are removed on Android', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (Android 13; SM-G998B)',
      });

      const mockResponse: RemoveAllResponse = {
        status_code: 204,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedStorageModule = {
        invoke: mockInvoke,
      };

      const module = new StorageModule();
      const response = await module.removeAll();

      expect(mockInvoke).toHaveBeenCalledWith('removeAll', undefined);
      expect(response.status_code).toBe(204);
    });

    it('should return 500 when an unexpected error occurs', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockInvoke = vi.fn().mockImplementation(() => {
        throw new Error('Unexpected bridge error');
      });

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedStorageModule = {
        invoke: mockInvoke,
      };

      const module = new StorageModule();
      const response = await module.removeAll();

      expect(mockInvoke).toHaveBeenCalledWith('removeAll', undefined);
      expect(response.status_code).toBe(500);
      if (response.status_code === 500) {
        expect(response.error).toBe('Failed to invoke method');
      }
    });
  });
});
