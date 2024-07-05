/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/app/**',
    '!<rootDir>/src/**/*.stories.{js,jsx,ts,tsx}',
    '!<rootDir>/node_modules/',
    '!<rootDir>/src/models/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/constants/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/icons/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/themes/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/actions/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/themes/components/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/components/TableOrder/index.tsx',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    // Manual mock the dependency due to this issue: https://github.com/hashicorp/next-mdx-remote/issues/337
    '^next-mdx-remote$': '<rootDir>/__mocks__/next-mdx-remote/index.js',
    '^next-mdx-remote/(.*)$': '<rootDir>/__mocks__/next-mdx-remote/$1',
  },
};

export default createJestConfig(config);
