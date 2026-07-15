import type { Config } from 'jest';

const config: Config = {
  // 1. Remove preset: 'ts-jest'

  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],

  // 2. Direct matching file extensions into the fast SWC pipeline
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          target: 'es2022', // Generates modern Node-friendly JavaScript syntax
          parser: {
            syntax: 'typescript',
            tsx: false, // Set to true if you are handling React frontend (.tsx) paths
            decorators: true, // Retains support for modern API framework decorators
          },
        },
      },
    ],
  },
};

export default config;
