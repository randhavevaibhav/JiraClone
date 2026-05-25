import js from '@eslint/js';
import { defineConfig  } from 'eslint/config';
import tseslint from 'typescript-eslint';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


export default defineConfig(
  js.configs.recommended,
  tseslint.configs.recommended,
  //for file ignore import form 'eslint/config'
  // [globalIgnores(["dist/*"])],
  {
    languageOptions: {
      parserOptions: {  
      tsconfigRootDir: __dirname,
      },
    },
  },
);
