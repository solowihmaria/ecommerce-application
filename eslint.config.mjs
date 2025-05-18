import globals from 'globals';
import prettier from 'prettier';
import tseslint from 'typescript-eslint';
import pluginJs from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

/** @type {import('eslint').Linter.Config[]} */
export default [
    eslintPluginUnicorn.configs.recommended,
    { files: ['**/*.{js,mjs,cjs,ts,tsx}'] },
    {
        languageOptions: {
            globals: globals.browser,
            parser: '@typescript-eslint/parser',
            parserOptions: {
                projectService: true,
                tsconfigRootDir: '/',
                ecmaFeatures: {
                    jsx: true,
                },
                project: './tsconfig.json',
            },
        },
    },
    {
        linterOptions: {
            noInlineConfig: true,
            reportUnusedDisableDirectives: 'warn',
        },
    },
    {
        rules: {
            'no-debugger': 'off',
            'no-console': 0,
            curly: 'warn',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/consistent-type-assertions': [
                'error',
                { assertionStyle: 'never' },
            ],
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/consistent-type-definitions': [
                'warn',
                'interface',
            ],

            'unicorn/better-regex': 'warn',
            'unicorn/no-null': 'off',
            'unicorn/no-array-callback-reference': 'off',
            'unicorn/no-array-for-each': 'off',
            'unicorn/no-array-reduce': 'off',
            'unicorn/prevent-abbreviations': 'off',
            'unicorn/prefer-logical-operator-over-ternary': 'off',
            'unicorn/prefer-blob-reading-methods': 'off',
            'unicorn/no-empty-file': 'warn',
            'unicorn/filename-case': 'off',
            'unicorn/no-negated-condition': 'off',
            'unicorn/no-negation-in-equality-check': 'off',
            'unicorn/prefer-global-this': 'off',
            'unicorn/prevent-abbreviations': 'off',

            'max-lines-per-function': ['warn', 70],

            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',
            'react/prop-types': 'off',

            'react/jsx-uses-vars': 'error',
            'react/boolean-prop-naming': 'error',
            'react/hook-use-state': 'error',
            'react/jsx-handler-names': 'warn',
            'react/no-array-index-key': 'error',
            'react/no-typos': 'warn',

            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
        },
    },
    {
        plugins: {
            prettier: prettier,
            tseslint: tseslint,
            react: reactPlugin,
            reactHooks: reactHooks,
            jsxA11y: jsxA11y,
        },
    },
    {
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    reactHooks.configs['recommended-latest'],
    jsxA11y.flatConfigs.recommended,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    pluginJs.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        rules: {
            '@typescript-eslint/no-empty-object-type': 'off',
        },
    },
];
