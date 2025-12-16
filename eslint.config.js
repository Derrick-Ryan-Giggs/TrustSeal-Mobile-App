const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
    rules: {
      // Ignore apostrophe/HTML entity complaints in JSX text
      'react/no-unescaped-entities': 'off',
    },
  }
]);
