# eslint-config-nitid

Shared ESLint config for Nitid Bit projects, updated for ESLint 9.

## Requirements

- Node.js ≥ 18.18.0 (ESLint 9 requirement)
- ESLint 9.x

## Installation

```bash
npm install --save-dev @nitid/eslint-config-nitid eslint@^9.0.0
```

## Usage

ESLint 9 uses the flat config format. Create an `eslint.config.js` file in your project root:

```js
import nitidConfig from '@nitid/eslint-config-nitid';

export default [
  ...nitidConfig,
  // Your project-specific configurations
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

## Migration from ESLint 8

This config has been migrated from ESLint 8's `.eslintrc.js` format to ESLint 9's flat config format (`eslint.config.js`). Key changes:

- Configuration is now in `eslint.config.js` instead of `.eslintrc.js`
- Airbnb dependency has been removed in favor of explicit rules
- Plugins and parsers are imported directly rather than referenced by string
- The configuration is an array of config objects
- File patterns are explicitly specified with `files` patterns
- Language options consolidated under `languageOptions`

If you need to use the old configuration format, set the environment variable `ESLINT_USE_FLAT_CONFIG=false`.
