import nextJest from 'next/jest';

import type { Config } from 'jest';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  coverageDirectory: '.coverage',
  testEnvironment: 'jsdom',
  verbose: true,
  testRegex: '/*.test.tsx?$',
  transformIgnorePatterns: ['<rootDir>/node_modules/.+\\.tsx?$'],
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        isolatedModules: true,
        tsconfig: 'tsconfig.jest.json',
      },
    ],
  },
  moduleNameMapper: {
    '^src/jest/(.*)': '<rootDir>/src/jest/$1',
    '^react/(.*)': '<rootDir>/node_modules/react/$1', // должна быть только одна версия react в рамках одного процесса
    '^src/(.*)': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/jest/setup.ts'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
