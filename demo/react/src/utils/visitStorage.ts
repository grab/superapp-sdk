import { isSuccess, isOk, isError, StorageModule } from '@grabjs/superapp-sdk';

const VISIT_COUNT_KEY = 'miniapp_visit_count';

export async function incrementVisitCount(): Promise<void> {
  const storage = new StorageModule();
  const getResponse = await storage.getInt(VISIT_COUNT_KEY);

  let count = 0;
  if (isOk(getResponse)) {
    count = getResponse.result;
  } else if (isError(getResponse)) {
    return;
  }

  const setResponse = await storage.setInt(VISIT_COUNT_KEY, count + 1);
  if (!isSuccess(setResponse)) {
    return;
  }
}

export async function getVisitCount(): Promise<number | null> {
  const storage = new StorageModule();
  const getResponse = await storage.getInt(VISIT_COUNT_KEY);

  if (isOk(getResponse)) {
    return getResponse.result;
  }
  if (isError(getResponse)) {
    return null;
  }
  return 0;
}
