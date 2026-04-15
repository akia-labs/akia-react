import baseConfig from '../../eslint/react.js';

export default [
  {
    ignores: ['.astro/**', 'dist/**', 'node_modules/**'],
  },
  ...baseConfig,
];
