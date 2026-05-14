/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { hasResult, isError } from '../../core/guards';
import { NetworkModule } from './NetworkModule';
import { SendResponse } from './types';

describe('NetworkModule', () => {
  describe('send', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedNetworkModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new NetworkModule();
      const response = await module.send({
        endpoint: 'https://api.example.com/users',
        method: 'GET',
      });

      expect(response.status_code).toBe(501);
      if (isError(response)) {
        expect(response.error).toBe(
          'Not implemented: This method requires the Grab app environment'
        );
      }
    });

    it('should return 200 with response data on successful GET request', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (Android 13; SM-G998B)',
      });

      const mockResponse: SendResponse = {
        status_code: 200,
        result: { id: 123, name: 'John Doe' },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedNetworkModule = {
        invoke: mockInvoke,
      };

      const module = new NetworkModule();
      const response = await module.send({
        endpoint: 'https://api.example.com/users',
        method: 'GET',
      });

      expect(mockInvoke).toHaveBeenCalledWith('send', {
        endpoint: 'https://api.example.com/users',
        method: 'GET',
      });
      expect(response.status_code).toBe(200);
      if (hasResult(response)) {
        expect(response.result).toEqual({ id: 123, name: 'John Doe' });
      }
    });

    it('should return 200 with response data on successful POST request', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: SendResponse = {
        status_code: 200,
        result: { id: 456, created: true },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedNetworkModule = {
        invoke: mockInvoke,
      };

      const module = new NetworkModule();
      const response = await module.send({
        endpoint: 'https://api.example.com/users',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { name: 'Jane Doe' },
        timeout: 30,
      });

      expect(mockInvoke).toHaveBeenCalledWith('send', {
        endpoint: 'https://api.example.com/users',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { name: 'Jane Doe' },
        timeout: 30,
      });
      expect(response.status_code).toBe(200);
      if (hasResult(response)) {
        expect(response.result).toEqual({ id: 456, created: true });
      }
    });

    it('should parse stringified JSON result from native JSBridge', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (Android 13; SM-G998B)',
      });

      const mockResponse: SendResponse = {
        status_code: 200,
        result: '{"id": 789, "name": "String User"}' as unknown as Record<string, unknown>,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedNetworkModule = {
        invoke: mockInvoke,
      };

      const module = new NetworkModule();
      const response = await module.send({
        endpoint: 'https://api.example.com/users/789',
        method: 'GET',
      });

      expect(mockInvoke).toHaveBeenCalledWith('send', {
        endpoint: 'https://api.example.com/users/789',
        method: 'GET',
      });
      expect(response.status_code).toBe(200);
      if (hasResult(response)) {
        expect(response.result).toEqual({ id: 789, name: 'String User' });
      }
    });

    it('should return 500 when result is invalid JSON string', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: SendResponse = {
        status_code: 200,
        result: 'invalid json string' as unknown as Record<string, unknown>,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedNetworkModule = {
        invoke: mockInvoke,
      };

      const module = new NetworkModule();
      const response = await module.send({
        endpoint: 'https://api.example.com/users',
        method: 'GET',
      });

      expect(mockInvoke).toHaveBeenCalledWith('send', {
        endpoint: 'https://api.example.com/users',
        method: 'GET',
      });
      expect(response.status_code).toBe(500);
      if (isError(response)) {
        expect(response.error).toBe('Failed to parse response result as JSON');
      }
    });

    it('should return 500 when network request fails', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (Android 13; SM-G998B)',
      });

      const mockResponse: SendResponse = {
        status_code: 500,
        error: 'Network request failed',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedNetworkModule = {
        invoke: mockInvoke,
      };

      const module = new NetworkModule();
      const response = await module.send({
        endpoint: 'https://api.example.com/users',
        method: 'GET',
      });

      expect(mockInvoke).toHaveBeenCalledWith('send', {
        endpoint: 'https://api.example.com/users',
        method: 'GET',
      });
      expect(response.status_code).toBe(500);
      if (isError(response)) {
        expect(response.error).toBe('Network request failed');
      }
    });

    it('should return 500 when an unexpected error occurs during invoke', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (iPhone; iOS 16.0)',
      });

      const mockInvoke = vi.fn().mockImplementation(() => {
        throw new Error('Unexpected JSBridge error');
      });

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedNetworkModule = {
        invoke: mockInvoke,
      };

      const module = new NetworkModule();
      const response = await module.send({
        endpoint: 'https://api.example.com/users',
        method: 'GET',
      });

      expect(mockInvoke).toHaveBeenCalledWith('send', {
        endpoint: 'https://api.example.com/users',
        method: 'GET',
      });
      expect(response.status_code).toBe(500);
      if (isError(response)) {
        expect(response.error).toBe('Failed to invoke method: Unexpected JSBridge error');
      }
    });
  });
});
