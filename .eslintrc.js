module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:typescript-enum/recommended',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'typescript-enum', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 2,
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/no-unsafe-call': 2,
    '@typescript-eslint/no-unsafe-member-access': 2,
    '@typescript-eslint/no-unsafe-assignment': 2,
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    'no-console': 2,
    'immutable/no-let': 'off',
    'eqeqeq': 2,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-param-reassign': 2,
    // 'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
  },
};
