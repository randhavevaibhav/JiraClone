import js from '@eslint/js';
import { globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const configArr = [
  js.configs.recommended,
  tseslint.configs.recommended,
  [globalIgnores(['dist/*'])],
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // Extra spaces
      'no-multi-spaces': 'error',

      //un-used vars
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],

      // Require spaces around operators
      'space-infix-ops': 'error',

      // Require spaces after keywords
      'keyword-spacing': 'error',

      // Object spacing
      'object-curly-spacing': ['error', 'always'],

      // Array spacing
      'array-bracket-spacing': ['error', 'never'],

      // No blank lines at beginning of file
      'no-multiple-empty-lines': [
        'error',
        {
          max: 2,
          maxBOF: 0,
          maxEOF: 0,
        },
      ],
    },
  },
];
