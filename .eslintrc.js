module.exports = {
  root: true,
  env: {
    jest: true,
  },
  extends: 'airbnb-base',
  rules: {
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    camelcase: 0,
    'no-console': 0,
    'no-await-in-loop': 0,
    'no-continue': 0,
    'no-promise-executor-return': 0,
    'consistent-return': 0,
    'no-nested-ternary': 0,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
};
