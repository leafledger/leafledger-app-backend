import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: true,
          singleQuote: true,
          useTabs: false,
        },
      ],
    },
    overrides: [
      {
        files: ['**/*.d.ts'],
        rules: {
          '@typescript-eslint/no-unused-vars': 'off',
        },
      },
    ],
  },
];
