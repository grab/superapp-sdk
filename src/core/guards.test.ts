/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { describe, expect, it } from 'vitest';

import {
  hasResult,
  isClientError,
  isError,
  isFound,
  isNoContent,
  isOk,
  isRedirection,
  isServerError,
  isSuccess,
} from './guards';
import type { BridgeResponse } from './types';

describe('guards', () => {
  describe('isSuccess', () => {
    it('should return true for status code 200', () => {
      const response: BridgeResponse = { status_code: 200, result: 'data' };
      expect(isSuccess(response)).toBe(true);
    });

    it('should return true for status code 204', () => {
      const response: BridgeResponse = { status_code: 204 };
      expect(isSuccess(response)).toBe(true);
    });

    it('should return true for status code 299', () => {
      const response: BridgeResponse = { status_code: 299, result: 'data' };
      expect(isSuccess(response)).toBe(true);
    });

    it('should return false for status code 199', () => {
      const response: BridgeResponse = { status_code: 199, result: 'data' };
      expect(isSuccess(response)).toBe(false);
    });

    it('should return false for status code 300', () => {
      const response: BridgeResponse = { status_code: 300 };
      expect(isSuccess(response)).toBe(false);
    });

    it('should return false for status code 400', () => {
      const response: BridgeResponse = { status_code: 400, error: 'Bad Request' };
      expect(isSuccess(response)).toBe(false);
    });

    it('should return false for status code 500', () => {
      const response: BridgeResponse = { status_code: 500, error: 'Server Error' };
      expect(isSuccess(response)).toBe(false);
    });
  });

  describe('isOk', () => {
    it('should return true for status code 200', () => {
      const response: BridgeResponse = { status_code: 200, result: 'data' };
      expect(isOk(response)).toBe(true);
    });

    it('should return false for status code 201', () => {
      const response: BridgeResponse = { status_code: 201, result: 'data' };
      expect(isOk(response)).toBe(false);
    });

    it('should return false for status code 204', () => {
      const response: BridgeResponse = { status_code: 204 };
      expect(isOk(response)).toBe(false);
    });
  });

  describe('isNoContent', () => {
    it('should return true for status code 204', () => {
      const response: BridgeResponse = { status_code: 204 };
      expect(isNoContent(response)).toBe(true);
    });

    it('should return false for status code 200', () => {
      const response: BridgeResponse = { status_code: 200, result: 'data' };
      expect(isNoContent(response)).toBe(false);
    });

    it('should return false for status code 201', () => {
      const response: BridgeResponse = { status_code: 201 };
      expect(isNoContent(response)).toBe(false);
    });
  });

  describe('isRedirection', () => {
    it('should return true for status code 302', () => {
      const response: BridgeResponse = { status_code: 302 };
      expect(isRedirection(response)).toBe(true);
    });

    it('should return false for status code 200', () => {
      const response: BridgeResponse = { status_code: 200, result: 'data' };
      expect(isRedirection(response)).toBe(false);
    });

    it('should return false for status code 301', () => {
      const response: BridgeResponse = { status_code: 301 };
      expect(isRedirection(response)).toBe(false);
    });
  });

  describe('isFound', () => {
    it('should return true for status code 302', () => {
      const response: BridgeResponse = { status_code: 302 };
      expect(isFound(response)).toBe(true);
    });

    it('should return false for status code 200', () => {
      const response: BridgeResponse = { status_code: 200, result: 'data' };
      expect(isFound(response)).toBe(false);
    });
  });

  describe('isClientError', () => {
    it('should return true for status code 400', () => {
      const response: BridgeResponse = { status_code: 400, error: 'Bad Request' };
      expect(isClientError(response)).toBe(true);
    });

    it('should return true for status code 401', () => {
      const response: BridgeResponse = { status_code: 401, error: 'Unauthorized' };
      expect(isClientError(response)).toBe(true);
    });

    it('should return true for status code 403', () => {
      const response: BridgeResponse = { status_code: 403, error: 'Forbidden' };
      expect(isClientError(response)).toBe(true);
    });

    it('should return true for status code 404', () => {
      const response: BridgeResponse = { status_code: 404, error: 'Not Found' };
      expect(isClientError(response)).toBe(true);
    });

    it('should return true for status code 424', () => {
      const response: BridgeResponse = { status_code: 424, error: 'Failed Dependency' };
      expect(isClientError(response)).toBe(true);
    });

    it('should return true for status code 426', () => {
      const response: BridgeResponse = { status_code: 426, error: 'Upgrade Required' };
      expect(isClientError(response)).toBe(true);
    });

    it('should return true for status code 499', () => {
      const response: BridgeResponse = { status_code: 499, error: 'Client Error' };
      expect(isClientError(response)).toBe(true);
    });

    it('should return false for status code 399', () => {
      const response: BridgeResponse = { status_code: 399 };
      expect(isClientError(response)).toBe(false);
    });

    it('should return false for status code 500', () => {
      const response: BridgeResponse = { status_code: 500, error: 'Server Error' };
      expect(isClientError(response)).toBe(false);
    });

    it('should return false for status code 200', () => {
      const response: BridgeResponse = { status_code: 200, result: 'data' };
      expect(isClientError(response)).toBe(false);
    });
  });

  describe('isServerError', () => {
    it('should return true for status code 500', () => {
      const response: BridgeResponse = { status_code: 500, error: 'Internal Server Error' };
      expect(isServerError(response)).toBe(true);
    });

    it('should return true for status code 501', () => {
      const response: BridgeResponse = { status_code: 501, error: 'Not Implemented' };
      expect(isServerError(response)).toBe(true);
    });

    it('should return true for status code 599', () => {
      const response: BridgeResponse = { status_code: 599, error: 'Server Error' };
      expect(isServerError(response)).toBe(true);
    });

    it('should return false for status code 499', () => {
      const response: BridgeResponse = { status_code: 499, error: 'Client Error' };
      expect(isServerError(response)).toBe(false);
    });

    it('should return false for status code 600', () => {
      const response: BridgeResponse = { status_code: 600 };
      expect(isServerError(response)).toBe(false);
    });

    it('should return false for status code 200', () => {
      const response: BridgeResponse = { status_code: 200, result: 'data' };
      expect(isServerError(response)).toBe(false);
    });

    it('should return false for status code 400', () => {
      const response: BridgeResponse = { status_code: 400, error: 'Bad Request' };
      expect(isServerError(response)).toBe(false);
    });
  });

  describe('isError', () => {
    it('should return true for status code 400', () => {
      const response: BridgeResponse = { status_code: 400, error: 'Bad Request' };
      expect(isError(response)).toBe(true);
    });

    it('should return true for status code 404', () => {
      const response: BridgeResponse = { status_code: 404, error: 'Not Found' };
      expect(isError(response)).toBe(true);
    });

    it('should return true for status code 500', () => {
      const response: BridgeResponse = { status_code: 500, error: 'Server Error' };
      expect(isError(response)).toBe(true);
    });

    it('should return true for status code 503', () => {
      const response: BridgeResponse = { status_code: 503, error: 'Service Unavailable' };
      expect(isError(response)).toBe(true);
    });

    it('should return true when error string is present regardless of status code', () => {
      const response: BridgeResponse = { status_code: 200, error: 'Some error' };
      expect(isError(response)).toBe(true);
    });

    it('should return false for status code 200 without error', () => {
      const response: BridgeResponse = { status_code: 200, result: 'data' };
      expect(isError(response)).toBe(false);
    });

    it('should return false for status code 204', () => {
      const response: BridgeResponse = { status_code: 204 };
      expect(isError(response)).toBe(false);
    });

    it('should return false for status code 302', () => {
      const response: BridgeResponse = { status_code: 302 };
      expect(isError(response)).toBe(false);
    });

    it('should return true for 4xx status code even with empty error string', () => {
      const response: BridgeResponse = { status_code: 400, error: '' };
      expect(isError(response)).toBe(true);
    });

    it('should return false when error is empty string and status is success', () => {
      const response: BridgeResponse = { status_code: 200, error: '' };
      expect(isError(response)).toBe(false);
    });
  });

  describe('hasResult', () => {
    it('should return true when result is a string', () => {
      const response: BridgeResponse = { status_code: 200, result: 'data' };
      expect(hasResult(response)).toBe(true);
    });

    it('should return true when result is an object', () => {
      const response: BridgeResponse = { status_code: 200, result: { id: 1 } };
      expect(hasResult(response)).toBe(true);
    });

    it('should return true when result is a number', () => {
      const response: BridgeResponse = { status_code: 200, result: 42 };
      expect(hasResult(response)).toBe(true);
    });

    it('should return true when result is an empty string', () => {
      const response: BridgeResponse = { status_code: 200, result: '' };
      expect(hasResult(response)).toBe(true);
    });

    it('should return true when result is an empty object', () => {
      const response: BridgeResponse = { status_code: 200, result: {} };
      expect(hasResult(response)).toBe(true);
    });

    it('should return true when result is false', () => {
      const response: BridgeResponse = { status_code: 200, result: false };
      expect(hasResult(response)).toBe(true);
    });

    it('should return true when result is 0', () => {
      const response: BridgeResponse = { status_code: 200, result: 0 };
      expect(hasResult(response)).toBe(true);
    });

    it('should return false when result is null', () => {
      const response: BridgeResponse = { status_code: 200, result: null };
      expect(hasResult(response)).toBe(false);
    });

    it('should return false when result is undefined', () => {
      const response: BridgeResponse = { status_code: 200, result: undefined };
      expect(hasResult(response)).toBe(false);
    });

    it('should return false when result property is missing', () => {
      const response: BridgeResponse = { status_code: 204 };
      expect(hasResult(response)).toBe(false);
    });

    it('should return false for error responses without result', () => {
      const response: BridgeResponse = { status_code: 400, error: 'Bad Request' };
      expect(hasResult(response)).toBe(false);
    });
  });
});
