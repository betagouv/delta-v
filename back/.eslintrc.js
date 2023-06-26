module.exports = {
  extends: ['@snowpact/eslint-config/node-typescript'],
  rules: {
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: ['**/tests/*'],
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['tests/**/*', 'tests/*', 'fixtures/processor/*'],
      },
    ],
  },
};
