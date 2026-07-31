// eslint.config.js
// Use dynamic imports for better compatibility as a shareable config
export default async function createConfig() {
  // Dynamically import dependencies
  const tsParser = await import('@typescript-eslint/parser')
  const typescriptPlugin = await import('@typescript-eslint/eslint-plugin')
  const reactPlugin = await import('@eslint-react/eslint-plugin')
  const importPlugin = await import('eslint-plugin-import-x')
  const tsResolver = await import('eslint-import-resolver-typescript')
  const hooksPlugin = await import('eslint-plugin-react-hooks')
  const js = await import('@eslint/js')
  const prettierConfig = await import('eslint-config-prettier')
  const fs = await import('fs')
  const path = await import('path')

  // eslint-plugin-jsx-a11y is an optional peer dependency. Its published peer
  // range still caps at ESLint 9 and it pulls a vulnerable minimatch, so it is
  // NOT a hard dependency: npm `overrides` declared here would be ignored in
  // consumer installs. Consumers who want a11y linting install it themselves
  // (see README), where their own overrides do apply.
  let jsxA11yPlugin
  try {
    jsxA11yPlugin = await import('eslint-plugin-jsx-a11y')
  } catch {
    jsxA11yPlugin = null
  }

  // Base language options without globals - projects should define their own environments
  const baseLanguageOptions = {
    // 'latest', not a pinned year: @babel/eslint-parser used to parse any
    // modern syntax regardless of this setting. espree honours it, so pinning
    // to 2021 would newly reject top-level await (which our own README tells
    // consumers to use), class static blocks, and anything else post-ES2021.
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      // Add minimal globals that are almost always needed
      console: 'readonly',
      process: 'readonly',
      module: 'readonly',
      require: 'readonly',
    },
  }

  // Base rules for all JavaScript and TypeScript files
  const baseRules = {
    // Possible Problems
    'array-callback-return': 'error',
    'arrow-body-style': 'off',
    'block-scoped-var': 'error',
    camelcase: 'off',
    complexity: ['warn', { variant: 'modified', max: 24 }],
    'consistent-return': 'error',
    'constructor-super': 'error',
    'default-case': 'error',
    'default-case-last': 'error',
    'dot-notation': 'off',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'for-direction': 'error',
    'func-names': ['error', 'as-needed'],
    'getter-return': 'error',
    'max-classes-per-file': ['error', 1],
    'no-alert': 'error',
    'no-async-promise-executor': 'error',
    'no-await-in-loop': 'error',
    'no-class-assign': 'error',
    'no-compare-neg-zero': 'error',
    'no-cond-assign': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-const-assign': 'error',
    'no-constant-binary-expression': 'error',
    'no-constant-condition': 'error',
    'no-constructor-return': 'error',
    'no-control-regex': 'error',
    'no-debugger': 'error',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-else-if': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'error',
    'no-else-return': 'error',
    'no-empty': 'error',
    'no-empty-character-class': 'error',
    'no-empty-function': 'error',
    'no-empty-pattern': 'error',
    'no-eval': 'error',
    'no-ex-assign': 'error',
    'no-extra-bind': 'error',
    'no-fallthrough': 'error',
    'no-func-assign': 'error',
    'no-implicit-coercion': ['error', { allow: ['!!'] }],
    'no-implied-eval': 'error',
    'no-import-assign': 'error',
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-loss-of-precision': 'error',
    'no-misleading-character-class': 'error',
    'no-multi-str': 'error',
    'no-nested-ternary': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    // 'no-new-symbol' removed: deprecated, superseded by
    // 'no-new-native-nonconstructor' above.
    'no-new-native-nonconstructor': 'error',
    'no-new-wrappers': 'error',
    'no-obj-calls': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'acc',
          'accumulator',
          'e',
          'ctx',
          'context',
          'req',
          'request',
          'res',
          'response',
          '$scope',
          'staticContext',
        ],
      },
    ],
    'no-promise-executor-return': 'error',
    'no-prototype-builtins': 'error',
    'no-redeclare': 'error',
    'no-restricted-syntax': ['off', 'ForOfStatement'],
    'no-return-assign': ['error', 'always'],
    'no-script-url': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-setter-return': 'error',
    'no-shadow': 'error',
    'no-sparse-arrays': 'error',
    'no-template-curly-in-string': 'error',
    'no-this-before-super': 'error',
    'no-unassigned-vars': 'error',
    'no-throw-literal': 'error',
    'no-undef': 'error',
    'no-underscore-dangle': 'off',
    'no-unexpected-multiline': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unneeded-ternary': 'error',
    'no-unreachable': 'error',
    'no-unreachable-loop': 'error',
    'no-unsafe-finally': 'error',
    'no-unsafe-negation': 'error',
    'no-unsafe-optional-chaining': 'error',
    'no-unused-expressions': 'error',
    'no-unused-private-class-members': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-useless-assignment': 'error',
    'no-useless-backreference': 'error',
    'no-useless-call': 'error',
    'no-useless-catch': 'error',
    'no-useless-concat': 'error',
    'no-useless-escape': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'no-void': 'error',
    'no-with': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'prefer-promise-reject-errors': 'error',
    'prefer-regex-literals': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'warn',
    radix: 'off',
    'require-atomic-updates': 'error',
    'require-await': 'error',
    'use-isnan': 'error',
    'valid-typeof': 'error',
    yoda: 'error',

    // Layout & Formatting rules are intentionally absent: they are deprecated
    // in ESLint 10 and were already disabled by eslint-config-prettier, which
    // is applied last. Prettier owns formatting.

    // Import rules
    'import-x/default': 'error',
    'import-x/export': 'error',
    'import-x/extensions': 'off',
    'import-x/first': 'error',
    'import-x/named': 'error',
    'import-x/newline-after-import': 'error',
    'import-x/no-absolute-path': 'error',
    'import-x/no-amd': 'error',
    'import-x/no-commonjs': 'off',
    'import-x/no-cycle': ['error', { maxDepth: Infinity }],
    'import-x/no-duplicates': 'error',
    'import-x/no-dynamic-require': 'error',
    'import-x/no-extraneous-dependencies': [
      'error',
      { optionalDependencies: false },
    ],
    'import-x/no-mutable-exports': 'error',
    'import-x/no-named-as-default': 'error',
    'import-x/no-named-as-default-member': 'error',
    'import-x/no-named-default': 'error',
    'import-x/no-relative-packages': 'error',
    'import-x/no-relative-parent-imports': 'off',
    'import-x/no-restricted-paths': 'off',
    'import-x/no-self-import': 'error',
    'import-x/no-unresolved': 'error',
    'import-x/no-useless-path-segments': 'error',
    'import-x/no-webpack-loader-syntax': 'error',
    'import-x/order': [
      'error',
      { groups: [['builtin', 'external', 'internal']] },
    ],
    'import-x/prefer-default-export': 'off',

    // React (eslint-plugin-react-hooks v7 — the React Compiler lint)
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'error',

    // React correctness (@eslint-react). eslint-plugin-react is not usable on
    // ESLint 10: it calls the removed context.getFilename() across many rules.
    '@eslint-react/dom-no-missing-button-type': 'error',
    '@eslint-react/dom-no-dangerously-set-innerhtml': 'warn',
    '@eslint-react/dom-no-dangerously-set-innerhtml-with-children': 'error',
    '@eslint-react/dom-no-find-dom-node': 'error',
    '@eslint-react/dom-no-render-return-value': 'error',
    '@eslint-react/dom-no-script-url': 'error',
    '@eslint-react/dom-no-string-style-prop': 'error',
    '@eslint-react/dom-no-unknown-property': 'error',
    '@eslint-react/dom-no-unsafe-target-blank': 'error',
    '@eslint-react/dom-no-void-elements-with-children': 'error',
    '@eslint-react/jsx-no-children-prop': 'error',
    '@eslint-react/jsx-no-comment-textnodes': 'error',
    '@eslint-react/jsx-no-key-after-spread': 'error',
    '@eslint-react/jsx-no-useless-fragment': 'error',
    '@eslint-react/no-access-state-in-setstate': 'error',
    '@eslint-react/no-array-index-key': 'error',
    '@eslint-react/no-direct-mutation-state': 'error',
    '@eslint-react/no-duplicate-key': 'error',
    '@eslint-react/no-missing-component-display-name': 'warn',
    '@eslint-react/no-missing-key': 'error',
    '@eslint-react/no-nested-component-definitions': 'warn',
    '@eslint-react/no-unused-state': 'error',
    // Replaces react/no-deprecated
    '@eslint-react/no-component-will-mount': 'error',
    '@eslint-react/no-component-will-receive-props': 'error',
    '@eslint-react/no-component-will-update': 'error',
    '@eslint-react/no-context-provider': 'error',
    '@eslint-react/no-create-ref': 'error',
    '@eslint-react/no-forward-ref': 'error',
    '@eslint-react/no-use-context': 'error',
    // Replaces react/no-unsafe
    '@eslint-react/no-unsafe-component-will-mount': 'error',
    '@eslint-react/no-unsafe-component-will-receive-props': 'error',
    '@eslint-react/no-unsafe-component-will-update': 'error',
    // Replaces react/no-did-mount-set-state and friends
    '@eslint-react/no-set-state-in-component-did-mount': 'error',
    '@eslint-react/no-set-state-in-component-did-update': 'error',
    '@eslint-react/no-set-state-in-component-will-update': 'error',

    // @eslint-react ships rules that duplicate eslint-plugin-react-hooks v7.
    // Meta's plugin is authoritative, so silence the duplicates.
    '@eslint-react/error-boundaries': 'off',
    '@eslint-react/exhaustive-deps': 'off',
    '@eslint-react/globals': 'off',
    '@eslint-react/immutability': 'off',
    '@eslint-react/purity': 'off',
    '@eslint-react/refs': 'off',
    '@eslint-react/rules-of-hooks': 'off',
    '@eslint-react/set-state-in-effect': 'off',
    '@eslint-react/set-state-in-render': 'off',
    '@eslint-react/static-components': 'off',
    '@eslint-react/unsupported-syntax': 'off',
    '@eslint-react/use-memo': 'off',
  }

  // TypeScript-specific rules
  const typescriptRules = {
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
        trailingUnderscore: 'forbid',
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
      },
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        trailingUnderscore: 'forbid',
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
        trailingUnderscore: 'forbid',
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
    ],
    '@typescript-eslint/no-array-constructor': 'error',
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/no-empty-object-type': 'error',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
    '@typescript-eslint/no-unsafe-declaration-merging': 'error',
    '@typescript-eslint/no-unsafe-function-type': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        caughtErrors: 'none',
      },
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: false, typedefs: false },
    ],
    // 'no-var-requires' removed: deprecated in favour of 'no-require-imports'
    // above. 'semi' removed: deleted from typescript-eslint v8 (Prettier's job).
    '@typescript-eslint/no-wrapper-object-types': 'error',
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/triple-slash-reference': 'error',
    // Turn off base rules that are handled by TypeScript-specific rules
    'no-redeclare': 'off', // Use @typescript-eslint/no-redeclare instead
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
  }

  // Check for tsconfig.json before creating TypeScript config
  const tsConfigPath = path.default.join(process.cwd(), 'tsconfig.json')
  if (!fs.default.existsSync(tsConfigPath)) {
    throw new Error(
      `@nitid/eslint-config-nitid requires a tsconfig.json file in your project root for TypeScript support.\n\n` +
        `Please create a tsconfig.json file with at least:\n` +
        `{\n` +
        `  "compilerOptions": {\n` +
        `    "target": "ES2021",\n` +
        `    "module": "ESNext",\n` +
        `    "moduleResolution": "node",\n` +
        `    "strict": true,\n` +
        `    "jsx": "react-jsx",\n` +
        `    "esModuleInterop": true,\n` +
        `    "skipLibCheck": true,\n` +
        `    "forceConsistentCasingInFileNames": true\n` +
        `  },\n` +
        `  "include": ["**/*.ts", "**/*.tsx"],\n` +
        `  "exclude": ["node_modules"]\n` +
        `}\n\n` +
        `See https://github.com/nitid/eslint-config-nitid for more details.`
    )
  }

  return [
    // Only present when the optional peer dependency is installed.
    ...(jsxA11yPlugin ? [jsxA11yPlugin.default.flatConfigs.recommended] : []),
    reactPlugin.default.configs.recommended,
    // v7 moved the flat config under .flat; configs['recommended-latest'] is
    // now the legacy eslintrc shape, which ESLint 10 rejects outright.
    hooksPlugin.default.configs.flat['recommended-latest'],

    // Ignore patterns
    {
      ignores: ['node_modules/', 'dist/', 'build/', 'coverage/'],
    },

    // Base JS config for all files
    js.default.configs.recommended,

    // Base JS/JSX configuration
    {
      files: ['**/*.js', '**/*.jsx'],
      plugins: {
        'import-x': importPlugin.default,
      },
      // No parser override: ESLint's built-in espree resolves JSX identifiers
      // in scope analysis, so react/jsx-uses-vars is unnecessary and
      // @babel/eslint-parser (which does not) is no longer needed.
      languageOptions: {
        ...baseLanguageOptions,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      rules: {
        ...baseRules,
      },
      settings: {
        'import-x/resolver-next': [
          importPlugin.default.createNodeResolver({
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs', '.json'],
          }),
        ],
      },
    },

    // TypeScript configuration
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: {
        '@typescript-eslint': typescriptPlugin.default,
        'import-x': importPlugin.default,
      },
      languageOptions: {
        ...baseLanguageOptions,
        parser: tsParser.default,
        parserOptions: {
          project: './tsconfig.json',
          // Must be absolute: typescript-eslint rejects relative paths.
          tsconfigRootDir: process.cwd(),
        },
      },
      rules: {
        ...baseRules,
        ...typescriptRules,
        // Type-aware replacement for react/no-unused-prop-types. TS only: it
        // throws on JS/JSX, where there are no parser services.
        '@eslint-react/no-unused-props': 'error',
      },
      settings: {
        'import-x/resolver-next': [
          tsResolver.createTypeScriptImportResolver(),
          importPlugin.default.createNodeResolver({
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs', '.json'],
          }),
        ],
      },
    },

    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.test.js', '**/*.test.jsx'],
      languageOptions: {
        globals: {
          describe: 'readonly',
          test: 'readonly',
          it: 'readonly',
          expect: 'readonly',
          beforeEach: 'readonly',
          afterEach: 'readonly',
          beforeAll: 'readonly',
          afterAll: 'readonly',
          jest: 'readonly',
          fail: 'readonly',
          pending: 'readonly',
          spyOn: 'readonly',
          xdescribe: 'readonly',
          xtest: 'readonly',
          xit: 'readonly',
          fdescribe: 'readonly',
          fit: 'readonly',
        },
      },
      rules: {
        'no-empty-function': 'off',
        'import-x/no-named-as-default-member': 'off',
        'react-hooks/rules-of-hooks': 'off',
      },
    },

    // Prettier configuration - must be last to override other configs
    prettierConfig.default,
  ]
}
