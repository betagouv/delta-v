module.exports = {
  extends: ['@snowpact/eslint-config/react-typescript'],
  rules: {
    'no-console': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off', // https://eslint.org/docs/rules/comma-dangle
    'function-paren-newline': 'off', // https://eslint.org/docs/rules/function-paren-newline
    'global-require': 'off', // https://eslint.org/docs/rules/global-require
    'import/no-dynamic-require': 'off', // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-dynamic-require.md
    'no-inner-declarations': 'off', // https://eslint.org/docs/rules/no-inner-declarations// New rules
    'class-methods-use-this': 'off',
    'import/imports-first': 1,
    'import/no-unresolved': 2,
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'jsx-a11y/no-redundant-roles': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'array-callback-return': 'off',
  },
};
