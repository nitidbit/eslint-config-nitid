/**
 * Example file showing how to use the eslint-config-nitid package.
 *
 * This is for demonstration only and not part of the actual package.
 */

import nitidConfig, { environments } from './eslint.config.js';

export default [
  ...nitidConfig,
  // Application code globals
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: {
        ...environments.browser,
        ...environments.node,
      }
    }
  },
  // Test files globals
  {
    files: ['**/*.test.js', '**/*.test.ts', '**/*.spec.js', '**/*.spec.ts'],
    languageOptions: {
      globals: {
        ...environments.jest,
      }
    }
  }
];
