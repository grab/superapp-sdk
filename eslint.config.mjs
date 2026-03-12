/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import { defineConfig } from 'eslint/config';
import licenseHeader from 'eslint-plugin-license-header';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import vitest from '@vitest/eslint-plugin';

export default defineConfig([
  {
    ignores: ['build/', 'dist/', 'package-lock.json', 'docs/', 'typedoc/', 'temp/', 'coverage/'],
  },
  {
    files: ['*.config.{ts,mjs,js}', '**/*.config.{ts,mjs,js}'],
    plugins: { js, 'license-header': licenseHeader },
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'license-header/header': ['error', 'resources/copyright.txt'],
    },
  },
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
      },
    },
    extends: [js.configs.recommended, tseslint.configs.recommended],
    plugins: {
      'license-header': licenseHeader,
      'simple-import-sort': simpleImportSort,
      jsdoc: jsdocPlugin,
    },
    rules: {
      // License header
      'license-header/header': ['error', 'resources/copyright.txt'],

      // General rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'prefer-arrow-callback': 'error',
      'no-param-reassign': 'warn',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-throw-literal': 'error',

      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',

      // Import order
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // JSDoc consistency
      'jsdoc/check-param-names': 'off',
      'jsdoc/check-types': 'error',
      'jsdoc/require-param': 'off',
      'jsdoc/require-returns': 'error',
      'jsdoc/require-description': 'error',
      'jsdoc/tag-lines': ['warn', 'any', { startLines: 1 }],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, 'license-header': licenseHeader },
    extends: ['js/recommended'],
    rules: {
      'license-header/header': ['error', 'resources/copyright.txt'],
    },
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['scripts/**/*.{js,mjs,cjs}'],
    plugins: { js, 'license-header': licenseHeader },
    extends: ['js/recommended'],
    rules: {
      'license-header/header': ['error', 'resources/copyright.txt'],
    },
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.test.ts'],
    plugins: { vitest },
    extends: [tseslint.configs.recommended],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...vitest.environments.env.globals,
      },
    },
    rules: {
      'license-header/header': ['error', 'resources/copyright.txt'],
      // Allow any for test mocks
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      // Vitest specific rules
      'vitest/expect-expect': 'error',
      'vitest/no-identical-title': 'error',
    },
  },
  { files: ['**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.json5'],
    plugins: { json },
    language: 'json/json5',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/gfm',
    extends: ['markdown/recommended'],
  },
  {
    files: ['CHANGELOG.md'],
    plugins: { markdown },
    language: 'markdown/gfm',
    extends: ['markdown/recommended'],
    rules: {
      'markdown/no-missing-label-refs': 'off',
    },
  },
]);
