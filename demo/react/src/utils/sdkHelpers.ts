import { isSuccess, type BridgeResponse } from '@grabjs/superapp-sdk';

export function formatError(label: string, response: BridgeResponse): string {
  if (response.error) {
    return `${label} failed: ${response.error} (code: ${response.status_code})`;
  }
  return `${label} failed with status: ${response.status_code}`;
}

export async function runOptional(label: string, promise: Promise<BridgeResponse>, onWarning: (msg: string) => void): Promise<BridgeResponse> {
  const response = await promise;
  if (!isSuccess(response)) {
    onWarning(formatError(label, response));
  }
  return response;
}