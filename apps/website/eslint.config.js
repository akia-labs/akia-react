import baseConfig from 'akia-react-eslint-config/astro.js';

export default [
  {
    ignores: ['.astro/**', 'dist/**', 'node_modules/**'],
  },
  ...baseConfig,
];