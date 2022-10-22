/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/__tests__'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts', '**/*.spec.ts']
};