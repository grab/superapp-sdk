/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Log level enumeration.
 *
 * @remarks
 * Levels are ordered from most to least severe: ERROR > WARN > INFO > DEBUG.
 * When a minimum level is set, only messages at that level or more severe are output.
 */
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

/**
 * Logger configuration options. Ah
 *
 * @remarks
 * All settings can be overridden via Logger.configure.
 */
export interface LoggerConfig {
  /**
   * Enable or disable logging output.
   */
  enabled: boolean;
  /**
   * Minimum log level to output. Messages at or above this level are logged.
   */
  level: LogLevel;
  /**
   * Prefix prepended to all log messages.
   */
  prefix: string;
}

/**
 * Default logger configuration
 */
const DEFAULT_CONFIG: LoggerConfig = {
  enabled: true,
  level: LogLevel.WARN,
  prefix: '[@grabjs/superapp-sdk]',
};

/**
 * Core logger for SDK operations.
 *
 * @remarks
 * Supports configurable log levels, prefix, and enable/disable. Messages are output to
 * the browser console (`console.error`, `console.warn`, etc.) based on the configured level.
 */
class Logger {
  private config: LoggerConfig;

  /**
   * Creates a new Logger instance.
   *
   * @param config - Optional partial configuration. Merged with defaults.
   */
  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Update logger configuration.
   *
   * @param config - Partial configuration to merge with current settings.
   */
  public configure(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Get current configuration.
   *
   * @returns A readonly copy of the current configuration.
   */
  public getConfig(): Readonly<LoggerConfig> {
    return { ...this.config };
  }

  /**
   * Check if a log level should be outputted.
   *
   * @param level - The log level to check.
   * @returns True if the message should be logged.
   * @internal
   */
  private shouldLog(level: LogLevel): boolean {
    if (!this.config.enabled) return false;

    const levels = [LogLevel.ERROR, LogLevel.WARN, LogLevel.INFO, LogLevel.DEBUG];
    const currentLevelIndex = levels.indexOf(this.config.level);
    const messageLevelIndex = levels.indexOf(level);

    return messageLevelIndex <= currentLevelIndex;
  }

  /**
   * Format log message with prefix and context.
   *
   * @param message - The log message.
   * @param context - Optional context (e.g., module name).
   * @returns Formatted message string.
   * @internal
   */
  private formatMessage(message: string, context?: string): string {
    const contextStr = context ? ` [${context}]` : '';
    return `${this.config.prefix}${contextStr} ${message}`;
  }

  /**
   * Log error message.
   *
   * @param message - The error message.
   * @param context - Optional context (e.g., module name).
   * @param error - Optional Error instance to log as additional output.
   */
  public error(message: string, context?: string, error?: Error): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.formatMessage(message, context));
      if (error) {
        console.error(error);
      }
    }
  }

  /**
   * Log warning message.
   *
   * @param message - The warning message.
   * @param context - Optional context (e.g., module name).
   */
  public warn(message: string, context?: string): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage(message, context));
    }
  }

  /**
   * Log info message.
   *
   * @param message - The info message.
   * @param context - Optional context (e.g., module name).
   */
  public info(message: string, context?: string): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.info(this.formatMessage(message, context));
    }
  }

  /**
   * Log debug message.
   *
   * @param message - The debug message.
   * @param context - Optional context (e.g., module name).
   * @param data - Optional additional data to log (e.g., object for inspection).
   */
  public debug(message: string, context?: string, data?: unknown): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(this.formatMessage(message, context));
      if (data !== undefined) {
        console.debug(data);
      }
    }
  }
}

/**
 * Singleton logger instance for SDK-wide logging.
 *
 * @remarks
 * Use this instance for all SDK log output. Configure via `logger.configure()`.
 */
export const logger = new Logger();

/**
 * Logger class for creating custom instances.
 *
 * @remarks
 * Exported for consumers who need isolated logger instances (e.g., testing).
 */
export { Logger };
