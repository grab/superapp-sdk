import { isSuccess, type BridgeResponse } from '@grabjs/superapp-sdk';

export function formatError(label: string, response: BridgeResponse): string {
  const resp = response as { error?: string; status_code: number };
  if (resp.error) {
    return `${label} failed: ${resp.error} (code: ${resp.status_code})`;
  }
  return `${label} failed with status: ${resp.status_code}`;
}

export async function runOptional(label: string, promise: Promise<BridgeResponse>, onWarning: (msg: string) => void): Promise<BridgeResponse> {
  const response = await promise;
  if (!isSuccess(response)) {
    onWarning(formatError(label, response));
  }
  return response;
}