/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { CheckoutModule } from './CheckoutModule';
import { TriggerCheckoutResponse } from './types';

describe('CheckoutModule', () => {
  describe('triggerCheckout', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedCheckoutModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new CheckoutModule();
      const response = await module.triggerCheckout({
        partnerTxID: 'txn-123',
        amount: 10000,
      });

      expect(response.status_code).toBe(501);
      if (response.status_code === 501) {
        expect(response.error).toBe(
          'Not implemented: This method requires the Grab app environment'
        );
      }
    });

    it('should return 200 when transaction succeeds', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: TriggerCheckoutResponse = {
        status_code: 200,
        result: {
          transactionID: 'grab-txn-abc123',
          status: 'success',
        },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedCheckoutModule = {
        invoke: mockInvoke,
      };

      const module = new CheckoutModule();
      const response = await module.triggerCheckout({
        partnerTxID: 'txn-123',
        amount: 10000,
      });

      expect(mockInvoke).toHaveBeenCalledWith('triggerCheckout', {
        partnerTxID: 'txn-123',
        amount: 10000,
      });
      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.transactionID).toBe('grab-txn-abc123');
        expect(response.result.status).toBe('success');
      }
    });

    it('should return 200 with failure status when transaction fails', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (Android 13; SM-G998B)',
      });

      const mockResponse: TriggerCheckoutResponse = {
        status_code: 200,
        result: {
          transactionID: 'grab-txn-def456',
          status: 'failure',
          errorMessage: 'Insufficient funds',
          errorCode: 'PAYMENT_FAILED',
        },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedCheckoutModule = {
        invoke: mockInvoke,
      };

      const module = new CheckoutModule();
      const response = await module.triggerCheckout({
        partnerTxID: 'txn-456',
        amount: 50000,
      });

      expect(mockInvoke).toHaveBeenCalledWith('triggerCheckout', {
        partnerTxID: 'txn-456',
        amount: 50000,
      });
      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.status).toBe('failure');
        expect(response.result.errorMessage).toBe('Insufficient funds');
        expect(response.result.errorCode).toBe('PAYMENT_FAILED');
      }
    });

    it('should return 200 with pending status', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'GrabBeta/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: TriggerCheckoutResponse = {
        status_code: 200,
        result: {
          transactionID: 'grab-txn-ghi789',
          status: 'pending',
        },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedCheckoutModule = {
        invoke: mockInvoke,
      };

      const module = new CheckoutModule();
      const response = await module.triggerCheckout({
        partnerTxID: 'txn-789',
        amount: 25000,
      });

      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.status).toBe('pending');
      }
    });

    it('should return 200 when user cancels checkout', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'GrabTaxi/5.256.0 (Android 12; Pixel 6)',
      });

      const mockResponse: TriggerCheckoutResponse = {
        status_code: 200,
        result: {
          transactionID: 'grab-txn-jkl012',
          status: 'userInitiatedCancel',
        },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedCheckoutModule = {
        invoke: mockInvoke,
      };

      const module = new CheckoutModule();
      const response = await module.triggerCheckout({
        partnerTxID: 'txn-012',
        amount: 15000,
      });

      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.status).toBe('userInitiatedCancel');
      }
    });

    it('should return 400 when checkout parameters are invalid', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: TriggerCheckoutResponse = {
        status_code: 400,
        error: 'Invalid checkout parameters',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedCheckoutModule = {
        invoke: mockInvoke,
      };

      const module = new CheckoutModule();
      const response = await module.triggerCheckout({});

      expect(mockInvoke).toHaveBeenCalledWith('triggerCheckout', {});
      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('Invalid checkout parameters');
      }
    });

    it('should return 500 when an unexpected error occurs', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockInvoke = vi.fn().mockImplementation(() => {
        throw new Error('Unexpected bridge error');
      });

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedCheckoutModule = {
        invoke: mockInvoke,
      };

      const module = new CheckoutModule();
      const response = await module.triggerCheckout({ partnerTxID: 'txn-error' });

      expect(mockInvoke).toHaveBeenCalledWith('triggerCheckout', { partnerTxID: 'txn-error' });
      expect(response.status_code).toBe(500);
      if (response.status_code === 500) {
        expect(response.error).toBe('Failed to invoke method');
      }
    });
  });
});
