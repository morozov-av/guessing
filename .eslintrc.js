module.exports ={
  "root": true,
  "ignorePatterns": ["**/*"],
  "plugins": ["@nrwl/nx", "@typescript-eslint"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sourceType": "module",
    "tsconfigRootDir": __dirname,
    "project": "./tsconfig.base.json"
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "rules": {
    "quotes": [ 2, "single" ],
    "semi": [ 2, "always" ],
    "comma-dangle": [ 2, "never" ],
    "object-curly-spacing": [ 2, "always" ],
    "array-bracket-spacing": [ 2, "always" ]
  }
}
