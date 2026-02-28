import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: ['dist/', 'node_modules/', 'coverage/', 'demo/', '*.config.js', 'eslint.config.js', 'scripts/'],
  },
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.eslint.json',
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      jsdoc: jsdocPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...tsPlugin.configs['recommended-requiring-type-checking'].rules,

      // TypeScript specific rules
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',

      // General rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'prefer-arrow-callback': 'error',
      'no-param-reassign': 'warn',
      eqeqeq: ['error', 'always'],
      'no-throw-literal': 'error',

      // Code quality
      complexity: ['warn', 15],
      'max-depth': ['warn', 4],
      'max-lines-per-function': [
        'warn',
        { max: 100, skipBlankLines: true, skipComments: true },
      ],

      // JSDoc consistency
      'jsdoc/check-param-names': 'warn',
      'jsdoc/check-types': 'off',
      'jsdoc/require-param-description': 'warn',
      'jsdoc/require-returns-description': 'warn',

      // Disable formatting rules (handled by Prettier)
      ...prettierConfig.rules,
    },
  },
  {
    // Logger intentionally uses console methods for output
    files: ['src/core/logger/index.ts'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    // Relax rules for build configuration files
    files: ['eslint.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
];
