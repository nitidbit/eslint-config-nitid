module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['@typescript-eslint', 'react'],
  parser: '@babel/eslint-parser', // Use Babel parser for JavaScript files
  parserOptions: {
    requireConfigFile: false,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
    jquery: true,
  },
  rules: {
    'arrow-body-style': 'off',
    'arrow-parens': 'error',
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
    'dot-notation': 'off',
    'func-names': ['error', 'as-needed'],
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { optionalDependencies: false },
    ],
    'import/prefer-default-export': 'off',
    'jsx-quotes': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/label-has-associated-control': [
      'error',
      { required: { some: ['nesting', 'id'] } },
    ],
    'jsx-a11y/no-static-element-interactions': 'warn',
    'jsx-a11y/tabindex-no-positive': 'warn',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-restricted-syntax': ['off', 'ForOfStatement'],
    'no-shadow': 'error',
    'no-trailing-spaces': 'error',
    'no-undef': 'error',
    'no-underscore-dangle': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-useless-escape': 'error',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'prefer-template': 'warn',
    radix: 'off',
    'react/destructuring-assignment': 'off',
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' },
    ],
    'react/jsx-curly-spacing': 'error',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-pascal-case': ['error', { allowAllCaps: true }],
    'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
    'react/forbid-prop-types': 'warn',
    'react/jsx-boolean-value': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],
    'react/self-closing-comp': 'warn',
    'react/prop-types': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {}, // Enable ESLint to resolve TypeScript files
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Ensure both JS and TS files are resolved
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json', // Path from your project root
        tsconfigRootDir: './', // Points to your project root
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier', // Prettier config disables conflicting ESLint rules
      ],
      rules: {
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
        'no-shadow': 'off',
        'no-unused-vars': 'off',
        'react/require-default-props': 'off', // TypeScript handles this
      },
    },
  ],
}
