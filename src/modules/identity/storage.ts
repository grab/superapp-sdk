/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { isSuccess } from '../../core';
import { isErrorWithMessage } from '../../utils/error';
import { StorageModule } from '../storage/StorageModule';
import { NAMESPACE } from './constants';
import type { PkceReadResult, PkceStorage, PkceWriteResult } from './types';

/**
 * Builds the namespaced storage key shared by session and native backends.
 *
 * @internal
 *
 * @param key - Short key (e.g. `nonce`, `state`) without namespace.
 * @returns Full key with `grabid:` prefix.
 */
function buildPkceStorageKey(key: string): string {
  return `${NAMESPACE}:${key}`;
}

/**
 * Resolves optional `pkceStorage` to the backend used for PKCE artifacts.
 *
 * @internal
 *
 * @param kind - Requested backend, or undefined for the default.
 * @returns `web_session_storage` or `grab_storage`.
 */
export function resolvePkceStorage(kind?: PkceStorage): PkceStorage {
  return kind ?? 'web_session_storage';
}

/**
 * Writes one PKCE artifact field to the selected backend.
 *
 * @internal
 *
 * @param kind - Session storage or native Grab storage.
 * @param key - Short key without namespace.
 * @param value - Value to store.
 * @returns Success or a bridge-style error.
 */
export async function pkceSetItem(
  kind: PkceStorage,
  key: string,
  value: string
): Promise<PkceWriteResult> {
  const storageKey = buildPkceStorageKey(key);
  if (kind === 'web_session_storage') {
    try {
      window.sessionStorage.setItem(storageKey, value);
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        status_code: 424,
        error: isErrorWithMessage(error)
          ? error.message
          : 'Could not write PKCE data to session storage',
      };
    }
  }

  const response = await new StorageModule().setString(storageKey, value);
  if (isSuccess(response)) return { ok: true };
  return {
    ok: false,
    status_code: response.status_code as 400 | 424 | 500 | 501,
    error: response.error,
  };
}

/**
 * Reads one PKCE artifact field from the selected backend.
 *
 * @internal
 *
 * @param kind - Session storage or native Grab storage.
 * @param key - Short key without namespace.
 * @returns The stored string, `null` if missing, or an error.
 */
export async function pkceGetItem(kind: PkceStorage, key: string): Promise<PkceReadResult> {
  const storageKey = buildPkceStorageKey(key);
  if (kind === 'web_session_storage') {
    try {
      return { ok: true, value: window.sessionStorage.getItem(storageKey) };
    } catch (error) {
      return {
        ok: false,
        status_code: 424,
        error: isErrorWithMessage(error)
          ? error.message
          : 'Could not read PKCE data from session storage',
      };
    }
  }

  const response = await new StorageModule().getString(storageKey);
  if (response.status_code === 200) return { ok: true, value: response.result };
  if (response.status_code === 204) return { ok: true, value: null };
  return {
    ok: false,
    status_code: response.status_code as 400 | 424 | 500 | 501,
    error: response.error,
  };
}

/**
 * Removes one PKCE artifact field from the selected backend.
 *
 * @internal
 *
 * @param kind - Session storage or native Grab storage.
 * @param key - Short key without namespace.
 * @returns Success or a bridge-style error.
 */
export async function pkceRemoveItem(kind: PkceStorage, key: string): Promise<PkceWriteResult> {
  const storageKey = buildPkceStorageKey(key);
  if (kind === 'web_session_storage') {
    try {
      window.sessionStorage.removeItem(storageKey);
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        status_code: 424,
        error: isErrorWithMessage(error)
          ? error.message
          : 'Could not clear PKCE data from session storage',
      };
    }
  }

  const response = await new StorageModule().remove(storageKey);
  if (isSuccess(response)) return { ok: true };
  return {
    ok: false,
    status_code: response.status_code as 400 | 424 | 500 | 501,
    error: response.error,
  };
}
