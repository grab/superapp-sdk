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
import { COPYRIGHT_BANNER } from './scripts/constants.mjs';

export default defineConfig([
  {
    ignores: ['build/', 'dist/', 'package-lock.json', 'docs/', 'typedoc/', 'temp/'],
  },
  {
    files: ['**/*.ts'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    plugins: { 'license-header': licenseHeader },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'license-header/header': ['error', [COPYRIGHT_BANNER]],
    },
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, 'license-header': licenseHeader },
    extends: ['js/recommended'],
    rules: {
      'license-header/header': ['error', [COPYRIGHT_BANNER]],
    },
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['scripts/**/*.{js,mjs,cjs}'],
    plugins: { js, 'license-header': licenseHeader },
    extends: ['js/recommended'],
    rules: {
      'license-header/header': ['error', [COPYRIGHT_BANNER]],
    },
    languageOptions: { globals: globals.node },
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
