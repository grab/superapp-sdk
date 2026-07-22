/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

const SDK_LABEL = 'SuperAppSDK';

/**
 * Provides scoped logging for SDK modules.
 *
 * @group Core
 * @skillReference Platform Utilities
 *
 * @remarks
 * Log messages are prefixed with `[SuperAppSDK][ModuleName.methodName]`
 * (e.g. `[SuperAppSDK][ContainerModule.setTitle] An error occurred`).
 *
 * @public
 */
export class Logger {
  private readonly moduleName: string;

  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }

  private formatPrefix(method: string): string {
    return `[${SDK_LABEL}][${this.moduleName}.${method}]`;
  }

  warn(method: string, message: string): void {
    console.warn(`${this.formatPrefix(method)} ${message}`);
  }

  error(method: string, message: string): void {
    console.error(`${this.formatPrefix(method)} ${message}`);
  }
}
