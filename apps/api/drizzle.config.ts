import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../apps/api/.env'),
});

const connectionString = process.env.DIRECT_URL!;

export default defineConfig({
  out: './drizzle',
  dialect: 'postgresql',
  schema: './src/db/schema/index.ts',
  dbCredentials: {
    url: connectionString,
  },
});
