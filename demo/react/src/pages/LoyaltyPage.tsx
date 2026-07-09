import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isOk, isError, ContainerModule, LoyaltyModule } from '@grabjs/superapp-sdk';
import type { EstimateRewardsRequest, EstimateRewardsResultItem } from '@grabjs/superapp-sdk';
import { runOptional } from '../utils/sdkHelpers';
import { WarningArea } from '../components/WarningArea';
import { StatusMessage } from '../components/StatusMessage';

import type { PageState } from '../types';

const SAMPLE_REQUEST: EstimateRewardsRequest = {
  items: [
    { id: 'item-1', amount_in_minor_units: 75000, currency_code: 'SGD' },
    { id: 'item-2', amount_in_minor_units: 65600, currency_code: 'MYR' },
  ],
};

export default function LoyaltyPage() {
  const navigate = useNavigate();
  const [pageState, setPageState] = useState<PageState>({ status: 'loading', message: 'Checking environment...' });
  const [warning, setWarning] = useState<string | null>(null);
  const [requestJson, setRequestJson] = useState(JSON.stringify(SAMPLE_REQUEST, null, 2));
  const [resultItems, setResultItems] = useState<EstimateRewardsResultItem[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function init() {
    setPageState({ status: 'loading', message: 'Checking environment...' });

    const container = new ContainerModule();
    const connectionResponse = await container.isConnected();
    if (!isOk(connectionResponse) || !connectionResponse.result?.connected) {
      setPageState({ status: 'error', message: 'This page must be opened from within the Grab SuperApp.', type: 'error' });
      return;
    }

    await runOptional('Set background color', container.setBackgroundColor('#005339'), setWarning);
    await runOptional('Set title', container.setTitle('Loyalty'), setWarning);
    await runOptional('Show back button', container.showBackButton(), setWarning);
    await runOptional('Hide refresh button', container.hideRefreshButton(), setWarning);

    setPageState({ status: 'ready' });
  }

  useEffect(() => {
    queueMicrotask(init);
  }, []);

  async function handleEstimate() {
    setResultItems(null);
    setErrorMessage(null);

    let request: EstimateRewardsRequest;
    try {
      request = JSON.parse(requestJson);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setErrorMessage(`Invalid JSON: ${message}`);
      return;
    }

    const loyalty = new LoyaltyModule();
    const response = await loyalty.estimateRewards(request);

    if (isOk(response)) {
      setResultItems(response.result.items);
    } else if (isError(response)) {
      setErrorMessage(`Error ${response.status_code}: ${response.error}`);
    } else {
      setErrorMessage(`Unexpected response: ${JSON.stringify(response)}`);
    }
  }

  function renderItems() {
    if (!resultItems) return null;
    return (
      <div className="mt-4 space-y-3">
        <h2 className="font-semibold">Results ({resultItems.length} items)</h2>
        {resultItems.map((item) => (
          <div key={item.id} className="border rounded p-3 text-sm">
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Status:</strong> {item.status_code}</p>
            {item.status_code === 'SUCCESS' && (
              <>
                <p><strong>Reward:</strong> {item.result.reward.display_amount} {item.result.reward.currency_code}</p>
                {item.result.estimated_fiat && (
                  <p><strong>Fiat:</strong> {item.result.estimated_fiat.amount_in_minor_units} {item.result.estimated_fiat.currency_code}</p>
                )}
              </>
            )}
            {(item.status_code === 'NOT_APPLICABLE' || item.status_code === 'ERROR') && (
              <p><strong>Reason:</strong> {item.reason_code}</p>
            )}
          </div>
        ))}
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
          <h1 className="text-xl font-bold mb-4">Loyalty — Estimate Rewards</h1>
          <div className="space-y-4">
            <div>
              <label htmlFor="requestInput" className="block text-sm font-medium mb-2">
                Request (JSON)
              </label>
              <textarea
                id="requestInput"
                rows={10}
                value={requestJson}
                onChange={(e) => setRequestJson(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 font-mono text-sm"
              />
            </div>
            <button
              onClick={handleEstimate}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Estimate Rewards
            </button>
            <button
              onClick={() => navigate('/index')}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Back to Home
            </button>
            {errorMessage && (
              <div className="mt-4">
                <StatusMessage message={errorMessage} type="error" />
              </div>
            )}
            {renderItems()}
          </div>
        </>
      )}
    </div>
  );
}
