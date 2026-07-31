# eslint-config-nitid

Shared ESLint config for Nitid Bit projects, updated for ESLint 10.

## Requirements

- Node.js ≥ 22.0.0
- ESLint 10.x
- TypeScript (required peer dependency)
- `tsconfig.json` file in project root

## Installation

```bash
npm install --save-dev @nitid/eslint-config-nitid eslint@^10.0.0 typescript
```

### Optional: accessibility rules

`eslint-plugin-jsx-a11y` is an **optional peer dependency**. It still works on
ESLint 10, but its published peer range caps at ESLint 9 and it depends on a
`minimatch` version with a known advisory. Because npm `overrides` declared by a
package are ignored when that package is installed as a dependency, shipping it
as a hard dependency would push an unfixable peer warning and audit finding onto
every consumer.

Install it yourself to enable a11y linting, adding the two overrides in your own
`package.json` (where overrides _do_ apply):

```bash
npm install --save-dev eslint-plugin-jsx-a11y
```

```json
{
  "overrides": {
    "eslint-plugin-jsx-a11y": { "eslint": "$eslint" },
    "minimatch": "^10.2.6"
  }
}
```

Without it, the config loads normally and every non-a11y rule still runs.

## Usage

ESLint 10 uses the flat config format. Create an `eslint.config.js` file in your project root:

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
- React correctness rules via `@eslint-react`
- React Hooks / React Compiler rules via `eslint-plugin-react-hooks` v7
- Optional JSX accessibility rules
- Separate configurations for JS/JSX and TS/TSX files
- Modern JavaScript best practices
- Complete set of import/export rules via `eslint-plugin-import-x`
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

## Migration from v4 (ESLint 9) to v5 (ESLint 10)

v5 is a breaking change. ESLint 10 removed APIs that `eslint-plugin-react` and
`eslint-plugin-import` still rely on, so both were replaced:

| Removed                               | Replacement                   | Impact                                                           |
| ------------------------------------- | ----------------------------- | ---------------------------------------------------------------- |
| `eslint-plugin-react`                 | `@eslint-react/eslint-plugin` | 26 rules map across; 23 class-era/stylistic rules are gone       |
| `eslint-plugin-import`                | `eslint-plugin-import-x`      | all rules keep their names but the prefix changes to `import-x/` |
| `@babel/eslint-parser`                | ESLint's built-in espree      | no Babel config needed; drops `@babel/core`                      |
| `eslint-plugin-jsx-a11y` (dependency) | optional peer dependency      | install it yourself to keep a11y rules                           |

**Action required in consuming projects:**

- Update inline suppressions: `eslint-disable ... import/x` becomes `import-x/x`,
  and `react/x` comments referring to removed rules should be deleted.
- Deprecated core formatting rules (`indent`, `quotes`, `semi`, `comma-dangle`,
  and ~22 others) were removed from the config. They were already disabled by
  `eslint-config-prettier`, so this is a no-op — Prettier owns formatting.
- `no-return-await`, `global-require`, `no-new-symbol`,
  `@typescript-eslint/no-var-requires` and `@typescript-eslint/semi` were removed
  as deprecated. `no-new-symbol` and `no-var-requires` are covered by
  `no-new-native-nonconstructor` and `no-require-imports`, which remain enabled.

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

The legacy `.eslintrc` format is not supported: ESLint 10 removed it entirely.
