// eslint.config.js
// Use dynamic imports for better compatibility as a shareable config
export default async function createConfig() {
  // Dynamically import dependencies
  const jsParser = await import('@babel/eslint-parser')
  // eslint-disable-next-line import/no-unresolved
  const tsParser = await import('@typescript-eslint/parser')
  // eslint-disable-next-line import/no-unresolved
  const typescriptPlugin = await import('@typescript-eslint/eslint-plugin')
  const reactPlugin = await import('eslint-plugin-react')
  const importPlugin = await import('eslint-plugin-import')
  const jsxA11yPlugin = await import('eslint-plugin-jsx-a11y')
  const hooksPlugin = await import('eslint-plugin-react-hooks')
  const js = await import('@eslint/js')
  const prettierConfig = await import('eslint-config-prettier')
  const fs = await import('fs')
  const path = await import('path')

  // Base language options without globals - projects should define their own environments
  const baseLanguageOptions = {
    ecmaVersion: 2021,
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
    'arrow-parens': 'error',
    'block-scoped-var': 'error',
    camelcase: 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'only-multiline',
      },
    ],
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
    'global-require': 'error',
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
    'no-floating-decimal': 'error',
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
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-nested-ternary': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-native-nonconstructor': 'error',
    'no-new-symbol': 'error',
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
    'no-return-await': 'error',
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
    'no-trailing-spaces': 'error',
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
    'wrap-iife': ['error', 'outside', { functionPrototypeMethods: false }],
    yoda: 'error',

    // Layout & Formatting
    'array-bracket-spacing': ['error', 'never'],
    'comma-spacing': ['error', { before: false, after: true }],
    'eol-last': ['error', 'always'],
    indent: [
      'error',
      2,
      { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 },
    ],
    'jsx-quotes': 'warn',
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'keyword-spacing': ['error', { before: true, after: true }],
    'linebreak-style': ['error', 'unix'],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'no-tabs': 'error',
    'object-curly-spacing': ['error', 'always'],
    'padded-blocks': ['error', 'never'],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: 'off',
    'semi-spacing': ['error', { before: false, after: true }],
    'space-before-blocks': 'error',
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never', asyncArrow: 'always' },
    ],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': ['error', { words: true, nonwords: false }],

    // Import rules
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'off',
    'import/first': 'error',
    'import/named': 'error',
    'import/newline-after-import': 'error',
    'import/no-absolute-path': 'error',
    'import/no-amd': 'error',
    'import/no-commonjs': 'off',
    'import/no-cycle': ['error', { maxDepth: Infinity }],
    'import/no-duplicates': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      { optionalDependencies: false },
    ],
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-named-default': 'error',
    'import/no-relative-packages': 'error',
    'import/no-relative-parent-imports': 'off',
    'import/no-restricted-paths': 'off',
    'import/no-self-import': 'error',
    'import/no-unresolved': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/order': [
      'error',
      { groups: [['builtin', 'external', 'internal']] },
    ],
    'import/prefer-default-export': 'off',

    // React
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'error',

    'react/button-has-type': 'error',
    'react/default-props-match-prop-types': [
      'error',
      { allowRequiredDefaults: false },
    ],
    'react/destructuring-assignment': 'off',
    'react/display-name': 'error',
    'react/forbid-prop-types': 'warn',
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' },
    ],
    'react/jsx-boolean-value': 'error',
    'react/jsx-curly-spacing': 'error',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-key': 'error',
    'react/jsx-no-bind': ['warn', { allowArrowFunctions: true }],
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-script-url': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-pascal-case': ['error', { allowAllCaps: true }],
    'react/jsx-props-no-spread-multi': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-access-state-in-setstate': 'error',
    'react/no-array-index-key': 'error',
    'react/no-arrow-function-lifecycle': 'error',
    'react/no-children-prop': 'error',
    'react/no-danger': 'warn',
    'react/no-danger-with-children': 'error',
    'react/no-deprecated': 'error',
    'react/no-did-mount-set-state': 'error',
    'react/no-did-update-set-state': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-invalid-html-attribute': 'error',
    'react/no-is-mounted': 'error',
    'react/no-render-return-value': 'error',
    'react/no-string-refs': 'error',
    'react/no-this-in-sfc': 'error',
    'react/no-typos': 'error',
    'react/no-unescaped-entities': 'error',
    'react/no-unknown-property': 'error',
    'react/no-unsafe': 'error',
    'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],
    'react/no-unused-prop-types': 'error',
    'react/no-unused-state': 'error',
    'react/no-will-update-set-state': 'error',
    'react/prefer-es6-class': ['error', 'always'],
    'react/prefer-exact-props': 'error',
    'react/prefer-stateless-function': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'error',
    'react/require-render-return': 'error',
    'react/self-closing-comp': 'warn',
    'react/sort-comp': 'error',
    'react/state-in-constructor': ['error', 'always'],
    'react/style-prop-object': 'error',
    'react/void-dom-elements-no-children': 'error',
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
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/no-wrapper-object-types': 'error',
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/triple-slash-reference': 'error',
    // Turn off base rules that are handled by TypeScript-specific rules
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'react/require-default-props': 'off', // TypeScript handles this
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
    jsxA11yPlugin.default.flatConfigs.recommended,
    reactPlugin.default.configs.flat.recommended,
    reactPlugin.default.configs.flat['jsx-runtime'],
    hooksPlugin.configs['recommended-latest'],

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
        import: importPlugin.default,
      },
      languageOptions: {
        ...baseLanguageOptions,
        parser: jsParser.default,
        parserOptions: {
          requireConfigFile: false,
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      rules: {
        ...baseRules,
      },
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
        react: {
          version: 'detect',
        },
      },
    },

    // TypeScript configuration
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: {
        '@typescript-eslint': typescriptPlugin.default,
        import: importPlugin.default,
        react: reactPlugin.default,
      },
      languageOptions: {
        ...baseLanguageOptions,
        parser: tsParser.default,
        parserOptions: {
          project: './tsconfig.json',
          tsconfigRootDir: './',
        },
      },
      rules: {
        ...baseRules,
        ...typescriptRules,
      },
      settings: {
        'import/resolver': {
          typescript: {},
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
        react: {
          version: 'detect',
        },
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
        'import/no-named-as-default-member': 'off',
        'filenames/match-exported-or-regex': 'off',
        'react-hooks/rules-of-hooks': 'off',
      },
    },

    // Prettier configuration - must be last to override other configs
    prettierConfig.default,
  ]
}
