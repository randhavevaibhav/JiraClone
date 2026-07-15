import dotenv from 'dotenv';
const nodeEnv = process.env.NODE_ENV ?? 'dev';

if (nodeEnv !== 'prod') {
  dotenv.config({
    path: `.env.${nodeEnv}`,
  });
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing');
}

export const env = {
  nodeEnv,
  port: Number(process.env.PORT) || 8080,
  isDevelopment: nodeEnv === 'dev',
  isTest: nodeEnv === 'test',
  isProduction: nodeEnv === 'prod',
} as const;
