# eslint-config-nitid

Shared ESLint config for Nitid Bit projects, updated for ESLint 9.

## Requirements

- Node.js ≥ 18.18.0 (ESLint 9 requirement)
- ESLint 9.x
- TypeScript projects: `tsconfig.json` file in project root (for full type checking)

## Installation

```bash
npm install --save-dev @nitid/eslint-config-nitid eslint@^9.0.0
```

## Usage

ESLint 9 uses the flat config format. Create an `eslint.config.js` file in your project root:

```js
import nitidConfigFunction from '@nitid/eslint-config-nitid';

// Our config is an async function, so use top-level await
const nitidConfig = await nitidConfigFunction();
export default nitidConfig;

// If you need to add your own configurations:
export default [
  ...nitidConfig,
  // Your project-specific configurations
];
```

### Configuring Globals

This config includes minimal globals by default (console, process, module, require). Your project should define any additional globals it needs:

```js
import nitidConfigFunction from "@nitid/eslint-config-nitid";

// Use top-level await to resolve the async config function
const nitidConfig = await nitidConfigFunction();

export default [
  ...nitidConfig,
  // Define globals for all files
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        console: "readonly",
        // Node.js globals
        process: "readonly",
        global: "readonly",
        Buffer: "readonly",
      },
    },
  },
  // Define globals only for test files
  {
    files: ["**/*.test.js", "**/*.test.ts", "**/*.spec.js", "**/*.spec.ts"],
    languageOptions: {
      globals: {
        // Jest globals
        describe: "readonly",
        test: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
      },
    },
  },
];
```

## Features

- Self-contained rule set (no airbnb or other config dependencies)
- Comprehensive TypeScript support with strict type checking rules
- React and React Hooks support
- JSX accessibility rules
- Separate configurations for JS/JSX and TS/TSX files
- Modern JavaScript best practices
- Complete set of import/export rules
- Includes all rules from previous ESLint 8 configurations
- No default globals (projects define their own environment needs)
- Prettier integration to avoid formatting conflicts

## TypeScript Configuration

This config requires a `tsconfig.json` file in your project root for TypeScript files. If you don't have one, create a minimal `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## Migration from ESLint 8

This config has been migrated from ESLint 8's `.eslintrc.js` format to ESLint 9's flat config format (`eslint.config.js`). Key changes:

- Configuration is now in `eslint.config.js` instead of `.eslintrc.js`
- Airbnb dependency has been removed in favor of explicit rules
- Plugins and parsers are dynamically imported
- The configuration is an array of config objects
- File patterns are explicitly specified with `files` patterns
- Language options consolidated under `languageOptions`
- Minimal globals are provided by default
- Prettier integration is included to avoid formatting conflicts

If you need to use the old configuration format, set the environment variable `ESLINT_USE_FLAT_CONFIG=false`.
