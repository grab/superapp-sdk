/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { WrappedResponse } from '../../core/types';

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
   * DRM licence URL
   */
  license: string;
  /**
   * Playback item identifier
   */
  titleId: string;
};

/**
 * Playback event types
 */
export const PlaybackEventType = {
  /** Emitted when the video starts playing */
  START_PLAYBACK: 'START_PLAYBACK',
  /** Emitted when the video stops playing */
  STOP_PLAYBACK: 'STOP_PLAYBACK',
  /** Emitted every 10 seconds during playback */
  PROGRESS_PLAYBACK: 'PROGRESS_PLAYBACK',
} as const;

/**
 * Type representing valid playback event types
 */
export type PlaybackEventType = (typeof PlaybackEventType)[keyof typeof PlaybackEventType];

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
 * Response type for DRM content playback
 */
export type PlayDRMContentResponse = WrappedResponse<PlaybackStatusResult>;
