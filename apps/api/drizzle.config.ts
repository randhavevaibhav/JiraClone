import './src/utils/config';
import { defineConfig } from 'drizzle-kit';

const connectionString = process.env.DATABASE_URL!;
export default defineConfig({
  out: './drizzle',
  dialect: 'postgresql',
  schema: './src/db/schema/index.ts',
  dbCredentials: {
    url: connectionString,
  },
});
