/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ErrorResponse, SuccessResponse } from '../../core';

/**
 * Video data for DRM content playback
 */
export type PlayDRMContentRequest = {
  /**
   * Content URL for playback
   */
  content: string;
  /**
   * DRM certificate URL
   */
  certificate: string;
  /**
   * DRM license URL
   */
  license: string;
  /**
   * Playback item identifier
   */
  titleId: string;
};

/**
 * Playback event type constants.
 *
 * @remarks
 * Use as both runtime values and for type narrowing. The `PlaybackEventType` type is derived from this object.
 */
export const PLAYBACK_EVENT_TYPES = {
  /** Emitted when the video starts playing */
  START_PLAYBACK: 'START_PLAYBACK',
  /** Emitted when the video stops playing */
  STOP_PLAYBACK: 'STOP_PLAYBACK',
  /** Emitted every 10 seconds during playback */
  PROGRESS_PLAYBACK: 'PROGRESS_PLAYBACK',
} as const;

/**
 * Union type of valid playback event type values.
 */
export type PlaybackEventType = (typeof PLAYBACK_EVENT_TYPES)[keyof typeof PLAYBACK_EVENT_TYPES];

/**
 * Playback status result
 */
export type PlaybackStatusResult = {
  /**
   * Type of the event
   */
  type: PlaybackEventType;
  /**
   * Playback item identifier
   */
  titleId: string;
  /**
   * Length of the video (in seconds)
   */
  length: number;
  /**
   * The current position of the video (in seconds)
   */
  position: number;
};

/**
 * Success response when DRM content playback event is emitted
 */
export type PlayDRMContentSuccessResponse = SuccessResponse<PlaybackStatusResult>;

/**
 * Error response when DRM content playback fails
 */
export type PlayDRMContentErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Invalid request parameters
   * - `403`: DRM permission denied or not available
   * - `500`: Internal error during playback
   */
  status_code: 400 | 403 | 500;
};

/**
 * Response type for DRM content playback
 */
export type PlayDRMContentResponse = PlayDRMContentSuccessResponse | PlayDRMContentErrorResponse;

/**
 * Concrete interface for the native Media module bridge.
 */
export interface WrappedMediaModule {
  invoke(
    method: 'playDRMContent',
    params: { data: PlayDRMContentRequest }
  ): Promise<PlayDRMContentResponse>;
}

declare global {
  interface Window {
    WrappedMediaModule: WrappedMediaModule;
  }
}
