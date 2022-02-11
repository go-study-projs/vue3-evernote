module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0,
    'prefer-promise-reject-errors': 'off',
    'quotes': ['error', 'single'],
    'no-extra-semi': 0,
    'no-unused-vars': 0,
    'newline-per-chained-call': 'off',
    "vue/valid-template-root": "off",
  },
  globals: {
    __BASE_URL__: true
  }
}
