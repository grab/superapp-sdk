/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { FileModule } from './FileModule';
import { DownloadFileResponse } from './types';

describe('FileModule', () => {
  describe('downloadFile', () => {
    const request = {
      fileUrl: 'https://example.com/report.pdf',
      fileName: 'report.pdf',
    };

    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedFileModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new FileModule();
      const response = await module.downloadFile(request);

      expect(response.status_code).toBe(501);
      if (response.status_code === 501) {
        expect(response.error).toBe(
          'Not implemented: This method requires the Grab app environment'
        );
      }
    });

    it('should return 204 when file download is successful', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: DownloadFileResponse = {
        status_code: 204,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedFileModule = {
        invoke: mockInvoke,
      };

      const module = new FileModule();
      const response = await module.downloadFile(request);

      expect(mockInvoke).toHaveBeenCalledWith('downloadFile', request);
      expect(response.status_code).toBe(204);
    });

    it('should return 400 when request is invalid', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (Android 13; SM-G998B)',
      });

      const mockResponse: DownloadFileResponse = {
        status_code: 400,
        error: 'Invalid request',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedFileModule = {
        invoke: mockInvoke,
      };

      const module = new FileModule();
      const response = await module.downloadFile(request);

      expect(mockInvoke).toHaveBeenCalledWith('downloadFile', request);
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

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedFileModule = {
        invoke: mockInvoke,
      };

      const module = new FileModule();
      const response = await module.downloadFile(request);

      expect(mockInvoke).toHaveBeenCalledWith('downloadFile', request);
      expect(response.status_code).toBe(500);
      if (response.status_code === 500) {
        expect(response.error).toBe('Failed to invoke method');
      }
    });
  });
});
