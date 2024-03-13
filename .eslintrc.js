module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'playwright'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:playwright/recommended'
    ],
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    rules: {
      // Add custom rules if needed
    },
}
