import dotenv from "dotenv";
import { API_PORT } from "./constants.js";

dotenv.config();

const environments = {
  PROD: {
    DB_URL: process.env.DATABASE_URL!,
    API_URL: process.env.API_URL!,
  },
  DEV: {
    DB_URL: process.env.DATABASE_URL!,
    API_URL: `http://localhost:${API_PORT}`,
  }
};

type Environment = keyof typeof environments;

const env = process.env.ENV;

if (!env || !(env in environments)) {
  throw new Error(
    'Invalid ENV value. Use PROD or DEV',
  );
}

export const config =
  environments[env as Environment];