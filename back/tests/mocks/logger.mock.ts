import { ILogger } from '../../src/core/logger';

export const loggerMock: ILogger = {
  debug: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  trace: jest.fn(),
  warn: jest.fn(),
};
