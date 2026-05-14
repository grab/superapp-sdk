/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { StorageModule } from './StorageModule';
import type {
  NativeGetBooleanResponse,
  NativeGetDoubleResponse,
  NativeGetIntResponse,
  NativeGetStringResponse,
} from './types';
import {
  RemoveAllResponse,
  RemoveResponse,
  SetBooleanResponse,
  SetDoubleResponse,
  SetIntResponse,
  SetStringResponse,
} from './types';

const GRAB_IOS_UA = 'Grab/5.256.0 (iPhone; iOS 16.0)';
const GRAB_ANDROID_UA = 'Grab/5.256.0 (Android 13; SM-G998B)';
const NON_GRAB_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124';

function stubGrabUserAgent(userAgent = GRAB_IOS_UA) {
  vi.stubGlobal('navigator', { userAgent });
}

function stubNonGrabUserAgent() {
  vi.stubGlobal('navigator', { userAgent: NON_GRAB_UA });
}

function cleanupStorageModuleTest() {
  vi.unstubAllGlobals();
  delete (window as unknown as Record<string, unknown>).WrappedStorageModule;
}

function installWrappedStorageMock(invoke: ReturnType<typeof vi.fn>) {
  (window as unknown as Record<string, { invoke: typeof invoke }>).WrappedStorageModule = {
    invoke,
  };
}

describe('StorageModule', () => {
  afterEach(() => {
    cleanupStorageModuleTest();
  });

  describe('setBoolean', () => {
    it('should return 501 when not running in Grab app', async () => {
      stubNonGrabUserAgent();

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
      stubGrabUserAgent();

      const mockResponse: SetBooleanResponse = {
        status_code: 204,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.setBoolean('isDarkMode', true);

      expect(mockInvoke).toHaveBeenCalledWith('setBoolean', { key: 'isDarkMode', value: true });
      expect(response.status_code).toBe(204);
    });

    it('should return 400 when key is empty without calling the JSBridge', async () => {
      stubGrabUserAgent();

      const mockInvoke = vi.fn();
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.setBoolean('', true);

      expect(response.status_code).toBe(400);
      expect(mockInvoke).not.toHaveBeenCalled();
      if (response.status_code === 400) {
        expect(response.error).toMatch(/key/i);
      }
    });
  });

  describe('getBoolean', () => {
    it('should return 501 when not running in Grab app', async () => {
      stubNonGrabUserAgent();

      const module = new StorageModule();
      const response = await module.getBoolean('isDarkMode');

      expect(response.status_code).toBe(501);
    });

    it('should return 200 with boolean value when key exists', async () => {
      stubGrabUserAgent();

      const nativeResponse: NativeGetBooleanResponse = {
        status_code: 200,
        result: true,
      };

      const mockInvoke = vi.fn().mockResolvedValue(nativeResponse);
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.getBoolean('isDarkMode');

      expect(mockInvoke).toHaveBeenCalledWith('getBoolean', { key: 'isDarkMode' });
      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect('result' in response).toBe(true);
        expect(response.result).toBe(true);
      }
    });

    it('should return 204 when JSBridge reports null result for missing key', async () => {
      stubGrabUserAgent(GRAB_ANDROID_UA);

      const nativeResponse: NativeGetBooleanResponse = {
        status_code: 200,
        result: null,
      };

      const mockInvoke = vi.fn().mockResolvedValue(nativeResponse);
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.getBoolean('nonExistentKey');

      expect(response.status_code).toBe(204);
      expect('result' in response).toBe(false);
    });

    it('should return 204 when JSBridge omits result on 200', async () => {
      stubGrabUserAgent();

      const nativeResponse = { status_code: 200 as const } satisfies NativeGetBooleanResponse;

      const mockInvoke = vi.fn().mockResolvedValue(nativeResponse);
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.getBoolean('nonExistentKey');

      expect(response.status_code).toBe(204);
      expect('result' in response).toBe(false);
    });

    it('should return 400 when key is empty without calling the JSBridge', async () => {
      stubGrabUserAgent();

      const mockInvoke = vi.fn();
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.getBoolean('');

      expect(response.status_code).toBe(400);
      expect(mockInvoke).not.toHaveBeenCalled();
      if (response.status_code === 400) {
        expect(response.error).toMatch(/key/i);
      }
    });
  });

  describe('setInt', () => {
    it('should return 501 when not running in Grab app', async () => {
      stubNonGrabUserAgent();

      const module = new StorageModule();
      const response = await module.setInt('userCount', 42);

      expect(response.status_code).toBe(501);
    });

    it('should return 204 when integer value is set successfully', async () => {
      stubGrabUserAgent();

      const mockResponse: SetIntResponse = {
        status_code: 204,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.setInt('userCount', 42);

      expect(mockInvoke).toHaveBeenCalledWith('setInt', { key: 'userCount', value: 42 });
      expect(response.status_code).toBe(204);
    });

    it('should return 400 when key is empty without calling the JSBridge', async () => {
      stubGrabUserAgent();

      const mockInvoke = vi.fn();
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.setInt('', 42);

      expect(response.status_code).toBe(400);
      expect(mockInvoke).not.toHaveBeenCalled();
      if (response.status_code === 400) {
        expect(response.error).toMatch(/key/i);
      }
    });
  });

  describe('getInt', () => {
    it('should return 501 when not running in Grab app', async () => {
      stubNonGrabUserAgent();

      const module = new StorageModule();
      const response = await module.getInt('userCount');

      expect(response.status_code).toBe(501);
    });

    it('should return 200 with integer value when key exists', async () => {
      stubGrabUserAgent();

      const nativeResponse: NativeGetIntResponse = {
        status_code: 200,
        result: 42,
      };

      const mockInvoke = vi.fn().mockResolvedValue(nativeResponse);
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.getInt('userCount');

      expect(mockInvoke).toHaveBeenCalledWith('getInt', { key: 'userCount' });
      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect('result' in response).toBe(true);
        expect(response.result).toBe(42);
      }
    });

    it('should return 204 when JSBridge reports null result for missing key', async () => {
      stubGrabUserAgent(GRAB_ANDROID_UA);

      const nativeResponse: NativeGetIntResponse = {
        status_code: 200,
        result: null,
      };

      const mockInvoke = vi.fn().mockResolvedValue(nativeResponse);
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.getInt('nonExistentKey');

      expect(response.status_code).toBe(204);
      expect('result' in response).toBe(false);
    });

    it('should return 204 when JSBridge omits result on 200', async () => {
      stubGrabUserAgent();

      const nativeResponse = { status_code: 200 as const } satisfies NativeGetIntResponse;

      const mockInvoke = vi.fn().mockResolvedValue(nativeResponse);
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.getInt('nonExistentKey');

      expect(response.status_code).toBe(204);
      expect('result' in response).toBe(false);
    });

    it('should return 400 when key is empty without calling the JSBridge', async () => {
      stubGrabUserAgent();

      const mockInvoke = vi.fn();
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.getInt('');

      expect(response.status_code).toBe(400);
      expect(mockInvoke).not.toHaveBeenCalled();
      if (response.status_code === 400) {
        expect(response.error).toMatch(/key/i);
      }
    });
  });

  describe('setString', () => {
    it('should return 501 when not running in Grab app', async () => {
      stubNonGrabUserAgent();

      const module = new StorageModule();
      const response = await module.setString('username', 'john_doe');

      expect(response.status_code).toBe(501);
    });

    it('should return 204 when string value is set successfully', async () => {
      stubGrabUserAgent();

      const mockResponse: SetStringResponse = {
        status_code: 204,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.setString('username', 'john_doe');

      expect(mockInvoke).toHaveBeenCalledWith('setString', { key: 'username', value: 'john_doe' });
      expect(response.status_code).toBe(204);
    });

    it('should return 400 when key is empty without calling the JSBridge', async () => {
      stubGrabUserAgent();

      const mockInvoke = vi.fn();
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.setString('', 'value');

      expect(response.status_code).toBe(400);
      expect(mockInvoke).not.toHaveBeenCalled();
      if (response.status_code === 400) {
        expect(response.error).toMatch(/key/i);
      }
    });
  });

  describe('getString', () => {
    it('should return 501 when not running in Grab app', async () => {
      stubNonGrabUserAgent();

      const module = new StorageModule();
      const response = await module.getString('username');

      expect(response.status_code).toBe(501);
    });

    it('should return 200 with string value when key exists', async () => {
      stubGrabUserAgent();

      const nativeResponse: NativeGetStringResponse = {
        status_code: 200,
        result: 'john_doe',
      };

      const mockInvoke = vi.fn().mockResolvedValue(nativeResponse);
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.getString('username');

      expect(mockInvoke).toHaveBeenCalledWith('getString', { key: 'username' });
      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect('result' in response).toBe(true);
        expect(response.result).toBe('john_doe');
      }
    });

    it('should return 204 when JSBridge reports null result for missing key', async () => {
      stubGrabUserAgent(GRAB_ANDROID_UA);

      const nativeResponse: NativeGetStringResponse = {
        status_code: 200,
        result: null,
      };

      const mockInvoke = vi.fn().mockResolvedValue(nativeResponse);
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.getString('nonExistentKey');

      expect(response.status_code).toBe(204);
      expect('result' in response).toBe(false);
    });

    it('should return 204 when JSBridge omits result on 200', async () => {
      stubGrabUserAgent();

      const nativeResponse = { status_code: 200 as const } satisfies NativeGetStringResponse;

      const mockInvoke = vi.fn().mockResolvedValue(nativeResponse);
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.getString('nonExistentKey');

      expect(response.status_code).toBe(204);
      expect('result' in response).toBe(false);
    });

    it('should return 400 when key is empty without calling the JSBridge', async () => {
      stubGrabUserAgent();

      const mockInvoke = vi.fn();
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.getString('');

      expect(response.status_code).toBe(400);
      expect(mockInvoke).not.toHaveBeenCalled();
      if (response.status_code === 400) {
        expect(response.error).toMatch(/key/i);
      }
    });
  });

  describe('setDouble', () => {
    it('should return 501 when not running in Grab app', async () => {
      stubNonGrabUserAgent();

      const module = new StorageModule();
      const response = await module.setDouble('price', 19.99);

      expect(response.status_code).toBe(501);
    });

    it('should return 204 when double value is set successfully', async () => {
      stubGrabUserAgent();

      const mockResponse: SetDoubleResponse = {
        status_code: 204,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.setDouble('price', 19.99);

      expect(mockInvoke).toHaveBeenCalledWith('setDouble', { key: 'price', value: 19.99 });
      expect(response.status_code).toBe(204);
    });

    it('should return 400 when key is empty without calling the JSBridge', async () => {
      stubGrabUserAgent();

      const mockInvoke = vi.fn();
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.setDouble('', 19.99);

      expect(response.status_code).toBe(400);
      expect(mockInvoke).not.toHaveBeenCalled();
      if (response.status_code === 400) {
        expect(response.error).toMatch(/key/i);
      }
    });
  });

  describe('getDouble', () => {
    it('should return 501 when not running in Grab app', async () => {
      stubNonGrabUserAgent();

      const module = new StorageModule();
      const response = await module.getDouble('price');

      expect(response.status_code).toBe(501);
    });

    it('should return 200 with double value when key exists', async () => {
      stubGrabUserAgent();

      const nativeResponse: NativeGetDoubleResponse = {
        status_code: 200,
        result: 19.99,
      };

      const mockInvoke = vi.fn().mockResolvedValue(nativeResponse);
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.getDouble('price');

      expect(mockInvoke).toHaveBeenCalledWith('getDouble', { key: 'price' });
      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect('result' in response).toBe(true);
        expect(response.result).toBe(19.99);
      }
    });

    it('should return 204 when JSBridge reports null result for missing key', async () => {
      stubGrabUserAgent(GRAB_ANDROID_UA);

      const nativeResponse: NativeGetDoubleResponse = {
        status_code: 200,
        result: null,
      };

      const mockInvoke = vi.fn().mockResolvedValue(nativeResponse);
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.getDouble('nonExistentKey');

      expect(response.status_code).toBe(204);
      expect('result' in response).toBe(false);
    });

    it('should return 204 when JSBridge omits result on 200', async () => {
      stubGrabUserAgent();

      const nativeResponse = { status_code: 200 as const } satisfies NativeGetDoubleResponse;

      const mockInvoke = vi.fn().mockResolvedValue(nativeResponse);
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.getDouble('nonExistentKey');

      expect(response.status_code).toBe(204);
      expect('result' in response).toBe(false);
    });

    it('should return 400 when key is empty without calling the JSBridge', async () => {
      stubGrabUserAgent();

      const mockInvoke = vi.fn();
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.getDouble('');

      expect(response.status_code).toBe(400);
      expect(mockInvoke).not.toHaveBeenCalled();
      if (response.status_code === 400) {
        expect(response.error).toMatch(/key/i);
      }
    });
  });

  describe('remove', () => {
    it('should return 501 when not running in Grab app', async () => {
      stubNonGrabUserAgent();

      const module = new StorageModule();
      const response = await module.remove('username');

      expect(response.status_code).toBe(501);
    });

    it('should return 204 when value is removed successfully', async () => {
      stubGrabUserAgent();

      const mockResponse: RemoveResponse = {
        status_code: 204,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.remove('username');

      expect(mockInvoke).toHaveBeenCalledWith('remove', { key: 'username' });
      expect(response.status_code).toBe(204);
    });

    it('should return 400 when key is empty without calling the JSBridge', async () => {
      stubGrabUserAgent();

      const mockInvoke = vi.fn();
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.remove('');

      expect(response.status_code).toBe(400);
      expect(mockInvoke).not.toHaveBeenCalled();
      if (response.status_code === 400) {
        expect(response.error).toMatch(/key/i);
      }
    });
  });

  describe('removeAll', () => {
    it('should return 501 when not running in Grab app', async () => {
      stubNonGrabUserAgent();

      const module = new StorageModule();
      const response = await module.removeAll();

      expect(response.status_code).toBe(501);
    });

    it('should return 204 when all values are removed successfully', async () => {
      stubGrabUserAgent();

      const mockResponse: RemoveAllResponse = {
        status_code: 204,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.removeAll();

      expect(mockInvoke).toHaveBeenCalledWith('removeAll', undefined);
      expect(response.status_code).toBe(204);
    });

    it('should return 204 when all values are removed on Android', async () => {
      stubGrabUserAgent(GRAB_ANDROID_UA);

      const mockResponse: RemoveAllResponse = {
        status_code: 204,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.removeAll();

      expect(mockInvoke).toHaveBeenCalledWith('removeAll', undefined);
      expect(response.status_code).toBe(204);
    });

    it('should return 500 when an unexpected error occurs', async () => {
      stubGrabUserAgent();

      const mockInvoke = vi.fn().mockImplementation(() => {
        throw new Error('Unexpected JSBridge error');
      });
      installWrappedStorageMock(mockInvoke);

      const module = new StorageModule();
      const response = await module.removeAll();

      expect(mockInvoke).toHaveBeenCalledWith('removeAll', undefined);
      expect(response.status_code).toBe(500);
      if (response.status_code === 500) {
        expect(response.error).toBe('Failed to invoke method: Unexpected JSBridge error');
      }
    });
  });
});
