import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react' // 1. Import React plugin
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules', '.built']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended, // Spread array values safely
      reactHooks.configs.flat.recommended,
    ],
    // 2. Register the plugins explicitly
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': reactPlugin,
    },
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // --- Fast Refresh Strict Isolation Rules ---
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // --- Essential React Core Rules ---
      'react/jsx-key': 'error', // Fails build if map loops lack critical unique keys
      'react/no-array-index-key': 'warn', // Discourages using array indexes as keys (breaks Kanban reordering)
      'react/self-closing-comp': 'warn', // Enforces <Component /> instead of <Component></Component>
      'react/jsx-no-duplicate-props': 'error', // Catches accidentally duplicated Tailwind classes or props

      // --- TypeScript Data Layer Strictness ---
      '@typescript-eslint/no-explicit-any': 'error', // Enforces typed ticket schemas instead of fallback 'any' type
      '@typescript-eslint/no-unused-vars': [
        'warn', 
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' } // Ignores unused variables starting with underscores
      ],
      '@typescript-eslint/no-empty-interface': 'warn', // flags empty structures before deployment
      '@typescript-eslint/consistent-type-imports': 'warn', // Optimizes bundler compilation sizes for types

      // --- Standard Code Quality and Safety Defaults ---
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Keeps production build terminal outputs clean
      'eqeqeq': ['error', 'always'], // Eliminates loose type comparison evaluation bugs
    },
  },
])