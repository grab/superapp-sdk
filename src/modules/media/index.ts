/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MediaModule } from './MediaModule';

export default MediaModule;

export type {
  PlaybackEventType,
  PlaybackStatusResult,
  PlayDRMContentErrorResponse,
  // PlayDRMContent
  PlayDRMContentRequest,
  PlayDRMContentResponse,
  PlayDRMContentSuccessResponse,
} from './types';
export { PLAYBACK_EVENT_TYPES } from './types';
