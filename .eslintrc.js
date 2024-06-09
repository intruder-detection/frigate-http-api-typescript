module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'deprecation', 'import', 'no-relative-import-paths', 'unused-imports'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  settings: {
    'import/external-module-folders': ['node_modules'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      alias: true,
      typescript: {
        alwaysTryTypes: true,
        project: ['tsconfig.json'],
      },
      node: {
        extensions: ['.ts'],
      },
    },
  },
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true, args: 'none' }],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    'deprecation/deprecation': 'warn',
    'prettier/prettier': ['error', { printWidth: 150 }],
    'import/namespace': ['error', { allowComputed: true }],
    'import/no-cycle': ['warn', { maxDepth: 1 }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: '@nestjs/**',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@core/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@test/**',
            group: 'internal',
            position: 'after',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'no-relative-import-paths/no-relative-import-paths': ['error', { allowSameFolder: true }],
  },
};
