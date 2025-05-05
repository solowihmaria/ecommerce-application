import globals from 'globals';
import prettier from 'prettier';
import tseslint from 'typescript-eslint';
import pluginJs from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

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
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/consistent-type-assertions': [
                'error',
                { assertionStyle: 'never' },
            ],
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/explicit-member-accessibility': [
                'error',
                {
                    accessibility: 'explicit',
                    overrides: { constructors: 'off' },
                },
            ],
            '@typescript-eslint/member-ordering': 'error',
            'class-methods-use-this': 'error',
            '@typescript-eslint/consistent-type-definitions': [
                'error',
                'interface',
            ],
            'unicorn/better-regex': 'warn',
            'unicorn/no-null': 'off',
            'unicorn/no-array-callback-reference': 'off',
            'unicorn/no-array-for-each': 'off',
            'unicorn/no-array-reduce': 'off',
            'unicorn/prevent-abbreviations': [
                'error',
                {
                    allowList: {
                        acc: true,
                        env: true,
                        i: true,
                        j: true,
                        props: true,
                        Props: true,
                    },
                },
            ],
            'unicorn/prefer-logical-operator-over-ternary': 'off',
            'unicorn/prefer-blob-reading-methods': 'off',
            'unicorn/no-empty-file': 'off',
            'unicorn/filename-case': 'off',
            'max-lines-per-function': ['error', 40],
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
        },
    },
    {
        plugins: {
            prettier: prettier,
            tseslint: tseslint,
        },
    },
    {
        settings: {
            react: {
                version: 'detect',
            },
        },
    },

    reactPlugin.configs.flat.recommended,
    pluginJs.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
];
