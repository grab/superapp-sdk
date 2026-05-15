import { isSuccess, type SDKResponse } from '@grabjs/superapp-sdk';

export function formatError(label: string, response: SDKResponse): string {
  if (response.error) {
    return `${label} failed: ${response.error} (code: ${response.status_code})`;
  }
  return `${label} failed with status: ${response.status_code}`;
}

export async function runOptional(label: string, promise: Promise<SDKResponse>, onWarning: (msg: string) => void): Promise<SDKResponse> {
  const response = await promise;
  if (!isSuccess(response)) {
    onWarning(formatError(label, response));
  }
  return response;
}