/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Utility helpers: error handling, URL normalization, validation, and version parsing.
 */

export { isGrabAppConnected } from './connection';
export { getErrorForLog, getErrorMessage } from './error';
export { normalizeUrl } from './url';
export {
  validateObject,
  validateOptionalObject,
  validateRequiredString,
  validateUrl,
} from './validation';
export { isVersionBelow, meetsMinimumVersion, parseGrabUserAgent } from './version';
export type { GrabUserAgent, Version } from './version/types';
