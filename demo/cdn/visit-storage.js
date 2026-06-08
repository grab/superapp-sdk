/**
 * Visit counter helpers using StorageModule (scoped per Grab user).
 * Requires mobile.storage to be granted during entry authorization.
 */

const VISIT_COUNT_KEY = 'miniapp_visit_count';

async function incrementVisitCount() {
  const storage = new SuperAppSDK.StorageModule();
  const getResponse = await storage.getInt(VISIT_COUNT_KEY);

  let count = 0;
  if (SuperAppSDK.isOk(getResponse)) {
    count = getResponse.result;
  } else if (SuperAppSDK.isError(getResponse)) {
    return;
  }

  const setResponse = await storage.setInt(VISIT_COUNT_KEY, count + 1);
  if (!SuperAppSDK.isSuccess(setResponse)) {
    return;
  }
}

async function getVisitCount() {
  const storage = new SuperAppSDK.StorageModule();
  const getResponse = await storage.getInt(VISIT_COUNT_KEY);

  if (SuperAppSDK.isOk(getResponse)) {
    return getResponse.result;
  }
  if (SuperAppSDK.isError(getResponse)) {
    return null;
  }
  return 0;
}
