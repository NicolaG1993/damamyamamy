module.exports = {
    env: {
        browser: true,
        es2021: true,
        es6: true,
        node: true,
        jest: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        indent: 1,
        semi: ["error", "always"],
        "no-console": 0,
        "no-inner-declarations": 0,
        "no-sparse-arrays": 0,
        "no-unexpected-multiline": 0,
        "no-unsafe-finally": 0,
        "react/display-name": 0,
        "react/jsx-uses-react": 0,
        "react/prop-types": 0,
        "react/react-in-jsx-scope": 0,
    },
    globals: {
        jest: false,
        expect: false,
        test: false,
    },
};