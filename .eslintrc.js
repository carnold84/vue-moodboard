module.exports = {
  'root': true,
  'env': {
    'node': true,
  },
  'extends': [
    'plugin:vue/essential',
  ],
  'rules': {
    'comma-dangle': [
      'warn',
      'always-multiline',
    ],
    'no-console': [
      'warn',
      {
        'allow': [
          'info',
          'warn',
          'error',
        ],
      },
    ],
    'semi': ['warn', 'always'],
    'quotes': ['error', 'single'],
  },
  'parserOptions': {
    'parser': 'babel-eslint',
  },
  'overrides': [
    {
      'files': [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      'env': {
        'jest': true,
      },
    },
  ],
};