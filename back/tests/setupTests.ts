import { eventEmitterMock } from './mocks/eventEmitter.mock';

jest.mock('../src/core/eventManager/eventManager', () => {
  return { eventEmitter: eventEmitterMock };
});
