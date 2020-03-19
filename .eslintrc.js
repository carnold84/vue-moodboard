module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/essential"
  ],
  "rules": {
    "comma-dangle": [
      "error",
      "always-multiline"
    ],
    "no-console": [
      "warn",
      {
        "allow": [
          "warn",
          "error"
        ]
      }
    ],
    "semi": ["error", "always"]
  },
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "overrides": [
    {
      "files": [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      "env": {
        "jest": true
      }
    }
  ]
};