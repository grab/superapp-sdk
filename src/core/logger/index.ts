/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Log level enumeration
 */
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

/**
 * Logger configuration options
 */
export interface LoggerConfig {
  /**
   * Enable/disable logging
   */
  enabled: boolean;
  /**
   * Minimum log level to output
   */
  level: LogLevel;
  /**
   * Prefix for all log messages
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
 * Core logger for SDK operations
 */
class Logger {
  private config: LoggerConfig;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Update logger configuration
   */
  public configure(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Get current configuration
   */
  public getConfig(): Readonly<LoggerConfig> {
    return { ...this.config };
  }

  /**
   * Check if a log level should be outputted
   */
  private shouldLog(level: LogLevel): boolean {
    if (!this.config.enabled) return false;

    const levels = [LogLevel.ERROR, LogLevel.WARN, LogLevel.INFO, LogLevel.DEBUG];
    const currentLevelIndex = levels.indexOf(this.config.level);
    const messageLevelIndex = levels.indexOf(level);

    return messageLevelIndex <= currentLevelIndex;
  }

  /**
   * Format log message with prefix and context
   */
  private formatMessage(message: string, context?: string): string {
    const contextStr = context ? ` [${context}]` : '';
    return `${this.config.prefix}${contextStr} ${message}`;
  }

  /**
   * Log error message
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
   * Log warning message
   */
  public warn(message: string, context?: string): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage(message, context));
    }
  }

  /**
   * Log info message
   */
  public info(message: string, context?: string): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.info(this.formatMessage(message, context));
    }
  }

  /**
   * Log debug message
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
 * Singleton logger instance
 */
export const logger = new Logger();

/**
 * Export logger class for custom instances
 */
export { Logger };
