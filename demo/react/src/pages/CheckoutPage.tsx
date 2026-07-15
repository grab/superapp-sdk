import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isSuccess, isOk, isNoContent, isError, ContainerModule, IdentityModule, ScopeModule, CheckoutModule, LoyaltyModule } from '@grabjs/superapp-sdk';
import { ENVIRONMENT_CONFIG } from '../config';
import { runOptional, formatError } from '../utils/sdkHelpers';
import { WarningArea } from '../components/WarningArea';
import { StatusMessage } from '../components/StatusMessage';

import type { PageState } from '../types';

const REWARDS_ITEM = { id: 'checkout-item', amount_in_minor_units: 75000, currency_code: 'SGD' };

const SAMPLE_PAYLOAD = {
  partnerTxID: 'your_unique_transaction_id',
  request: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  sessionID: 'session-123',
};

const STATUS_STYLES: Record<string, { type: 'success' | 'error' | 'warning'; label: string }> = {
  Success: { type: 'success', label: 'Success' },
  Failure: { type: 'error', label: 'Failed' },
  Pending: { type: 'warning', label: 'Pending' },
  Cancel: { type: 'warning', label: 'Cancelled by user' }
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const hasRun = useRef(false);
  const [pageState, setPageState] = useState<PageState>({ status: 'loading', message: 'Checking environment...' });
  const [warning, setWarning] = useState<string | null>(null);
  const [payload, setPayload] = useState(JSON.stringify(SAMPLE_PAYLOAD, null, 2));
  const [result, setResult] = useState<{ status: string; transactionID?: string; errorCode?: string; errorMessage?: string } | null>(null);
  const [rewardDisplay, setRewardDisplay] = useState<string | null>(null);

  async function init() {
    setPageState({ status: 'loading', message: 'Checking environment...' });

    const container = new ContainerModule();

    const connectionResponse = await container.isConnected();
    if (!isSuccess(connectionResponse) || !connectionResponse.result?.connected) {
      setPageState({ status: 'error', message: 'This page must be opened from within the Grab SuperApp.', type: 'error' });
      return;
    }

    await runOptional('Set background color', container.setBackgroundColor('#005339'), setWarning);
    await runOptional('Set title', container.setTitle('Checkout'), setWarning);
    await runOptional('Show back button', container.showBackButton(), setWarning);
    await runOptional('Hide refresh button', container.hideRefreshButton(), setWarning);
    
    await runOptional('Send DEFAULT analytics', container.sendAnalyticsEvent({ state: 'CHECKOUT_PAGE', name: 'DEFAULT' }), setWarning);

    const loyalty = new LoyaltyModule();
    const rewardsResponse = await loyalty.estimateRewards({ items: [REWARDS_ITEM] });
    if (isOk(rewardsResponse)) {
      const first = rewardsResponse.result.items[0];
      if (first?.status_code === 'SUCCESS') {
        setRewardDisplay(`${first.result.reward.display_amount} ${first.result.reward.currency_code}`);
      }
    }

    setPageState({ status: 'ready' });
  }

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    queueMicrotask(init);
  }, []);

  async function handleTriggerCheckout() {
    setResult(null);
    let parsedPayload: Record<string, unknown>;
    try {
      parsedPayload = JSON.parse(payload);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setResult({ status: 'parse_error', errorMessage: `Invalid JSON: ${message}` });
      return;
    }

    const identity = new IdentityModule();
    const scope = new ScopeModule();
    const checkout = new CheckoutModule();
    const container = new ContainerModule();

    const hasAccessResponse = await scope.hasAccessTo('CheckoutModule', 'triggerCheckout');
    if (!isSuccess(hasAccessResponse) || !hasAccessResponse.result) {
      const authResponse = await identity.authorize({
        clientId: ENVIRONMENT_CONFIG.clientId,
        redirectUri: window.location.href,
        scope: 'mobile.checkout',
        environment: 'staging',
        responseMode: 'in_place'
      });
      if (!isOk(authResponse)) {
        if (isError(authResponse)) {
          setResult({ status: 'error', errorMessage: formatError('Checkout authorization', authResponse) });
        } else if (isNoContent(authResponse)) {
          setResult({ status: 'warning', errorMessage: 'Checkout permission was cancelled.' });
        }
        return;
      }

      const reloadResponse = await scope.reloadScopes();
      if (!isSuccess(reloadResponse)) {
        setResult({ status: 'error', errorMessage: formatError('Reload scopes', reloadResponse) });
        return;
      }
      await identity.clearAuthorizationArtifacts();
    }

    await runOptional('Send TRANSACT analytics', container.sendAnalyticsEvent({ state: 'CHECKOUT_PAGE', name: 'TRANSACT' }), setWarning);

    const checkoutResponse = await checkout.triggerCheckout(parsedPayload);

    if (isOk(checkoutResponse)) {
      const res = checkoutResponse.result;
      if (res.status === 'Failure') {
        setResult({ status: res.status, transactionID: res.transactionID, errorCode: res.errorCode, errorMessage: res.errorMessage });
      } else if (res.status === 'Pending') {
        setResult({ status: res.status, transactionID: res.transactionID });
      } else if (res.status === 'Cancel') {
        setResult({ status: res.status });
      } else {
        setResult(null);
      }
    } else if (isError(checkoutResponse)) {
      setResult({ status: 'error', errorMessage: formatError('Checkout', checkoutResponse) });
    } else {
      setResult({ status: 'error', errorMessage: formatError('Checkout', checkoutResponse) });
    }
  }

  function handleBack() {
    navigate('/index');
  }

  function renderResult() {
    if (!result) return null;
    const style: { type: 'success' | 'error' | 'warning'; label: string } = STATUS_STYLES[result.status] || {
      type: 'warning',
      label: result.status,
    };
    return (
      <div className="mt-4">
        <StatusMessage
          message={`Status: ${style.label}`}
          type={style.type === 'success' ? 'success' : style.type === 'error' ? 'error' : 'warning'}
        />
        {result.transactionID && <p><strong>Transaction ID:</strong> {result.transactionID}</p>}
        {result.errorCode && <p className="text-red-500"><strong>Error Code:</strong> {result.errorCode}</p>}
        {result.errorMessage && <p className="text-red-500"><strong>Error Message:</strong> {result.errorMessage}</p>}
      </div>
    );
  }

  return (
    <div className="p-4">
      <WarningArea warning={warning} />
      {pageState.status === 'loading' ? (
        <p>{pageState.message}</p>
      ) : pageState.status === 'error' ? (
        <StatusMessage message={pageState.message} type={pageState.type} />
      ) : (
        <>
          <h1 className="text-xl font-bold mb-4">Checkout</h1>
          <div className="space-y-4">
            <p><strong>Estimated Rewards:</strong> {rewardDisplay || 'N/A'}</p>
            <div>
              <label htmlFor="payloadInput" className="block text-sm font-medium mb-2">Paste Checkout Payload (JSON)</label>
              <textarea
                id="payloadInput"
                rows={10}
                value={payload}
                onChange={e => setPayload(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 font-mono text-sm"
              />
            </div>
            <button
              onClick={handleTriggerCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Trigger Checkout
            </button>
            <button
              onClick={handleBack}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Back to Home
            </button>
            {renderResult()}
          </div>
        </>
      )}
    </div>
  );
}