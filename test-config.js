/**
 * Example file showing how to use the eslint-config-nitid package.
 *
 * This is for demonstration only and not part of the actual package.
 */

import nitidConfigFunction from './eslint.config.js'

// Define the environments that would be available in a real project
const environments = {
  browser: { browser: true },
  node: { node: true },
  jest: { jest: true },
}

// Use top-level await to resolve the async config function
const nitidConfig = await nitidConfigFunction()

export default [
  ...nitidConfig,
  // Application code globals
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: {
        ...environments.browser,
        ...environments.node,
      },
    },
  },
  // Test files globals
  {
    files: ['**/*.test.js', '**/*.test.ts', '**/*.spec.js', '**/*.spec.ts'],
    languageOptions: {
      globals: {
        ...environments.jest,
      },
    },
  },
]
