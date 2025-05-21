/**
 * Example file showing how to use the eslint-config-nitid package.
 *
 * This is for demonstration only and not part of the actual package.
 */

import nitidConfigFunction, { environments } from './eslint.config.js'

// Use top-level await to resolve the async config function
const nitidConfig = await nitidConfigFunction()

export default [
  ...nitidConfig,
  // Application code globals for browser and node environments
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...environments.browser,
        ...environments.node,
      },
    },
  },
  // Test file globals
  {
    files: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...environments.jest,
      },
    },
  },
]
