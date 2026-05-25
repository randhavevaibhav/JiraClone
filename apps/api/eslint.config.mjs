import { defineConfig } from 'eslint/config';
import { configArr } from '../../packages/config/eslint.common.config.mjs';

export default defineConfig(...configArr);
