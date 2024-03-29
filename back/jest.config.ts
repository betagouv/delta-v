export default {
  moduleFileExtensions: ['js', 'ts', 'json'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
};
