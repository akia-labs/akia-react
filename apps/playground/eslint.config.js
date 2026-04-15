import baseConfig from 'akia-react-eslint-config/react.js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  ...baseConfig.map(config => ({
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs'],
    languageOptions: {
      parser: tsparser,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...config.languageOptions?.globals,
      },
      ...config.languageOptions,
    },
    plugins: {
      '@typescript-eslint': tseslint,
      ...config.plugins,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...config.rules,
    },
  })),
];