module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "@electron-toolkit/eslint-config-ts/recommended",
    "@electron-toolkit/eslint-config-prettier"
  ],
  settings: {
    react: {
      version: "detect" // Detecta automáticamente la versión de React instalada
    }
  },
  rules: {
    quotes: ["error", "double"], // Asegura que se usen comillas dobles
    semi: ["error", "always"], // Asegura que se use punto y coma
    "prettier/prettier": ["error", { singleQuote: false, semi: true }]
  }
};
