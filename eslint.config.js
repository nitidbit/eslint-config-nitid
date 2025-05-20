import jsParser from '@babel/eslint-parser';
import tsParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import hooksPlugin from 'eslint-plugin-react-hooks';
import js from '@eslint/js';
import globals from 'globals';

// Base language options for all JavaScript and TypeScript files
const baseLanguageOptions = {
  globals: {
    ...globals.browser,
    ...globals.node,
    ...globals.es2021,
    ...globals.jest,
    ...globals.jquery,
  },
  ecmaVersion: 2021,
  sourceType: 'module',
};

// Base rules for all JavaScript and TypeScript files
const baseRules = {
  // Possible Problems
  'array-callback-return': 'error',
  'constructor-super': 'error',
  'for-direction': 'error',
  'getter-return': 'error',
  'no-async-promise-executor': 'error',
  'no-await-in-loop': 'error',
  'no-class-assign': 'error',
  'no-compare-neg-zero': 'error',
  'no-cond-assign': 'error',
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
  'no-empty-character-class': 'error',
  'no-empty-pattern': 'error',
  'no-ex-assign': 'error',
  'no-fallthrough': 'error',
  'no-func-assign': 'error',
  'no-import-assign': 'error',
  'no-invalid-regexp': 'error',
  'no-irregular-whitespace': 'error',
  'no-loss-of-precision': 'error',
  'no-misleading-character-class': 'error',
  'no-new-native-nonconstructor': 'error',
  'no-new-symbol': 'error',
  'no-obj-calls': 'error',
  'no-promise-executor-return': 'error',
  'no-prototype-builtins': 'error',
  'no-self-assign': 'error',
  'no-self-compare': 'error',
  'no-setter-return': 'error',
  'no-sparse-arrays': 'error',
  'no-template-curly-in-string': 'error',
  'no-this-before-super': 'error',
  'no-undef': 'error',
  'no-unexpected-multiline': 'error',
  'no-unmodified-loop-condition': 'error',
  'no-unreachable': 'error',
  'no-unreachable-loop': 'error',
  'no-unsafe-finally': 'error',
  'no-unsafe-negation': 'error',
  'no-unsafe-optional-chaining': 'error',
  'no-unused-private-class-members': 'error',
  'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
  'no-useless-backreference': 'error',
  'require-atomic-updates': 'error',
  'use-isnan': 'error',
  'valid-typeof': 'error',

  // Suggestions
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
  complexity: ['error', { max: 20 }],
  'consistent-return': 'error',
  'default-case': 'error',
  'default-case-last': 'error',
  'dot-notation': 'off',
  eqeqeq: ['error', 'always', { null: 'ignore' }],
  'func-names': ['error', 'as-needed'],
  'max-classes-per-file': ['error', 1],
  'no-alert': 'error',
  'no-console': ['error', { allow: ['warn', 'error'] }],
  'no-else-return': 'error',
  'no-empty': 'error',
  'no-empty-function': 'error',
  'no-eval': 'error',
  'no-extra-bind': 'error',
  'no-floating-decimal': 'error',
  'no-implicit-coercion': 'error',
  'no-implied-eval': 'error',
  'no-labels': 'error',
  'no-lone-blocks': 'error',
  'no-loop-func': 'error',
  'no-multi-spaces': 'error',
  'no-multi-str': 'error',
  'no-nested-ternary': 'error',
  'no-new': 'error',
  'no-new-func': 'error',
  'no-new-wrappers': 'error',
  'no-octal': 'error',
  'no-octal-escape': 'error',
  'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['acc', 'accumulator', 'e', 'ctx', 'context', 'req', 'request', 'res', 'response', '$scope', 'staticContext'] }],
  'no-redeclare': 'error',
  'no-restricted-syntax': ['off', 'ForOfStatement'],
  'no-return-assign': ['error', 'always'],
  'no-return-await': 'error',
  'no-script-url': 'error',
  'no-sequences': 'error',
  'no-shadow': 'error',
  'no-throw-literal': 'error',
  'no-trailing-spaces': 'error',
  'no-underscore-dangle': 'off',
  'no-unneeded-ternary': 'error',
  'no-unused-expressions': 'error',
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
  'require-await': 'off',
  'wrap-iife': ['error', 'outside', { functionPrototypeMethods: false }],
  yoda: 'error',

  // Layout & Formatting
  'array-bracket-spacing': ['error', 'never'],
  'comma-spacing': ['error', { before: false, after: true }],
  'eol-last': ['error', 'always'],
  indent: ['error', 2, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
  'jsx-quotes': 'warn',
  'key-spacing': ['error', { beforeColon: false, afterColon: true }],
  'keyword-spacing': ['error', { before: true, after: true }],
  'linebreak-style': ['error', 'unix'],
  'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
  'no-tabs': 'error',
  'object-curly-spacing': ['error', 'always'],
  'padded-blocks': ['error', 'never'],
  quotes: ['error', 'single', { avoidEscape: true }],
  semi: ['error', 'always'],
  'semi-spacing': ['error', { before: false, after: true }],
  'space-before-blocks': 'error',
  'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
  'space-in-parens': ['error', 'never'],
  'space-infix-ops': 'error',
  'space-unary-ops': ['error', { words: true, nonwords: false }],

  // Import rules
  'import/extensions': 'off',
  'import/no-unresolved': 'error',
  'import/named': 'error',
  'import/default': 'error',
  'import/export': 'error',
  'import/no-extraneous-dependencies': [
    'error',
    { optionalDependencies: false },
  ],
  'import/no-mutable-exports': 'error',
  'import/no-amd': 'error',
  'import/no-commonjs': 'off',
  'import/first': 'error',
  'import/no-duplicates': 'error',
  'import/order': ['error', { groups: [['builtin', 'external', 'internal']] }],
  'import/newline-after-import': 'error',
  'import/prefer-default-export': 'off',
  'import/no-restricted-paths': 'off',
  'import/max-dependencies': ['warn', { max: 10 }],
  'import/no-absolute-path': 'error',
  'import/no-dynamic-require': 'error',
  'import/no-webpack-loader-syntax': 'error',
  'import/no-named-default': 'error',
  'import/no-self-import': 'error',
  'import/no-cycle': ['error', { maxDepth: Infinity }],
  'import/no-useless-path-segments': 'error',
  'import/no-relative-parent-imports': 'off',

  // JSX-A11Y
  'jsx-a11y/alt-text': 'error',
  'jsx-a11y/anchor-has-content': 'error',
  'jsx-a11y/anchor-is-valid': 'error',
  'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
  'jsx-a11y/aria-props': 'error',
  'jsx-a11y/aria-proptypes': 'error',
  'jsx-a11y/aria-role': 'error',
  'jsx-a11y/aria-unsupported-elements': 'error',
  'jsx-a11y/click-events-have-key-events': 'warn',
  'jsx-a11y/heading-has-content': 'error',
  'jsx-a11y/html-has-lang': 'error',
  'jsx-a11y/img-redundant-alt': 'error',
  'jsx-a11y/interactive-supports-focus': 'error',
  'jsx-a11y/label-has-associated-control': [
    'error',
    { required: { some: ['nesting', 'id'] } },
  ],
  'jsx-a11y/mouse-events-have-key-events': 'error',
  'jsx-a11y/no-access-key': 'error',
  'jsx-a11y/no-autofocus': 'error',
  'jsx-a11y/no-distracting-elements': 'error',
  'jsx-a11y/no-interactive-element-to-noninteractive-role': 'error',
  'jsx-a11y/no-noninteractive-element-interactions': 'error',
  'jsx-a11y/no-noninteractive-element-to-interactive-role': 'error',
  'jsx-a11y/no-noninteractive-tabindex': 'error',
  'jsx-a11y/no-redundant-roles': 'error',
  'jsx-a11y/no-static-element-interactions': 'warn',
  'jsx-a11y/role-has-required-aria-props': 'error',
  'jsx-a11y/role-supports-aria-props': 'error',
  'jsx-a11y/scope': 'error',
  'jsx-a11y/tabindex-no-positive': 'warn',

  // React
  'react/destructuring-assignment': 'off',
  'react/display-name': 'error',
  'react/forbid-prop-types': 'warn',
  'react/jsx-boolean-value': 'off',
  'react/jsx-curly-spacing': 'error',
  'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
  'react/jsx-fragments': ['error', 'element'],
  'react/jsx-key': 'error',
  'react/jsx-no-bind': ['error', { allowArrowFunctions: true }],
  'react/jsx-no-comment-textnodes': 'error',
  'react/jsx-no-duplicate-props': 'error',
  'react/jsx-no-script-url': 'error',
  'react/jsx-no-target-blank': 'error',
  'react/jsx-no-undef': 'error',
  'react/jsx-no-useless-fragment': 'error',
  'react/jsx-pascal-case': ['error', { allowAllCaps: true }],
  'react/jsx-props-no-spreading': 'off',
  'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
  'react/jsx-uses-react': 'error',
  'react/jsx-uses-vars': 'error',
  'react/no-access-state-in-setstate': 'error',
  'react/no-array-index-key': 'error',
  'react/no-children-prop': 'error',
  'react/no-danger': 'error',
  'react/no-danger-with-children': 'error',
  'react/no-deprecated': 'error',
  'react/no-did-mount-set-state': 'error',
  'react/no-did-update-set-state': 'error',
  'react/no-direct-mutation-state': 'error',
  'react/no-find-dom-node': 'error',
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
  'react/prefer-stateless-function': 'error',
  'react/prop-types': 'off',
  'react/react-in-jsx-scope': 'error',
  'react/require-render-return': 'error',
  'react/self-closing-comp': 'warn',
  'react/sort-comp': 'error',
  'react/state-in-constructor': ['error', 'always'],
  'react/style-prop-object': 'error',
  'react/void-dom-elements-no-children': 'error',
  'react/function-component-definition': [
    'error',
    { namedComponents: 'arrow-function' },
  ],

  // React Hooks
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn',
};

// TypeScript-specific rules
const typescriptRules = {
  '@typescript-eslint/no-shadow': 'error',
  '@typescript-eslint/no-unused-vars': [
    'warn',
    {
      argsIgnorePattern: '^_',
      ignoreRestSiblings: true,
      caughtErrors: 'none',
    },
  ],
  '@typescript-eslint/semi': 'off', // we don't use semicolons
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: 'typeAlias',
      format: ['PascalCase'], // Enforce PascalCase for type aliases
      trailingUnderscore: 'forbid',
    },
    {
      selector: 'interface',
      format: ['PascalCase'], // Enforce PascalCase for interfaces
    },
    {
      selector: 'variable',
      format: ['camelCase', 'PascalCase', 'UPPER_CASE'], // react components are PascalCase
      trailingUnderscore: 'forbid',
    },
    {
      selector: 'function',
      format: ['camelCase', 'PascalCase'], // react components are PascalCase
      trailingUnderscore: 'forbid',
    },
    {
      selector: 'enum',
      format: ['PascalCase'], // Enforce PascalCase for enums
    },
    {
      selector: 'enumMember',
      format: ['UPPER_CASE'], // Enforce UPPER_CASE for enum members
    },
  ],
  '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
  'no-shadow': 'off',
  'no-unused-vars': 'off',
  'no-use-before-define': 'off',
  'react/require-default-props': 'off', // TypeScript handles this
};

export default [
  // Ignore patterns
  {
    ignores: ['node_modules/', 'dist/', 'build/', 'coverage/'],
  },

  // Base JS config for all files
  js.configs.recommended,

  // Base JS/JSX configuration
  {
    files: ['**/*.js', '**/*.jsx'],
    plugins: {
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      react: reactPlugin,
      'react-hooks': hooksPlugin,
    },
    languageOptions: {
      ...baseLanguageOptions,
      parser: jsParser,
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
      '@typescript-eslint': typescriptPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      react: reactPlugin,
      'react-hooks': hooksPlugin,
    },
    languageOptions: {
      ...baseLanguageOptions,
      parser: tsParser,
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
];
